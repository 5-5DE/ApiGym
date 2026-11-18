import { createHash } from 'node:crypto';
import { normalize } from './validation.js';
import { searchDocument } from './search.js';

export function createCuration(curation, exercises, translations) {
  if (curation.schemaVersion !== 1 || curation.locale !== 'es-MX' || !Array.isArray(curation.families)) throw new Error('Invalid gym curation schema');
  const known = new Map(exercises.map(e => [e.id, e]));
  const membership = new Map(), families = new Map(), genericNames = new Map();
  const aliases = new Map();
  const addAliases = (id, values) => {
    if (!known.has(id) || !Array.isArray(values) || values.some(value => typeof value !== 'string' || !normalize(value))) throw new Error(`Invalid curated aliases: ${id}`);
    const seen = new Set();
    aliases.set(id, [...(aliases.get(id) || []), ...values].filter(value => {
      const key = normalize(value);
      if (seen.has(key)) return false;
      seen.add(key); return true;
    }));
  };
  for (const [id, values] of Object.entries(curation.aliases)) addAliases(id, values);
  for (const family of curation.families) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(family.id) || families.has(family.id) || !family.name?.trim() || !family.nameEn?.trim() || !Array.isArray(family.aliases) || !family.exerciseIds?.length || !family.exerciseIds.includes(family.defaultExerciseId)) throw new Error(`Invalid curated family: ${family.id}`);
    if (translations[family.defaultExerciseId]?.titleReview?.status !== 'verified') throw new Error(`Unverified family default: ${family.id}`);
    for (const id of family.exerciseIds) {
      if (!known.has(id) || membership.has(id) || translations[id]?.titleReview?.status !== 'verified') throw new Error(`Invalid/duplicate family member: ${id}`);
      membership.set(id, {familyId:family.id, isDefaultVariant:id === family.defaultExerciseId});
    }
    const names = [family.name, family.nameEn, ...family.aliases];
    for (const name of names) {
      const key = normalize(name);
      if (genericNames.has(key) && genericNames.get(key) !== family.id) throw new Error(`Ambiguous generic family name: ${name}`);
      genericNames.set(key, family.id);
    }
    addAliases(family.defaultExerciseId, names);
    families.set(family.id, {...family, document:searchDocument({names:[family.name, family.nameEn], aliases:family.aliases, metadata:[], popular:false})});
  }
  // Fail closed when source evidence changes; rerun the explicit review rather
  // than silently assigning old aliases/defaults to a changed movement.
  for (const id of new Set([...aliases.keys(), ...membership.keys()])) {
    const e = known.get(id), evidence = curation.evidence[id];
    const original = {name:e.name, instructions:e.instructions, equipment:e.equipment, flowInstructions:e.flowRecord?.instructions || null};
    const sha = createHash('sha256').update(JSON.stringify(original)).digest('hex');
    if (!evidence || evidence.originalSha256 !== sha || evidence.titleStatus !== translations[id]?.titleReview?.status || JSON.stringify(evidence.frames.map(frame => frame.path)) !== JSON.stringify(e.flowRecord?.animation.frames)) throw new Error(`Stale gym curation evidence: ${id}`);
  }
  return {membership, families, aliases};
}
