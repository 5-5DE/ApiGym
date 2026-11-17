import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rawExercises, getExercise, stats } from '../src/catalog.js';
const report = JSON.parse(readFileSync(new URL('../reports/spanish-localization-review.json',import.meta.url),'utf8'));
const rows = new Map(report.records.map(record=>[record.id,record]));
assert.equal(rows.size,rawExercises.length,'El informe debe cubrir cada ID activo exactamente una vez');
for(const e of rawExercises){
  const row=rows.get(e.id), es=getExercise(e.id), en=getExercise(e.id,'en');
  assert.ok(row,`Sin procesar: ${e.id}`);
  assert.equal(es.language,'es',e.id);
  assert.ok(es.name.trim() && es.instructions.length,e.id);
  assert.ok(es.instructions.every(step=>typeof step==='string'&&step.trim()),e.id);
  assert.ok(!/\b(?:male|female)\b/i.test(es.name),e.id);
  assert.ok(!/\b(?:the|your|slowly|repeat|starting position|keeping)\b/i.test(es.name+' '+es.instructions.join(' ')),`Inglés sin adaptar: ${e.id}`);
  assert.equal(es.localizationReview.status,row.status,e.id);
  if(row.status==='adapted')assert.ok(row.sourceRefs.length,`Adaptación sin fuentes: ${e.id}`);
  else assert.ok(row.reasons.length,`Pendiente sin motivo: ${e.id}`);
  assert.equal(createHash('sha256').update(JSON.stringify(row.original)).digest('hex'),row.originalSha256,e.id);
  assert.deepEqual(en.instructions,e.instructions.filter(step=>step.trim()),e.id);
  assert.deepEqual(es.instructionsEn,en.instructions,e.id);
  assert.equal(en.name,e.name,e.id);
  assert.deepEqual(es.media,en.media,e.id);
  assert.deepEqual(row.original.instructions,e.instructions,e.id);
}
assert.equal(report.counts.adapted,stats().spanishAdapted);
assert.equal(report.counts.pending,stats().spanishPendingReview);
assert.equal(report.counts.unprocessed,0);
console.log(JSON.stringify({...report.counts,sourceRecordsAndMediaPreserved:true},null,2));
