import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { validateDataset, validateTranslations, validateMedia, normalize, integer, choice, checkParams, InputError } from './validation.js';

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
export const rawExercises = read('../data/upstream/free-exercise-db.json');
const translations = read('../data/translations.es.json');
const mediaRecords = read('../data/media.json');
const ids = validateDataset(rawExercises);
validateTranslations(translations, ids);
validateMedia(mediaRecords, ids);

export const labels = {
  muscles: { abdominals: 'Abdominales', abductors: 'Abductores', adductors: 'Aductores', biceps: 'Bíceps', calves: 'Pantorrillas', chest: 'Pecho', forearms: 'Antebrazos', glutes: 'Glúteos', hamstrings: 'Isquiotibiales', lats: 'Dorsales', 'lower back': 'Espalda baja', 'middle back': 'Espalda media', neck: 'Cuello', quadriceps: 'Cuádriceps', shoulders: 'Hombros', traps: 'Trapecios', triceps: 'Tríceps' },
  equipment: { barbell: 'Barra', dumbbell: 'Mancuernas', 'body only': 'Peso corporal', cable: 'Polea', machine: 'Máquina', bands: 'Bandas', kettlebells: 'Pesas rusas', 'e-z curl bar': 'Barra Z', 'exercise ball': 'Pelota de ejercicio', 'medicine ball': 'Balón medicinal', 'foam roll': 'Rodillo', other: 'Otro', unknown: 'Sin especificar' },
  difficulty: { beginner: 'Principiante', intermediate: 'Intermedio', expert: 'Avanzado' },
  category: { strength: 'Fuerza', powerlifting: 'Powerlifting', stretching: 'Estiramiento', cardio: 'Cardio', 'olympic weightlifting': 'Halterofilia', strongman: 'Strongman', plyometrics: 'Pliometría' },
};
const mediaBase = process.env.MEDIA_BASE_URL || 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
if (!mediaBase.endsWith('/') || !['https:', 'http:'].includes(new URL(mediaBase).protocol)) throw new Error('MEDIA_BASE_URL requiere URL HTTP(S) con / al final');
const source = { id: 'free-exercise-db', url: 'https://github.com/yuhonas/free-exercise-db', license: 'Unlicense', licenseUrl: 'https://unlicense.org/', attribution: 'Free Exercise DB — yuhonas y colaboradores' };
const imageUrl = path => new URL(path.split('/').map(encodeURIComponent).join('/'), mediaBase).href;

export function mediaFor(e) {
  const images = e.images.map(imageUrl);
  const variants = mediaRecords.filter(m => m.exerciseId === e.id).map(({exerciseId, ...m}) => m);
  const animation = variants.find(m => m.type === 'video') || variants.find(m => m.type === 'gif') || null;
  return { thumbnailUrl: images[0] || null, images, animation, imageSequence: images.length > 1 ? { type: 'image-sequence', frames: images, intervalMs: 1000, description: 'Posiciones de inicio y fin; no es video ni movimiento continuo.', ...source } : null, variants, attribution: source.attribution };
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
    equipment: e.equipment || 'unknown', difficulty: e.level, category: e.category,
    mechanic: e.mechanic, force: e.force, popular: Boolean(translations[e.id]),
    media: mediaFor(e), source,
  };
}

const byId = new Map(rawExercises.map(e => [e.id, e]));
const index = new Map(rawExercises.map(e => [e.id, normalize([e.name, translations[e.id]?.name, ...(translations[e.id]?.aliases || []), ...e.primaryMuscles, ...e.secondaryMuscles, ...e.primaryMuscles.map(m => labels.muscles[m]), labels.equipment[e.equipment], e.equipment].join(' '))]));
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
    (!difficulty || e.level === difficulty) && (!category || e.category === category) &&
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
export const catalogVersion = createHash('sha256').update(JSON.stringify({rawExercises, translations, mediaRecords, mediaBase})).digest('hex').slice(0, 16);
export function stats() {
  return { version: catalogVersion, total: rawExercises.length, spanish: Object.keys(translations).length, popular: Object.keys(translations).length, withImages: rawExercises.filter(e => e.images.length).length, withImageSequence: rawExercises.filter(e => e.images.length > 1).length, withAnimation: new Set(mediaRecords.map(m => m.exerciseId)).size, mediaHosting: 'external', languages: ['en', 'es'] };
}
