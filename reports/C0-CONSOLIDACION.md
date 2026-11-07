# C0 — Consolidación, traducciones y preparación de publicación

Fecha: 2026-11-07. **Diagnóstico y plan; no integración ni traducción masiva ejecutadas.**

## 1. Estado real y alcance de esta auditoría

Repositorio independiente ApiGym. Rama comprobada: `feat/muscle-atlas-p3c`; HEAD `6569fbe`. Árbol inicialmente limpio. `main` y la referencia local `origin/main` apuntan a `6ced90082e603ed6d9d8dd9a9bf8350e14ad75db`. Comparación `main...HEAD`: 0 commits exclusivos de main y 34 adicionales en la rama; 310 archivos cambiados, 280,580 líneas añadidas y 61 eliminadas, incluyendo muchos snapshots y artefactos generados.

Se consultó GitHub en lectura mediante su conector: la rama predeterminada es main y su HEAD remoto actual coincide con `6ced900` ([commit confirmado](https://github.com/5-5DE/ApiGym/commit/6ced90082e603ed6d9d8dd9a9bf8350e14ad75db)). Por tanto, los 34 commits de esta rama **no están integrados en main de GitHub**. Las ramas feature locales no tienen upstream configurado; no se afirma que no pueda existir alguna rama remota equivalente, pues no se auditaron todas las ramas remotas.

Esta fase solo añade este informe. No se creó rama de consolidación ni PR, no se hicieron commits, fetch, push, merge, rebase o traducciones, y no se editaron datos/código. Gym Zong no se consultó ni modificó. Los comandos de diagnóstico y logs temporales están en /tmp. El script existente de compatibilidad regeneró su reporte derivado con bytes idénticos; Git permaneció limpio antes de escribir este documento.

## 2. Clasificación de los cambios acumulados

“Estable” indica candidato técnico para revisión/publicación acotada, no certificación de contenido ni permiso para publicarlo ahora.

| Área / archivos | Estado real | Propuesta C0 |
|---|---|---|
| P0/P1: `src/catalog.js`, `src/validation.js`, `data/names.es.json`, `data/editorial-featured.json`, `public/demo.js`, tipos/OpenAPI y tests | P1 aprobada; validación Flow, dos nombres en borrador, búsqueda bilingüe y correcciones del visor probadas | Primera candidatura estable de consolidación |
| Contrato e IDs históricos: `data/upstream/`, `data/flow-exercise-dataset/`, fixtures de 2,069 IDs | Fuentes originales preservadas frente a main; 1,257 animaciones legacy conservadas | Invariantes obligatorios; no deduplicar/renombrar por traducción |
| P2-A: registros de identidad, manifiestos, validadores/importación dry-run y fixtures | Infraestructura probada; las asociaciones no equivalen a medios verificados | Candidatura posterior separada de P1; revisar manifiestos/coherencia del perfil de distribución |
| P2-B: resolver, `media.selection`, `/admin`, revisiones independientes, SDK/OpenAPI | Infraestructura funcional probada; administración requiere clave; selección pública tiene 0 verified | PR separada, sin promover medios pendientes ni sustituir presentación legacy |
| P2-C1/C1R: `data/pilot/`, `data/recovery/`, evidencia y recursos reales | Piloto incompleto, pendientes/rechazos y restricciones de derechos/técnica | No activar ni incorporar a la primera publicación estable; conservar en ramas/evidencia |
| `design/vector-pilot*` | Exploraciones anteriores no aprobadas como estilo final | Archivo de trabajo, fuera del producto estable |
| `design/master-character/`, `design/character-system-v1/` | Referencia artística aprobada; rig incompleto y congelado | Conservar; no presentarlo como personaje animable |
| P3: `src/anatomy*.js`, `data/anatomy/`, atlas y `examples/anatomy*` | Prototipos funcionales y dirección visual aprobados; anatomía no certificada | Mantener separados del visor principal; ninguna activación implícita |
| `packages/anatomy-offline/`, `releases/` | Distribución experimental autocontenida, hashes y prueba aislada; tipos/Expo pendientes | Canal experimental, no paquete anatómico certificado de producción |
| `reports/`, capturas y logs | Evidencia histórica, no comportamiento del servidor | Conservar; no reescribir evidencias antiguas para aparentar nuevo estado |
| README/plan/CI/Docker | Documentación y empaquetado no reflejan toda la evolución ni separan claramente publicación/experimentos | Actualización de documentación y perfil de release tras aprobar C0 |

Resumen del diff por carpetas: design 81 archivos, reports 64, scripts 34, examples 29, data 24, test 17, packages 16, docs 15, src 11, public 5, schemas 4, client 2, releases 2, test-support 2 y cuatro archivos raíz. No conviene tratar todo el diff como una sola mejora lista para main.

Referencias: [P1](P1.md), [P2-B](P2-B.md), [P3-C](P3-C.md), [congelación del personaje](../docs/CHARACTER-FREEZE-V1.md), [revisión humana pendiente](P3-C-HUMAN-REVIEW.md).

## 3. Qué hizo P1 y por qué siguen apareciendo nombres ingleses

### 3.1 Verificación de la implementación

P1 no prometía ni implementó traducir los 2,069 ejercicios. `de94010` corrigió la validación para ejecutarla después de combinar Free Exercise DB y Flow, añadió dos entradas a names.es.json y separó popularidad editorial de traducción. `d37836b` corrigió representación/carga progresiva del visor. La rama aprobada P1 termina en `25d1b42`.

`git diff main -- data/translations.es.json` no muestra diferencias: los 73 registros ya existían antes de P1 y no fueron ampliados. Su último cambio sigue siendo el commit original `fb18cd0`. P1 añadió únicamente los nombres y cuatro alias de flow-0372 y flow-0599, conservando sus instrucciones originales. Esto coincide con [reports/P1.md:8–14](P1.md#cambios-entregados) y con el commit, no con una traducción masiva supuesta.

### 3.2 Cobertura calculada hoy

| Métrica | Cantidad | Interpretación |
|---|---:|---|
| Ejercicios | 2,069 | 876 IDs históricos Free Exercise DB y 1,193 IDs flow-* |
| Registros en translations.es.json | 73 | Nombre, alias e instrucciones españolas declaradas; estado runtime ai-authored-unreviewed |
| Registros adicionales en names.es.json | 2 | Solo nombre/alias, status draft, sin solaparse con los 73 |
| Nombres declarados españoles | 75 (3.62%) | Todos aparecen como draft; no implica corrección terminológica certificada |
| Nombres con fallback inglés | 1,994 (96.38%) | No existe traducción española de nombre en los overlays actuales |
| Ejercicios con instrucciones españolas declaradas | 73 (3.53%) | Presencia de campos, no prueba de fidelidad o revisión técnica |
| Ejercicios con instrucciones originales inglesas | 1,996 | Incluidos los dos nombres Flow traducidos |
| Registros con alias en esos overlays | 75 | 139 elementos en translations + 4 en names; 143 elementos, no necesariamente todos españoles ni únicos globalmente |
| Traducciones/nombres con revisión humana acreditada | 0 | No hay evidencia de revisión; no se deduce aprobación del autor de un commit |

Las 73 traducciones con instrucciones corresponden a IDs Free Exercise DB; no hay instrucciones españolas de IDs flow-* en translations.es.json. El resto del catálogo nunca recibió una traducción masiva.

### 3.3 Comportamiento exacto del idioma

En [src/catalog.js:59–69](../src/catalog.js#L59), para lang=es la prioridad del título es `names.es[id].name → translations.es[id].name → e.name`; `nameEn` conserva el nombre original. Elegir Español **selecciona campos existentes**, no llama a un traductor ni genera nombres nuevos.

`language` describe el idioma de las instrucciones; `nameLanguage` el del título. `availableLanguages` depende solo de translations.es.json. Por eso un nombre traducido sin instrucciones españolas puede seguir anunciando language=en y availableLanguages=[en]. OpenAPI documenta esa distinción ([src/openapi.js:6](../src/openapi.js#L6)); cambiar language a es para ocultarlo mentiría sobre las instrucciones.

Ejemplos reales del servidor:

| ID | Título en lang=es | Idioma de instrucciones | Estado del nombre |
|---|---|---|---|
| flow-0372 | Bíceps con mancuerna en banco predicador | en | draft |
| flow-0599 | Curl femoral sentado en máquina | en | draft |
| Dumbbell_Bicep_Curl | Curl de bíceps con mancuernas | es | draft; instrucciones ai-authored-unreviewed |
| 3_4_Sit-Up | 3/4 Sit-Up | en | missing |

El contador “73 en español” del visor usa stats.spanish, definido como número de registros de traducción con instrucciones ([src/catalog.js:118–120](../src/catalog.js#L118), [public/demo.js:95](../public/demo.js#L95)). No cuenta los 75 títulos. Hay una deuda de comunicación/medición por campo; no un mecanismo de traducción total roto.

La búsqueda incluye nombres y alias disponibles, etiquetas de músculos/equipo y metadatos de fuente; localizar un filtro no traduce el nombre de cada ejercicio. Además, el índice principal **no incluye e.id** ([src/catalog.js:81](../src/catalog.js#L81)): q=flow-0372 da cero resultados, aunque el detalle por ID funciona. El atlas tiene su propio índice por ID; eso no demuestra que el visor principal ya lo tenga.

### 3.4 Pendientes que deben resolverse antes de escalar

1. `validateNames` solo admite status=draft y el SDK tipa nameStatus como draft/missing ([src/validation.js:75–82](../src/validation.js#L75), [client/index.d.ts](../client/index.d.ts)). No existe todavía un modelo completo de revisión. No basta con cambiar un valor a reviewed: un fixture de esa forma es rechazado.
2. Falta procedencia por campo/modelo/glosario/revisor en las traducciones antiguas. No inventar fechas o modelos para rellenarla. Los 73 constan como asistidos por IA y no revisados; los otros dos son borradores con fuente/equipo, sin atribuirles revisión humana.
3. `scripts/refresh-data.js:9–14` valida traducciones con los IDs del conjunto Free Exercise DB, no del combinado. La validación normal sí se corrigió en P1. Fixture en memoria: añadir una traducción Flow se acepta con el catálogo combinado y se rechaza como huérfana usando el conjunto del refresco. **No se ejecutó data:refresh** ni se descargaron datos. Este riesgo debe corregirse antes de ampliar traducciones Flow con instrucciones; hoy no impide los dos nombres separados.
4. `scripts/audit-compatibility.js:10` exige que translations/names permanezcan idénticos al baseline P2-A. Una futura ampliación legítima los hará fallar: hay que diseñar comparación semántica con deltas esperados, no borrar el control o actualizar ciegamente la referencia.
5. Los bundles/visores de anatomía contienen snapshots de nombres ([scripts/build-anatomy-v2.js:33–44](../scripts/build-anatomy-v2.js#L33), [build-anatomy-viewer-v3.js:5–11](../scripts/build-anatomy-viewer-v3.js#L5)). Traducir el backend no actualiza un HTML ya construido. Generadores actuales sobrescriben rutas/reportes de versiones anteriores: futuros builds necesitan salidas/versiones nuevas y preservar evidencias aprobadas.

## 4. GitHub, localhost y visores separados

GitHub main muestra el código publicado en esa rama; no ejecuta automáticamente npm start ni recibe cambios por guardar archivos/crear commits locales. Localhost ejecuta el árbol de trabajo disponible al arrancar el proceso. Cambiar de rama no publica ni garantiza que un proceso Node/Docker ya iniciado recargue su memoria.

La prueba real C0 ejecutó **npm start** en ApiGym, host 127.0.0.1 y puerto temporal 41455, con API_KEY/ADMIN_KEY vacías explícitamente para aislar la prueba, sin leer ni imprimir secretos. Se cerró únicamente ese proceso de prueba. No se inspeccionó ni reinició un servicio previo del usuario en 3000.

| Ruta probada | HTTP | Resultado real |
|---|---:|---|
| / | 200 | Catálogo de public/index.html + demo.js, sin enlace al atlas |
| /docs, /openapi.json, /health | 200 | Documentación, contrato y salud |
| /admin | 200 | Interfaz administrativa separada |
| /admin/api/exercises | 503 | ADMIN_DISABLED al no configurar ADMIN_KEY; no acceso administrativo público |
| /api/v1/stats | 200 | 2,069; spanish=73; 1,257 animaciones; 812 sin animación |
| /media/fallback.svg | 200 | Fallback neutro |
| /examples/anatomy-v3/index.html | 404 | El servidor no sirve esa carpeta |
| /atlas | 404 | No existe ruta registrada |
| /packages/anatomy-offline/1.0.0-prototype/bundle.json | 404 | Artefacto local, no endpoint |
| /releases/apigym-anatomy-offline-1.0.0-prototype.zip | 404 | ZIP no publicado por npm start |

La allowlist está en [src/app.js:20–31](../src/app.js#L20), la respuesta de estáticos en :121 y el 404 final en :151. Los archivos de design/, examples/, packages/ y releases/ no se vuelven públicos por existir en el repo.

**Qué sí muestra el visor principal local:** carga progresiva P1, títulos/alias disponibles, etiquetas localizadas, instrucciones y reproducción legacy. La ficha informa de presentación legacy y del estado de media.selection ([public/demo.js:49–84](../public/demo.js#L49)). El resolver nuevo aparece en la API como campo compatible; el visor no adopta automáticamente todo el producto P3.

**Qué sigue independiente:** atlas con semana DEMO/selector de vistas/búsqueda propia, comparación del personaje, rig incompleto y ZIP offline. La galería multimedia sí se sirve en /admin, pero no como función pública editable del catálogo.

El servidor entrega CSP con script-src/style-src 'self' ([src/app.js:43](../src/app.js#L43)); los HTML offline del atlas tienen JS/CSS embebidos. Copiarlos a una ruta del servidor sin adaptar el build los bloquearía. Propuesta: assets JS/CSS propios externos y rutas explícitas, manteniendo un build autónomo diferente para offline, ambos desde las mismas fuentes. No debilitar la CSP ni servir el repositorio entero como directorio público.

Dockerfile solo copia package.json, src, public y data (líneas 4–7): no distribuye automáticamente visores, paquetes o ZIP. La CI actual ejecuta check y test; no es un despliegue (.github/workflows/ci.yml:9–14). No se encontró en estos archivos un despliegue público automático; no se auditó ningún hosting externo no indicado por el usuario.

## 5. Propuesta para el visor principal

### Núcleo público estable — primera candidatura

- Mantener catálogo/búsqueda, detalles, filtros localizados, IDs, reproducción y compatibilidad legacy de P1.
- Contadores separados: nombres españoles presentes, instrucciones españolas presentes, borradores y revisiones acreditadas; conservar stats.spanish con su significado legado y añadir campos opcionales nuevos.
- Indicar por campo el fallback al inglés y el estado de revisión. Nombre español no implica instrucciones traducidas o técnica verificada.
- Preparar búsqueda por ID exacto además de nombres/alias, sin usar el nombre para asociar medios o músculos.
- Conservar popular/editorialFeatured independientes de cobertura lingüística.

Todo lo anterior es propuesta pendiente de aprobación, no cambios efectuados en C0.

### Separación de experimentos

No incorporar el atlas como “anatomía certificada” de las fichas, ni copiar la semana DEMO como rutina real. Si se autoriza mostrarlo antes de su revisión, usar sección **Laboratorio / Atlas propuesto** separada, con estados/información pendiente y sin almacenamiento de rutinas reales. No habilitar ese laboratorio por defecto en la primera PR estable. Integración en Gym Zong requiere el encargo posterior que sigue pendiente.

Medios: preservar las 1,257 secuencias legacy y sus avisos sin marcarlas verificadas; no activar fotografías/GIFs piloto ni nuevos personajes. El usuario final seguirá sin escoger archivos manualmente. Selección nueva y presentación legacy deben seguir diferenciadas.

## 6. Plan reproducible de nombres y alias españoles

**Propuesta para implementar después de aprobación. No se generó ni activó ninguna traducción en esta auditoría.**

### A. Inventario y contrato por campo

Crear un inventario versionado de los 2,069 IDs, con hash del snapshot y de sourceName/equipo/metadatos de variante. No modificar data/upstream, Flow, IDs ni nameEn. Conservar los 73 registros y los dos borradores existentes como antecedentes; revisarlos no significa regenerarlos a ciegas.

Preparar registro/overlay nuevo por ID y candidatos separados de datos activos. Registrar como mínimo: locale es, proposedName, aliases, sourceName, fuente/ID de proveedor, equipo/posición/variante sustentados, origin, reviewStatus, publicationStatus, sourceHash, glossaryVersion, batchId y procedencia del generador. Metadatos no conocidos en registros antiguos deben quedar unknown, no inventados.

Separar dimensiones:

| Dimensión | Estados propuestos | Regla |
|---|---|---|
| Origen | machine, editorial, legacy-unknown | Una traducción automática puede estar pendiente o revisada después |
| Revisión | pending-review, needs-clarification, reviewed, rejected | reviewed exige revisor, fecha, objeto/hash revisado y motivo/evidencia |
| Publicación | staged, active, superseded | Generar no significa publicar |
| Campo | name, aliases, instructions | Revisar un título no aprueba instrucciones |

Versionar el esquema y adaptar validador, OpenAPI y SDK antes de usar nuevos estados. Evitar ampliar silenciosamente enums cerrados del contrato v1. Preferir metadatos opcionales por campo y documentar la transición de los indicadores legacy; comprobar compatibilidad antes de cambiar su semántica.

### B. Glosario y generación controlada

Aprobar primero glosario regional de español y reglas de nombres: equipo, movimiento, postura, agarre, lateralidad, apoyo y variante. Mantener diferenciados libre/Smith/mancuernas, predicador/de pie, flexión femoral/extensión de rodilla. No agregar una precisión anatómica o variante que la fuente no respalde.

Los nombres normalizados solo ayudan a detectar candidatos/duplicados. No sirven para cambiar exerciseId, combinar registros o crear equivalencias de medios. Los alias deben buscar el mismo ejercicio/variante, no prometer que otra máquina o movimiento sea idéntico. Conservar aliases ingleses útiles; evitar términos genéricos como alias exactos cuando oculten variantes.

Primero un lote pequeño de 25–50 nombres/alias, priorizando los seis IDs del piloto y ejercicios comunes cuya identidad ya conste; no convertir las 24 posiciones ambiguas de la rutina original en IDs confirmados. Después, los 1,994 nombres faltantes podrían organizarse en 40 lotes de hasta 50 (39×50 + 44), **sin prometer que todos puedan resolverse automáticamente**. El inventario completo incluye también los 75 títulos actuales para auditar su calidad.

### C. Pipeline por lotes, staging y controles

Diseñar CLI/servicios de Node sin dependencias grandes, con responsabilidades separadas: inventariar → exportar lote → importar propuestas → validar/dry-run → cola de revisión → activar lote autorizado. Ejemplos de interfaz a implementar, no comandos disponibles hoy: `names:inventory`, `names:import --batch ... --dry-run`, `names:validate`, `names:review-report`, `names:activate --batch ...`.

Cada lote debe tener lista fija de IDs, inputHash, glosario/prompt/modelo/proveedor documentados cuando se conozcan, respuestas originales guardadas y salida importada con hash. La importación/validación debe ser idempotente y reproducible desde esos archivos. No prometer regeneración bit a bit idéntica de una respuesta de IA; la reproducibilidad consiste en conservar entradas/respuestas y repetir la transformación validada.

Controles obligatorios: IDs válidos/únicos, conjunto histórico intacto, sourceHash vigente, campos completos, strings/longitudes, alias sin vacíos/duplicados internos, original/nameEn sin cambios, equipo/variante no contradichos, colisiones y traducciones sospechosas en cola. Las heurísticas de idioma no certifican terminología o anatomía. Un caso ambiguo queda needs-clarification; no forzar una etiqueta para alcanzar 100%.

Métricas por lote y globales: inventariados, nombres presentes, generados automáticamente, pendientes/rechazados/ambiguos, revisados con evidencia, publicados y faltantes; instrucciones separadas. Una revisión de muestra no marca todo el lote como reviewed. Activación solo con política/lote aprobados, reporte de cambios por ID y rollback del overlay anterior, sin revertir el historial o IDs.

### D. Instrucciones técnicas y compatibilidad

Esta campaña inicial se limita a nombres/alias. No traducir masivamente instrucciones; conservar inglés y las 73 instrucciones españolas con su condición no revisada. Una futura campaña técnica necesitará glosario biomecánico, comprobación contra original, advertencias/unidades, revisión especializada y control de omisiones. Fuente sin instrucciones no se rellena inventando una ejecución.

Pruebas propuestas: los 2,069 IDs y nombres originales inmutables; nombre por idioma con fallback explícito; reviewed sin evidencia rechazado; Flow válido/huérfano; variantes incompatibles; búsqueda es/en con acentos/guiones/ID; idempotencia y lote stale; popularidad sin cambios; instrucciones intactas; OpenAPI/SDK/ETags/versiones; medios legacy y batch sin cambios. No rehacer un ID para arreglar su nombre.

Corregir el refresco para validar el catálogo combinado y los overlays con sus fuentes, sin ejecutar descarga en CI. Ajustar la auditoría a comparar datos originales/instrucciones/IDs inmutables y permitir únicamente deltas lingüísticos declarados. Hoy la auditoría tiene baseline P2-A 3454523, **no main**; su éxito protege la evolución posterior a P1, no reemplaza una comparación específica contra main para la primera PR.

Al activar traducciones, el proceso Node debe reiniciarse para recargar JSON/índices; sus datos/estáticos se cargan en memoria. Después comprobar ETag/versiones y construir nuevos snapshots/bundles offline versionados, sin sobrescribir evidencias anteriores ni cambiar el contenido del ZIP ya etiquetado con el mismo número de versión.

## 7. Estrategia de consolidación y PR — sin ejecutar

**No hacer merge directo de feat/muscle-atlas-p3c a main.** Arrastraría pilotos, contenido pendiente y artefactos no autorizados para publicación estable.

### PR 1 — base estable P1 y saneamiento C0

Nombre propuesto: `consolidation/core-c0`. La mejor base con el estado remoto comprobado es `25d1b42` (HEAD aprobado P1), cuyo ancestro es el main actual 6ced900. Conserva los SHA originales de los cuatro commits P0/P1 y excluye P2/P3, sin cherry-pick ni reescritura.

Tras aprobación: crear esa rama desde P1, incorporar allí este diagnóstico y correcciones C0 acotadas (métricas/idioma, documentación, guards y tests de publicación), y abrir PR hacia main **solo cuando se autorice push/apertura de PR**. Criterio de diff: P0/P1 y cambios C0 explícitos; no design/vector*, atlas, ZIPs, pilotos multimedia ni rutinas. Primera PR sin traducción masiva.

Volver a comprobar el main remoto antes de ejecutar. Si avanzó, integrar sus cambios mediante una operación no destructiva en la rama de consolidación, a autorizar entonces; no reset/rebase/force push de ramas existentes. No ejecutar aquí esa actualización.

### PR 2 — infraestructura multimedia, por separado

Si se aprueba publicarla, usar como referencia el HEAD P2-B `cab4b9e`, anterior a pilotos P2-C1/C1R y arte. Conservar los commits originales de P2-A/B y resolver de forma no destructiva su relación con la base estable ya aprobada. Revisar auth, escritura de auditoría, persistencia y contenido del manifiesto de distribución; mantener ADMIN_KEY vacía por defecto y permisos independientes.

No copiar sin más el data/ actual al perfil de producción: Docker incluye todo ese directorio y el HEAD actual contiene pilotos y bundles que no forman parte de la primera publicación. Cualquier manifiesto reducido deberá ser coherente, validado y conservar IDs/asociaciones históricas; no borrar ficheros a mano dejando referencias rotas. No eliminar esos recursos de las ramas históricas.

### Ramas experimentales y traducciones

Conservar feat/muscle-atlas-p3c y todas las ramas/commits existentes. Una publicación experimental separada del atlas/paquete requerirá aprobación explícita de canal/contenido; no confundirla con integración móvil ni atlas certificado. La referencia artística permanece congelada.

La campaña de nombres se haría en otra rama basada en el núcleo consolidado, comenzando por esquema/glosario y un lote staged. Primeras PR de infraestructura lingüística y lote piloto revisable; expansión posterior por lotes, sin un único commit opaco de miles de nombres.

### Gates de publicación

- PR con alcance/commits/archivos permitidos, métricas antes/después y aprobaciones de contenido claramente separadas de pruebas técnicas.
- check/test, comparación de contratos contra baseline explícito, 2,069 IDs, 1,257 legacy, URLs SDK relativas/absolutas, auth/fallback, consultas y cache/versión. Para PR 1 adaptar un comparador de main/P1; no exigir un baseline P2 inexistente en esa historia.
- Si se lleva audit:compatibility a CI, checkout con historial/baseline disponible: el workflow actual tiene checkout por defecto y el script usa git show de un SHA antiguo. No asumir que una copia superficial lo contiene.
- CI actual solo ejecuta check/test. Mantener pruebas de red local con loopback y separar reconstrucción nativa/Firefox/Pillow de tests de consumo de artefactos; declarar herramientas necesarias, sin asumir que el contenedor Alpine puede reconstruir todo.
- Resolver whitespace de fuentes/documentación de la candidatura antes de publicación. No normalizar logs/evidencias antiguas o paquetes con hashes como “limpieza” indiscriminada.
- Push de rama y PR, aprobación de PR, merge y despliegue son pasos distintos; ninguno autorizado/ejecutado en esta auditoría. No confiar en GitHub Pages para ejecutar el backend Node ni asumir que merge equivale a desplegar.
- Publicación futura con commit/release/versiones/hashes identificados, smoke test y rollback mediante commits/artefacto anterior, no force push. Ninguna rama histórica se elimina.

## 8. Pruebas ejecutadas en C0 y límites

| Comprobación | Resultado real |
|---|---|
| npm run check | exit 0; 3,771 SVG comprobados; 2,069 fuentes; 1,260 assets de manifiesto; 131 asociaciones históricas no revisadas |
| npm test | exit 0; 87/87, 0 fallidas/omitidas |
| npm run audit:compatibility | exit 0; baseline 3454523; 2,069 ejercicios y endpoints media comparados; 1,257 legacy preservadas; taxonomía/estadísticas legacy intactas |
| npm start aislado + HTTP | Arranque correcto; rutas y fallbacks comprobados; proceso de prueba cerrado |
| SDK real contra ese servidor | flow-0372 resuelto; thumbnail y fallback de selección con URLs absolutas |
| Frame SVG legacy por HTTP | 200, image/svg+xml y contenido SVG |
| Datos originales frente a main | Sin diff en upstream, Flow o translations.es.json |
| Fixture de validación Flow | Conjunto combinado acepta; conjunto del refresco Free Exercise DB rechaza como huérfana |
| Fixture de nombre reviewed | Validador actual lo rechaza; no existe todavía ese estado soportado |
| git diff --check main...HEAD | No limpio: 7 ubicaciones con whitespace, incluidas dos separaciones Markdown intencionales; no un fallo funcional equivalente |

Whitespace localizado: docs/PLAN-MAESTRO.md:7–8; examples/anatomy-v2/index.html:1 y style.css:1; examples/anatomy-v3/index.html:1 y style.css:1; reports/P3-C-browser/firefox-output.txt:5. En el alcance P1 solo aparecen las dos líneas Markdown. Se informa sin modificar fuentes ni evidencias.

La compatibilidad se comprueba en ApiGym/SDK; no es una prueba end-to-end de la app Gym Zong ni se inspecciona su estado actual. No se ejecutaron regeneradores, descarga masiva, refresco de datos ni nuevos tests de navegador en C0. Las pruebas de Firefox de P3-C son evidencia histórica distinta y no se presentan como reejecutadas hoy.

Logs de esta auditoría: /tmp/apigym-c0-check.txt, /tmp/apigym-c0-tests.txt, /tmp/apigym-c0-compatibility.txt, /tmp/apigym-c0-http.json y /tmp/apigym-c0-start.txt. Son temporales; resultados relevantes quedan resumidos aquí. La comprobación remota fue una lectura de GitHub main, no una publicación.

## 9. Decisión solicitada para continuar

Aprobar primero el alcance de **C0-I: rama de consolidación basada en P1, correcciones de medición/contrato y presentación estable**, sin P2/P3 ni traducción masiva. A continuación aprobar esquema/glosario y lote piloto de nombres/alias en staging antes de expansión. Publicar una rama/abrir PR, mergear o desplegar necesitará el encargo explícito correspondiente.

**Punto de parada:** solo se entrega este informe; HEAD sigue en 6569fbe, sin commit nuevo. No se ha integrado nada ni se ha traducido el catálogo. Las ramas, commits, datos históricos y Gym Zong se conservan.
