import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateDataset, validateMedia } from '../src/validation.js';
import { rawExercises, catalogPruning, getExercise, mediaFor } from '../src/catalog.js';
import { importMedia } from '../scripts/import-media.js';
import { mkdtemp, mkdir, writeFile, readFile, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

test('retira los 812 sin medios y conserva cada ID, nombre y animacion original', () => {
  assert.equal(catalogPruning.removedIds.length, 812);
  assert.equal(new Set(catalogPruning.removedIds).size, 812);
  assert.equal(rawExercises.length, 1257);
  assert.equal(new Set(rawExercises.map(e => e.id)).size, 1257);
  for (const id of catalogPruning.removedIds) assert.equal(getExercise(id), null, id);
  const identities = rawExercises.map(e => ({ id:e.id, name:e.name, flowId:e.flowRecord?.id ?? null })).sort((a,b) => a.id.localeCompare(b.id, 'en'));
  assert.deepEqual(identities, catalogPruning.retainedExercises);
  for (const e of rawExercises) {
    assert.ok(mediaFor(e).animation, e.id);
    assert.ok(mediaFor(e).thumbnailUrl, e.id);
  }
});
test('IDs duplicados no pueden invalidar referencias del tracker',()=>{
  assert.throws(()=>validateDataset([rawExercises[0],rawExercises[0]]),/duplicado/);
});
test('medios requieren ejercicio conocido, HTTPS y licencia',()=>{
  const valid={exerciseId:'Pushups',type:'gif',url:'https://example.com/pushup.gif',sourceUrl:'https://example.com/source',license:'CC0-1.0',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',attribution:'Autor de ejemplo'};
  const ids=new Set(['Pushups']);assert.doesNotThrow(()=>validateMedia([valid],ids));
  for(const change of [{exerciseId:'nope'},{url:'javascript:alert(1)'},{sourceUrl:'http://example.com'},{license:''},{attribution:''},{type:'image'}])assert.throws(()=>validateMedia([{...valid,...change}],ids));
  assert.throws(()=>validateMedia([valid,valid],ids),/duplicado/);
});
test('importación combina sin perder medios y un lote inválido no modifica el archivo',async()=>{
  const root=await mkdtemp(join(tmpdir(),'apigym-media-test-'));
  const rootUrl=pathToFileURL(root+'/');
  const dataPath=join(root,'data');const upstream=join(dataPath,'upstream');
  const dataset=join(upstream,'free-exercise-db.json');const target=join(dataPath,'media.json');const input=join(root,'input.json');
  await mkdir(upstream,{recursive:true});
  const media={exerciseId:rawExercises[0].id,type:'gif',url:'https://example.com/first.gif',sourceUrl:'https://example.com/source',license:'CC0-1.0',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',attribution:'Test'};
  try{
    await writeFile(dataset,JSON.stringify([rawExercises[0]]));await writeFile(target,JSON.stringify([media]));
    await writeFile(input,JSON.stringify([{...media,url:'https://example.com/second.gif'}]));
    assert.equal(await importMedia(input,rootUrl),2);
    const previous=await readFile(target,'utf8');
    await writeFile(input,JSON.stringify([{...media,exerciseId:'missing'}]));
    await assert.rejects(()=>importMedia(input,rootUrl),/sin ejercicio/);
    assert.equal(await readFile(target,'utf8'),previous);
  }finally{
    for(const file of [dataset,target,input])await unlink(file).catch(()=>{});
    await rmdir(upstream);await rmdir(dataPath);await rmdir(root);
  }
});
