import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rawExercises,getExercise,catalogQuality} from '../src/catalog.js';
import {classifyResearchExercise} from '../scripts/metadata-research-rules.js';
import {validateQuality} from '../src/quality.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const research=read('data/metadata-research.es-MX.json');
const baseline=read('data/localization/metadata-research-baseline.json');
const translations=read('data/translations.es.json');
const titles=new Map(read('data/localization/es-MX.title-review.json').records.map(r=>[r.id,r]));

test('todos los ejercicios tienen especificaciones y las inferencias solo completan vacíos',()=>{
  assert.equal(research.records.length,1257);
  assert.equal(new Set(research.records.map(r=>r.id)).size,1257);
  let applied=0;
  for(const raw of rawExercises){
    const e=getExercise(raw.id),r=research.records.find(r=>r.id===e.id);
    assert.ok(r);assert.equal(r.sourceName,raw.name);
    assert.deepEqual(r.evidence,titles.get(e.id).evidence);
    for(const field of ['difficulty','mechanic','force']){
      assert.ok(e[field]&&e[field]!=='unknown',e.id+'.'+field);
      const p=e.metadataReview?.[field];
      if(p?.basis==='research-family-estimate'){
        applied++;assert.ok(!baseline[e.id][field]||baseline[e.id][field]==='unknown');
        assert.equal(e[field],r.proposed[field]);assert.equal(p.family,r.family);
        assert.ok(p.criteria.length);assert.ok(p.sources.every(url=>Object.values(research.sources).some(s=>s.url===url)));
        assert.equal(p.status,translations[e.id].titleReview.status==='pending-review'?'provisional-identity':'editorial-estimate');
      }else assert.equal(e[field],baseline[e.id][field],e.id+'.'+field);
    }
  }
  assert.equal(applied,2706);
});

test('clasificación distingue palabras engañosas, tareas dinámicas e inmóviles',()=>{
  const c=name=>classifyResearchExercise({id:'test',name,nameEs:''});
  assert.equal(c('barbell clean-grip front squat').family,'squat');
  assert.equal(c('cable rear delt row').family,'row');
  assert.equal(c('dumbbell biceps curl to shoulder press').force,'mixed');
  assert.equal(c('front plank').mechanic,'isometric');
  assert.equal(c('front plank with twist').force,'mixed');
  assert.equal(c('dynamic chest stretch').force,'mixed');
  assert.equal(c('seated biceps curl').mechanic,'isolation');
  assert.equal(c('unrecognized movement'),null);
  assert.equal(getExercise('flow-1301').metadataReview.force.basis,'editorial-correction');
  assert.equal(getExercise('flow-0576').metadataReview.difficulty.basis,'external-exercise-reference');
});

test('una inferencia no puede ocultar su estado provisional ni citar una fuente inexistente',()=>{
  const row=Object.values(catalogQuality.entries).find(r=>Object.values(r.metadata||{}).some(p=>p.status==='provisional-identity'));
  const id=Object.keys(catalogQuality.entries).find(id=>catalogQuality.entries[id]===row);
  const field=Object.keys(row.metadata).find(f=>row.metadata[f].status==='provisional-identity');
  for(const mutate of [p=>p.status='editorial-estimate',p=>p.sources=['https://example.invalid']]){
    const copy=structuredClone(catalogQuality);mutate(copy.entries[id].metadata[field]);
    assert.throws(()=>validateQuality(copy,rawExercises,translations));
  }
});
