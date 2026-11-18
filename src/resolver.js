import { resolutionConfidence, searchMatch, searchQuery } from './search.js';

export const resolverVersion = '3';

export function resolveCandidates(entries, name, families = []) {
  const query = searchQuery(name);
  if (!query.tokens.length) return { best: null, alternatives: [], reason: 'no-candidates', resolutionMethod:'none' };
  const candidates = [];
  for (const entry of entries) {
    const match = searchMatch(entry.document, query, 'any');
    if (!match.matches) continue;
    const evidence = resolutionConfidence(entry.document, query);
    // Keep metadata-only hits as suggestions, never as automatic assignments.
    const rawConfidence = evidence || 0.20;
    const confidence = entry.titlePending ? Math.min(0.79, rawConfidence) : rawConfidence;
    candidates.push({ id: entry.id, name: entry.name, confidence, rawConfidence, score: match.score, familyId:entry.familyId || null, isDefaultVariant:entry.isDefaultVariant || false });
  }
  candidates.sort((a, b) => b.confidence - a.confidence || b.score - a.score || a.id.localeCompare(b.id, 'en'));
  const publicCandidate = ({ id, name, confidence, familyId, isDefaultVariant }) => ({ id, name, confidence, familyId, isDefaultVariant });
  // Only complete registered generic names/aliases select an editorial default.
  // Specific grips, equipment and variants must still pass lexical resolution.
  const genericFamilies = families.filter(family => resolutionConfidence(family.document, query) >= 0.93);
  if (genericFamilies.length === 1) {
    const family = genericFamilies[0];
    const preferred = candidates.find(candidate => candidate.id === family.defaultExerciseId);
    const otherIdentity = candidates.some(candidate => candidate.familyId !== family.id && candidate.rawConfidence >= 0.88);
    if (preferred && !entries.find(entry => entry.id === preferred.id).titlePending && !otherIdentity) {
      return {best:publicCandidate({...preferred,confidence:0.94}), alternatives:candidates.filter(candidate => candidate.id !== preferred.id).slice(0,5).map(publicCandidate), reason:'matched', resolutionMethod:'family-default'};
    }
  }
  const top = candidates[0];
  // Compare against every candidate, including unresolved titles and ones
  // outside the five returned suggestions. Popularity cannot break ambiguity.
  const ambiguous = top && candidates.slice(1).some(candidate => candidate.rawConfidence >= top.confidence - 0.06 - Number.EPSILON);
  const accepted = top && top.confidence >= 0.84 && !ambiguous;
  return {
    best: accepted ? publicCandidate(top) : null,
    alternatives: candidates.slice(accepted ? 1 : 0, accepted ? 6 : 5).map(publicCandidate),
    reason: !top ? 'no-candidates' : accepted ? 'matched' : top.confidence < 0.84 ? 'insufficient-evidence' : 'ambiguous',
    resolutionMethod:accepted ? 'lexical' : 'none',
  };
}
