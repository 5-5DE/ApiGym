import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rawExercises, getExercise, taxonomy, stats, catalogVersion, catalogPruning } from './catalog.js';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root));
const json = path => JSON.parse(read(path));
export const historicalIds = json('data/gymzong/historical-ids.json');
export const routineReview = json('data/gymzong/routine-review.json');
const removedIds = new Set(catalogPruning.removedIds);
const retainedHistoricalIds = historicalIds.ids.filter(id => !removedIds.has(id));
for (const position of routineReview.positions) {
  position.removedCandidateIds = position.candidateIds.filter(id => removedIds.has(id));
  position.candidateIds = position.candidateIds.filter(id => !removedIds.has(id));
}
export const visualReview = json('data/gymzong/visual-review.json');
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const safePath = path => typeof path === 'string' && /^(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_.-]+$/.test(path) && !path.split('/').some(p => p === '.' || p === '..');

export function validateReadiness(review = routineReview, ids = rawExercises.map(e => e.id)) {
  if (ids.length !== retainedHistoricalIds.length || new Set(ids).size !== ids.length || JSON.stringify([...ids].sort()) !== JSON.stringify(retainedHistoricalIds)) throw new Error('Historical IDs changed');
  if (sha256(read('data/gymzong/routine-original.csv')) !== review.sourceSha256) throw new Error('Routine source changed');
  if (review.positions.length !== 27) throw new Error('Expected 27 routine positions');
  const known = new Set(ids);
  for (const [index, p] of review.positions.entries()) {
    if (p.position !== index + 1 || !p.originalName || !p.humanReview || !p.evidence?.basis) throw new Error('Incomplete position evidence');
    if (p.status !== 'pending' || p.confirmedApiGymId !== null) throw new Error('P4 has no evidence-backed confirmed equivalences');
    if (new Set(p.candidateIds).size !== p.candidateIds.length || p.candidateIds.some(id => !known.has(id))) throw new Error('Unknown or duplicate candidate');
    for (const rejected of p.rejectedCandidates) if (!historicalIds.ids.includes(rejected.id) || p.candidateIds.includes(rejected.id) || !rejected.reason) throw new Error('Invalid rejection');
  }
  return true;
}

export function readinessAudit() {
  validateReadiness();
  const candidates = [...new Set(routineReview.positions.flatMap(p => p.candidateIds))].sort();
  const flow = json('data/flow-exercise-dataset/data/exercises.json');
  const translated = json('data/translations.es.json');
  return {
    baseCommit: historicalIds.baseCommit, catalogVersion, stats: stats(),
    knownStateDiscrepancy: { reportedSpanishDrafts: 303, observedSpanishDrafts: stats().spanish, observedEnglishFallback: rawExercises.length - stats().spanish },
    routinePositions: 27, confirmed: 0, pending: 27,
    atlas: { status: 'not-present-in-base-snapshot', includedInOfflinePackage: false },
    media: { svgSequences: flow.filter(e => e.animation).length, svgFrames: 3771,
      retainedPrompts: 13, missingPrompts: 1244, techniqueReview: 'pending-human-review',
      provenance: 'declared-CC0-with-limited-evidence', productionApproved: false },
    candidates: candidates.map(id => {
      const e = getExercise(id);
      const t = translated[id];
      const raw = rawExercises.find(e => e.id === id);
      const provenance = raw.flowRecord?.animation ? json(`data/flow-exercise-dataset/${raw.flowRecord.animation.provenance}`) : null;
      return { id, name: e.name, nameEn: e.nameEn, equipment: e.equipment, aliases: e.aliases,
        nameReview: t ? 'ai-authored-unreviewed' : 'english-upstream',
        instructionsLanguage: t?.instructions ? 'es' : 'en', instructionsReview: t?.instructions ? 'ai-authored-unreviewed' : 'upstream-unreviewed',
        instructionCount: e.instructions.length, hasSvg: e.media.animation?.type === 'svg-sequence',
        promptEvidence: provenance?.promptEvidence?.status ?? null,
        techniqueReview: 'pending-human-review', visualScreening: visualReview.observations[id] ?? null, source: e.source, dataSources: e.dataSources,
        issue: id === 'Leg_Press' ? 'Alias prensa inclinada narrows generic name; confirm apparatus before using as synonym.' : null };
    }),
  };
}

// Pure, deterministic export: no HTTP request and no change to the public API.
// Preview art requires explicit opt-in and remains unapproved coaching content.
export function buildOfflineFiles({ includePreviewMedia = false } = {}) {
  validateReadiness();
  const files = new Map();
  const put = (path, bytes) => { if (!safePath(path)) throw new Error('Unsafe package path'); files.set(path, Buffer.from(bytes)); };
  const checksums = json('data/flow-exercise-dataset/data/checksums.json');
  const candidates = new Set(routineReview.positions.flatMap(p => p.candidateIds));
  const exercises = rawExercises.map(raw => {
    const exercise = structuredClone(getExercise(raw.id));
    exercise.upstreamMediaStatus = exercise.mediaStatus;
    exercise.mediaStatus = 'none';
    // Attribution links are documentation, never asset dependencies.
    exercise.media = { ...exercise.media, thumbnailUrl: null, animation: null, images: [], variants: [], imageSequence: null };
    if (includePreviewMedia && candidates.has(raw.id) && raw.flowRecord?.animation) {
      const flow = raw.flowRecord;
      const animation = structuredClone(getExercise(raw.id).media.animation);
      animation.frames = flow.animation.frames.map(path => {
        const bytes = read(`data/flow-exercise-dataset/${path}`);
        if (sha256(bytes) !== checksums[path]) throw new Error(`SVG checksum mismatch: ${path}`);
        const text = bytes.toString('utf8');
        if (!/<svg\b/i.test(text) || /<script\b|<foreignObject\b|\son\w+\s*=|javascript:|(?:href|src)\s*=\s*["']\s*(?!#)/i.test(text)) throw new Error(`Unsafe SVG: ${path}`);
        const local = path.replace(/^assets\//, 'media/flow/');
        put(local, bytes);
        return local;
      });
      exercise.media.animation = animation;
      exercise.mediaStatus = 'preview-unreviewed';
      exercise.media.thumbnailUrl = animation.frames[0];
      put(`provenance/${flow.id}.json`, read(`data/flow-exercise-dataset/${flow.animation.provenance}`));
      const provenance = json(`data/flow-exercise-dataset/${flow.animation.provenance}`);
      if (provenance.promptEvidence.path) put(provenance.promptEvidence.path, read(`data/flow-exercise-dataset/${provenance.promptEvidence.path}`));
    }
    return exercise;
  });
  put('catalog.json', encode({ schemaVersion: 1, catalogVersion, data: exercises }));
  put('taxonomy.json', encode({ data: taxonomy('es') }));
  put('routine-review.json', encode(routineReview));
  put('routine-original.csv', read('data/gymzong/routine-original.csv'));
  put('quality-review.json', encode(readinessAudit()));
  put('visual-review.json', encode(visualReview));
  put('historical-ids.json', encode(historicalIds));
  if (includePreviewMedia) {
    const rows = exercises.filter(e => e.media.animation).map(e => `<section><h2>${escapeHtml(e.id)} — ${escapeHtml(e.nameEn)}</h2><p>Equipo declarado: ${escapeHtml(e.equipment)}. Técnica y equivalencia pendientes.</p><p>${escapeHtml(visualReview.observations[e.id]?.concern ?? '')}</p><div>${e.media.animation.frames.map((path, index) => `<figure><img src="${path}" alt="${escapeHtml(e.nameEn)}: cuadro ${index}"><figcaption>Cuadro ${index}</figcaption></figure>`).join('')}</div></section>`).join('\n');
    put('review.html', Buffer.from(`<!doctype html><html lang="es"><meta charset="utf-8"><title>Gym Zong — revisión de SVG</title><style>body{font-family:system-ui;margin:24px;background:#fff;color:#111}section{border-top:1px solid #bbb;break-inside:avoid}h2{font-size:18px}section div{display:flex;flex-wrap:wrap}figure{margin:8px}img{width:240px;height:220px;object-fit:contain;background:#24313e}figcaption{font-size:12px}</style><h1>Material preview sin aprobación técnica</h1><p>Comparar postura, aparato y recorrido con la ejecución real. Los cuadros no establecen tempo, equivalencia ni autorización de terceros. Ver notices y provenance.</p>${rows}</html>`));
  }
  for (const path of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'data/upstream/LICENSE-Free-Exercise-DB.txt', 'data/upstream/manifest.json', 'data/flow-exercise-dataset/LICENSE', 'data/flow-exercise-dataset/ARTWORK-LICENSE', 'data/flow-exercise-dataset/NOTICE.md', 'data/flow-exercise-dataset/IMPORT-MANIFEST.json']) put(`notices/${path}`, read(path));
  put('manifest.json', encode({ schemaVersion: 1, catalogVersion, baseCommit: historicalIds.baseCommit,
    exerciseCount: exercises.length, policy: { previewMediaIncluded: includePreviewMedia, mediaApprovedForInstruction: false, translationsHumanReviewed: false, confirmedRoutineMatches: 0, muscleAssociationsHumanReviewed: false },
    files: [...files].map(([path, bytes]) => ({ path, bytes: bytes.length, sha256: sha256(bytes) })) }));
  verifyOfflineFiles(files);
  return files;
}

export function verifyOfflineFiles(files) {
  const manifest = JSON.parse(files.get('manifest.json') ?? '{}');
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.files) || manifest.exerciseCount !== retainedHistoricalIds.length) throw new Error('Invalid offline manifest');
  if (typeof manifest.policy?.previewMediaIncluded !== 'boolean' || manifest.policy.mediaApprovedForInstruction !== false || manifest.policy.translationsHumanReviewed !== false || manifest.policy.confirmedRoutineMatches !== 0 || manifest.policy.muscleAssociationsHumanReviewed !== false) throw new Error('Invalid P4 review policy');
  const paths = new Set(['manifest.json']);
  for (const entry of manifest.files) {
    if (!safePath(entry.path) || paths.has(entry.path)) throw new Error('Unsafe or duplicate manifest path');
    paths.add(entry.path);
    const bytes = files.get(entry.path);
    if (!bytes || bytes.length !== entry.bytes || sha256(bytes) !== entry.sha256) throw new Error(`Offline integrity failure: ${entry.path}`);
  }
  if (paths.size !== files.size) throw new Error('Unlisted offline files');
  for (const path of ['catalog.json', 'taxonomy.json', 'routine-review.json', 'routine-original.csv', 'quality-review.json', 'visual-review.json', 'historical-ids.json', 'notices/LICENSE', 'notices/THIRD_PARTY_NOTICES.md', 'notices/data/upstream/LICENSE-Free-Exercise-DB.txt', 'notices/data/flow-exercise-dataset/LICENSE', 'notices/data/flow-exercise-dataset/ARTWORK-LICENSE', 'notices/data/flow-exercise-dataset/NOTICE.md']) if (!files.has(path)) throw new Error(`Missing required file: ${path}`);
  const catalog = JSON.parse(files.get('catalog.json'));
  const review = JSON.parse(files.get('routine-review.json'));
  if (sha256(files.get('routine-original.csv')) !== review.sourceSha256) throw new Error('Packaged routine source changed');
  validateReadiness(review, catalog.data.map(e => e.id));
  if (catalog.catalogVersion !== manifest.catalogVersion) throw new Error('Offline version mismatch');
  for (const e of catalog.data) {
    if (e.media.animation) {
      if (!manifest.policy.previewMediaIncluded || e.media.animation.type !== 'svg-sequence') throw new Error('Unexpected offline animation');
      for (const path of e.media.animation.frames) if (!safePath(path) || !files.has(path)) throw new Error('Missing local frame');
    }
    if (e.media.variants.length || e.media.images.length || (e.media.thumbnailUrl && !files.has(e.media.thumbnailUrl))) throw new Error('External offline media');
  }
  return manifest;
}
