import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getExercise, rawExercises, matchExercise, queryExercises, coverageReview, stats, catalogVersion } from '../src/catalog.js';
import { createApp } from '../src/app.js';
import { createApiGymClient } from '../client/index.js';

const resolve = name => matchExercise(new URLSearchParams({name}));

test('los movimientos encontrados se resuelven a su ID sin sustituir la postura ni el accesorio', () => {
  for (const [name,id] of [['patada de glúteo en polea','flow-0228'],['glute kickback en polea','flow-0228'],['remo sentado con triángulo','flow-0213'],['remo sentado en polea con agarre en V','flow-0213'],['pullover con cuerda','flow-0237'],['press de pecho sentado en máquina','flow-0576']]) {
    const result = resolve(name);
    assert.equal(result.best?.id,id,name);
    assert.ok(result.best.confidence >= 0.84);
    const page = queryExercises(new URLSearchParams({q:name,sort:'relevance',match:'any',limit:'100'}));
    assert.ok(page.data.some(e=>e.id===id),name);
    assert.ok(!('unavailable' in result));
  }
  assert.equal(getExercise('flow-0213').familyId,'remo-sentado-en-polea');
  assert.equal(getExercise('flow-0228').familyId,'patada-de-gluteo-en-polea');
  assert.equal(getExercise('flow-0237').familyId,'pullover-en-polea');
});

test('el press de la ficha 1301 no conserva un alias falso de aperturas', () => {
  for (const id of ['flow-1301','flow-0576','flow-0577']) {
    assert.match(getExercise(id).name,/^Press de pecho sentado en máquina(?: \(ilustración [23]\))?$/);
    assert.equal(getExercise(id).familyId,'press-de-pecho-en-maquina');
  }
  const exercise = getExercise('flow-1301');
  assert.equal(exercise.nameEn,'machine inner chest press');
  assert.ok(exercise.aliases.every(alias=>!alias.includes('aperturas')));
  const page = queryExercises(new URLSearchParams('q=aperturas&limit=100'));
  assert.ok(page.data.every(e=>e.id!=='flow-1301'));
  assert.equal(getExercise('flow-0596').name,'Aperturas sentado en máquina de palanca');
});

test('la orientación española se corrige con trazabilidad, sin alterar el original inglés', () => {
  const e = getExercise('flow-0228');
  assert.ok(e.instructions.some(step=>step.includes('frente a la máquina')));
  assert.ok(!e.instructions.some(step=>step.includes('espaldas')));
  assert.ok(e.instructionsEn.some(step=>step.includes('facing away')));
  assert.equal(e.localizationReview.status,'adapted');
  assert.ok(e.localizationReview.sourceRefs.includes('puregym-cable-kickbacks'));
  assert.ok(e.localizationReview.reasons.some(reason=>reason.code==='original-orientation-corrected'));
});

test('se elimina la advertencia errónea del pullover pero se mantiene el curl sentado pendiente', () => {
  const rope = getExercise('flow-0237');
  assert.equal(rope.localizationReview.titleReview.status,'verified');
  assert.ok(rope.instructionsEn.some(step=>step.includes('keeping your arms straight')));
  assert.equal(rope.localizationReview.status,'pending-review');
  const curl = resolve('curl femoral sentado');
  assert.equal(curl.best,null);
  assert.equal(curl.alternatives[0].id,'flow-0599');
  assert.equal(getExercise('flow-2286').familyId,null);
});

test('los cuatro faltantes de medios se identifican sin crear fichas o adivinar sustitutos', () => {
  const pending = coverageReview.requests.filter(r=>r.status==='awaiting-verified-animation');
  assert.equal(pending.length,4);
  for (const request of pending) {
    assert.deepEqual(request.exerciseIds,[]);
    for (const name of [request.name,request.nameEn,...request.aliases]) {
      const result = resolve(name);
      assert.equal(result.best,null,name);
      assert.deepEqual(result.alternatives,[]);
      assert.equal(result.resolutionMethod,'none');
      assert.equal(result.unavailable[0].requestId,request.requestId);
      assert.equal(result.unavailable[0].status,'awaiting-verified-animation');
      const list = queryExercises(new URLSearchParams({q:name,sort:'relevance',match:'any'}));
      assert.equal(list.unavailable[0].requestId,request.requestId);
    }
    for (const id of request.historicalIds) assert.equal(getExercise(id),null);
  }
  assert.ok(!('unavailable' in resolve('sentadilla')));
  assert.ok(!('unavailable' in queryExercises(new URLSearchParams())));
  assert.equal(rawExercises.length,1257);
  assert.equal(stats().withoutAnimation,0);
});

test('la cobertura de cada petición tiene evidencia y conserva los medios actuales', () => {
  const titleReview = JSON.parse(readFileSync(new URL('../data/localization/es-MX.title-review.json',import.meta.url)));
  const proof = new Map(titleReview.records.map(row=>[row.id,row]));
  for (const request of coverageReview.requests) {
    assert.ok(request.sources.every(url=>url.startsWith('https://')));
    for (const id of request.exerciseIds) {
      const e = getExercise(id);
      assert.equal(e.localizationReview.titleReview.status,'verified');
      assert.equal(e.media.animation.frames.length,3);
      assert.equal(proof.get(id).evidence.frames.length,3);
    }
  }
});

test('HTTP/SDK indican pendientes, actualizan ETag y el visor presenta avisos claros', async () => {
  const server = createApp({apiKey:''});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const root = `http://127.0.0.1:${server.address().port}`;
  try {
    const client = createApiGymClient({baseUrl:root});
    const pending = await client.match('Face pull');
    assert.equal(pending.best,null); assert.equal(pending.unavailable[0].requestId,'face-pull');
    const list = await client.list({q:'face pull',sort:'relevance',match:'any'});
    assert.equal(list.unavailable[0].requestId,'face-pull');
    const path = '/api/v1/exercises/match?name=face%20pull';
    const first = await fetch(root+path); const tag=first.headers.get('etag');
    assert.equal(first.headers.get('x-catalog-version'),catalogVersion); await first.text();
    const cached=await fetch(root+path,{headers:{'If-None-Match':tag}}); assert.equal(cached.status,304);
    const head=await fetch(root+path,{method:'HEAD'}); assert.equal(head.headers.get('etag'),tag); assert.equal(await head.text(),'');
    const script=await(await fetch(root+'/demo.js')).text(); assert.ok(script.includes('pendiente de animación verificada'));
    const spec=await(await fetch(root+'/openapi.json')).json(); assert.ok(spec.components.schemas.ExercisePage.properties.unavailable);
  } finally {
    server.closeAllConnections(); await new Promise(resolve=>server.close(resolve));
  }
});
