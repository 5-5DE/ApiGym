import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { rawExercises, getExercise, queryExercises, stats } from '../src/catalog.js';
import { readFileSync } from 'node:fs';

test('localización cubre cada ID activo y conserva originales, medios y selección popular',()=>{
  const report=JSON.parse(readFileSync(new URL('../reports/spanish-localization-review.json',import.meta.url)));
  assert.equal(report.records.length,rawExercises.length);
  assert.equal(new Set(report.records.map(row=>row.id)).size,rawExercises.length);
  for(const e of rawExercises){
    const es=getExercise(e.id),en=getExercise(e.id,'en');
    assert.equal(es.language,'es',e.id);
    assert.equal(en.language,'en',e.id);
    assert.deepEqual(es.instructionsEn,en.instructions,e.id);
    assert.deepEqual(es.media,en.media,e.id);
    assert.ok(['adapted','pending-review'].includes(es.localizationReview.status),e.id);
    if(es.localizationReview.status==='pending-review')assert.ok(es.localizationReview.reasons.length,e.id);
  }
  assert.equal(stats().spanish,1257);
  assert.equal(stats().popular,150);
  assert.equal(queryExercises(new URLSearchParams('popular=true')).pagination.total,150);
  assert.equal(queryExercises(new URLSearchParams('popular=false')).pagination.total,1107);
});

test('variantes conservan rodillas/piernas, incorporación/crunch y agarres; conflictos siguen pendientes',()=>{
  assert.match(getExercise('flow-0011').name,/rodillas/);
  assert.match(getExercise('Hanging_Leg_Raise').name,/piernas/);
  assert.notEqual(getExercise('flow-3204').name,getExercise('flow-0274').name);
  assert.match(getExercise('flow-0651').name,/neutro/);
  assert.match(getExercise('flow-0674').name,/supino/);
  const conflict=getExercise('flow-0313');
  assert.equal(conflict.localizationReview.status,'pending-review');
  assert.ok(conflict.localizationReview.reasons.some(reason=>reason.code==='grip-conflict'));
  assert.ok(getExercise('flow-0011').localizationReview.reasons.some(reason=>reason.code==='assistance-unspecified'));
  assert.equal(getExercise('flow-3204').illustrationMetadata.personDepicted,'male');
  assert.doesNotMatch(getExercise('flow-3204').name,/male/i);
  assert.ok(queryExercises(new URLSearchParams('q=lagartijas')).pagination.total>0);
});

test('HTTP sirve español persistido, original inglés, ETag por idioma y aviso de revisión en el visor',async()=>{
  const server=createApp({apiKey:''});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  try{
    const a=await fetch(base+'/api/v1/exercises/flow-0662?lang=es');
    const b=await fetch(base+'/api/v1/exercises/flow-0662?lang=en');
    const es=(await a.json()).data,en=(await b.json()).data;
    assert.equal(es.name,'Flexiones de brazos');assert.equal(en.name,'push-up');
    assert.notEqual(a.headers.get('etag'),b.headers.get('etag'));
    assert.deepEqual(es.instructionsEn,en.instructions);
    const pending=(await(await fetch(base+'/api/v1/exercises/flow-0313')).json()).data;
    assert.equal(pending.translationStatus,'pending-review');
    assert.ok(pending.instructions.every(step=>typeof step==='string'));
    const script=await(await fetch(base+'/demo.js')).text();
    assert.match(script,/Texto en español pendiente de revisión/);
    assert.match(script,/Título pendiente de revisión/);
    const title=(await(await fetch(base+'/api/v1/exercises/flow-0179')).json()).data;
    assert.equal(title.name,'Aperturas en polea baja');
    assert.equal(title.localizationReview.titleReview.status,'verified');
    const doubtful=(await(await fetch(base+'/api/v1/exercises/flow-2464')).json()).data;
    assert.equal(doubtful.localizationReview.titleReview.status,'pending-review');
    assert.match(script,/el\('ol'\)/);
  }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
