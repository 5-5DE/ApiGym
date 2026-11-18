import { readFileSync, writeFileSync } from 'node:fs';
import { catalogVersion, coverageReview, getExercise, rawExercises, stats } from '../src/catalog.js';

const upstream = JSON.parse(readFileSync(new URL('../data/upstream/free-exercise-db.json',import.meta.url),'utf8'));
const flow = JSON.parse(readFileSync(new URL('../data/flow-exercise-dataset/data/exercises.json',import.meta.url),'utf8'));
const titleReview = JSON.parse(readFileSync(new URL('../data/localization/es-MX.title-review.json',import.meta.url),'utf8'));
const cell = value => String(value).replaceAll('|','\\|');
for (const request of coverageReview.requests) {
  if (request.status === 'available' && !request.exerciseIds.length) throw new Error(`Missing active ID: ${request.requestId}`);
  for (const id of request.exerciseIds) if (!getExercise(id)?.media.animation) throw new Error(`Missing animation: ${id}`);
  for (const id of request.historicalIds) if (!upstream.some(e => e.id === id) || getExercise(id)) throw new Error(`Historical pending ID changed: ${id}`);
}
const lines = [
  '# Fase 4: cobertura y nombres', '',
  `Catálogo: \`${catalogVersion}\`; ${rawExercises.length} fichas activas y ${stats().withAnimation} animaciones SVG. Se conservan los IDs y los medios existentes.`, '',
  '**Decisión del usuario:** esperar animaciones verificadas antes de incorporar ejercicios ausentes. No se crean fichas de texto sin animación ni se reutilizan imágenes de otro movimiento.', '',
  '## Resultado de cada petición', '', '| Petición | Estado | IDs activos | Motivo |', '| --- | --- | --- | --- |',
  ...coverageReview.requests.map(row => `| ${cell(row.name)} | ${row.status} | ${row.exerciseIds.join(', ') || '—'} | ${cell(row.reason)} |`), '',
  '## Correcciones realizadas', '',
  '- flow-0228: Patada de glúteo de pie en polea. El texto original indicaba ponerse de espaldas; los tres cuadros muestran frente a la máquina. La adaptación española se reescribió con contraste de una fuente primaria del ejercicio y los cuadros. instructionsEn permanece intacto y localizationReview.reasons registra original-orientation-corrected.',
  '- flow-0213: Remo sentado en polea con agarre en V. Se añaden triángulo y sus variantes de búsqueda. La fuente lo llamaba high row, pero el texto y los cuadros muestran tracción horizontal; no se conserva esa afirmación en español ni se alteran los originales.',
  '- flow-0576 y flow-0577: Press de pecho sentado en máquina. Se aclara la postura, manteniendo ambos IDs y flow-0576 como representante de la familia.',
  '- flow-1301: se corrige Aperturas de pecho sentado en máquina a Press de pecho sentado en máquina. El alias erróneo aperturas en máquina de palanca se retira de esta ficha; no se mantiene como sinónimo de press. No se fusiona con los otros IDs.',
  '- flow-0237: Pullover con cuerda en polea alta. La advertencia anterior atribuía al texto una flexión de codos de 90 grados inexistente. El original indica brazos extendidos y coincide con los cuadros. Se cierra la revisión del título, sin aprobar automáticamente sus instrucciones traducidas.', '',
  '## Revisiones que siguen abiertas', '',
  ...coverageReview.additionalReviews.filter(row=>row.status==='pending-review').map(row=>`- ${row.id}: ${row.reason}`),
  '- flow-2286 no se considera patada de glúteo: muestra empuje sentado. No se cambia su identidad por la similitud del nombre inglés.',
  '- Los nombres duplicados y la calidad general del español siguen en la fase 5. La incorporación de los cuatro ejercicios pendientes de medios requiere otra entrega con animaciones verificadas.', '',
  '## Alcance de la búsqueda de faltantes', '',
  `Se revisaron nombres, IDs y registros en los ${rawExercises.length} ejercicios activos, ${upstream.length} registros del snapshot Free Exercise DB y ${flow.length} de Flow. Face_Pull y Front_Plate_Raise están en el snapshot histórico pero no tienen animación local y continúan retirados. No se afirma que los movimientos no existan fuera de estas fuentes.`, '',
  '## Fuentes consultadas', '',
  ...[...new Set(coverageReview.requests.flatMap(row=>row.sources))].map(url=>`- [${new URL(url).hostname}](${url})`), '',
  'Las fuentes externas se utilizaron para contrastar identidad y terminología. No se copiaron imágenes, vídeos ni instrucciones completas. Los cuadros locales de 1301, 0213, 0228, 2286, 0599, 0237, 0576 y 0577 se inspeccionaron durante esta fase. La evidencia SHA-256 se conserva en data/localization/es-MX.title-review.json; los originales y las licencias permanecen intactos.', '',
  `Títulos verificados: ${titleReview.summary.verified}; pendientes: ${titleReview.summary.pending}. Adaptaciones españolas contrastadas: ${stats().spanishAdapted}; traducciones pendientes: ${stats().spanishPendingReview}. Estas cifras no representan aprobación profesional de la técnica.`, '',
  '## API y visor', '',
  'Al buscar el nombre completo de un faltante conocido, la lista y el resolver añaden unavailable con requestId (identifica la petición, no un ejercicio activo), nombre, estado awaiting-verified-animation y motivo. El resolver devuelve best:null y alternatives:[] para no proponer otra variante como sustitución. El visor avisa que falta una animación verificada; si la búsqueda tolerante devuelve otras fichas, las identifica como coincidencias de palabras.', '',
  'Reconstrucción editorial: npm run titles:compile, npm run localization:build y npm run curation:compile, en ese orden. Informes: npm run curation:report y npm run coverage:report. Pruebas: test/coverage.test.js.', '',
];
writeFileSync(new URL('../reports/GYMZONG-COVERAGE.md',import.meta.url),lines.join('\n'));
console.log(JSON.stringify({catalogVersion,available:coverageReview.requests.filter(row=>row.status==='available').length,awaitingAnimation:coverageReview.requests.filter(row=>row.status==='awaiting-verified-animation').length}));
