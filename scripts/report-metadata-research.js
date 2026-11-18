import {readFileSync,writeFileSync} from 'node:fs';
import {rawExercises,getExercise,catalogVersion} from '../src/catalog.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const write=(p,s)=>writeFileSync(new URL('../'+p,import.meta.url),s);
const research=read('data/metadata-research.es-MX.json');
const baseline=read('data/localization/metadata-research-baseline.json');
const fields=['difficulty','mechanic','force'];
const rows=rawExercises.map(e=>getExercise(e.id));
const absent=v=>!v||v==='unknown';
const counts=Object.fromEntries(fields.map(field=>[field,{
  missingBefore:Object.values(baseline).filter(r=>absent(r[field])).length,
  missingAfter:rows.filter(r=>absent(r[field])).length,
  inheritedOrPreviouslyReviewed:rows.filter(r=>r.metadataReview?.[field]?.basis!=='research-family-estimate').length,
  editorialEstimate:rows.filter(r=>r.metadataReview?.[field]?.status==='editorial-estimate').length,
  provisionalIdentity:rows.filter(r=>r.metadataReview?.[field]?.status==='provisional-identity').length,
}]));
const summary={catalogVersion,exercises:rows.length,families:new Set(research.records.map(r=>r.family)).size,counts,identityConflicts:research.records.filter(r=>r.status==='provisional-identity').length};
const cell=v=>String(v??'').replaceAll('|','\\|').replaceAll('\n',' ');
const text=[
 '# Investigación de dificultad, tipo y acción','',
 `Catálogo: \`${catalogVersion}\`. ${rows.length} ejercicios activos. Revisión del 18 de noviembre de 2026.`, '',
 '## Alcance y método','',
 'Se consultaron fuentes primarias de NSCA, ACE, NASM, HPRC y World Gymnastics para definir familias de movimiento y criterios de clasificación. Se aplicó una rúbrica editorial a cada registro mediante su nombre original, terminología revisada y evidencia de identificación previa. No se consultaron 1,257 páginas externas ni se verificó de nuevo individualmente toda la técnica de las animaciones. Las propuestas por familia son inferencias y se identifican como tales. Los campos originales conocidos y las correcciones documentadas de la fase 5 tienen prioridad; esta ampliación solo completa vacíos.', '',
 'Dificultad significa complejidad técnica orientativa con ejecución controlada. La rúbrica considera apoyo externo, estabilidad, coordinación unilateral, velocidad e integración de movimientos. No equivale a carga, esfuerzo, seguridad individual ni recomendación clínica. Las fuentes no usan una escala universal: por eso una referencia de familia no certifica cada variante.', '',
 'Tipo distingue compuesto, aislamiento e isométrico. Acción distingue empuje, tracción, estática y mixta. Mixta describe tareas que combinan direcciones o fases cíclicas. No aplica queda reservado para tareas como automasaje; no es un reemplazo de unknown. Son extensiones explícitas del contrato y el visor las traduce al español.', '',
 '## Cobertura medida','',
 '| Campo | Vacíos antes | Vacíos después | Original o revisión previa | Estimación editorial | Provisional por identidad |',
 '| --- | ---: | ---: | ---: | ---: | ---: |',
 ...fields.map(f=>`| ${f} | ${Object.values(counts[f]).join(' | ')} |`),'',
 `Se cubren ${summary.families} familias. ${summary.identityConflicts} fichas conservan conflictos de identificación: las nuevas especificaciones de esas fichas llevan status=provisional-identity. Completar metadatos no aprueba sus nombres, traducciones ni instrucciones.`, '',
 '## Trazabilidad y límites','',
 'data/metadata-research.es-MX.json contiene las propuestas, criterios, referencias y hashes originales por ID. data/catalog-quality.es-MX.json contiene únicamente los cambios aplicados. Cada campo nuevo de la API expone metadataReview con basis=research-family-estimate, status, family, criteria y sources. La ficha muestra clasificación orientativa, el aviso provisional cuando corresponde y enlaces a las fuentes.', '',
 'Las observaciones previas por ID prevalecen frente a nombres engañosos. flow-0339 y flow-1338 conservan explícitamente sus conflictos: sus propuestas describen el movimiento representado, sin confirmar el nombre ni su eficacia. También se separaron planchas móviles de sostenidas, movilidad dinámica de estiramiento estático, remos de deltoide de aperturas y sentadillas con agarre clean de cargadas.', '',
 '## Fuentes consultadas','',
 ...Object.entries(research.sources).map(([id,s])=>`- [${id}](${s.url}): ${s.scope}`),'',
 '## Registro de los ejercicios','',
 '| ID | Nombre visible | Dificultad | Tipo | Acción | Familia investigada | Estado de los campos nuevos |',
 '| --- | --- | --- | --- | --- | --- | --- |',
 ...rows.map(e=>{const r=research.records.find(r=>r.id===e.id);const statuses=[...new Set(Object.values(e.metadataReview||{}).filter(p=>p.basis==='research-family-estimate').map(p=>p.status))];return `| ${[e.id,e.name,e.difficulty,e.mechanic,e.force,r.family,statuses.join(', ')||'source-or-prior-review'].map(cell).join(' | ')} |`;}),'',
 '## Reproducción','',
 'npm run research:compile, npm run quality:compile, npm run research:report y npm run quality:report. Sin red: las fuentes y decisiones ya están registradas. La línea base previa a esta ampliación es data/localization/metadata-research-baseline.json. Los compiladores fallan ante IDs sin familia o evidencias vencidas; no hay clasificación genérica de respaldo.', '',
].join('\n');
write('reports/GYMZONG-METADATA-RESEARCH.md',text);
write('reports/metadata-research-summary.json',JSON.stringify(summary,null,2)+'\n');
write('reports/metadata-research-unmatched.json','[]\n');
console.log(JSON.stringify(summary));
