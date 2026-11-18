# Mejoras solicitadas por Gym Zong

Se implementa una fase a la vez. Cada entrega se prueba y queda disponible
localmente para revisión antes de continuar. No se publica automáticamente.

Estado: fases 1 a 4 aprobadas por el usuario; fase 5 implementada y disponible
para revisión. Fase 6 pendiente. Los cuatro ejercicios sin animación
esperan medios verificados por decisión explícita del usuario.

1. Búsqueda: relevancia, coincidencias parciales, plurales y errores de una letra.
2. Resolución: `/exercises/match`, alternativas y abstención ante ambigüedad.
3. Alias mexicanos y familias: nombres cotidianos, `familyId` y variante básica.
4. Cobertura y nombres: contrastar los ejercicios faltantes con datos y medios,
   corregir contradicciones y distinguir variantes sin inventar demostraciones.
5. Español y metadatos: tratamiento de tú, traducciones, codificación, dificultad,
   mecánica, fuerza, equipo y selección ampliada de básicos con evidencia.
6. Operación: reparar `essential-50` y su versión, documentar bajas y sustituciones,
   y evaluar `Last-Modified`.

## Fase 1: búsqueda disponible para revisión

La API mantiene por defecto su búsqueda anterior: todas las palabras como
subcadenas y orden alfabético. La búsqueda tolerante se activa con
`sort=relevance` o con `match=all|any`. El visor del catálogo completo utiliza
`sort=relevance&match=any` cuando se escribe una consulta. La colección de
esenciales mantiene de momento su filtro local anterior.

Ejemplos locales:

- `/api/v1/exercises?q=sentadilla&sort=relevance`
- `/api/v1/exercises?q=sentadillas&sort=relevance`
- `/api/v1/exercises?q=sentadila&sort=relevance`
- `/api/v1/exercises?q=jalon&sort=relevance`
- `/api/v1/exercises?q=remo%20con%20barrita%20negra&sort=relevance&match=any`

En este modo cada ficha de la lista incluye `score` (entero relativo a esa
consulta, no una probabilidad) y `matchedTokens` (términos de la consulta
normalizados sin acentos que coincidieron). No se agregan a la ficha por ID.

Se buscan nombres en ambos idiomas, alias, músculos y equipo; no instrucciones
ni IDs. Se ignoran acentos, mayúsculas, puntuación, orden de palabras y conectores
como «de», «con» y «al». Las reglas conservadoras de plural incluyen «sentadillas»,
«extensiones» y «gemelos». Se admite una inserción, omisión o sustitución por
palabra de al menos cuatro letras. No se admiten dos errores ni se expanden
abreviaturas cortas. No es un diccionario morfológico completo.

`match=all` exige todos los términos significativos; `match=any` exige al menos
uno. Ambos conservan los filtros de músculo, equipo, popularidad y demás.
Una consulta vacía devuelve el catálogo filtrado; una consulta solo de
conectores no devuelve candidatos. `match=any` puede mostrar muchos candidatos:
un resultado no implica que sea el ejercicio correcto de una rutina.

Orden: nombre exacto, alias exacto, prefijo de nombre, prefijo de alias y demás
coincidencias. Dentro de cada nivel se priorizan cobertura de consulta,
coincidencias en el nombre, popularidad existente y menos palabras sobrantes.
Desempates por nombre en el idioma solicitado e ID. Con consulta vacía, el
orden por relevancia equivale al alfabético. `sort=name|id` sigue disponible,
incluso con `match=any`.

No se agregaron alias, familias ni marcas nuevas de popularidad en esta fase.
No se alteraron IDs, traducciones, animaciones ni la versión de datos del catálogo.
El resolver y la selección de variantes básicas corresponden a las fases 2 y 3.

Validación: pruebas de regresión reales de sentadilla y jalón, coincidencias
parciales con filtros, ranking, tolerancia de errores, paginación completa,
compatibilidad anterior, SDK, HTTP, HEAD y ETag/304 en `test/search.test.js`.

## Fase 2: resolver disponible para revisión

Esta sección describe la entrega inicial con `resolverVersion:1`. La fase 3
extiende el contrato con familias y actualiza las reglas a `resolverVersion:2`;
sus cambios se detallan abajo.

`GET /api/v1/exercises/match?name=jalón%20dorsal%20en%20polea&lang=es`

```json
{
  "best": { "id": "flow-0198", "name": "Jalón al pecho en polea alta", "confidence": 0.97 },
  "alternatives": [],
  "reason": "matched",
  "catalogVersion": "de1a61dc98f6d820",
  "resolverVersion": "1"
}
```

El ejemplo abrevia `alternatives`: la respuesta real incluye hasta cinco
alternativas, excluyendo a `best`. Si `best` es `null`, la primera sugerencia
se incluye en `alternatives`. El contrato es plano, sin envoltorio `data`.

`name` es obligatorio, no puede estar vacío ni superar 200 caracteres.
`lang` acepta `es` (predeterminado) y `en`; cambia el nombre mostrado, pero
la búsqueda consulta ambos idiomas. Parámetros desconocidos o repetidos,
nombres vacíos y un idioma inválido devuelven 400 `INVALID_QUERY`.
Una consulta válida sin candidatos devuelve 200, `best:null`, `alternatives:[]`
y `reason:no-candidates`. Conectores solos y puntuación sola tampoco resuelven.

La confianza es un índice **heurístico de evidencia léxica**, no una probabilidad
calibrada ni validación de la técnica. No equivale al `score` de las listas.
Se evalúa cada nombre o alias completo por separado, sin juntar fragmentos
de campos distintos ni ignorar palabras sobrantes para asignar un ejercicio.

| Evidencia | Confianza |
| --- | --- |
| Nombre exacto tras normalizar y singularizar | 0.99 |
| Alias exacto tras normalizar y singularizar | 0.97 |
| Mismas palabras significativas, en nombre / alias | 0.95 / 0.93 |
| Nombre / alias completo con un error de una letra en total | 0.86 / 0.84 |
| Coincidencia parcial o varios errores | Hasta 0.70 |
| Coincidencia solo en metadatos | 0.20 |
| Título marcado pendiente de revisión | Como máximo 0.79 |

Se asigna `best` únicamente con confianza de al menos 0.84 y una ventaja
**estrictamente mayor que 0.06** sobre todos los demás candidatos. La comparación
incluye los que quedan fuera de las cinco alternativas y la evidencia original
de títulos pendientes. Popularidad y orden alfabético no permiten romper una
ambigüedad. Las reglas no eligen todavía una variante básica de una familia.

`reason` distingue:

- `matched`: candidato claro asignado en `best`.
- `ambiguous`: hay evidencia fuerte pero otro ID demasiado parecido.
- `insufficient-evidence`: solo hay coincidencias débiles o títulos pendientes.
- `no-candidates`: no se encontró ninguna coincidencia.

Ejemplos para verificar:

| `name` | Comportamiento esperado |
| --- | --- |
| `jalón dorsal en polea` | `best.id=flow-0198`, confianza 0.97 |
| `jalones dorsales en polea` | Resuelve el mismo alias en plural |
| `jalon dorsal en poleaa` | Resuelve un error, confianza 0.84 |
| `flexiones de brazos` | `best.id=flow-0662`, confianza 0.99 |
| `sentadilla profunda con barra` | `best:null`, nombre compartido por tres IDs |
| `lagartijas` | `best:null`, alias compartido por varias variantes |
| `remo con barrita negra` | `best:null`, solo sugerencias parciales |
| `Cable thibaudeau kayak fila` | `best:null`, título pendiente |
| `zzzxxyy` | `best:null`, sin alternativas |

SDK: `await client.match('jalón dorsal en polea', 'es')`.
El endpoint conserva autenticación opcional, CORS, ETag/304 y HEAD.
`resolverVersion` versiona las reglas por separado de `catalogVersion`.
No se consultan servicios externos ni se modifica el catálogo al resolver.

Las pruebas en `test/resolver.test.js` cubren resolución real, duplicados,
alias compartidos, evidencia insuficiente, títulos pendientes, margen de
confianza, plural, errores, campos separados, validación, SDK y contrato HTTP.

## Fase 3: alias y familias disponibles para revisión

Se incorporan los alias de la tabla solicitada: pec tec / pec deck / peck deck /
mariposa, chest press, abductor, aductor, pantorrilla / gemelos, extensión de
piernas / cuádriceps, curl femoral acostado y sentado, hack / jack, remo sentado /
en polea, pullover con cuerda, peso muerto unilateral / a una pierna,
hiperextensiones / lumbares, zancadas / desplantes y jalón / jalón dorsal.

Se añaden 99 alias respecto a las traducciones persistidas. Los registros sin
alias bajan de 672 a 648; no se afirma haber completado alias para todo el catálogo.
Todos los alias anteriores, IDs, instrucciones, nombres y medios se conservan.
Los alias nuevos se guardan en `data/gymzong-curation.es-MX.json` y se aplican
al leer el catálogo, independientemente de la reconstrucción de traducciones.

Las fichas y candidatos del resolver incorporan:

```json
{ "familyId": "jalon-al-pecho", "isDefaultVariant": true }
```

Hay 16 familias con 133 fichas clasificadas y exactamente un representante
verificado por familia. Las demás fichas exponen `familyId:null` y
`isDefaultVariant:false`. Hay 30 candidatas propuestas que conservan su
clasificación pendiente por conflictos de título. Esto no significa que
las restantes 1,124 fichas sean movimientos sin variantes: la cobertura es
editorial y explícita, no una clasificación automática del catálogo completo.
Cada familia declara su alcance en `scripts/gymzong-curation-decisions.js`.

`GET /api/v1/families?lang=es` devuelve `{data:[...]}` con `id`, `name`,
`nameEn`, `aliases`, `defaultExerciseId` y `exerciseIds`.
`GET /api/v1/exercises?familyId=jalon-al-pecho` filtra esa familia; se combina
con búsqueda, equipo, músculo, paginación y demás filtros. Un ID desconocido
o parámetros repetidos producen 400. El SDK agrega `client.families(lang)`
y `familyId` en `client.list()`.

En el visor hay un selector **Familia**, una etiqueta **Variante básica** en
las tarjetas de los representantes y la familia visible en la ficha.
`sort=relevance` considera la variante básica después de la popularidad
y antes de las palabras sobrantes, respetando los niveles de nombre/alias.

### Resolución de nombres generales

El resolver versión 2 reconoce nombres y alias generales registrados completos,
con normalización de plural y orden de palabras, y selecciona su representante
con `resolutionMethod:family-default` y confianza heurística 0.94.
Por ejemplo: sentadilla → Barbell_Full_Squat; press de banca → flow-0025;
jalón al pecho → flow-0198; chest press → flow-0576; zancadas → flow-3470.

Esta elección editorial puede tener una confianza menor que una alternativa
con alias exacto: son variantes relacionadas, no probabilidades. Nunca fusiona
sus IDs ni oculta las alternativas. Un candidato ajeno a la familia con
evidencia fuerte (>= 0.88) bloquea la selección automática de familia.

Los descriptores de variantes no se eliminan para forzar una básica: «press de
banca inclinado con barra» sigue resolviendo flow-0047 mediante `lexical`.
Un error de escritura sigue las reglas léxicas, no una elección difusa de familia.
Las búsquedas específicas ambiguas, como «sentadilla profunda con barra»,
mantienen `best:null` entre los IDs que comparten el nombre. Sin selección,
`resolutionMethod` es `none`.

Los alias `curl femoral sentado` y `pullover con cuerda` encuentran flow-0599
y flow-0237 respectivamente, pero no levantan sus conflictos de revisión:
devuelven `best:null` con el candidato a confianza máxima 0.79. Su resolución
editorial corresponde a la fase 4. No se reemplazan por la variante acostada
ni por una que usa barra.

### Verificación de esta entrega

En el buscador del catálogo completo prueba `pec tec`, `chest press`,
`gemelos`, `extensión de cuádriceps`, `jack` y `zancadas`. Comprueba que la
imagen corresponde al movimiento que esperabas. Selecciona la familia
«Jalón al pecho» y revisa las variantes y la etiqueta de la básica.

En `/api/v1/exercises/match?name=sentadilla` verifica el representante;
en `/api/v1/exercises/match?name=press%20de%20banca%20inclinado%20con%20barra`
comprueba que sigue eligiendo la variante inclinada.

Informe por familia, alias e ID y motivos de los pendientes:
[GYMZONG-CURATION.md](../reports/GYMZONG-CURATION.md).
Reconstrucción: `npm run curation:compile`; informe: `npm run curation:report`;
láminas para revisar los alias y todos los representantes:
`python scripts/render-gymzong-curation.py` (PyMuPDF).

La versión de catálogo cambia a `849f3fd9146d7ff7` porque ahora incluye la
curación, y `resolverVersion` pasa a `2`. La discrepancia histórica de
`essential-50` permanece en la fase 6. La selección popular no cambia en esta fase.

## Fase 4: cobertura y nombres disponibles para revisión

Se verificaron los siete casos solicitados (separando patada en polea y en
máquina), los snapshots originales, textos e ilustraciones. El usuario eligió
esperar animaciones verificadas en vez de incorporar fichas de texto sin medios.

| Petición | Resultado |
| --- | --- |
| Face pull | Espera animación; Face_Pull permanece retirado |
| Elevación frontal con disco | Espera animación; Front_Plate_Raise permanece retirado |
| Patada de glúteo en polea | Disponible como flow-0228; nombre, alias e instrucciones españolas corregidos |
| Patada de glúteo en máquina | Espera animación; flow-2286 es un empuje sentado y no se usa como sustituto |
| Remo sentado en polea con agarre en V | Disponible como flow-0213; alias triángulo; nombre español corregido |
| Press de pecho sentado en máquina | Nombre claro en flow-0576 y flow-0577; flow-1301 se corrige de aperturas a press |
| Sentadilla hack inversa | Espera animación; no se confunde con hack convencional |

Además, flow-0237 queda confirmado como **Pullover con cuerda en polea alta**.
La advertencia anterior decía que el original pedía flexionar codos a 90 grados,
pero ese texto no existe en la ficha: el original indica brazos extendidos y
coincide con los cuadros. Se corrige la revisión del título, conservando las
instrucciones traducidas como pendientes de revisión editorial.

flow-0599 (curl femoral sentado) conserva su conflicto y `best:null`: los cuadros
no permiten confirmar la dirección de resistencia. La adaptación española de
flow-0228 se reescribe frente a la polea tras contrastar una fuente primaria y
los tres cuadros. El inglés original permanece en `instructionsEn` y se
registra el motivo `original-orientation-corrected`, visible también en la ficha.

No se agregan, eliminan ni fusionan IDs ni se alteran medios. Hay **1,257 fichas
animadas, 17 familias y 137 fichas clasificadas**. Adaptaciones españolas
contrastadas: 13; borradores pendientes: 1,244. El resolver usa versión 3.
Los nombres duplicados restantes y la calidad general del español siguen en la
fase 5; no se presenta esta revisión de casos como aprobación de todo el catálogo.

### Espera de medios visible para apps y usuarios

Cuando `q` o `name` coincide con el nombre/alias completo normalizado de uno
de los cuatro faltantes conocidos, la respuesta añade:

```json
{
  "unavailable": [{
    "requestId": "face-pull",
    "name": "Face pull",
    "status": "awaiting-verified-animation",
    "reason": "Existe en el snapshot histórico, pero fue retirado por falta de medios. Se espera una animación verificada antes de restaurarlo."
  }]
}
```

`requestId` identifica la petición, no un ID de ejercicio activo. El resolver
devuelve `best:null`, `alternatives:[]`, `reason:no-candidates` y
`resolutionMethod:none`. No ofrece otra variante como sustituta. La lista
puede conservar coincidencias parciales de otras palabras; el visor avisa de
ello en lugar de presentarlas como si fueran el ejercicio solicitado.
Para consultas sin un pendiente conocido, el campo se omite.

Revisión práctica en el catálogo completo: busca `patada de glúteo en polea`,
`remo sentado con triángulo`, `pullover con cuerda` y `press de pecho sentado en
máquina`; abre sus fichas y comprueba la imagen. Busca `face pull` y confirma
el aviso de espera. El filtro de familia debe estar en «Todas las familias».

Evidencia, fuentes, correcciones y pendientes: [informe de cobertura](../reports/GYMZONG-COVERAGE.md).
Registro estructurado: `data/gymzong-coverage-review.json`.
Reconstrucción de los informes: `npm run coverage:report` y `npm run curation:report`.

## Fase 5: español y metadatos disponibles para revisión

Se normaliza el registro de las instrucciones a tú sin cambiar sus cantidades,
textos ingleses, IDs ni medios. La normalización distingue imperativos de
sustantivos como agarre/empuje y conserva subjuntivos de terceros como «deja que
la barra baje». El informe usa un detector contextual de indicadores conocidos;
no constituye una revisión gramatical o técnica completa de los 1,244 borradores.
`localizationReview.languageReview` registra la normalización y que no cambia
la aprobación técnica. Las 13 adaptaciones contrastadas mantienen su estado.

Los nombres literales de flow-1640, flow-2464, flow-0526, flow-0747, flow-1282,
flow-0764 y flow-0758 se sustituyen en la presentación por títulos legibles con
el detalle incierto marcado «por confirmar». Conservan título pendiente y
`best:null`. El nombre inglés original sigue disponible para buscar la fuente.
`localizationReview.nameReview` identifica el cambio y el nombre español anterior.

Los 34 grupos iniciales de nombres repetidos ya no comparten un título español
idéntico. Se distingue la vista posterior/lateral cuando la fuente lo declara;
en los demás casos se indica «ilustración 2/3» sin afirmar una variante técnica
inexistente. Los títulos comunes anteriores permanecen como alias, de modo que
un nombre ambiguo todavía puede requerir selección manual. No se fusionan IDs.

flow-0738, flow-0739, flow-0740 y flow-1464 exponen `45°` en `nameEn` y en `name`
con `lang=en`; `nameEnOriginal` conserva literalmente el nombre roto. La reparación
no edita el snapshot ni las instrucciones originales.

### Metadatos y selección editorial

| Indicador | Antes | Después |
| --- | --- | --- |
| Dificultad desconocida | 1,135 | 1,081 |
| Mecánica vacía | 1,142 | 989 |
| Fuerza vacía | 724 | 636 |
| Equipo sin especificar | 13 | 0 |
| Básicos (`popular`) | 10 | 150 |

Las equivalencias con Free Exercise DB exigen las mismas palabras del nombre,
equipo compatible, coincidencia de músculo principal y título verificado; solo
se ignoran calificadores declarados de vista posterior/lateral. No se utilizan
coincidencias difusas para heredar niveles. La clasificación articular de básicos
se registra por ID y el press sentado se contrasta con ACE. Cada campo modificado
expone `metadataReview` con `value`, `original`, `basis` y `reference`.

La tabla anterior registra el cierre inicial de la fase 5. La investigación
posterior completa esos vacíos mediante estimaciones por familia y modificadores
explícitos de complejidad, identificados en `metadataReview`. Equipo usa un único
ID `kettlebell`, aunque `equipment=kettlebells` sigue devolviendo el mismo conjunto.
La taxonomía y los filtros reflejan los metadatos corregidos.

Los 150 básicos son una selección editorial explícita e incluyen los diez
anteriores; no son una medición de uso, una rutina ni una aprobación técnica.
Russian_Twist conserva su conflicto anterior aunque siga seleccionado.
La colección nueva no sustituye los diez esenciales históricos, cuyo contrato
se corregirá en la fase 6.

### Verificación local

Recarga con Ctrl + F5 y pulsa **150 básicos**. Abre sus fichas para ver dificultad,
tipo y acción; los campos derivados se identifican como orientativos. Busca `sentadilla`
y comprueba las vistas, o `smith` y revisa los títulos que siguen por confirmar.
Consulta `flow-2312` para revisar el tratamiento de tú.

Datos reproducibles: `data/catalog-quality.es-MX.json`, decisiones por ID en
`scripts/catalog-quality-decisions.js` y línea base en
`data/localization/es-MX.phase5-baseline.json`.
Reconstrucción: `npm run localization:build`, `npm run quality:compile` y
`npm run quality:report`. Evidencia, resultados y pendientes:
[GYMZONG-QUALITY.md](../reports/GYMZONG-QUALITY.md).

### Ampliación: investigación de metadatos

Los 1,257 ejercicios tienen dificultad, tipo y acción: cero campos desconocidos.
La ampliación completa 1,081 dificultades, 989 tipos y 636 acciones. Se investigaron
familias de movimiento con fuentes primarias de NSCA, ACE, NASM, HPRC y World
Gymnastics. Las aplicaciones por variante son inferencias editoriales; no son
1,257 verificaciones externas individuales. Las 346 fichas con identidad en duda
mantienen sus conflictos y los campos nuevos son provisionales.

El visor muestra dificultad orientativa y clasificación provisional cuando
corresponde, junto con enlaces a las fuentes. El contrato admite tipo `isometric`
y acción `mixed`, además de los valores anteriores. Los clientes que traduzcan
estos campos deben contemplarlos. La dificultad representa complejidad técnica,
no esfuerzo ni una recomendación personal.

Recarga con **Ctrl + F5**, pulsa **Limpiar** y abre varias fichas. Por ejemplo,
`flow-0464` muestra una plancha con giro y acción mixta; `flow-0705`, una posición
sostenida; `flow-0576` conserva su referencia directa de dificultad. Las fichas
por confirmar conservan el aviso de identidad pendiente.

Reconstrucción: `npm run research:compile`, `npm run quality:compile`,
`npm run research:report` y `npm run quality:report`.
[Informe completo y registro por ID](../reports/GYMZONG-METADATA-RESEARCH.md).
