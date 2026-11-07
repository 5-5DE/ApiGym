import { readFile, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { validateDataset, validateTranslations, validateMedia, validateNames } from '../src/validation.js';
import { combineExercises } from '../src/catalog-identity.js';

// Pure preflight, also used by offline fixtures. No download or write on import.
export function validateRefreshCandidate({previous, candidate, flow, translations, names, media, featuredIds}) {
  const ids = validateDataset(candidate);
  const removed = previous.filter(e => !ids.has(e.id));
  if (removed.length) throw new Error(`Se eliminarían IDs utilizados por rutinas: ${removed.map(e=>e.id).join(', ')}. Requiere migración explícita; no se modificó el catálogo.`);
  const before = combineExercises(previous, flow);
  const combined = combineExercises(candidate, flow);
  const combinedIds = new Set(combined.map(e=>e.id));
  if (before.some(e=>!combinedIds.has(e.id))) throw new Error('Se eliminarían IDs del catálogo combinado');
  const assignments = new Map(combined.filter(e=>e.flowRecord).map(e=>[e.flowRecord.id,e.id]));
  for (const e of before.filter(e=>e.flowRecord)) {
    if (assignments.get(e.flowRecord.id)!==e.id) throw new Error(`Cambiaría la identidad histórica Flow: ${e.flowRecord.id}`);
  }
  validateTranslations(translations, combinedIds);
  validateNames(names, combined);
  validateMedia(media, combinedIds);
  if (!Array.isArray(featuredIds) || new Set(featuredIds).size!==featuredIds.length || featuredIds.some(id=>!combinedIds.has(id))) throw new Error('Selección editorial inválida');
  return combined;
}

async function refresh() {
  const target=new URL('../data/upstream/free-exercise-db.json',import.meta.url);
  const sourceUrl='https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
  const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
  try {
    const r=await fetch(sourceUrl,{signal:AbortSignal.timeout(20000)});
    if(!r.ok)throw new Error(`Fuente respondió HTTP ${r.status}`);
    const bytes=Buffer.from(await r.arrayBuffer());const candidate=JSON.parse(bytes.toString('utf8'));
    validateRefreshCandidate({candidate,previous:await read('../data/upstream/free-exercise-db.json'),flow:await read('../data/flow-exercise-dataset/data/exercises.json'),translations:await read('../data/translations.es.json'),names:await read('../data/names.es.json'),media:await read('../data/media.json'),featuredIds:await read('../data/editorial-featured.json')});
    const manifest={sourceUrl,repository:'https://github.com/yuhonas/free-exercise-db',retrievedAt:new Date().toISOString(),count:candidate.length,sha256:createHash('sha256').update(bytes).digest('hex'),license:'Unlicense',retrieval:'Direct HTTPS download'};
    const temporary=new URL('../data/upstream/free-exercise-db.json.tmp',import.meta.url);
    await writeFile(temporary,bytes);await rename(temporary,target);
    const manifestTarget=new URL('../data/upstream/manifest.json',import.meta.url);
    const manifestTemp=new URL('../data/upstream/manifest.json.tmp',import.meta.url);
    await writeFile(manifestTemp,JSON.stringify(manifest,null,2)+'\n');await rename(manifestTemp,manifestTarget);
    console.log(`Catálogo actualizado: ${candidate.length} ejercicios de origen. Revisa el diff, ejecuta npm run check y npm test, y reinicia la API.`);
  }catch(e){console.error(`No se actualizó el catálogo: ${e.message}`);process.exitCode=1;}
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href===import.meta.url) await refresh();
