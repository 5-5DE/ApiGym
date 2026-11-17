// One-time editorial aid. Never imported by the HTTP server.
// Only public catalog text is sent to Google Translate; outputs remain drafts.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { rawExercises } from '../src/catalog.js';

const directory = new URL('../data/localization/', import.meta.url);
mkdirSync(directory, { recursive: true });
const path = new URL('es-MX.machine-drafts.json', directory);
const cache = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};
const clean = text => text.replace(/\s+/g, ' ').trim();
const texts = [...new Set(rawExercises.flatMap(e => [e.name.replace(/\s*\(?\b(?:male|female)\b\)?/gi, '').trim(), ...e.instructions]).map(clean))].filter(text => !cache[text]);
const batches = [];
let batch = [], size = 0;
for (const text of texts) {
  if (size + text.length > 2600 && batch.length) { batches.push(batch); batch = []; size = 0; }
  batch.push(text); size += text.length + 1;
}
if (batch.length) batches.push(batch);
async function translate(lines) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  for (const [key, value] of Object.entries({client:'gtx', sl:'en', tl:'es', dt:'t', q:lines.join('\n')})) url.searchParams.set(key, value);
  let error;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const body = await response.json();
      const result = body[0].map(segment => segment[0]).join('').trim().split(/\n+/).map(clean);
      if (result.length !== lines.length) {
        if (lines.length === 1) return [result.join(' ')];
        const middle = Math.ceil(lines.length / 2);
        return [...await translate(lines.slice(0, middle)), ...await translate(lines.slice(middle))];
      }
      return result;
    } catch (cause) { error = cause; await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); }
  }
  throw error;
}
let next = 0, done = 0;
await Promise.all(Array.from({length:3}, async () => {
  while (next < batches.length) {
    const lines = batches[next++];
    const translated = await translate(lines);
    lines.forEach((text, index) => { cache[text] = translated[index]; });
    writeFileSync(path, JSON.stringify(cache, null, 2) + '\n');
    done++;
    if (done % 15 === 0 || done === batches.length) console.log(`Borradores: ${done}/${batches.length} lotes; ${Object.keys(cache).length} textos guardados.`);
  }
}));
