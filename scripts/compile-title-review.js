// Freeze the observations behind explicit, per-ID title decisions.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {batches} from './title-review-decisions.js';
import {rawExercises} from '../src/catalog.js';
import {sources as terminologySources} from './spanish-editorial.js';
const root=new URL('../',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,root),'utf8'));
const write=(path,data)=>writeFileSync(new URL(path,root),JSON.stringify(data,null,2)+'\n');
const hash=value=>createHash('sha256').update(value).digest('hex');
const baselinePath='data/localization/es-MX.title-baseline.json';
if(!existsSync(new URL(baselinePath,root))){const current=read('data/translations.es.json');write(baselinePath,Object.fromEntries(rawExercises.map(e=>[e.id,{name:current[e.id].name,aliases:current[e.id].aliases}])));}
const baseline=read(baselinePath);
const records=read('reports/spanish-localization-review.json').records;
const sheets=read('data/localization/es-MX.title-review-sheets.json');
const targetPath='data/localization/es-MX.title-review.json';
const previous=existsSync(new URL(targetPath,root))?new Map(read(targetPath).records.map(e=>[e.id,e])):new Map();
const decisions=new Map();
for(const batch of batches){
  const ids=[...batch.confirmed,...Object.keys(batch.edits),...Object.keys(batch.pending)];
  const sheet=sheets.find(sheet=>sheet.sheet===batch.sheet);
  if(!sheet||ids.length!==sheet.ids.length||new Set(ids).size!==ids.length||sheet.ids.some(id=>!ids.includes(id)))throw Error(`Hoja incompleta o duplicada: ${batch.sheet}`);
  for(const id of ids){if(decisions.has(id))throw Error(`Decisión duplicada: ${id}`);decisions.set(id,{sheet:batch.sheet,name:batch.edits[id]?.[0]||baseline[id].name,aliases:batch.edits[id]?.[1]||[],status:batch.pending[id]?'pending-review':'verified',reason:batch.pending[id]||null});}
}
const reviewed=records.map(row=>{
  const e=rawExercises.find(e=>e.id===row.id);
  const original={name:e.name,instructions:e.instructions,equipment:e.equipment,flowInstructions:e.flowRecord?.instructions||null};
  const evidence={originalSha256:hash(JSON.stringify(original)),frames:(e.flowRecord?.animation?.frames||[]).map(path=>({path,sha256:hash(readFileSync(new URL('data/flow-exercise-dataset/'+path,root)))}))};
  const old=previous.get(row.id);
  if(old?.evidence&&JSON.stringify(old.evidence)!==JSON.stringify(evidence))throw Error(`Cambió la evidencia revisada: ${row.id}`);
  const decision=decisions.get(row.id);
  return {id:row.id,before:baseline[row.id].name,name:decision?.name||baseline[row.id].name,aliases:decision?.aliases||[],status:decision?.status||'not-reviewed',reason:decision?.reason||(!decision?'Aún no se ha contrastado individualmente con los tres cuadros.':null),sheet:decision?.sheet||null,evidence};
});
if(decisions.size!==rawExercises.length)throw Error('La revisión no cubre todo el catálogo activo.');
const sources=[...terminologySources,
  {id:'meadows-kayak',url:'https://www.youtube.com/watch?v=LjjCyjY9tGw',scope:'Referencia primaria de John Meadows, Thibaudeau kayak rows. Se consultó la descripción indexada; la reproducción del video no estuvo disponible. No se afirma haber visto el video.'},
  {id:'hercules-kayak',url:'https://www.hercules-gym.com/es/exercises/cable-kayak-row',scope:'Contraste adicional de kayak: de pie, polea alta y tracción alterna hacia las caderas. La ficha flow-2464 no coincide.'},
];
const summary={total:reviewed.length,inspected:decisions.size,verified:reviewed.filter(e=>e.status==='verified').length,pending:reviewed.filter(e=>e.status==='pending-review').length,notReviewed:reviewed.filter(e=>e.status==='not-reviewed').length,changed:reviewed.filter(e=>e.name!==e.before).length,withNewAliases:reviewed.filter(e=>e.aliases.length).length};
write(targetPath,{scope:'titles-only',method:'Per-ID comparison of original instructions, equipment and three rendered animation frames; explicit authored decisions, no automatic title replacement.',summary,sources,records:reviewed});
const cell=value=>String(value).replaceAll('|','\\|').replaceAll('\n',' ');
const lines=['# Revisión de títulos del catálogo: español de México','',
  `Revisadas: **${summary.inspected}/${summary.total}**. Títulos confirmados: **${summary.verified}**; modificados: **${summary.changed}**; pendientes: **${summary.pending}**; sin procesar: **${summary.notReviewed}**. ${summary.withNewAliases} fichas incorporan alias editoriales.`, '',
  '## Alcance y evidencia','',
  'Se leyó cada título junto con sus instrucciones originales y equipo, y se inspeccionaron los tres cuadros SVG locales de cada ficha (3,771 cuadros, 140 láminas). Las decisiones son individuales por ID. Las huellas SHA-256 permiten detectar cambios posteriores en los textos originales o las imágenes. El índice de láminas se conserva en `data/localization/es-MX.title-review-sheets.json`; las láminas se pueden reproducir con `python scripts/render-title-review.py` (PyMuPDF).', '',
  'Las fuentes externas respaldan la terminología de familias; no se afirma haber encontrado una demostración externa independiente de cada variante. Un título confirmado significa que su nombre describe la evidencia del repositorio. No constituye validación clínica ni aprobación de las instrucciones traducidas: se conserva su revisión editorial independiente (12 adaptadas y 1,245 pendientes).', '',
  'Los nombres dudosos conservan el título anterior y se marcan como pendientes. No se renombran con una suposición. Las animaciones SVG y sus atribuciones no se modifican. Los nombres originales en inglés siguen disponibles con `lang=en` y `nameEn`; los alias anteriores se conservan y se agregan alternativas útiles, sin agregar las malas traducciones como alias nuevos.', '',
  '## Ejemplos solicitados','',
  '- `flow-0179`: Cable de vuelo bajo → Aperturas en polea baja. Se confirma trayectoria ascendente desde poleas bajas.',
  '- `flow-0193`: nombre literal de remo unilateral → Remo unilateral de rodillas en polea con el tronco erguido. El texto sitúa la polea a la cintura y los cuadros muestran tracción horizontal; no se añade una trayectoria alta sin respaldo.',
  '- `flow-2464`: pendiente. La etiqueta Thibaudeau kayak row no coincide con las instrucciones y cuadros de remo unilateral sentado en polea baja. La referencia externa describe una ejecución de pie desde polea alta. No se aprueba el alias kayak como nombre de ese movimiento.', '',
  '## Fuentes consultadas','',...sources.map(s=>`- [${s.id}](${s.url}): ${s.scope}`),'',
  '## Títulos modificados','', '| ID | Antes | Después | Alias añadidos |','| --- | --- | --- | --- |',
  ...reviewed.filter(e=>e.name!==e.before).map(e=>`| ${e.id} | ${cell(e.before)} | ${cell(e.name)} | ${cell(e.aliases.join('; '))} |`),'',
  '## Pendientes de revisión','', 'Todos estos ejercicios sí fueron inspeccionados. Requieren resolver el conflicto indicado antes de aprobar un título nuevo.','', '| ID | Título original en inglés | Motivo |','| --- | --- | --- |',
  ...reviewed.filter(e=>e.status==='pending-review').map(e=>`| ${e.id} | ${cell(rawExercises.find(x=>x.id===e.id).name)} | ${cell(e.reason)} |`),'',
  'El registro completo, incluidos títulos confirmados sin cambios, alias y huellas de evidencia, está en [es-MX.title-review.json](../data/localization/es-MX.title-review.json).',''];
writeFileSync(new URL('reports/TITLE-REVIEW-ES-MX.md',root),lines.join('\n'));
console.log(summary);
