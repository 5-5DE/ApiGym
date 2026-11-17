// Rebuilds persisted localization and its per-record audit WITHOUT network access.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rawExercises } from '../src/catalog.js';
import { editorialName, sources } from './spanish-editorial.js';
import { applyReviewedTitles } from './apply-reviewed-titles.js';
const root = new URL('../', import.meta.url);
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const write = (path, value) => writeFileSync(new URL(path, root), JSON.stringify(value, null, 2) + '\n');
const legacyPath = 'data/localization/es-MX.previous-translations.json';
if (!existsSync(new URL(legacyPath, root))) write(legacyPath, read('data/translations.es.json'));
const legacy = read(legacyPath);
const drafts = read('data/localization/es-MX.machine-drafts.json');
const adaptations = read('data/localization/es-MX.adaptations.json');
const names = Object.fromEntries(readFileSync(new URL('data/localization/es-MX.names.tsv',root),'utf8').trim().split(/\r?\n/).map(line=>line.split('\t')));
const clean = text => text.replace(/\s+/g, ' ').trim();
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const draftEdits = [
  [/\b(?:crujido|crujidos|crujiente)\b/gi, 'crunch'], [/\bjersey\b/gi, 'pullover'],
  [/\btendones? de la corva\b/gi, 'isquiotibiales'], [/\bmúsculos centrales\b/gi, 'músculos del abdomen'],
  [/\b(?:núcleo|core)\b/gi, 'abdomen'], [/\bestocada(s)?\b/gi, 'desplante$1'],
  [/\bPárese\b/g, 'Colócate de pie'], [/\bSiéntese\b/g, 'Siéntate'], [/\bAcuéstese\b/g, 'Acuéstate'],
  [/\bMantenga\b/g, 'Mantén'], [/\bSostenga\b/g, 'Sostén'], [/\bAgarre\b/g, 'Sujeta'], [/\bSujete\b/g, 'Sujeta'],
  [/\bColoque\b/g, 'Coloca'], [/\bLevante\b/g, 'Eleva'], [/\bBaje\b/g, 'Baja'], [/\bRegrese\b/g, 'Regresa'],
  [/\bRepita\b/g, 'Repite'], [/\bContinúe\b/g, 'Continúa'], [/\bDoble\b/g, 'Flexiona'], [/\bExtienda\b/g, 'Extiende'],
];
const editDraft = text => draftEdits.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
const translations = structuredClone(legacy);
const records = [];
for (const e of rawExercises) {
  const originalName = e.name.replace(/\s*\(?\b(?:male|female)\b\)?/gi, '').trim();
  const original = {name:e.name, instructions:e.instructions, equipment:e.equipment, flowInstructions:e.flowRecord?.instructions || null};
  const specific = adaptations[e.id];
  const proposedName = editorialName(e.name);
  const draftName = drafts[clean(originalName)];
  if (!draftName || e.instructions.some(step => !drafts[clean(step)])) throw new Error(`Falta borrador: ${e.id}`);
  let name = specific?.name || names[e.id] || legacy[e.id]?.name || proposedName || editDraft(draftName);
  name = name[0].toLocaleUpperCase('es-MX') + name.slice(1);
  const reasons = [];
  if (!specific) reasons.push({code:'editorial-review-required',detail:'Borrador: falta reescritura editorial y contraste individual de la variante; no se declara investigado ni técnicamente validado.'});
  // These are leads for a reviewer, not automatic diagnoses or corrections.
  const text = e.instructions.join(' ').toLowerCase();
  if (/hammer curl/.test(e.name.toLowerCase()) && /palms.*facing forward/.test(text)) reasons.push({code:'grip-conflict',detail:'El título indica martillo, pero el original pide girar las palmas al frente. Confirmar agarre en la ilustración; no sustituirlo silenciosamente.'});
  if (/assisted/.test(e.name.toLowerCase()) && !/partner|assist|pad|band|towel|help|support/.test(text)) reasons.push({code:'assistance-unspecified',detail:'El título indica asistencia; las instrucciones no identifican cómo se proporciona.'});
  if (/v\.\s*\d/.test(e.name)) reasons.push({code:'numbered-variant',detail:'La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.'});
  if (!specific && !proposedName && !legacy[e.id]) reasons.push({code:'name-review-required',detail:'El nombre es provisional: falta comprobar la denominación habitual y el movimiento exacto.'});
  const sex = e.name.match(/\b(male|female)\b/i)?.[1].toLowerCase() || null;
  translations[e.id] = {
    name, aliases: [...new Set([...(specific?.aliases || legacy[e.id]?.aliases || []), ...(/push.up/i.test(e.name) ? ['lagartijas'] : [])])],
    instructions: specific?.instructions || e.instructions.map(step => editDraft(drafts[clean(step)])),
    popular: Boolean(legacy[e.id]), locale:'es-MX', status:specific ? 'adapted' : 'pending-review',
    method:specific ? 'source-checked-editorial-rewrite' : 'machine-draft-with-terminology-normalization',
    sourceRefs:specific?.sources || [], originalSha256:hash(original),
    reviewReasons:reasons, visualReview:specific?.visualReview || 'not-performed', illustrationMetadata:{personDepicted:sex},
  };
  records.push({id:e.id,original,originalSha256:hash(original),nameEs:name,status:translations[e.id].status,method:translations[e.id].method,sourceRefs:translations[e.id].sourceRefs,reasons,visualReview:translations[e.id].visualReview,frames:e.flowRecord?.animation?.frames || [],illustrationMetadata:{personDepicted:sex}});
}
for(const id of Object.keys(adaptations))if(!records.some(record=>record.id===id))throw new Error(`Adaptación huérfana: ${id}`);
applyReviewedTitles(translations,records);
write('data/translations.es.json', translations);
const adapted = records.filter(record => record.status === 'adapted').length;
const visuallyInspected = records.filter(record=>record.visualReview==='inspected-three-frames').length;
const report = {locale:'es-MX',scope:'active-api-catalog',counts:{total:records.length,processed:records.length,spanishDraftOrAdaptation:records.length,adapted,pending:records.length-adapted,unprocessed:0,visuallyInspected},complete:false,limitations:'Cobertura lingüística completa con borradores; la adaptación editorial y verificación de variantes NO están terminadas. Adapted indica contraste textual y reescritura, no certificación profesional. Inspected-three-frames significa inspección de los tres cuadros SVG para comprobar el patrón representado, no aprobación profesional de la técnica ni de los derechos de la imagen.',sources,records};
write('reports/spanish-localization-review.json',report);
writeFileSync(new URL('reports/SPANISH-LOCALIZATION-REVIEW.md',root),[
 '# Revisión de localización es-MX', '',
 `Catálogo activo: ${records.length}. Registros procesados: ${records.length}. Adaptaciones con reescritura y contraste textual: ${adapted}. Borradores pendientes: ${records.length-adapted}. Sin procesar en el inventario: 0. Ilustraciones inspeccionadas (tres cuadros): ${visuallyInspected}.`, '',
 '**La adaptación editorial integral de las instrucciones no está terminada.** Los borradores no son instrucciones técnicamente validadas. La revisión posterior de títulos sí cubre las 1,257 fichas y sus tres cuadros; sus resultados y conflictos están en [TITLE-REVIEW-ES-MX.md](TITLE-REVIEW-ES-MX.md). Esa revisión no aprueba automáticamente las instrucciones. La inspección visual comprueba el patrón representado y no certifica la técnica.', '',
 '## Arquitectura y trazabilidad', '',
 '`data/upstream/free-exercise-db.json` y `data/flow-exercise-dataset/data/exercises.json` permanecen intactos. `src/catalog.js` resuelve identidades antes de localizar. Los 812 registros retirados no vuelven a la API. Los textos anteriores se conservan en `data/localization/es-MX.previous-translations.json`. Las modificaciones editoriales reproducibles están en `es-MX.adaptations.json`; los borradores de Google Translate están separados en `es-MX.machine-drafts.json`. `npm run localization:build` trabaja sin red. El servidor solo lee los resultados persistidos.', '',
 'La respuesta conserva los campos existentes, agrega `instructionsEn` y `localizationReview`, y permite `lang=en`. `popular` conserva la selección previa, independiente de la nueva cobertura de traducción. Male/female se retira del título y se conserva como metadato de la persona representada.', '',
 '## Fuentes realmente consultadas', '',
 ...sources.map(source=>`- [${source.id}](${source.url}): ${source.scope}`), '',
 'Estas fuentes fundamentan terminología por familias; no se asignan como prueba de investigación individual a un borrador. Cada adaptación concreta declara sus referencias. No se copiaron instrucciones de sitios externos.', '',
 '## Casos pendientes', '',
 'La lista completa, con ID, motivo, original y rutas de ilustración, está en `spanish-localization-review.json`. No se ocultan pendientes en un porcentaje general. Además de la falta de revisión editorial, se detectan posibles conflictos de agarre, asistencia sin describir y variantes numeradas. Las alertas son indicios para revisión, no conclusiones automáticas.', '',
 ...records.filter(record=>record.reasons.some(reason=>reason.code!=='editorial-review-required'&&reason.code!=='name-review-required')).map(record=>`- \`${record.id}\` (${record.original.name}): ${record.reasons.filter(reason=>reason.code!=='editorial-review-required'&&reason.code!=='name-review-required').map(reason=>reason.detail).join(' ')}`), '',
 '## Cómo cerrar un pendiente', '',
 'Contrastar título, instrucciones, equipo y todos los cuadros de la ilustración; consultar una fuente primaria para la variante exacta; registrar denominación habitual, alias, pasos y referencias en `data/localization/es-MX.adaptations.json`. Si existe contradicción sin resolver, conservar el estado pendiente y su motivo. Ejecutar `npm run localization:build`, `npm run localization:check`, `npm test` y `npm run check`.', '',
].join('\n'));
console.log(JSON.stringify(report.counts,null,2));
