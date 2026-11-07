import { normalize } from './validation.js';

// Identity allocation remains legacy-compatible; display translations never participate.
export function combineExercises(baseExercises, flowExercises) {
  const rawExercises = baseExercises.map(e => ({...e}));
  const flowById = new Map();
  const existingByName = new Map(rawExercises.map(e => [normalize(e.name), e.id]));
  const matchedLegacyIds = new Set();
  const targetMap = { abs:'abdominals', delts:'shoulders', pectorals:'chest', quads:'quadriceps', 'cardiovascular system':'cardiovascular system', 'levator scapulae':'traps', 'serratus anterior':'chest', spine:'lower back', 'upper back':'middle back' };
  const secondaryMap = { 'latissimus dorsi':'lats', deltoids:'shoulders', 'rear deltoids':'shoulders', trapezius:'traps', quadriceps:'quadriceps', 'upper chest':'chest' };
  const equipmentMap = { 'body weight':'body only', assisted:'machine', band:'bands', 'resistance band':'bands', 'bosu ball':'other', 'elliptical machine':'other', hammer:'other', 'leverage machine':'machine', 'olympic barbell':'barbell', roller:'foam roll', 'skierg machine':'machine', 'sled machine':'machine', 'smith machine':'machine', 'stationary bike':'machine', 'stepmill machine':'machine', tire:'other', 'trap bar':'barbell', 'upper body ergometer':'machine', weighted:'other', 'wheel roller':'other', 'ez barbell':'e-z curl bar' };
  for (const f of flowExercises) {
    const candidateId = existingByName.get(normalize(f.name));
    const oldId = candidateId && !matchedLegacyIds.has(candidateId) ? candidateId : null;
    if (oldId) matchedLegacyIds.add(oldId);
    const id = oldId || `flow-${f.id}`;
    if (oldId) { flowById.set(oldId, f); continue; }
    const primary = targetMap[f.target] || f.target;
    const secondary = [...new Set(f.secondaryMuscles.map(m => secondaryMap[m] || m).filter(m => m !== primary))];
    rawExercises.push({ id, name:f.name, primaryMuscles:[primary], secondaryMuscles:secondary, equipment:equipmentMap[f.equipment] || f.equipment, level:'unknown', category:f.movementPattern === 'cardio' ? 'cardio' : 'strength', mechanic:null, force:f.movementPattern.startsWith('pull_') ? 'pull' : f.movementPattern.startsWith('push_') ? 'push' : null, instructions:f.instructions, images:[], flowId:f.id, flowRecord:f });
  }
  for (const e of rawExercises) if (!e.flowRecord && flowById.has(e.id)) e.flowRecord = flowById.get(e.id);
  const ids = new Set(rawExercises.map(e => e.id));
  if (ids.size !== rawExercises.length) throw new Error('ID duplicado en catálogo combinado');
  return rawExercises;
}
