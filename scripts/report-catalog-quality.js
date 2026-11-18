import { readFileSync, writeFileSync } from 'node:fs';
import { rawExercises, getExercise, stats, catalogVersion, catalogQuality } from '../src/catalog.js';
import { formalAddressFindings } from './spanish-tu.js';

const read = path => JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const baseline=read('data/localization/es-MX.phase5-baseline.json');
const translations=read('data/translations.es.json');
const duplicateCount = rows => {
  const groups=new Map();for(const row of rows)groups.set(row.name,(groups.get(row.name)||0)+1);
  return [...groups.values()].filter(n=>n>1).length;
};
const before={unknownDifficulty:rawExercises.filter(e=>!e.level||e.level==='unknown').length,missingMechanic:rawExercises.filter(e=>!e.mechanic).length,missingForce:rawExercises.filter(e=>!e.force).length,unknownEquipment:rawExercises.filter(e=>!e.equipment||e.equipment==='unknown').length,popular:rawExercises.filter(e=>translations[e.id].popular).length,duplicateNames:duplicateCount(rawExercises.map(e=>baseline[e.id]))};
const current=rawExercises.map(e=>getExercise(e.id));
const after={unknownDifficulty:current.filter(e=>e.difficulty==='unknown').length,missingMechanic:current.filter(e=>!e.mechanic).length,missingForce:current.filter(e=>!e.force).length,unknownEquipment:current.filter(e=>e.equipment==='unknown').length,popular:stats().popular,duplicateNames:duplicateCount(current)};
const grammaticalChanges=current.filter(e=>JSON.stringify(e.instructions)!==JSON.stringify(baseline[e.id].instructions));
const formalBefore=rawExercises.map(e=>baseline[e.id]).filter(e=>e.instructions.some(s=>formalAddressFindings(s).length));
const formalAfter=current.filter(e=>e.instructions.some(s=>formalAddressFindings(s).length));
const cell=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const lines=[
  '# Fase 5: español y metadatos', '',
  `Catálogo: \`${catalogVersion}\`. ${current.length} IDs y animaciones conservados. Datos: data/catalog-quality.es-MX.json.`, '',
  '## Resultados medidos', '', '| Indicador | Antes | Después |', '| --- | --- | --- |',
  ...Object.keys(before).map(k=>`| ${k} | ${before[k]} | ${after[k]} |`),
  `| Fichas con indicadores conocidos de tratamiento formal (heurística contextual) | ${formalBefore.length} | ${formalAfter.length} |`, '',
  `Se normalizaron instrucciones en ${grammaticalChanges.length} fichas. La corrección de registro no cambia sus cantidades ni aprueba su técnica: ${stats().spanishAdapted} adaptaciones contrastadas y ${stats().spanishPendingReview} borradores siguen con su estado anterior. El detector no es un análisis gramatical completo ni demuestra que cada frase sea una traducción perfecta.`, '',
  '## Correcciones de lenguaje', '',
  'Se unifican imperativos, pronombres y posesivos de la persona lectora a tú. Las reglas conservan sustantivos como agarre/empuje, negativas como no bloquees, y subjuntivos de terceros como deja que la barra baje o pide a tu compañero que tire. Las cantidades, instrucciones inglesas y fuentes originales permanecen intactas.', '',
  'Se distinguen todos los títulos españoles repetidos. Cuando no hay evidencia de una diferencia biomecánica se usa ilustración 2/3, sin inventarla ni fusionar IDs; las vistas posterior/lateral solo se usan cuando están declaradas por la fuente. Los títulos comunes anteriores de estos grupos permanecen como alias y pueden seguir siendo ambiguos para el resolver.', '',
  '| ID | Nombre anterior | Nombre visible | Método |', '| --- | --- | --- | --- |',
  ...Object.entries(catalogQuality.entries).filter(([,r])=>r.displayName).map(([id,r])=>`| ${id} | ${cell(r.previousName)} | ${cell(r.displayName)} | ${r.nameCorrection} |`), '',
  'Los nombres que tenían conflictos de agarre, postura o identificación conservan titleReview.status=pending-review y el límite de confianza. Una corrección lingüística no confirma que flow-2464 sea un remo kayak ni que el agarre de flow-1640 sea martillo.', '',
  '## Codificación inglesa', '',
  'flow-0738, flow-0739, flow-0740 y flow-1464 exponen 45° en nameEn y en el nombre de lang=en. nameEnOriginal conserva literalmente el texto roto del snapshot. No se edita el archivo original.', '',
  '## Metadatos y procedencia', '',
  'La equivalencia con un registro de Free Exercise DB exige un nombre con las mismas palabras (solo se omite una vista posterior/lateral declarada), equipo compatible, coincidencia de músculo principal y título verificado. No usa parecido difuso. Solo completa campos vacíos y registra el ID de referencia. No fusiona los ejercicios ni afirma que sus instrucciones sean idénticas.', '',
  'La clasificación de mecánica y fuerza de los básicos se declara por ID, con acciones articulares y referencia terminológica; solo completa vacíos. flow-1301 tiene una corrección explícita pull→push, respaldada por su texto de empuje. La dificultad de las dos vistas del press sentado se contrasta con ACE. La ampliación posterior completa los vacíos mediante estimaciones por familia y modificadores explícitos de complejidad. Sus fuentes no certifican individualmente cada variante: véase [investigación de metadatos](GYMZONG-METADATA-RESEARCH.md).', '',
  'Las fichas exponen metadataReview por campo: value, original, basis y reference. Sus hashes se comprueban al cargar. Las trece fichas sin equipo adoptan el peso corporal indicado por Flow. kettlebell es el único ID canónico de pesa rusa; kettlebells sigue aceptándose como alias del filtro, con los mismos resultados.', '',
  '## Selección de 150 básicos', '',
  'Lista explícita en scripts/catalog-quality-decisions.js. Es editorial, no un ranking de uso ni una rutina. Conserva los diez anteriores; Russian_Twist mantiene su conflicto previo y no recibe una aprobación técnica por ser popular. El visor tiene una colección de 150 básicos, independiente de los diez esenciales históricos que se revisarán en la fase 6.', '',
  '| ID | Nombre |', '| --- | --- |',
  ...catalogQuality.popularIds.map(id=>`| ${id} | ${cell(getExercise(id).name)} |`), '',
  '## Pendientes que no se ocultan', '',
  `Quedan ${after.unknownDifficulty} dificultades sin clasificar, ${after.missingMechanic} mecánicas vacías y ${after.missingForce} fuerzas vacías. Los campos completados por familia son orientativos y los conflictos de identidad conservan status=provisional-identity. Siguen ${stats().spanishPendingReview} traducciones pendientes de revisión editorial/técnica integral. Los cuatro ejercicios sin animación permanecen en espera según la decisión del usuario.`, '',
  '## Fuentes y reproducción', '',
  ...Object.entries(catalogQuality.sources).map(([id,url])=>`- [${id}](${url})`), '',
  'Reconstrucción sin red: npm run localization:build y npm run quality:compile. Informe: npm run quality:report. La línea base anterior a esta fase está en data/localization/es-MX.phase5-baseline.json. Las normalizaciones no modifican los snapshots originales, IDs ni medios. Pruebas: test/quality.test.js.', '',
];
writeFileSync(new URL('../reports/GYMZONG-QUALITY.md',import.meta.url),lines.join('\n'));
writeFileSync(new URL('../reports/gymzong-quality-summary.json',import.meta.url),JSON.stringify({catalogVersion,before,after,grammaticallyChanged:grammaticalChanges.length,formalAddress:{before:formalBefore.length,after:formalAfter.length,heuristic:true}},null,2)+'\n');
console.log(JSON.stringify({before,after,grammaticallyChanged:grammaticalChanges.length,formalAddress:{before:formalBefore.length,after:formalAfter.length}}));
