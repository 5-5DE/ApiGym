import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { stats, rawExercises, getExercise } from '../src/catalog.js';
import { createApiGymClient, ApiGymError } from '../client/index.js';
let server, base;
before(async()=>{server=createApp({apiKey:'',corsOrigins:'*'});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;});
after(async()=>{await new Promise(resolve=>server.close(resolve));});
const request = async path => {const r=await fetch(base+path);return {r,body:await r.json()};};

test('catálogo real y búsqueda en español sin acentos',async()=>{
  const {body}=await request('/api/v1/exercises?q=jalon%20al%20pecho&popular=true');
  assert.ok(body.data.some(e=>e.id==='Wide-Grip_Lat_Pulldown'));
  assert.equal(stats().total,2069);assert.equal(stats().spanish,73);assert.equal(stats().withSvgAnimation,1257);assert.equal(stats().withGifOrVideo,0);assert.equal(stats().withoutAnimation,812);
  for(const e of body.data){assert.equal(e.language,'es');assert.ok(e.instructions.length>=2);}
});
test('filtros combinados solo consideran músculos principales',async()=>{
  const {body}=await request('/api/v1/exercises?muscle=chest&equipment=dumbbell&difficulty=beginner&limit=100');
  assert.ok(body.data.length);
  for(const e of body.data){assert.ok(e.primaryMuscles.includes('chest'));assert.equal(e.equipment,'dumbbell');assert.equal(e.difficulty,'beginner');}
});
test('paginación estable, sin duplicados y fuera de rango',async()=>{
  const a=(await request('/api/v1/exercises?sort=id&limit=7')).body;
  const b=(await request('/api/v1/exercises?sort=id&limit=7&offset=7')).body;
  assert.equal(a.pagination.nextOffset,7);assert.equal(new Set([...a.data,...b.data].map(e=>e.id)).size,14);
  const end=(await request('/api/v1/exercises?offset=99999')).body;
  assert.deepEqual(end.data,[]);assert.equal(end.pagination.nextOffset,null);assert.equal(end.pagination.count,0);
});
test('valida límites, enums, duplicados y nombres desconocidos',async()=>{
  for(const query of ['limit=0','limit=101','limit=1.5','limit=1e2','limit=','offset=-1','lang=fr','muscle=invalid','equipment=invalid','difficulty=advanced','popular=maybe','hasAnimation=1','limti=20','limit=2&limit=3','q='+'x'.repeat(201)]){
    const {r,body}=await request('/api/v1/exercises?'+query);assert.equal(r.status,400,query);assert.equal(body.error.code,'INVALID_QUERY');
  }
});
test('detalle localizado, idioma original explícito y ausencia de instrucciones',async()=>{
  const es=(await request('/api/v1/exercises/Barbell_Squat')).body.data;
  assert.equal(es.name,'Sentadilla con barra');assert.equal(es.language,'es');
  const en=(await request('/api/v1/exercises/Barbell_Squat?lang=en')).body.data;
  assert.equal(en.language,'en');assert.equal(en.name,en.nameEn);
  const fallback=(await request('/api/v1/exercises/Axle_Deadlift')).body.data;
  assert.equal(fallback.requestedLanguage,'es');assert.equal(fallback.language,'en');
  assert.equal(getExercise('Iron_Cross').instructionsAvailable,false);
  const missing=await request('/api/v1/exercises/nope');assert.equal(missing.r.status,404);
});
test('sirve ilustraciones SVG y distingue medios estaticos',async()=>{
  const {body}=await request('/api/v1/exercises/3_4_Sit-Up/media');
  assert.equal(body.data.animation.type,'svg-sequence');assert.equal(body.data.animation.frames.length,3);
  assert.equal(body.data.animation.sequence.join(','),'0,1,2,1');assert.equal(body.data.exerciseId,'3_4_Sit-Up');
  const svg=await fetch(base+body.data.animation.frames[0]);assert.equal(svg.status,200);assert.match(svg.headers.get('content-type'),/image\/svg\+xml/);assert.match(await svg.text(),/<svg/i);
  const still=(await request('/api/v1/exercises/flow-1383/media')).body.data;
  assert.equal(still.animation?.type || null,null);assert.equal(still.exerciseId,'flow-1383');
  const animated=(await request('/api/v1/exercises?hasAnimation=true&limit=100')).body;
  assert.equal(animated.pagination.total,stats().withAnimation);assert.ok(animated.data.some(e=>e.media.animation.type==='svg-sequence'));
  for(const e of animated.data){assert.equal(e.media.animation.type,'svg-sequence');assert.ok(e.media.animation.attribution);assert.ok(e.media.animation.sourceUrl);}
  for(const e of rawExercises){assert.deepEqual(getExercise(e.id).media.images,[]);}
});
test('batch resuelve IDs en orden y conserva faltantes para el tracker',async()=>{
  const {body}=await request('/api/v1/exercises/batch?ids=Pushups,nope,Barbell_Squat,Pushups');
  assert.deepEqual(body.data.map(e=>e.id),['Pushups','Barbell_Squat']);assert.deepEqual(body.missingIds,['nope']);
  assert.equal((await request('/api/v1/exercises/batch')).r.status,400);
  assert.equal((await request('/api/v1/exercises/batch?ids='+Array(51).fill('Pushups').join(','))).r.status,400);
});
test('ETag: 304 y HEAD no devuelven cuerpo; idiomas tienen representaciones diferentes',async()=>{
  const first=await fetch(base+'/api/v1/exercises/Barbell_Squat');const etag=first.headers.get('etag');assert.ok(etag);await first.text();
  const cached=await fetch(base+'/api/v1/exercises/Barbell_Squat',{headers:{'If-None-Match':etag}});assert.equal(cached.status,304);assert.equal(await cached.text(),'');
  const english=await fetch(base+'/api/v1/exercises/Barbell_Squat?lang=en');assert.notEqual(english.headers.get('etag'),etag);await english.text();
  const head=await fetch(base+'/api/v1/exercises/Barbell_Squat',{method:'HEAD'});assert.equal(head.headers.get('etag'),etag);assert.equal(await head.text(),'');
});
test('CORS permite consulta y lectura de versión; métodos de escritura se rechazan',async()=>{
  const options=await fetch(base+'/api/v1/exercises',{method:'OPTIONS',headers:{Origin:'https://tracker.example'}});
  assert.equal(options.status,204);assert.equal(options.headers.get('access-control-allow-origin'),'*');
  const post=await fetch(base+'/api/v1/exercises',{method:'POST'});assert.equal(post.status,405);await post.text();
});
test('clave opcional se valida antes de caché; preflight respeta orígenes',async()=>{
  const secure=createApp({apiKey:'test-key',corsOrigins:'https://tracker.example'});
  await new Promise(resolve=>secure.listen(0,'127.0.0.1',resolve));const url=`http://127.0.0.1:${secure.address().port}`;
  try{
    for(const headers of [{},{'X-API-Key':'wrong'}]){const r=await fetch(url+'/api/v1/stats',{headers});assert.equal(r.status,401);assert.equal(r.headers.get('cache-control'),'no-store');await r.text();}
    const r=await fetch(url+'/api/v1/stats',{headers:{'X-API-Key':'test-key'}});assert.equal(r.status,200);assert.match(r.headers.get('cache-control'),/^private/);await r.text();
    const denied=await fetch(url+'/api/v1/stats',{method:'OPTIONS',headers:{Origin:'https://unknown.example'}});assert.equal(denied.status,403);await denied.text();
    const allowed=await fetch(url+'/api/v1/stats',{method:'OPTIONS',headers:{Origin:'https://tracker.example'}});assert.equal(allowed.status,204);
  }finally{await new Promise(resolve=>secure.close(resolve));}
});
test('taxonomía y documentación coinciden con el catálogo',async()=>{
  const {body}=await request('/api/v1/taxonomy');
  assert.equal(body.data.muscles.find(e=>e.id==='biceps').name,'Bíceps');
  assert.equal(body.data.equipment.reduce((n,e)=>n+e.count,0),2069);
  const spec=(await request('/openapi.json')).body;assert.equal(spec.openapi,'3.1.0');
  for(const path of ['/','/docs','/demo.js','/docs.js','/style.css']){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.ok(r.headers.get('content-security-policy'));await r.text();}
});
test('SDK usa el contrato real, codifica filtros y propaga errores',async()=>{
  const api=createApiGymClient({baseUrl:base});
  const r=await api.list({q:'bíceps',equipment:'dumbbell',limit:3});assert.equal(r.data.length,3);
  const detail=await api.get('3_4_Sit-Up');assert.ok(detail.data.media.animation.type==='svg-sequence');assert.equal(new URL(detail.data.media.animation.frames[0]).host,new URL(base).host);
  const batch=await api.batch(['Pushups','nope']);assert.deepEqual(batch.missingIds,['nope']);
  await assert.rejects(()=>api.get('nope'),e=>e instanceof ApiGymError && e.status===404);
});

test('C0-I: estadísticas compatibles y búsqueda exacta por ID funcionan mediante HTTP y SDK',async()=>{
 const api=createApiGymClient({baseUrl:base});const s=(await api.stats()).data;
 assert.equal(s.spanish,73);assert.equal(s.translationCoverage.spanishNames,75);assert.equal(s.translationCoverage.reviewedTranslations,0);
 for(const id of ['flow-0372','flow-0599','Barbell_Squat']){const result=await api.list({q:id});assert.equal(result.pagination.total,1);assert.equal(result.data[0].id,id);}
 assert.equal((await api.list({q:'flow-0372',equipment:'barbell'})).pagination.total,0);
 const spec=(await request('/openapi.json')).body;assert.ok(spec.components.schemas.Stats.properties.translationCoverage);assert.ok(spec.components.schemas.TranslationCoverage.properties.spanishNames);
});
