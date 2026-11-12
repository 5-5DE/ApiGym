import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { validateDataset, validateTranslations, validateMedia, normalize, integer, choice, checkParams, InputError } from './validation.js';

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
export const rawExercises = read('../data/upstream/free-exercise-db.json');
const flowExercises = read('../data/flow-exercise-dataset/data/exercises.json');
const flowChecksums = read('../data/flow-exercise-dataset/data/checksums.json');
const translations = read('../data/translations.es.json');
const mediaRecords = read('../data/media.json');
export const catalogPruning = read('../data/catalog-pruning.json');
const legacyIds = validateDataset(rawExercises);
validateTranslations(translations, legacyIds);

const flowSource = { id: 'flow-exercise-dataset', url: 'https://github.com/ozansozuozgit/flow-exercise-dataset', license: 'MIT (datos); CC0-1.0 (arte, hasta donde el autor tiene derechos)', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', attribution: 'Flow Exercise Dataset contributors; datos originales de Hasan Emir Yıldırım', provenanceNote: 'Preview con limitaciones de procedencia: ver data/flow-exercise-dataset/NOTICE.md' };
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
validateMedia(mediaRecords, ids);

export const labels = {
  muscles: { abdominals: 'Abdominales', abductors: 'Abductores', adductors: 'Aductores', biceps: 'Bíceps', calves: 'Pantorrillas', chest: 'Pecho', forearms: 'Antebrazos', glutes: 'Glúteos', hamstrings: 'Isquiotibiales', lats: 'Dorsales', 'lower back': 'Espalda baja', 'middle back': 'Espalda media', neck: 'Cuello', quadriceps: 'Cuádriceps', shoulders: 'Hombros', traps: 'Trapecios', triceps: 'Tríceps', 'cardiovascular system':'Sistema cardiovascular', 'levator scapulae':'Elevador de la escápula', 'serratus anterior':'Serrato anterior', spine:'Columna vertebral', 'upper back':'Espalda alta', 'ankle stabilizers':'Estabilizadores del tobillo', ankles:'Tobillos', back:'Espalda', brachialis:'Braquial', core:'Zona media', feet:'Pies', 'grip muscles':'Agarre', groin:'Ingle', hands:'Manos', 'hip flexors':'Flexores de cadera', 'inner thighs':'Muslos internos', 'lower abs':'Abdominales inferiores', obliques:'Oblicuos', 'rear deltoids':'Deltoides posteriores', rhomboids:'Romboides', 'rotator cuff':'Manguito rotador', shins:'Espinillas', soleus:'Sóleo', 'sternocleidomastoid':'Esternocleidomastoideo', 'upper chest':'Pecho superior', 'wrist extensors':'Extensores de muñeca', 'wrist flexors':'Flexores de muñeca', wrists:'Muñecas' },
  equipment: { barbell: 'Barra', dumbbell: 'Mancuernas', 'body only': 'Peso corporal', cable: 'Polea', machine: 'Máquina', bands: 'Bandas', kettlebells: 'Pesas rusas', kettlebell:'Pesa rusa', 'e-z curl bar': 'Barra Z', 'exercise ball': 'Pelota de ejercicio', 'medicine ball': 'Balón medicinal', 'foam roll': 'Rodillo', other: 'Otro', unknown: 'Sin especificar', 'bosu ball':'BOSU', 'elliptical machine':'Elíptica', hammer:'Martillo', rope:'Cuerda', 'stability ball':'Pelota de estabilidad', 'stationary bike':'Bicicleta fija', 'stepmill machine':'Escaladora', tire:'Neumático', 'trap bar':'Barra hexagonal', 'upper body ergometer':'Ergómetro de brazos', weighted:'Con peso', 'wheel roller':'Rueda abdominal' },
  difficulty: { beginner: 'Principiante', intermediate: 'Intermedio', expert: 'Avanzado', unknown:'Sin clasificar' },
  category: { strength: 'Fuerza', powerlifting: 'Powerlifting', stretching: 'Estiramiento', cardio: 'Cardio', 'olympic weightlifting': 'Halterofilia', strongman: 'Strongman', plyometrics: 'Pliometría' },
};
const source = { id: 'free-exercise-db', url: 'https://github.com/yuhonas/free-exercise-db', license: 'Unlicense', licenseUrl: 'https://unlicense.org/', attribution: 'Free Exercise DB — yuhonas y colaboradores' };

export function mediaFor(e) {
  const images = [];
  const variants = mediaRecords.filter(m => m.exerciseId === e.id).map(({exerciseId, ...m}) => m);
  const flow = e.flowRecord;
  const flowFrames = flow?.animation?.frames.map(path => `/media/flow/${flow.id}/${path.split('/').at(-1)}`) || [];
  const svgAnimation = flowFrames.length ? { type:'svg-sequence', frames:flowFrames, sequence:flow.animation.sequence, frameDurationMs:flow.animation.frameDurationMs, license:flow.animation.license, licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/', sourceUrl:`${flowSource.url}/blob/main/${flow.animation.provenance}`, attribution:flowSource.attribution, provenanceNote:flowSource.provenanceNote } : null;
  const animation = svgAnimation || variants.find(m => m.type === 'video') || variants.find(m => m.type === 'gif') || null;
  return { thumbnailUrl: flowFrames[0] || null, images, animation, imageSequence: null, variants, attribution: animation?.attribution || source.attribution };
}

// Resolve legacy/Flow identities before removing records: deletion must never
// remap a retained exercise to a different ID, even after a source refresh.
const removedIds = new Set(catalogPruning.removedIds);
for (let i = rawExercises.length - 1; i >= 0; i--) {
  if (removedIds.has(rawExercises[i].id) || !mediaFor(rawExercises[i]).animation) rawExercises.splice(i, 1);
}

export function localize(e, lang = 'es') {
  const t = lang === 'es' ? translations[e.id] : null;
  return {
    id: e.id, name: t?.name || e.name, nameEn: e.name,
    aliases: translations[e.id]?.aliases || [], language: t ? 'es' : 'en', requestedLanguage: lang,
    availableLanguages: translations[e.id] ? ['en', 'es'] : ['en'],
    instructions: (t?.instructions || e.instructions).filter(s => s.trim()),
    instructionsAvailable: Boolean(t?.instructions?.length || e.instructions.some(s => s.trim())),
    translationStatus: t ? 'ai-authored-unreviewed' : 'upstream',
    primaryMuscles: e.primaryMuscles, secondaryMuscles: e.secondaryMuscles,
    equipment: e.equipment || 'unknown', difficulty: e.level || 'unknown', category: e.category,
    mechanic: e.mechanic, force: e.force, popular: Boolean(translations[e.id]),
    media: mediaFor(e), source: e.flowRecord ? flowSource : source,
    dataSources: e.flowRecord ? [flowSource, ...(e.id.startsWith('flow-') ? [] : [source])] : [source],
    movementPattern: e.flowRecord?.movementPattern || null,
    mediaStatus: e.flowRecord?.mediaStatus || (e.images.length ? 'image-sequence' : 'none'),
  };
}

const byId = new Map(rawExercises.map(e => [e.id, e]));
const index = new Map(rawExercises.map(e => [e.id, normalize([e.name, translations[e.id]?.name, ...(translations[e.id]?.aliases || []), ...e.primaryMuscles, ...e.secondaryMuscles, ...e.primaryMuscles.map(m => labels.muscles[m]), labels.equipment[e.equipment], e.equipment, e.flowRecord?.target, e.flowRecord?.bodyPart, e.flowRecord?.equipment].join(' '))]));
const values = field => [...new Set(rawExercises.map(e => field === 'difficulty' ? e.level : (e[field] || 'unknown')))].sort();

export function queryExercises(params) {
  checkParams(params, ['q', 'muscle', 'equipment', 'difficulty', 'category', 'popular', 'hasAnimation', 'lang', 'limit', 'offset', 'sort']);
  const lang = choice(params.get('lang'), ['es', 'en'], 'lang', 'es');
  const limit = integer(params.get('limit'), 20, 1, 100, 'limit');
  const offset = integer(params.get('offset'), 0, 0, Number.MAX_SAFE_INTEGER, 'offset');
  const q = params.get('q') || '';
  if (q.length > 200) throw new InputError('q admite hasta 200 caracteres');
  const tokens = normalize(q).split(' ').filter(Boolean);
  const muscle = choice(params.get('muscle'), Object.keys(labels.muscles), 'muscle');
  const equipment = choice(params.get('equipment'), values('equipment'), 'equipment');
  const difficulty = choice(params.get('difficulty'), values('difficulty'), 'difficulty');
  const category = choice(params.get('category'), values('category'), 'category');
  const popular = choice(params.get('popular'), ['true', 'false'], 'popular');
  const animation = choice(params.get('hasAnimation'), ['true', 'false'], 'hasAnimation');
  const sort = choice(params.get('sort'), ['name', 'id'], 'sort', 'name');
  const filtered = rawExercises.filter(e =>
    tokens.every(t => index.get(e.id).includes(t)) &&
    (!muscle || e.primaryMuscles.includes(muscle)) &&
    (!equipment || (e.equipment || 'unknown') === equipment) &&
    (!difficulty || (e.level || 'unknown') === difficulty) && (!category || e.category === category) &&
    (!popular || Boolean(translations[e.id]) === (popular === 'true')) &&
    (!animation || Boolean(mediaFor(e).animation) === (animation === 'true'))
  );
  filtered.sort((a,b) => sort === 'id' ? a.id.localeCompare(b.id, 'en') : ((lang === 'es' ? translations[a.id]?.name : null) || a.name).localeCompare((lang === 'es' ? translations[b.id]?.name : null) || b.name, lang) || a.id.localeCompare(b.id, 'en'));
  return { data: filtered.slice(offset, offset + limit).map(e => localize(e, lang)), pagination: { total: filtered.length, count: Math.max(0, Math.min(limit, filtered.length - offset)), limit, offset, nextOffset: offset + limit < filtered.length ? offset + limit : null } };
}

export function getExercise(id, lang = 'es') { const e = byId.get(id); return e ? localize(e, lang) : null; }
export function taxonomy(lang = 'es') {
  return Object.fromEntries(Object.entries(labels).map(([facet, map]) => [facet, Object.keys(map).map(id => ({id, name: lang === 'es' ? map[id] : id, count: rawExercises.filter(e => facet === 'muscles' ? e.primaryMuscles.includes(id) : (facet === 'difficulty' ? e.level : e[facet] || 'unknown') === id).length}))]));
}
export const catalogVersion = createHash('sha256').update(JSON.stringify({rawExercises, translations, mediaRecords, flowChecksums})).digest('hex').slice(0, 16);
export function stats() {
  const animatedIds = new Set(rawExercises.filter(e => e.flowRecord?.animation || mediaRecords.some(m => m.exerciseId === e.id)).map(e => e.id));
  const translated = rawExercises.filter(e => translations[e.id]).length;
  return { version: catalogVersion, total: rawExercises.length, spanish: translated, popular: translated, withImages: 0, withImageSequence: 0, withAnimation: animatedIds.size, withSvgAnimation: rawExercises.filter(e => e.flowRecord?.animation).length, withGifOrVideo: rawExercises.filter(e => !e.flowRecord?.animation && mediaRecords.some(m => m.exerciseId === e.id)).length, withoutAnimation: rawExercises.length - animatedIds.size, mediaHosting: 'local-svg', languages: ['en', 'es'] };
}
