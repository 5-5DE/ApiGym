import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { rawExercises, getExercise, stats, labels } from '../src/catalog.js';
import { normalize } from '../src/validation.js';
import { createApp } from '../src/app.js';
import { createApiGymClient } from '../client/index.js';
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)));
const flow = read('../data/flow-exercise-dataset/data/exercises.json');
const checksums = read('../data/flow-exercise-dataset/data/checksums.json');
const groups = (items, key) => Object.entries(Object.groupBy(items, key)).filter(([, list]) => list.length > 1).map(([key,list]) => ({key, ids:list.map(e=>e.id)}));
const exercises = rawExercises.map(e=>getExercise(e.id));
const sequenceErrors = flow.filter(e => e.animation && (!e.animation.frames.length || !e.animation.sequence.length || !e.animation.sequence.every(n=>Number.isInteger(n)&&n>=0&&n<e.animation.frames.length) || !(e.animation.frameDurationMs>0))).map(e=>e.id);
const report = {
  commit: execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  stats: stats(), duplicateIds: groups(rawExercises,e=>e.id), duplicateNames: groups(rawExercises,e=>normalize(e.name)),
  spanishPercent: stats().spanish / stats().total * 100,
  missingInstructions: exercises.filter(e=>!e.instructionsAvailable).map(e=>e.id),
  unknownMuscles: [...new Set(rawExercises.flatMap(e=>[...e.primaryMuscles,...e.secondaryMuscles]).filter(m=>!Object.hasOwn(labels.muscles,m)))],
  sequenceErrors, registeredSvgFiles: Object.keys(checksums).length,
  withoutMedia: exercises.filter(e=>!e.media.animation && !e.media.images.length).map(e=>e.id),
  inconsistentMediaStatus: exercises.filter(e=>e.mediaStatus==='image-sequence'&&!e.media.imageSequence).map(e=>e.id),
  historicalNameOnlyLinks: rawExercises.filter(e=>e.flowRecord&&!e.id.startsWith('flow-')).map(e=>({exerciseId:e.id,flowId:e.flowRecord.id,status:'unreviewed'})),
  provenance: { flowAnimated:1257, retainedPrompts:13, rightsClearance:'not-certified', biomechanicalReview:'not-performed' },
};
// HTTP checks are local only: no third-party media is downloaded.
const server=createApp({apiKey:'',corsOrigins:'*'});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
try {
  const base=`http://127.0.0.1:${server.address().port}`, client=createApiGymClient({baseUrl:base});
  const failures=[]; let checked=0;
  const paths=Object.keys(checksums).map(p=>p.replace('assets/','/media/flow/'));
  for(let start=0;start<paths.length;start+=16) await Promise.all(paths.slice(start,start+16).map(async path=>{
    const r=await fetch(base+path,{signal:AbortSignal.timeout(10000)}); const text=await r.text();checked++;
    if(!r.ok||!r.headers.get('content-type')?.startsWith('image/svg+xml')||!/<svg\b/.test(text)) failures.push({path,status:r.status});
  }));
  let clientExercises=0;
  for(let offset=0;offset<rawExercises.length;offset+=100){
    const page=await client.list({offset,limit:100});clientExercises+=page.data.length;
    for(const e of page.data) for(const url of e.media.animation?.frames||[]) if(!url.startsWith(base+'/media/flow/')) failures.push({id:e.id,url});
  }
  report.http={checked,clientExercises,failures};
} finally {await new Promise(resolve=>server.close(resolve));}
writeFileSync(new URL('../reports/catalog-audit.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({stats:report.stats,duplicateIds:report.duplicateIds.length,duplicateNameGroups:report.duplicateNames.length,sequenceErrors,unknownMuscles:report.unknownMuscles,http:report.http},null,2));
if(report.duplicateIds.length||sequenceErrors.length||report.http.failures.length||report.unknownMuscles.length) process.exitCode=1;
