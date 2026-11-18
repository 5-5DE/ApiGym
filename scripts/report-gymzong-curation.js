import { readFileSync, writeFileSync } from 'node:fs';
import { rawExercises, getExercise, exerciseFamilies, gymCuration, catalogVersion } from '../src/catalog.js';

const translations = JSON.parse(readFileSync(new URL('../data/translations.es.json',import.meta.url),'utf8'));
const before = rawExercises.filter(e => !translations[e.id]?.aliases.length).length;
const after = rawExercises.filter(e => !getExercise(e.id).aliases.length).length;
const added = rawExercises.flatMap(e => getExercise(e.id).aliases.filter(alias => !translations[e.id].aliases.includes(alias)).map(alias => ({id:e.id,alias})));
const families = exerciseFamilies();
const cell = value => String(value).replaceAll('|','\\|').replaceAll('\n',' ');
const lines = [
  '# Fase 3: alias mexicanos y familias', '',
  `Versión de catálogo: \`${catalogVersion}\`. Ejercicios: ${rawExercises.length}.`, '',
  `${families.length} familias; ${families.reduce((n,f)=>n+f.exerciseIds.length,0)} fichas clasificadas; ${gymCuration.pendingFamilyCandidates.length} candidatas de familia pendientes por conflictos de título. Las demás fichas exponen familyId:null, no una familia inferida automáticamente.`, '',
  `Sin alias antes: ${before}; después: ${after}. Alias añadidos respecto a las traducciones persistidas: ${added.length}. Los alias anteriores se conservan.`, '',
  '## Familias y representantes', '',
  '| Familia | ID estable | Representante | Variantes clasificadas |', '| --- | --- | --- | --- |',
  ...families.map(f => `| ${cell(f.name)} | ${f.id} | ${f.defaultExerciseId} | ${f.exerciseIds.length} |`), '',
  'Los representantes son decisiones editoriales explícitas. No eliminan variantes ni convierten una selección general en equivalencia biomecánica. Los IDs actuales, instrucciones, textos originales y medios permanecen intactos.', '',
  '## Alias añadidos por ID', '', '| ID | Alias nuevo |', '| --- | --- |',
  ...added.map(row => `| ${row.id} | ${cell(row.alias)} |`), '',
  '## Clasificaciones pendientes', '', '| ID | Familia propuesta | Motivo registrado |', '| --- | --- | --- |',
  ...gymCuration.pendingFamilyCandidates.map(row => `| ${row.exerciseId} | ${row.familyId} | ${cell(row.reason)} |`), '',
  'flow-0599 conserva título pendiente, familyId:null y best:null. La fase 4 confirmó flow-0237 como pullover con cuerda y lo incorporó a su familia. No se fuerza una variante de otra postura o accesorio para resolver un título pendiente.', '',
  '## Evidencia y reproducción', '',
  'Decisiones: scripts/gymzong-curation-decisions.js. Datos compilados: data/gymzong-curation.es-MX.json. La evidencia por ID referencia los hashes de textos originales y cuadros SVG de la revisión anterior de títulos. En esta fase se inspeccionaron también los tres cuadros de los destinos de alias y de todos los representantes mediante láminas locales. La agrupación de los demás miembros utiliza las decisiones explícitas de título ya existentes; no se declara una nueva revisión técnica de todo el catálogo.', '',
  'Reconstrucción sin red: npm run curation:compile. Informe: npm run curation:report. Láminas de alias y representantes: python scripts/render-gymzong-curation.py (PyMuPDF), en dist/gymzong-phase3/. Los alias complementarios se aplican en lectura y no se pierden al ejecutar localization:build.', '',
  'La versión de catálogo incorpora estos datos. El resolver usa resolverVersion:3. essential-50 sigue pendiente de corregir su contrato y versión en la fase 6.', '',
];
writeFileSync(new URL('../reports/GYMZONG-CURATION.md',import.meta.url),lines.join('\n'));
console.log(JSON.stringify({catalogVersion,families:families.length,assigned:families.reduce((n,f)=>n+f.exerciseIds.length,0),withoutAliasesBefore:before,withoutAliasesAfter:after,addedAliases:added.length}));
