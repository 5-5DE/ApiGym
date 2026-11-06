import { readFile } from 'node:fs/promises';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { stats, rawExercises, getExercise } from '../src/catalog.js';
const raw = await readFile(new URL('../data/upstream/free-exercise-db.json', import.meta.url));
const baseExercises = JSON.parse(raw);
const manifest = JSON.parse(await readFile(new URL('../data/upstream/manifest.json', import.meta.url), 'utf8'));
const flowRoot = new URL('../data/flow-exercise-dataset/', import.meta.url);
const flowRecords = JSON.parse(readFileSync(new URL('data/exercises.json', flowRoot), 'utf8'));
const flowChecksums = JSON.parse(readFileSync(new URL('data/checksums.json', flowRoot), 'utf8'));
const sha = createHash('sha256').update(raw).digest('hex');
if (sha !== manifest.sha256 || baseExercises.length !== manifest.count) throw new Error('El snapshot difiere del manifiesto: revisa el cambio y actualiza ambos archivos');
const animatedFlow = flowRecords.filter(e => e.animation);
if (flowRecords.length !== 1324 || animatedFlow.length !== 1257 || flowRecords.filter(e => !e.animation).length !== 67) throw new Error('Conteos inesperados en Flow Exercise Dataset');
for (const exercise of flowRecords) for (const frame of exercise.animation?.frames || []) if (!Object.hasOwn(flowChecksums, frame)) throw new Error(`Cuadro sin checksum: ${frame}`);
for (const [path, expected] of Object.entries(flowChecksums)) {
  if (!/^assets\/\d{4}\/frame-0[0-2]\.svg$/.test(path) || !/^[a-f0-9]{64}$/.test(expected)) throw new Error(`Ruta/checksum SVG inválido: ${path}`);
  const file = new URL(path, flowRoot); if (!existsSync(file)) throw new Error(`Falta cuadro SVG: ${path}`);
  const bytes = readFileSync(file); const actual = createHash('sha256').update(bytes).digest('hex');
  if (actual !== expected || !/<svg\b/i.test(bytes.toString('utf8')) || /<script\b|\son\w+\s*=|javascript:/i.test(bytes.toString('utf8'))) throw new Error(`Integridad o contenido SVG inválido: ${path}`);
}
const missingInstructions = rawExercises.filter(e => !getExercise(e.id).instructionsAvailable).map(e => e.id);
console.log(JSON.stringify({...stats(), snapshotSha256:sha, svgFilesVerified:Object.keys(flowChecksums).length, missingInstructions}, null, 2));
