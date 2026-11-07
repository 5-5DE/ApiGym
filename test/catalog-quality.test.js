import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, copyFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { rawExercises, getExercise, queryExercises, stats } from '../src/catalog.js';
import { validateNames, validateTranslations } from '../src/validation.js';
const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url)));

test('todos los IDs históricos siguen resolviendo sin renombrar ni deduplicar', async () => {
  const historical = await read('./historical-ids.json');
  assert.deepEqual(rawExercises.map(e=>e.id).sort(),historical);
  for(const id of historical) assert.equal(getExercise(id).id,id);
});

test('el módulo real acepta traducción Flow y rechaza huérfana al cargar', async () => {
  const root=await mkdtemp(join(tmpdir(),'apigym-catalog-'));
  const files=['src/catalog-identity.js','src/catalog.js','src/validation.js','data/upstream/free-exercise-db.json','data/flow-exercise-dataset/data/exercises.json','data/flow-exercise-dataset/data/checksums.json','data/translations.es.json','data/names.es.json','data/editorial-featured.json','data/media.json'];
  try {
    for(const file of files){await mkdir(join(root,file,'..'),{recursive:true});await copyFile(new URL('../'+file,import.meta.url),join(root,file));}
    await writeFile(join(root,'package.json'),'{"type":"module"}');
    const translations=await read('../data/translations.es.json');
    translations['flow-0372']={name:'Nombre de prueba Flow',aliases:['alias de prueba'],instructions:['Paso de prueba uno','Paso de prueba dos']};
    await writeFile(join(root,'data/translations.es.json'),JSON.stringify(translations));
    const catalog=await import(pathToFileURL(join(root,'src/catalog.js')).href);
    assert.equal(catalog.getExercise('flow-0372').language,'es');
    assert.deepEqual(catalog.getExercise('flow-0372').instructions,translations['flow-0372'].instructions);
    assert.equal(catalog.stats().spanish,74);
    assert.equal(catalog.getExercise('flow-0372').popular,false,'traducir no debe destacar un ejercicio');
    assert.equal(catalog.stats().popular,stats().popular);
    translations['missing-id']=translations['flow-0372'];
    await writeFile(join(root,'data/translations.es.json'),JSON.stringify(translations));
    await assert.rejects(import(pathToFileURL(join(root,'src/catalog.js')).href+'?orphan'),/Traducción huérfana/);
  } finally {await rm(root,{recursive:true,force:true});}
});

test('nombres fundamentados no anuncian instrucciones españolas ni revisión profesional',()=>{
  const e=getExercise('flow-0599');
  assert.equal(e.name,'Curl femoral sentado en máquina');assert.equal(e.nameEn,'lever seated leg curl');
  assert.equal(e.nameLanguage,'es');assert.equal(e.nameStatus,'draft');assert.equal(e.language,'en');assert.equal(e.translationStatus,'upstream');
  assert.equal(getExercise(e.id,'en').name,e.nameEn);
  assert.equal(getExercise('flow-0372').equipment,'dumbbell');
});

test('búsqueda bilingüe normaliza acentos y guiones y conserva variantes distintas',()=>{
  for(const q of ['bíceps mancuerna predicador','biceps-mancuerna-predicador','dumbbell preacher curl']) assert.ok(queryExercises(new URLSearchParams({q})).data.some(e=>e.id==='flow-0372'),q);
  assert.ok(queryExercises(new URLSearchParams({q:'femoral sentado'})).data.some(e=>e.id==='flow-0599'));
  const squat= getExercise('Barbell_Squat'),smith=getExercise('Smith_Machine_Squat'),dumbbell=getExercise('Dumbbell_Squat');
  assert.equal(new Set([squat.id,smith.id,dumbbell.id]).size,3);
  const a=queryExercises(new URLSearchParams({popular:'true',limit:'100'}));
  const b=queryExercises(new URLSearchParams({editorialFeatured:'true',limit:'100'}));
  assert.deepEqual(a,b);
});

test('validadores rechazan nombre huérfano, origen incorrecto y traducción incompleta',()=>{
  const e=rawExercises.find(e=>e.id==='flow-0372');
  const n={name:'Nombre de prueba',aliases:[],status:'draft',sourceName:e.name,sourceEquipment:e.flowRecord.equipment};
  assert.doesNotThrow(()=>validateNames({[e.id]:n},rawExercises));
  assert.throws(()=>validateNames({missing:n},rawExercises),/huérfano/);
  assert.throws(()=>validateNames({[e.id]:{...n,sourceEquipment:'barbell'}},rawExercises),/Origen/);
  assert.throws(()=>validateTranslations({[e.id]:{name:'Prueba',instructions:[],aliases:[]}},new Set(rawExercises.map(e=>e.id))),/incompleta/);
});
