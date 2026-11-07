# C0-I — núcleo estable, traducciones y preparación de publicación

## Resultado

Candidatura local en **consolidation/core-c0**, creada exactamente desde `25d1b42dcba48f42411afa32a3e9e37c72973ed2` (cierre aprobado P1), no desde P3-C. Sin push, merge, traducción masiva, descarga de datasets o cambios en Gym Zong. Se conservan los cuatro commits P0/P1 originales.

main local, origin/main y main remoto consultado en GitHub coincidieron en `6ced90082e603ed6d9d8dd9a9bf8350e14ad75db`. `git merge-base --is-ancestor main 25d1b42` pasó. Se leyeron completos C0-CONSOLIDACION.md y P1.md. La única entrada inicial sin seguimiento era el informe C0, preservado y ahora incluido como diagnóstico histórico. Sus referencias a P2/P3 describen las otras ramas; no significan que esos archivos formen parte de esta candidatura.

Se guardó y comparó el inventario de ramas: **las 12 referencias preexistentes permanecen idénticas**, incluida feat/muscle-atlas-p3c en 6569fbe. Solo se añade consolidation/core-c0. No se reescribió historia, eliminaron ramas o movió main. La comprobación remota fue de lectura; no hubo fetch, push o PR.

## Cambios funcionales

### Métricas por campo, compatibles con v1

`stats.spanish` sigue en **73**, con su significado histórico. Se añade `stats.translationCoverage` (opcional en el SDK):

| Campo | Valor | Significado |
|---|---:|---|
| spanishNames | 75 | Unión por ID de nombres españoles existentes, sin duplicar |
| spanishInstructions | 73 | Registros con instrucciones españolas existentes |
| namesPendingReview | 75 | Nombres españoles en borrador pendientes, no los 1,994 aún sin traducir |
| reviewedTranslations | 0 | Ninguna revisión acreditada en los registros estables actuales |
| englishNameFallbacks | 1,994 | Ejercicios cuyo título sigue siendo el original inglés |

El esquema actual solo admite borradores y no tiene un registro de revisiones humanas: por eso la métrica de revisadas es explícitamente cero, sin inferir revisión a partir de un commit o de tener texto español. No se implementó el futuro sistema de revisión/lotes.

El visor, README, OpenAPI y tipos distinguen títulos e instrucciones. Las tarjetas/fichas identifican borradores y fallback inglés. `language` sigue describiendo instrucciones, `nameLanguage` el título y `nameEn` conserva el original. Los dos Flow con nombre traducido siguen mostrando instrucciones originales inglesas. Las 73 traducciones antiguas siguen sin revisión acreditada.

### Búsqueda por ID exacto

`q` prioriza el ID exacto existente (tras quitar espacios exteriores), aplicando también los filtros. Si no hay ID exacto, conserva búsqueda de palabras normalizadas en IDs, nombres/alias y metadatos. Continúan acentos/guiones y es/en. Se probaron todos los 2,069 IDs con resultado único, además de flow-0372, flow-0599, Barbell_Squat y Pushups.

Esto amplía búsqueda y no asigna ni modifica relaciones multimedia. Un nombre que coincide literalmente con un ID, por ejemplo Pushups, resuelve ese ID prioritariamente; la búsqueda parcial sigue permitiendo otras variantes. Un filtro incompatible sigue produciendo cero resultados.

### Refresco seguro del catálogo combinado

Se extrajo el algoritmo de combinación P1 a `src/catalog-identity.js`, compartido por catálogo y preflight del refresco. Conserva la asignación histórica existente y no usa nombres traducidos. Esa refactorización no rehace ni certifica las asociaciones legacy por nombre.

`scripts/refresh-data.js` exporta `validateRefreshCandidate`; importarlo no hace fetch ni escribe. El CLI mantiene la descarga explícita solo al ejecutarlo como programa. Antes de cualquier escritura valida:

- Dataset candidato e IDs previos: no desaparición de IDs de origen ni del conjunto combinado.
- Asignaciones proveedor Flow → ID histórico: no reasignarlas por un cambio nominal del dataset.
- Traducciones y medios contra IDs combinados, incluidos Flow; rechazo de huérfanos.
- Origen/nombre/equipo de los borradores de P1 y selección editorial válida.

Se probó únicamente con fixtures locales y función pura: traducción y medio de fixture Flow aceptados, huérfanos/IDs eliminados/origen de nombre incorrecto/reasignación Flow/editorial desconocido rechazados. No se ejecutó `npm run data:refresh`, ni se descargaron nuevos datasets. Los fixtures no son contenido real publicado.

## Compatibilidad contra main real

Nueva auditoría: `npm run audit:compatibility` → scripts/audit-core-compatibility.js. Baseline fijado al main remoto verificado **6ced900**, sin dependencia de P2-A.

La auditoría reconstruye el servidor main en un directorio temporal con su propio código/estáticos y datos originales comprobados, y arranca ambos servidores en loopback. Compara por ID en es y en:

- **4,138 representaciones** de ejercicios (2,069 × 2 idiomas).
- **2,069 endpoints de medios** y 1,257 IDs con animación legacy.
- Instrucciones, nombres originales, idioma de instrucciones, equipo, músculos, fuentes, paginación y demás campos existentes.
- Taxonomía en ambos idiomas y estadísticas históricas.
- Cliente SDK actual y cliente del main original contra el servidor nuevo; URLs absolutas de SVG, búsqueda exacta, batch y desconocidos; SVG real por HTTP.

Deltas permitidos y comprobados explícitamente:

1. Los dos nombres/alias P1 en es y sus alias bilingües. El overlay y selección editorial se exigen idénticos a P1, no se acepta cualquier traducción nueva.
2. Campos aditivos P1 nameLanguage/nameStatus/editorialFeatured.
3. Las **742 correcciones P1 de mediaStatus** que anunciaban image-sequence cuando no se servía ninguna secuencia de fotos; solo se permite esa transición concreta a none con medios vacíos. No se oculta cualquier cambio de medios.
4. Campo stats.translationCoverage y versiones/ETags derivados.
5. Ampliación intencional de consultas por ID/alias P1.

La auditoría exige datos upstream, Flow, traducciones existentes, media.json y sources.json sin cambios frente a main. Los nombres/editorial se comparan contra P1. CI se actualizó con fetch-depth: 0 para disponer del baseline histórico y ejecuta la auditoría tras check/test. No se afirma que GitHub Actions haya corrido: no se publicó esta rama.

## Pruebas ejecutadas

| Comprobación | Resultado |
|---|---|
| npm run check | exit 0; snapshot y 3,771 SVG verificados |
| npm test | exit 0; **28/28**, 0 fallidas/omitidas (22 de P1 + 6 nuevas) |
| node --test test/core-consolidation.test.js test/catalog-quality.test.js | exit 0; 9/9 |
| npm run audit:compatibility | exit 0; comparación con main descrita arriba |
| python3 scripts/qa-core-firefox.py | exit 0; **21 checks en Firefox real** |
| Comparación de ramas preexistentes | 12/12 sin cambios; nueva rama única |
| Datos originales / nombres y alias P1 | Sin diff respecto de sus bases declaradas |
| git diff --check | Correcto tras saneamiento de whitespace documental y log nuevo |

Logs en [C0-I-evidence](C0-I-evidence/). La salida del navegador se conserva en C0-I-browser; solo se normalizaron espacios terminales de su log de texto nuevo. No se reescribieron evidencias P2/P3.

## Comprobación visual real de npm start

Firefox headless **157.0**, perfil temporal separado y servidor arrancado con `npm start`, puerto libre de loopback, API_KEY vacía únicamente para aislar el test. No se tocó un servidor previo del usuario ni se instalaron dependencias. Capturas de viewport desktop real de 1280×914; no son mocks ni validación de móviles/lectores de pantalla.

Las 21 comprobaciones verificaron: carga progresiva hasta 2,069 tarjetas, contadores correctos, búsquedas por ID y por alias/nombre en es/en, nombres españoles P1, estado draft, instrucciones Flow en inglés explícitas, instrucciones españolas no declaradas revisadas, estilos legacy sketch+demonstration, fallback inglés y ausencia de navegación experimental. Se midió scrollWidth=clientWidth=1268 (barra vertical de 12 px), sin overflow horizontal en esta prueba.

Capturas inspeccionadas:

- [Contadores del catálogo](C0-I-browser/catalog-counters.png).
- [flow-0372, nombre español y borrador](C0-I-browser/flow-0372-detail.png).
- [flow-0599, ficha](C0-I-browser/flow-0599-detail.png).
- [Fallback inglés explícito](C0-I-browser/english-fallback.png).
- [Ejercicio tradicional](C0-I-browser/Barbell_Squat-detail.png).

Para reproducir: `python3 scripts/qa-core-firefox.py --firefox /ruta/al/firefox`. Requiere navegador existente; no lo descarga. No se certifica la técnica de las ilustraciones legacy por comprobar su render.

## Alcance exacto candidato

La lista completa de archivos distintos de main está en **[C0-I-FILES.txt](C0-I-FILES.txt)**. Es el diff acumulado P0/P1 + C0-I, incluyendo fuentes, tests, documentación y evidencias, no solo los últimos commits. Se verificará contra el diff Git final antes de entregar.

No hay árboles de implementación P2/P3: sin src/media-mapping, src/anatomy, data/pilot/recovery/anatomy, design, examples, packages o releases. No hay /admin, atlas, personajes nuevos ni ZIPs. Se conservan únicamente los documentos de planificación P2 ya incluidos en el cierre P1; no ejecutan funciones P2. Las ramas experimentales siguen disponibles fuera de esta candidatura.

`reports/C0-CONSOLIDACION.md` se conserva como diagnóstico histórico aprobado, con contexto de P3-C. Sus enlaces relativos a evidencias experimentales deben consultarse en esa rama; no se copian esos prototipos para reparar enlaces en esta candidatura estable.

Datos preservados: 2,069 IDs, nombres originales, instrucciones inglesas y las 73 traducciones previas, dos borradores/alias españoles P1, selección editorial y 1,257 animaciones. No se tradujeron los 1,994 títulos faltantes. No hay medios ni músculos marcados como revisados.

## Verificación en localhost

Desde la carpeta ApiGym:

```sh
git switch consolidation/core-c0
npm run check
npm test
npm run audit:compatibility
npm start
```

No hace falta npm install. Abrir http://localhost:3000/. Reiniciar el proceso si antes se estaba ejecutando otra rama; los JSON y estáticos se cargan en memoria. No detener otros servicios para liberar el puerto: se puede elegir otro PORT para esta API.

1. Ver 75 nombres, 73 con instrucciones, 75 pendientes, 0 revisadas y 1,994 fallback; stats.spanish sigue siendo 73 en /api/v1/stats.
2. Buscar flow-0372 y flow-0599: un resultado, título español en borrador e instrucciones inglesas explícitas en detalle.
3. Buscar Barbell_Squat: título existente español; instrucciones españolas identificadas como automáticas sin revisión acreditada.
4. Buscar 3_4_Sit-Up: nombre original en inglés y traducción pendiente, con SVG legacy conservado.
5. Cambiar a English o buscar por nombres/alias: no se genera traducción ni cambia el ID.
6. /atlas, /admin y rutas de paquetes no forman parte del núcleo estable de esta rama.

API de muestra:

```sh
curl 'http://localhost:3000/api/v1/stats'
curl 'http://localhost:3000/api/v1/exercises?q=flow-0372&lang=es'
curl 'http://localhost:3000/api/v1/exercises/flow-0599?lang=es'
```

Si el entorno exige API_KEY, usar la configuración existente sin publicar secretos. La clave del test aislado no modifica .env.

## Plan de PR, publicación y rollback — no ejecutado

Título propuesto: **Consolidate P1 core: language coverage, ID search and combined refresh validation**.

Base: main; head: consolidation/core-c0. La PR contendría los cuatro commits P0/P1 existentes y los commits C0-I, preservando sus SHA, sin merge de ramas experimentales. El cuerpo debe resumir cobertura real, deltas permitidos respecto a main, 28 tests, auditoría/Firefox y la ausencia de traducción masiva o certificación multimedia.

Antes de autorizar publicación: volver a leer el SHA de main remoto; si cambió, revisar explícitamente compatibilidad/actualización no destructiva, sin force push. Revisar la lista exacta de archivos y el resultado de CI cuando exista. `actions/checkout` necesita historial completo para esta auditoría. Push de rama, apertura de PR, merge y despliegue son acciones separadas; ninguna se ejecuta aquí.

Rollback sin perder historia: antes de merge, no publicar esta candidatura y conservar la rama; después de un futuro despliegue, restaurar el artefacto/commit anterior identificado. Si ya se integró mediante merge commit, preparar un revert del merge con el parent correcto; si se integró de otro modo, preparar reverts acotados revisados. No resetear main, reescribir commits o forzar pushes. Los datos históricos no requieren migración, pues no cambiaron; Gym Zong permanece independiente.

## Commits C0-I

- 89eabc3 — métricas, búsqueda por ID, combinación compartida y preflight de refresco con pruebas.
- 27aa486 — estados lingüísticos del visor, tipos/documentación y regresiones HTTP/DOM.
- 0086fa4 — auditoría main, CI y QA real de Firefox con evidencias.
- El commit de cierre incorpora este informe, inventario y ajustes documentales/log; consultar git log para su SHA.

Se detiene C0-I para revisión. La traducción por lotes, glosario, instrucciones técnicas, P2/P3 e integración en Gym Zong siguen fuera del alcance. No push ni merge.
