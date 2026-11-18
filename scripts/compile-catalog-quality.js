import { readFileSync, writeFileSync } from 'node:fs';
import { rawExercises, gymCuration } from '../src/catalog.js';
import { languageNames, basicGroups } from './catalog-quality-decisions.js';

const read = path => JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const titles = new Map(read('data/localization/es-MX.title-review.json').records.map(row=>[row.id,row]));
const baseline = read('data/localization/es-MX.phase5-baseline.json');
const upstream = read('data/upstream/free-exercise-db.json');
const entries = {};
const entry = id => entries[id] ||= {evidence:titles.get(id).evidence};
const equipment = value => value === 'kettlebells' ? 'kettlebell' : value;
const signature = name => name.toLowerCase().replace(/\((?:back|side) pov\)/g,'').replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(Boolean).sort().join(' ');
const references = new Map();
for (const e of upstream) {const key=signature(e.name); references.set(key,[...(references.get(key)||[]),e]);}
const fields = ['difficulty','mechanic','force'];
const patch = (e, field, value, basis, reference) => {
  const original = field === 'difficulty' ? e.level : e[field];
  entry(e.id).metadata ||= {};
  entry(e.id).metadata[field] = {value,original:original ?? null,basis,reference};
};
for (const e of rawExercises) {
  const hits=references.get(signature(e.name)) || [];
  if (titles.get(e.id).status==='verified' && hits.length===1 && equipment(hits[0].equipment)===equipment(e.equipment) && e.primaryMuscles.some(m=>hits[0].primaryMuscles.includes(m))) {
    for (const field of fields) {
      const original=field==='difficulty'?e.level:e[field], value=field==='difficulty'?hits[0].level:hits[0][field];
      if ((!original || original==='unknown') && value) patch(e,field,value,'equivalent-source-record',hits[0].id);
    }
  }
  if (e.equipment==='kettlebells') patch(e,'equipment','kettlebell','canonical-equipment','kettlebells');
  if (!e.equipment && e.flowRecord.equipment==='body weight') patch(e,'equipment','body only','source-equipment','flow:'+e.flowRecord.id);
}
const popularIds=basicGroups.flatMap(group=>group.ids);
if (popularIds.length!==150 || new Set(popularIds).size!==150) throw new Error('Expected 150 distinct explicit basics');
for (const group of basicGroups) for (const id of group.ids) {
  const e=rawExercises.find(row=>row.id===id);
  if (!e || (titles.get(id).status!=='verified' && id!=='Russian_Twist')) throw new Error(`Unverified new basic: ${id}`);
  entry(id);
  if (titles.get(id).status!=='verified') continue;
  for (const field of ['mechanic','force']) if (!e[field] && !entries[id].metadata?.[field] && group[field]) patch(e,field,group[field],'editorial-joint-action','hprc-exercise-classification');
}
for (const id of ['flow-0576','flow-0577']) patch(rawExercises.find(e=>e.id===id),'difficulty','beginner','external-exercise-reference','ace-seated-chest-press');
patch(rawExercises.find(e=>e.id==='flow-1301'),'force','push','editorial-correction','source-instructions:push-handles-forward');
patch(rawExercises.find(e=>e.id==='flow-1301'),'mechanic','compound','editorial-joint-action','hprc-exercise-classification');
const research=read('data/metadata-research.es-MX.json');
const researchById=new Map(research.records.map(row=>[row.id,row]));
if(researchById.size!==rawExercises.length)throw Error('Incomplete metadata research inventory');
for(const e of rawExercises){
  const row=researchById.get(e.id);
  if(!row || row.sourceName!==e.name || row.evidence.originalSha256!==titles.get(e.id).evidence.originalSha256)throw Error(`Stale metadata research: ${e.id}`);
  for(const field of fields){
    const original=field==='difficulty'?e.level:e[field];
    if(original && original!=='unknown' || entries[e.id]?.metadata?.[field])continue;
    patch(e,field,row.proposed[field],'research-family-estimate',row.family);
    Object.assign(entry(e.id).metadata[field],{status:row.status,family:row.family,sources:row.sources.map(id=>research.sources[id].url),criteria:row.criteria});
  }
}
for (const [id,name] of Object.entries(languageNames)) Object.assign(entry(id),{displayName:name,previousName:baseline[id].name,nameCorrection:'language-only-pending-identity'});
for (const id of ['flow-0738','flow-0739','flow-0740','flow-1464']) {
  const e=rawExercises.find(e=>e.id===id);
  entry(id).nameEn=e.name.replace(/\u0432\u00b0/g,'°');
  if (entry(id).nameEn===e.name) throw new Error(`Encoding repair no longer applicable: ${id}`);
}
const groups=new Map();
for (const e of rawExercises) {
  const name=entries[e.id]?.displayName || baseline[e.id].name;
  groups.set(name,[...(groups.get(name)||[]),e.id]);
}
const duplicateGroups=[];
const defaults=new Set(gymCuration.families.map(f=>f.defaultExerciseId));
for (const [name,ids] of groups) if(ids.length>1) {
  const ordered=[...ids].sort((a,b)=>Number(defaults.has(b))-Number(defaults.has(a)) || a.localeCompare(b,'en'));
  duplicateGroups.push({name,ids:ordered});
  for (const [i,id] of ordered.entries()) if (i>0) {
    const raw=rawExercises.find(e=>e.id===id);
    const qualifier=/\(back pov\)/i.test(raw.name)?'vista posterior':/\(side pov\)/i.test(raw.name)?'vista lateral':`ilustración ${i+1}`;
    Object.assign(entry(id),{displayName:`${name} (${qualifier})`,previousName:baseline[id].name,nameCorrection:entries[id]?.nameCorrection || 'illustration-disambiguation'});
    entry(id).aliases=[baseline[id].name];
  }
}
const result={schemaVersion:1,scope:'Source-backed corrections and explicitly labelled family-derived editorial estimates for missing metadata. Pending identity and technique statuses remain pending.',research:{method:research.method,difficultyMeaning:research.difficultyMeaning},popularIds,sources:{
  ...Object.fromEntries(Object.entries(research.sources).map(([id,row])=>[id,row.url])),
  'free-exercise-db':'https://github.com/yuhonas/free-exercise-db',
  'ace-seated-chest-press':'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/',
  'hprc-exercise-classification':'https://www.hprc-online.org/physical-fitness/training-performance/choosing-right-exercises-optimize-your-resistance-training',
},duplicateGroups,entries};
writeFileSync(new URL('../data/catalog-quality.es-MX.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({basics:popularIds.length,entries:Object.keys(entries).length,duplicateGroups:duplicateGroups.length,renamed:Object.values(entries).filter(e=>e.displayName).length,metadata:Object.values(entries).reduce((n,e)=>n+Object.keys(e.metadata||{}).length,0)}));
