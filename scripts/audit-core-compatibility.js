import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtemp,mkdir,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {createApp} from '../src/app.js';
import {createApiGymClient} from '../client/index.js';
import {readFileSync} from 'node:fs';
// Actual GitHub main verified for C0-I, not the unrelated P2-A baseline.
const baseline='6ced90082e603ed6d9d8dd9a9bf8350e14ad75db';
const root=fileURLToPath(new URL('../',import.meta.url));
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'});
const protectedPaths=['data/upstream','data/flow-exercise-dataset','data/translations.es.json','data/media.json','data/sources.json'];
assert.equal(git('diff',baseline,'--',...protectedPaths),'','Historical data changed');
assert.equal(git('diff','25d1b42dcba48f42411afa32a3e9e37c72973ed2','--','data/names.es.json','data/editorial-featured.json'),'','Approved P1 names/editorial selection changed');
const names=JSON.parse(readFileSync(new URL('../data/names.es.json',import.meta.url),'utf8'));
assert.deepEqual(Object.keys(names).sort(),['flow-0372','flow-0599']);
const dir=await mkdtemp(join(tmpdir(),'apigym-main-audit-'));let oldServer,newServer;
const listen=async server=>{await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});return `http://127.0.0.1:${server.address().port}`;};
try{
 await mkdir(join(dir,'src'));await mkdir(join(dir,'public'));await writeFile(join(dir,'package.json'),'{"type":"module"}');
 const paths=['src/app.js','src/catalog.js','src/validation.js','src/openapi.js',...git('ls-tree','-r','--name-only',baseline,'--','public').trim().split('\n')];
 for(const path of paths)await writeFile(join(dir,path),git('show',`${baseline}:${path}`));
 await symlink(join(root,'data'),join(dir,'data'),'dir');
 const {createApp:oldApp}=await import(pathToFileURL(join(dir,'src/app.js')));
 oldServer=oldApp({apiKey:'',corsOrigins:'*'});newServer=createApp({apiKey:'',corsOrigins:'*'});
 const oldBase=await listen(oldServer),newBase=await listen(newServer);
 const json=async(base,path)=>{const response=await fetch(base+path);assert.equal(response.status,200,path);return response.json();};
 let exercisesCompared=0,mediaCompared=0;const ids=new Set(),animated=new Set(),statusCorrections=new Set();
 const compare=(old,item,lang)=>{
  const now=structuredClone(item);
  assert.equal(now.nameLanguage,now.nameStatus==='missing'?'en':lang==='es'?'es':'en');
  assert.equal(now.editorialFeatured,old.popular);assert.ok(['draft','missing'].includes(now.nameStatus));
  delete now.nameLanguage;delete now.nameStatus;delete now.editorialFeatured;
  const n=names[now.id];
  if(n){assert.equal(now.name,lang==='es'?n.name:old.name);assert.deepEqual(now.aliases,[...new Set([...old.aliases,...n.aliases])]);now.name=old.name;now.aliases=old.aliases;}
  if(now.mediaStatus!==old.mediaStatus){assert.equal(old.mediaStatus,'image-sequence');assert.equal(now.mediaStatus,'none');assert.equal(now.media.animation,null);assert.equal(now.media.imageSequence,null);assert.deepEqual(now.media.images,[]);statusCorrections.add(now.id);now.mediaStatus=old.mediaStatus;}
  assert.deepEqual(now,old,`${lang}:${old.id}`);
 };
 for(const lang of ['es','en'])for(let offset=0;offset<2069;offset+=100){
  const path=`/api/v1/exercises?sort=id&limit=100&offset=${offset}&lang=${lang}`;
  const before=await json(oldBase,path),after=await json(newBase,path);assert.deepEqual(after.pagination,before.pagination);
  for(let i=0;i<before.data.length;i++){
   const old=before.data[i],now=after.data[i];compare(old,now,lang);exercisesCompared++;ids.add(now.id);if(now.media.animation)animated.add(now.id);
   if(lang==='es'){const path=`/api/v1/exercises/${old.id}/media`;assert.deepEqual(await json(newBase,path),await json(oldBase,path));mediaCompared++;}
  }
 }
 assert.equal(ids.size,2069);assert.equal(animated.size,1257);assert.equal(statusCorrections.size,742);
 for(const lang of ['es','en'])assert.deepEqual(await json(newBase,'/api/v1/taxonomy?lang='+lang),await json(oldBase,'/api/v1/taxonomy?lang='+lang));
 const prior=(await json(oldBase,'/api/v1/stats')).data,now=(await json(newBase,'/api/v1/stats')).data;const coverage=now.translationCoverage;delete now.translationCoverage;delete now.version;delete prior.version;assert.deepEqual(now,prior);
 const sdk=createApiGymClient({baseUrl:newBase});
 for(const id of ['flow-0372','flow-0599','Barbell_Squat','3_4_Sit-Up']){
  const result=await sdk.list({q:id});assert.equal(result.pagination.total,1);assert.equal(result.data[0].id,id);
  const e=(await sdk.get(id)).data;for(const frame of e.media.animation?.frames||[])assert.ok(frame.startsWith(newBase+'/media/'));
 }
 const media=(await sdk.media('3_4_Sit-Up')).data;const frame=await fetch(media.animation.frames[0]);assert.equal(frame.status,200);assert.match(frame.headers.get('content-type'),/image\/svg\+xml/);assert.match(await frame.text(),/<svg/);
 const batch=await sdk.batch(['Pushups','unknown','Barbell_Squat','Pushups']);assert.deepEqual(batch.data.map(e=>e.id),['Pushups','Barbell_Squat']);assert.deepEqual(batch.missingIds,['unknown']);
 // Existing clients remain usable against the new server as well.
 await mkdir(join(dir,'client'));await writeFile(join(dir,'client/index.js'),git('show',`${baseline}:client/index.js`));
 const {createApiGymClient:oldClient}=await import(pathToFileURL(join(dir,'client/index.js')));assert.equal((await oldClient({baseUrl:newBase}).get('flow-0372')).data.id,'flow-0372');
 console.log(JSON.stringify({baseline,exercisesCompared,locales:['es','en'],historicalIds:ids.size,mediaEndpointsCompared:mediaCompared,legacyAnimatedPreserved:animated.size,expectedMediaStatusCorrections:statusCorrections.size,coverage,sdk:'current and main clients exercised',allowedDifferences:['two P1 draft titles/aliases','nameLanguage/nameStatus/editorialFeatured additions','742 P1 incorrect mediaStatus corrections','stats.translationCoverage','catalogVersion/ETag hashes','q exact ID and existing draft alias search expansion']},null,2));
}finally{
 for(const server of [oldServer,newServer])if(server?.listening)await new Promise(r=>server.close(r));
 await rm(dir,{recursive:true,force:true});
}
