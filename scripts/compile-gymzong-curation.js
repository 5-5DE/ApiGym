import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { families, aliasAdditions } from './gymzong-curation-decisions.js';

const read = path => JSON.parse(readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const titles = new Map(read('data/localization/es-MX.title-review.json').records.map(row => [row.id, row]));
const reviewedExercises = read('reports/spanish-localization-review.json').records;
const byId = new Map(reviewedExercises.map(e => [e.id, e]));
const aliases = structuredClone(aliasAdditions);
// Persist every derived synonym by ID. Runtime never infers family membership.
for (const e of reviewedExercises) {
  const review = titles.get(e.id), title = review.name;
  if (review.status === 'verified' && /desplante/i.test(title)) aliases[e.id] = [...(aliases[e.id] || []), title.replace(/desplantes/gi, 'zancadas').replace(/desplante/gi, 'zancada')];
}
const pendingFamilyCandidates = [];
const compiledFamilies = families.map(family => ({...family, exerciseIds:family.exerciseIds.filter(id => {
  if (titles.get(id)?.status === 'verified') return true;
  pendingFamilyCandidates.push({familyId:family.id,exerciseId:id,reason:titles.get(id)?.reason || 'Title not verified'});
  return false;
})}));
const reviewedIds = new Set([...families.flatMap(f => f.exerciseIds), ...Object.keys(aliases)]);
const evidence = Object.fromEntries([...reviewedIds].sort().map(id => {
  const e = byId.get(id), title = titles.get(id);
  if (!e || !title) throw new Error(`Unknown curated ID: ${id}`);
  const original = e.original;
  const sha = createHash('sha256').update(JSON.stringify(original)).digest('hex');
  if (sha !== title.evidence.originalSha256) throw new Error(`Title evidence changed: ${id}`);
  return [id, {originalSha256:sha, frames:title.evidence.frames, titleStatus:title.status}];
}));
const result = {schemaVersion:1, locale:'es-MX', source:'Gym Zong requests; explicit ID decisions in scripts/gymzong-curation-decisions.js; existing per-ID title review evidence', scope:'Curated requested gym families; unclassified exercises expose familyId:null. Defaults are editorial representatives, not identity merges or technique approval.', aliases, families:compiledFamilies, pendingFamilyCandidates, evidence};
writeFileSync(new URL('../data/gymzong-curation.es-MX.json', import.meta.url), JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({families:compiledFamilies.length,assigned:compiledFamilies.reduce((n,f)=>n+f.exerciseIds.length,0),pendingFamilyCandidates:pendingFamilyCandidates.length,aliasRecords:Object.keys(aliases).length,evidenceRecords:reviewedIds.size}));
