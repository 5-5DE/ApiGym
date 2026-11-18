import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {rawExercises,getExercise} from '../src/catalog.js';
import {classifyResearchExercise,researchSources,familyRules} from './metadata-research-rules.js';

const root=new URL('../',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,root),'utf8'));
const write=(path,value)=>writeFileSync(new URL(path,root),JSON.stringify(value,null,2)+'\n');
const baselinePath='data/localization/metadata-research-baseline.json';
if(!existsSync(new URL(baselinePath,root)))write(baselinePath,Object.fromEntries(rawExercises.map(e=>{
  const current=getExercise(e.id);return [e.id,{difficulty:current.difficulty,mechanic:current.mechanic,force:current.force}];
})));
const titles=new Map(read('data/localization/es-MX.title-review.json').records.map(row=>[row.id,row]));
const records=rawExercises.map(e=>{
  const current=getExercise(e.id),title=titles.get(e.id);
  const proposal=classifyResearchExercise({id:e.id,name:e.name,nameEs:current.name,equipment:e.flowRecord.equipment});
  if(!proposal)throw Error(`No researched family assigned: ${e.id}`);
  const sources=[...new Set([proposal.source,'nsca-complexity','ace-joints','hprc-actions'])];
  return {
    id:e.id,sourceName:e.name,sourceEquipment:e.flowRecord.equipment,
    family:proposal.family,
    proposed:{difficulty:proposal.difficulty,mechanic:proposal.mechanic,force:proposal.force},
    status:title.status==='pending-review'?'provisional-identity':'editorial-estimate',
    identityConflict:title.status==='pending-review'?title.reason:null,
    criteria:[`family:${proposal.family}`,...proposal.modifiers,...(proposal.observation?[proposal.observation]:[])],
    sources,evidence:title.evidence,
  };
});
write('data/metadata-research.es-MX.json',{
  schemaVersion:1,
  method:'Published family references plus explicit editorial complexity rubric applied to existing per-ID source and title evidence. Proposals are inferences, not 1,257 independently verified external exercise prescriptions. Existing sourced fields take precedence; only empty fields are completed.',
  difficultyMeaning:'Technical complexity under controlled baseline execution, not personalized safety, load, training intensity or a clinical recommendation.',
  conventions:{compound:'Several joints participate in the dynamic task.',isolation:'A principal joint action dominates the task.',isometric:'The main task is to maintain a position.',mixed:'The complete task combines directions or cyclic phases; it is not being forced into push/pull.',notApplicable:'A strength-mechanics/action label does not apply, e.g. self-massage.'},
  sources:researchSources,
  families:[...new Map(familyRules.map(({pattern,...rule})=>[rule.id,rule])).values()],
  records,
});
console.log(JSON.stringify({reviewedSourceRecords:records.length,families:new Set(records.map(r=>r.family)).size,identityConflicts:records.filter(r=>r.status==='provisional-identity').length}));
