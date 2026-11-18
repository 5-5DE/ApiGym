import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {rawExercises,getExercise,queryExercises,catalogQuality} from '../src/catalog.js';
import {batches} from '../scripts/title-review-decisions.js';

const root=new URL('../',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,root),'utf8'));
const hash=value=>createHash('sha256').update(value).digest('hex');
const review=read('data/localization/es-MX.title-review.json');

test('todos los títulos tienen una decisión individual y evidencia original vigente',()=>{
  const decisions=batches.flatMap(b=>[...b.confirmed,...Object.keys(b.edits),...Object.keys(b.pending)]);
  assert.equal(decisions.length,rawExercises.length);
  assert.equal(new Set(decisions).size,rawExercises.length);
  assert.equal(review.records.length,rawExercises.length);
  assert.equal(review.summary.notReviewed,0);
  const byId=new Map(review.records.map(row=>[row.id,row]));
  for(const e of rawExercises){
    const row=byId.get(e.id),es=getExercise(e.id);
    assert.ok(decisions.includes(e.id),e.id);
    assert.ok(['verified','pending-review'].includes(row.status),e.id);
    const original={name:e.name,instructions:e.instructions,equipment:e.equipment,flowInstructions:e.flowRecord?.instructions||null};
    assert.equal(row.evidence.originalSha256,hash(JSON.stringify(original)),e.id);
    assert.equal(row.evidence.frames.length,3,e.id);
    assert.deepEqual(row.evidence.frames.map(f=>f.path),e.flowRecord.animation.frames,e.id);
    for(const f of row.evidence.frames)assert.equal(f.sha256,hash(readFileSync(new URL('data/flow-exercise-dataset/'+f.path,root))),e.id);
    assert.equal(es.name,catalogQuality.entries[e.id]?.displayName || row.name,e.id);
    assert.equal(es.localizationReview.titleReview.status,row.status,e.id);
    assert.equal(es.localizationReview.titleReview.visualReview,'inspected-three-frames',e.id);
    if(row.status==='pending-review'){
      assert.ok(row.reason?.length>20,e.id);
      assert.equal(row.name,row.before,e.id);
    }
    if(row.name!==row.before)assert.equal(row.status,'verified',e.id);
    for(const alias of row.aliases)assert.ok(es.aliases.includes(alias),e.id);
    assert.doesNotMatch(row.name,/\b(male|female)\b/i,e.id);
  }
});

test('ejemplos y búsquedas usan el movimiento confirmado, sin inventar el kayak',()=>{
  assert.equal(getExercise('flow-0179').name,'Aperturas en polea baja');
  assert.equal(getExercise('flow-0193').name,'Remo unilateral de rodillas en polea con el tronco erguido');
  assert.ok(queryExercises(new URLSearchParams('q=cruces de polea baja')).data.some(e=>e.id==='flow-0179'));
  assert.ok(queryExercises(new URLSearchParams('q=remo a un brazo de rodillas en polea')).data.some(e=>e.id==='flow-0193'));
  assert.match(getExercise('flow-0193','en').name,/high row/);
  const kayak=getExercise('flow-2464');
  assert.equal(kayak.localizationReview.titleReview.status,'pending-review');
  assert.match(kayak.localizationReview.titleReview.reason,/kayak/i);
  assert.match(getExercise('flow-1761').name,/rodillas/);
  assert.match(getExercise('flow-0475').name,/piernas extendidas/);
  assert.match(getExercise('flow-1775').name,/pierna superior/);
  assert.equal(getExercise('flow-0436').localizationReview.titleReview.status,'pending-review');
});

test('se conservan todos los alias anteriores y se evitan restos literales en títulos confirmados',()=>{
  const baseline=read('data/localization/es-MX.title-baseline.json');
  for(const row of review.records){
    const es=getExercise(row.id);
    for(const alias of baseline[row.id].aliases||[])assert.ok(es.aliases.includes(alias),`${row.id}: ${alias}`);
    if(row.status==='verified')assert.doesNotMatch(row.name,/\b(fila|mosca|prensa francesa|vuelo bajo|minas terrestres|despellejar|agricultores)\b/i,row.id);
  }
});
