import { readFile, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { validateDataset, validateTranslations, validateMedia } from '../src/validation.js';
const target=new URL('../data/upstream/free-exercise-db.json',import.meta.url);
const sourceUrl='https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
try {
  const r=await fetch(sourceUrl,{signal:AbortSignal.timeout(20000)});
  if(!r.ok)throw new Error(`Fuente respondió HTTP ${r.status}`);
  const bytes=Buffer.from(await r.arrayBuffer());const data=JSON.parse(bytes.toString('utf8'));const ids=validateDataset(data);
  const previous=JSON.parse(await readFile(target,'utf8'));
  const removed=previous.filter(e=>!ids.has(e.id));
  if(removed.length)throw new Error(`Se eliminarían IDs utilizados por rutinas: ${removed.map(e=>e.id).join(', ')}. Requiere migración explícita; no se modificó el catálogo.`);
  validateTranslations(JSON.parse(await readFile(new URL('../data/translations.es.json',import.meta.url),'utf8')),ids);
  validateMedia(JSON.parse(await readFile(new URL('../data/media.json',import.meta.url),'utf8')),ids);
  const manifest={sourceUrl,repository:'https://github.com/yuhonas/free-exercise-db',retrievedAt:new Date().toISOString(),count:data.length,sha256:createHash('sha256').update(bytes).digest('hex'),license:'Unlicense',retrieval:'Direct HTTPS download'};
  const temporary=new URL('../data/upstream/free-exercise-db.json.tmp',import.meta.url);
  await writeFile(temporary,bytes);await rename(temporary,target);
  const manifestTarget=new URL('../data/upstream/manifest.json',import.meta.url);
  const manifestTemp=new URL('../data/upstream/manifest.json.tmp',import.meta.url);
  await writeFile(manifestTemp,JSON.stringify(manifest,null,2)+'\n');await rename(manifestTemp,manifestTarget);
  console.log(`Catálogo actualizado: ${data.length} ejercicios. Revisa el diff, ejecuta npm run check y npm test, y reinicia la API.`);
}catch(e){console.error(`No se actualizó el catálogo: ${e.message}`);process.exitCode=1;}
