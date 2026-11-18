import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalizeTu, formalAddressFindings } from '../scripts/spanish-tu.js';
import { validateQuality } from '../src/quality.js';
import { rawExercises, getExercise, queryExercises, matchExercise, taxonomy, catalogQuality, stats } from '../src/catalog.js';
import { createApp } from '../src/app.js';
import { createApiGymClient } from '../client/index.js';

const read = path=>JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const baseline=read('data/localization/es-MX.phase5-baseline.json');
const translations=read('data/translations.es.json');

test('tuteo contextual conserva sustantivos, subjuntivos de terceros y negativas',()=>{
  const cases=[
    ['Contraiga el abdomen. Haga una pausa.','Contrae el abdomen. Haz una pausa.'],
    ['Mantenga sus manos frente a usted.','Mantén tus manos frente a ti.'],
    ['No bloquee las rodillas.','No bloquees las rodillas.'],
    ['No se balancee al subir.','No te balancees al subir.'],
    ['Sujeta la barra con un agarre supino.','Sujeta la barra con un agarre supino.'],
    ['Usa muñequeras para un mejor agarre.','Usa muñequeras para un mejor agarre.'],
    ['Deja que la barra baje por las manos.','Deja que la barra baje por las manos.'],
    ['Permite que suba con control.','Permite que suba con control.'],
    ['Pídale a su compañero que tire suavemente.','Pídele a tu compañero que tire suavemente.'],
    ['Mantén el empuje y realiza un pase de pecho.','Mantén el empuje y realiza un pase de pecho.'],
  ];
  for(const [input,expected]of cases){assert.equal(normalizeTu(input),expected);assert.equal(normalizeTu(expected),expected);}
});

test('instrucciones activas usan tú sin cambiar cantidades ni aprobar borradores',()=>{
  for(const e of rawExercises){
    const current=getExercise(e.id);
    for(const text of current.instructions){assert.deepEqual(formalAddressFindings(text),[],e.id);assert.equal(normalizeTu(text),text,e.id);}
    assert.deepEqual(current.instructions.join(' ').match(/\d+(?:[.,]\d+)?/g),baseline[e.id].instructions.join(' ').match(/\d+(?:[.,]\d+)?/g),e.id);
    assert.equal(current.localizationReview.languageReview.address,'tu');
    assert.equal(current.localizationReview.languageReview.techniqueApprovalUnchanged,true);
    assert.deepEqual(current.instructionsEn,e.instructions.filter(s=>s.trim()));
  }
  assert.equal(stats().spanishAdapted,13); assert.equal(stats().spanishPendingReview,1244);
  assert.ok(getExercise('flow-2312').instructions.some(s=>s.includes('Haz una pausa')));
});

test('nombres señalados son legibles pero conservan sus conflictos y abstención',()=>{
  for(const id of ['flow-1640','flow-2464','flow-0526','flow-0747','flow-1282','flow-0764','flow-0758']){
    const e=getExercise(id);
    assert.equal(e.localizationReview.titleReview.status,'pending-review');
    assert.equal(e.localizationReview.nameReview.method,'language-only-pending-identity');
    assert.ok(e.name.includes('por confirmar'));
    assert.equal(matchExercise(new URLSearchParams({name:e.name})).best,null,id);
  }
  assert.match(getExercise('flow-1640').name,/^Curl predicador/);
  assert.match(getExercise('flow-2464').name,/^Remo a un brazo/);
  assert.match(getExercise('flow-0526').name,/^Cargada/);
  assert.match(getExercise('flow-0747').name,/^Press tras nuca/);
});

test('nombres españoles únicos distinguen ilustraciones sin fusionar ni perder alias comunes',()=>{
  const names=rawExercises.map(e=>getExercise(e.id).name);
  assert.equal(new Set(names).size,names.length);
  assert.equal(names.length,1257);
  assert.match(getExercise('flow-1461').name,/vista posterior/);
  assert.match(getExercise('flow-1462').name,/vista lateral/);
  assert.notEqual(getExercise('flow-0763').name,getExercise('flow-1394').name);
  for(const [id,row]of Object.entries(catalogQuality.entries))if(row.nameCorrection==='illustration-disambiguation')assert.ok(getExercise(id).aliases.includes(row.previousName),id);
  assert.equal(matchExercise(new URLSearchParams('name=sentadilla%20profunda%20con%20barra')).best,null);
});

test('codificación inglesa reparada conserva literalmente el original aparte',()=>{
  for(const id of ['flow-0738','flow-0739','flow-0740','flow-1464']){
    const e=getExercise(id), en=getExercise(id,'en'),raw=rawExercises.find(e=>e.id===id);
    assert.ok(e.nameEn.includes('45°'));assert.ok(!e.nameEn.includes('в'));
    assert.equal(e.nameEnOriginal,raw.name);assert.equal(en.name,e.nameEn);
    assert.deepEqual(en.instructions,raw.instructions.filter(s=>s.trim()));
  }
});

test('equipo canónico, alias kettlebells y taxonomy son coherentes',()=>{
  assert.ok(rawExercises.every(e=>getExercise(e.id).equipment!=='unknown'));
  const equipment=taxonomy().equipment;
  assert.equal(equipment.filter(e=>e.id==='kettlebell').length,1);
  assert.ok(!equipment.some(e=>e.id==='kettlebells'));
  const ids=q=>queryExercises(new URLSearchParams({equipment:q,limit:'100',sort:'id'})).data.map(e=>e.id);
  assert.deepEqual(ids('kettlebell'),ids('kettlebells'));
  assert.equal(ids('kettlebell').length,41);
  assert.equal(equipment.reduce((n,e)=>n+e.count,0),1257);
  assert.equal(getExercise('Inverted_Row').equipment,'body only');
});

test('metadatos completados conservan su procedencia y prioridades',()=>{
  const upstream=read('data/upstream/free-exercise-db.json');
  for(const e of rawExercises){
    const current=getExercise(e.id),patches=catalogQuality.entries[e.id]?.metadata||{};
    for(const[field,patch]of Object.entries(patches)){
      assert.equal(current[field],patch.value);assert.equal(current.metadataReview[field].reference,patch.reference);
      if(patch.basis==='equivalent-source-record'){
        const ref=upstream.find(row=>row.id===patch.reference);assert.ok(ref);
        assert.equal(current[field],field==='difficulty'?ref.level:ref[field]);
      }
    }
    if((!e.level||e.level==='unknown')&&!patches.difficulty)assert.equal(current.difficulty,'unknown');
  }
  assert.equal(getExercise('flow-0576').difficulty,'beginner');
  assert.equal(getExercise('flow-0576').metadataReview.difficulty.reference,'ace-seated-chest-press');
  assert.equal(getExercise('flow-1301').force,'push');
  assert.equal(getExercise('flow-1301').metadataReview.force.original,'pull');
  assert.equal(rawExercises.filter(e=>getExercise(e.id).difficulty==='unknown').length,0);
});

test('150 básicos explícitos conservan la selección previa sin promover el título pendiente',()=>{
  const selected=rawExercises.filter(e=>getExercise(e.id).popular).map(e=>e.id);
  assert.equal(selected.length,150);assert.deepEqual([...selected].sort(),[...catalogQuality.popularIds].sort());
  for(const e of rawExercises)if(translations[e.id].popular)assert.ok(selected.includes(e.id));
  assert.equal(getExercise('Russian_Twist').localizationReview.titleReview.status,'pending-review');
  assert.equal(queryExercises(new URLSearchParams('popular=true')).pagination.total,150);
  assert.equal(queryExercises(new URLSearchParams('popular=false')).pagination.total,1107);
});

test('datos editoriales rechazan referencias vencidas y valores de metadatos inválidos',()=>{
  const mutations=[q=>q.popularIds.push(q.popularIds[0]),q=>q.entries['flow-0576'].evidence.originalSha256='bad',q=>q.entries['flow-0576'].metadata.difficulty.value='easy'];
  for(const mutate of mutations){const copy=structuredClone(catalogQuality);mutate(copy);assert.throws(()=>validateQuality(copy,rawExercises,translations));}
});

test('HTTP y SDK sirven básicos, metadatos y nombres corregidos con filtros y caché',async()=>{
  const server=createApp({apiKey:''});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const root=`http://127.0.0.1:${server.address().port}`,client=createApiGymClient({baseUrl:root});
  try{
    assert.equal((await client.list({popular:true})).pagination.total,150);
    const en=(await client.get('flow-0738','en')).data;assert.ok(en.name.includes('45°'));assert.ok(en.nameEnOriginal.includes('в'));
    const page=await client.list({equipment:'kettlebells',limit:100});assert.ok(page.data.every(e=>e.equipment==='kettlebell'));
    const response=await fetch(root+'/api/v1/exercises?popular=true');const etag=response.headers.get('etag');await response.text();
    const cached=await fetch(root+'/api/v1/exercises?popular=true',{headers:{'If-None-Match':etag}});assert.equal(cached.status,304);
    const html=await(await fetch(root+'/')).text();assert.ok(html.includes('id="basics"'));
    const script=await(await fetch(root+'/demo.js')).text();assert.ok(script.includes("params.set('popular', 'true')"));
    assert.ok(script.includes('Clasificación orientativa por familia'));assert.ok(script.includes("mixed:'Mixta'"));
    const estimated=(await client.get('flow-0464')).data;
    assert.equal(estimated.force,'mixed');assert.ok(estimated.metadataReview.mechanic.sources.length);
    const spec=await(await fetch(root+'/openapi.json')).json();assert.ok(spec.components.schemas.Exercise.properties.metadataReview);
  }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
