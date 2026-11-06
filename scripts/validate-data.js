import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { stats, rawExercises, getExercise } from '../src/catalog.js';
const raw = await readFile(new URL('../data/upstream/free-exercise-db.json', import.meta.url));
const manifest = JSON.parse(await readFile(new URL('../data/upstream/manifest.json', import.meta.url), 'utf8'));
const sha = createHash('sha256').update(raw).digest('hex');
if (sha !== manifest.sha256 || rawExercises.length !== manifest.count) throw new Error('El snapshot difiere del manifiesto: revisa el cambio y actualiza ambos archivos');
const missingInstructions = rawExercises.filter(e => !getExercise(e.id).instructionsAvailable).map(e => e.id);
console.log(JSON.stringify({...stats(), snapshotSha256:sha, missingInstructions}, null, 2));
