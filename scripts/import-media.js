import { readFile, writeFile, rename } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateMedia, validateDataset } from '../src/validation.js';
import { rawExercises } from '../src/catalog.js';

export async function importMedia(inputPath, root = new URL('../', import.meta.url)) {
  const dataset = JSON.parse(await readFile(new URL('data/upstream/free-exercise-db.json', root), 'utf8'));
  const ids = root.href === new URL('../', import.meta.url).href ? new Set(rawExercises.map(e => e.id)) : validateDataset(dataset);
  const input = JSON.parse(await readFile(inputPath, 'utf8'));
  validateMedia(input, ids);
  const target = new URL('data/media.json', root);
  const previous = JSON.parse(await readFile(target, 'utf8'));
  const merged = new Map([...previous, ...input].map(m => [`${m.exerciseId}:${m.url}`,m]));
  const records = [...merged.values()]; validateMedia(records, ids);
  const temp = new URL('data/media.json.tmp', root);
  await writeFile(temp, JSON.stringify(records,null,2)+'\n'); await rename(temp,target);
  return records.length;
}
if (import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (!process.argv[2]) {console.error('Uso: npm run media:import -- ruta/medios.json');process.exitCode=1;}
  else try {console.log(`Medios guardados: ${await importMedia(process.argv[2])}. Reinicia la API para cargarlos.`);} catch(e){console.error(e.message);process.exitCode=1;}
}
