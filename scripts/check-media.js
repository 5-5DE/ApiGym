import { writeFile } from 'node:fs/promises';
import { rawExercises, mediaFor } from '../src/catalog.js';
const args = process.argv.slice(2);
const all = args.includes('--all');
const limit = all ? rawExercises.length : 12;
const urls = new Set();
// Todos los GIF/videos, más una muestra reproducible de imágenes por defecto.
for (const exercise of rawExercises) for (const variant of mediaFor(exercise).variants) urls.add(variant.url);
for (const exercise of rawExercises.slice(0, limit)) for (const url of mediaFor(exercise).images) urls.add(url);
const report=[];
for (const url of urls) {
  try {
    const r=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(10000),headers:{'User-Agent':'ApiGym-media-check/1.0'}});
    const type=r.headers.get('content-type') || '';
    report.push({url,status:r.status,type,ok:r.ok && /^(image|video)\//.test(type)});
  }catch(e){report.push({url,ok:false,error:e.message});}
}
await writeFile('media-report.json',JSON.stringify({checkedAt:new Date().toISOString(),report},null,2));
console.log(`${report.filter(r=>r.ok).length}/${report.length} medios accesibles. Detalles: media-report.json`);
if(report.some(r=>!r.ok))process.exitCode=1;
