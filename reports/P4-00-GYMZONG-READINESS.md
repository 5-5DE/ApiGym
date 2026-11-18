# P4-00 — Catálogo ApiGym para Gym Zong

Fecha: 2026-11-11. Estado: preparado para revisión; **no publicar ni integrar todavía**.

## Base, protección y alcance

Repositorio de trabajo: `ApiGym/`, clonado de `https://github.com/5-5DE/ApiGym`.
Base exacta: `6ced90082e603ed6d9d8dd9a9bf8350e14ad75db`; versión de catálogo
`d1498cd5949cc541`. El checkout completo empezó limpio en `main...origin/main`.
Rama independiente creada antes de copiar las mejoras: `feat/p4-gymzong-readiness`.
Los cambios quedan sin commit para revisión; no se hizo push, merge ni despliegue.
No se reescribió historial ni se borraron archivos previos.

El workspace inicial contenía Gym-Zong, sin checkout de ApiGym. Se leyó su inventario
original y el adaptador HTTP para conocer el contrato consumidor. Gym-Zong empezó
y terminó limpio, en `6cf8a638e5386a0a8173e469a25719d8e7151729`.
No se modificó ese repositorio. Las copias auxiliares `ApiGym-source/` y `ApiGym-p4/`
se usaron durante la descarga lenta; la entrega y rama que deben revisarse son **ApiGym/**.

## Estado observado frente al encargo

| Elemento | Estado conocido indicado | Snapshot auditado |
| --- | ---: | ---: |
| Ejercicios e IDs históricos | 2,069 | 2,069 preservados, sin altas/bajas/renumeración |
| Nombres españoles | 303 draft | 73 `ai-authored-unreviewed` |
| Fallback inglés | 1,766 | 1,996 |
| Animaciones SVG | 1,257 | 1,257, con 3,771 cuadros |
| Sin animación | — | 812 |
| Atlas muscular experimental | Mencionado | No localizado en este commit; excluido |
| Posiciones de rutina | 27 | 27, incluyendo repeticiones entre días |

Los 303 borradores y el atlas podrían pertenecer a otra revisión que no se aportó.
No se simula su existencia ni se importa otra rama. Cero traducciones, instrucciones,
asociaciones musculares o equivalencias se presentan como revisadas profesionalmente.
Se conservan las clasificaciones heredadas con su procedencia; su inclusión no las valida.

## Funcionalidades implementadas

- Inventario fuente local con SHA-256, notas originales y trazabilidad a línea CSV.
- Matriz de 27 posiciones con 41 IDs candidatos únicos; `confirmedApiGymId: null` en las 27.
  No se trasladan los slugs del inventario antiguo a IDs ApiGym automáticamente.
- Rechazo explícito de `flow-0860` para las dos posiciones de patada de glúteo:
  declara tríceps y las instrucciones describen un asa sostenida con la mano.
- Revisión de nombres, alias, idioma de instrucciones, disponibilidad visual y fuentes por candidato.
- Inspección visual de los 57 cuadros de los 19 candidatos animados, con observaciones
  independientes de la aprobación técnica. Hoja de evidencia: [P4-00-svg-contact-sheet.png](P4-00-svg-contact-sheet.png).
- Exportador offline determinista, sin dependencias npm adicionales ni solicitudes HTTP.
  Paquete de texto completo y opción separada de previsualización de SVG candidatos.
- Manifiesto con rutas relativas, tamaño y SHA-256 por archivo, licencias obligatorias,
  procedencia y política de revisión explícita. Verificador de integridad local.
- Exportación que rechaza un directorio ya existente, sin sobrescribir su contenido.
- Pruebas de regresión para identidad, pendientes, aislamiento offline, integridad,
  política de revisión, conservación de licencias y selección de SVG.

Los endpoints, OpenAPI, SDK HTTP, catálogo base, traducciones existentes, registros
musculares y SVG originales permanecen sin cambios. La mejora es un paquete adicional
para revisión y consumo local; no modifica el comportamiento de la API en producción.

## Matriz de los 27 ejercicios

Fuente: `data/gymzong/routine-original.csv`, copia byte a byte de
`Gym-Zong/docs/references/f4-04/Gym_Personal_F4-04_Inventario_27_ejercicios_v0.2.csv`.
SHA-256: `d8e26ba0f938d2e2dd24aca8ec3d8b86849029743924f06fd30753733917fbc4`.
Las notas de carga y «al fallo» permanecen literales; no se deducen series, unidades ni técnica.
Cada fila utiliza la nota original y nombres/equipo/instrucciones de los candidatos como
indicios de búsqueda. Falta observación del aparato o ejecución de la rutina; por ello
**0 confirmadas, 27 pendientes**. Candidatos de una misma fila son alternativas, no equivalentes.

| Posición | Día | Nota original | Posibles IDs ApiGym | Evidencia pendiente |
| --- | --- | --- | --- | --- |
| 1 | Lunes | Sentadilla profunda en aparato Jack invertido | `Hack_Squat`, `flow-0743` | Pendiente: Confirmar orientación del cuerpo en Jack/hack invertido; estándar no demuestra equivalencia. |
| 2 | Lunes | Extensión con banco poco inclinado | Sin candidato defendible | Pendiente: Identificar movimiento y aparato; banco poco inclinado no identifica una extensión. |
| 3 | Lunes | Abductor | `Thigh_Abductor`, `flow-0597` | Pendiente: Confirmar máquina sentada y movimiento de abducción. |
| 4 | Lunes | Prensa | `Leg_Press`, `flow-0739`, `flow-1463` | Pendiente: Confirmar ángulo, aparato y postura; no inferir unidad de carga. |
| 5 | Lunes | Patada de glúteo | `One-Legged_Cable_Kickback` | Pendiente: Confirmar polea con tobillera o máquina; no confundir kickback de tríceps. |
| 6 | Lunes | Pantorrilla | `Standing_Calf_Raises`, `Seated_Calf_Raise` | Pendiente: Confirmar sentado/de pie, aparato y recorrido. |
| 7 | Martes | Jalón al pecho | `Wide-Grip_Lat_Pulldown`, `flow-0198` | Pendiente: Confirmar agarre, accesorio y dirección del jalón. |
| 8 | Martes | Remo con barrita negra | `Seated_Cable_Rows`, `flow-0861` | Pendiente: Identificar máquina, altura de polea y agarre de la barrita negra. |
| 9 | Martes | Pull over con cuerda a la cadera | `Rope_Straight-Arm_Pulldown`, `flow-0237` | Pendiente: Confirmar brazos rectos, polea y recorrido hacia cadera. |
| 10 | Martes | Levantamiento de disco con ambas manos | `Front_Plate_Raise` | Pendiente: Confirmar elevación frontal, altura y recorrido del disco. |
| 11 | Martes | Jalón de cuerda a la cabeza | `Face_Pull` | Pendiente: Confirmar tirón hacia cara, agarre y recorrido; cabeza no prueba face pull. |
| 12 | Martes | Laterales | `Side_Lateral_Raise`, `flow-0334` | Pendiente: Confirmar elevación lateral, postura e implemento. |
| 13 | Miércoles | Peso muerto | `Barbell_Deadlift`, `Romanian_Deadlift` | Pendiente: Confirmar convencional/rumano/otro; disco 15 no identifica variante ni unidad. |
| 14 | Miércoles | Femoral sentado | `Seated_Leg_Curl`, `flow-0599` | Pendiente: Confirmar máquina de flexión de rodilla sentada; aclarar 8 lib. |
| 15 | Miércoles | Abductor | `Thigh_Abductor`, `flow-0597` | Pendiente: Confirmar máquina y si coincide con lunes. |
| 16 | Miércoles | Pantorrilla | `Standing_Calf_Raises`, `Seated_Calf_Raise` | Pendiente: Confirmar sentado/de pie y si coincide con lunes. |
| 17 | Miércoles | Hip thrust | `Barbell_Hip_Thrust` | Pendiente: Confirmar barra/máquina/otro y apoyo; no sustituir por puente de glúteos. |
| 18 | Jueves | Pec tec | `Butterfly`, `flow-0596` | Pendiente: Confirmar que Pec tec es pec deck/fly y qué apoyos y agarre usa. |
| 19 | Jueves | Chest press | `Leverage_Chest_Press`, `flow-0577`, `flow-0576` | Pendiente: Confirmar máquina, respaldo, agarre y trayectoria. |
| 20 | Jueves | Chest press inclinado | `Leverage_Incline_Chest_Press`, `flow-1299`, `flow-1479` | Pendiente: Confirmar inclinación y máquina; planta baja es ubicación, no técnica. |
| 21 | Jueves | Bíceps con mancuerna predicador | `One_Arm_Dumbbell_Preacher_Curl`, `Two-Arm_Dumbbell_Preacher_Curl`, `flow-0372` | Pendiente: Confirmar unilateral/bilateral y agarre; mancuerna excluye sustitución automática por barra EZ. |
| 22 | Jueves | Extensión de tríceps | `Triceps_Pushdown`, `Dumbbell_One-Arm_Triceps_Extension`, `flow-0607` | Pendiente: Confirmar cable/mancuerna/máquina, postura y recorrido. |
| 23 | Viernes | Hip thrust | `Barbell_Hip_Thrust` | Pendiente: Confirmar implemento y si coincide con miércoles. |
| 24 | Viernes | Patada de glúteo | `One-Legged_Cable_Kickback` | Pendiente: Confirmar polea con tobillera o máquina y si coincide con lunes. |
| 25 | Viernes | Abductor | `Thigh_Abductor`, `flow-0597` | Pendiente: Confirmar aparato y si coincide con lunes/miércoles. |
| 26 | Viernes | Peso muerto unilateral | `flow-1756`, `flow-1757` | Pendiente: Confirmar implemento, apoyo y variante unilateral; no asumir rumano. |
| 27 | Viernes | Femoral sentado | `Seated_Leg_Curl`, `flow-0599` | Pendiente: Confirmar máquina y si coincide con miércoles. |

La posición 2 queda sin candidato: «extensión con banco poco inclinado» no identifica
articulación, aparato ni movimiento. Para femoral sentado existe un candidato textual
fuerte (`Seated_Leg_Curl`), pero el inventario pide confirmar máquina y no documenta
la ejecución; no se convierte esa similitud en aprobación de técnica o correspondencia.
Los días repetidos no se fusionan ni se asume que utilizan la misma máquina.

## Nombres españoles, alias e instrucciones prioritarias

De los 41 candidatos, 14 ya tienen borrador español y 27 conservan inglés. Todos
cuentan con instrucciones heredadas o borrador; ninguna fue reescrita ni aprobada aquí.
Los 14 borradores se enumeran para revisión del entrenador y de idioma:

| ID | Nombre español actual, sin aprobar | Alias actuales, sin aprobar | Instrucciones |
| --- | --- | --- | --- |
| `Barbell_Deadlift` | Peso muerto convencional | peso muerto con barra; deadlift | 3 pasos, borrador ES sin revisión |
| `Barbell_Hip_Thrust` | Hip thrust con barra | empuje de cadera; elevación de cadera con barra | 3 pasos, borrador ES sin revisión |
| `Butterfly` | Aperturas en máquina | pec deck; mariposa; contractor de pecho | 3 pasos, borrador ES sin revisión |
| `Face_Pull` | Jalón a la cara con cuerda | face pull; jalón para deltoide posterior | 3 pasos, borrador ES sin revisión |
| `Hack_Squat` | Sentadilla hack en máquina | hack squat | 3 pasos, borrador ES sin revisión |
| `Leg_Press` | Prensa de piernas | leg press; prensa inclinada | 3 pasos, borrador ES sin revisión |
| `Romanian_Deadlift` | Peso muerto rumano | rumano; rdl | 3 pasos, borrador ES sin revisión |
| `Seated_Cable_Rows` | Remo sentado en polea | remo bajo; remo con triangulo; remo gironda | 3 pasos, borrador ES sin revisión |
| `Seated_Calf_Raise` | Elevación de pantorrillas sentado | gemelos sentado; sóleo sentado | 3 pasos, borrador ES sin revisión |
| `Seated_Leg_Curl` | Curl femoral sentado | curl de pierna sentado; leg curl | 3 pasos, borrador ES sin revisión |
| `Side_Lateral_Raise` | Elevaciones laterales con mancuernas | laterales de hombro; lateral raise | 3 pasos, borrador ES sin revisión |
| `Standing_Calf_Raises` | Elevación de pantorrillas de pie | gemelos de pie; calf raise | 3 pasos, borrador ES sin revisión |
| `Triceps_Pushdown` | Extensión de tríceps en polea con barra | jalón de tríceps; pushdown | 3 pasos, borrador ES sin revisión |
| `Wide-Grip_Lat_Pulldown` | Jalón al pecho con agarre amplio | jalon al pecho; lat pulldown; jalón dorsal | 3 pasos, borrador ES sin revisión |

Prioridades de corrección humana:

1. `Leg_Press`: el alias «prensa inclinada» restringe un nombre genérico; comprobar
   aparato antes de usarlo como sinónimo o equivalencia. El alias se conserva en la
   fuente y la observación queda en el informe de calidad, sin inventar sustitución.
2. «Jack invertido» no se convierte en hack estándar; «Pec tec» no se corrige
   silenciosamente a pec deck; «planta baja» se trata como nota de ubicación.
3. Mancuerna predicador exige revisar apoyo, número de brazos y agarre; no sustituir
   por barra EZ. Peso muerto sin variante no implica rumano.
4. `flow-0739` conserva mojibake en el nombre original. No se ofrece una traducción
   supuestamente revisada para ocultarlo. Revisar codificación y significado en origen.
5. Fuera de los candidatos, cuatro registros carecen de instrucciones según el check:
   `Iron_Cross`, `One-Arm_Kettlebell_Swings`, `Push_Press`, `Side_Jackknife`.
   La exportación conserva esa ausencia.

`reports/P4-00-audit.json` contiene los 41 nombres originales, nombres ES disponibles,
alias, idioma de instrucciones, conteos, fuentes y notas de calidad.

## SVG, técnica representada, procedencia y licencias

Se verificaron los hashes y contenido básico de los **3,771 SVG** con `npm run check`.
Esto prueba integridad del snapshot y controles básicos de contenido, no exactitud
biomecánica. Los 19 candidatos animados tienen tres cuadros cada uno; se inspeccionaron
los 57 en una hoja local renderizada con Chrome. Los 22 candidatos restantes carecen
de SVG asociado en este snapshot. No se vincula otro medio por parecido del nombre.

Observaciones visuales completas: `data/gymzong/visual-review.json`. Riesgos concretos:

| ID | Observación | Acción antes de uso instructivo |
| --- | --- | --- |
| `flow-0372` | Curl sentado con mancuernas; no se distingue apoyo de predicador bajo los brazos | Confirmar apoyo y movimiento; posible desacuerdo con el nombre |
| `flow-1756` | Bisagra unilateral; se aprecian cargas separadas, aunque nombre/equipo declara barra | Revisar implemento representado y metadatos |
| `flow-0599` | Piernas parecen pasar de flexión a extensión con rodillo anterior | Revisar posible representación de extensión en vez de curl femoral |
| `flow-0743` | Espalda hacia respaldo y apoyos de hombros | No demuestra Jack invertido |
| `flow-0576` / `flow-0577` y `flow-1299` / `flow-1479` | Variantes con nombres repetidos | Mantener IDs separados; comprobar máquina y ángulo |
| Todos | Cuadros estilizados, sin ejecución real de la rutina | Entrenador revisa articulaciones, equipo, recorrido y correspondencia |

Los dibujos tienen relleno claro y pierden contraste sobre blanco. La hoja de preview
incluye fondo oscuro para distinguirlos, sin modificar archivos SVG ni recolorear el arte.
El tiempo entre cuadros es de presentación; no prescribe velocidad de repetición.

| Recurso | Fuente/declarante | Licencia declarada y alcance | Evidencia/límites |
| --- | --- | --- | --- |
| Código ApiGym | Repositorio ApiGym | MIT | `LICENSE` |
| Base Free Exercise DB | yuhonas y colaboradores | Unlicense declarada por fuente | `data/upstream/LICENSE-Free-Exercise-DB.txt`; fotos no servidas ni empacadas |
| Datos/instrucciones Flow | Hasan Emir Yıldırım y Flow contributors | MIT para datos/instrucciones | `data/flow-exercise-dataset/LICENSE` y `NOTICE.md` |
| Arte SVG Flow | Flow contributors; generación OpenAI Image Gen reportada | Dedicación CC0-1.0 hasta donde el declarante tiene derechos | `ARTWORK-LICENSE`, registros por ejercicio, hashes y `NOTICE.md` |
| Traducciones ES | Borradores locales de ApiGym | Estado `ai-authored-unreviewed`; conservar avisos del repositorio | Sin aprobación de idioma o entrenamiento |
| Atlas | Sin archivo localizado en base | Sin licencia evaluable aquí | No se incorpora ni se inventan asociaciones |

Snapshot Flow importado: `961bb2739015da373daa43b960c28ee839fe93e6`.
Solo hay **13 prompts retenidos de 1,257 animaciones**; faltan 1,244.
Los 19 candidatos animados tienen `promptEvidence.status: not-retained`.
La ausencia de referencias registradas no demuestra creación independiente ni clearance
completo de terceros. Los avisos de fuente reconocen estos límites y permanecen dentro
ambos paquetes. Las fotografías y medios restringidos de otras fuentes no se descargan.

Referencias primarias y avisos conservados:
[Free Exercise DB](https://github.com/yuhonas/free-exercise-db),
[Flow Exercise Dataset](https://github.com/ozansozuozgit/flow-exercise-dataset),
[datos upstream de Flow](https://github.com/hasaneyldrm/exercises-dataset).
Las conclusiones de licencia describen los documentos del snapshot; no certifican
que el arte está libre de derechos de terceros.

## Paquetes offline preparados

- `dist/gymzong-offline-v1/`: 16 archivos, 5,361,934 bytes sin comprimir. ZIP: 375,466 bytes. SHA-256 ZIP: `dfee10bc893d4f08f677847304e74f0502db8e7eb64a78f2ff70b950f6bd02cd`.
- `dist/gymzong-preview-v1/`: 93 archivos, 6,292,584 bytes sin comprimir. ZIP: 790,180 bytes. SHA-256 ZIP: `e580f0e99da228749c00ec1d97090124634016bd0810008844238171e7622acf`.

Ambos contienen `catalog.json` con los 2,069 ejercicios, `taxonomy.json`, matriz,
CSV fuente, revisión de calidad y visual, fixture de IDs y avisos de licencia.
El manifiesto diferencia política y hashes; **no tiene firma digital**. Para entrega
verificar el SHA-256 del ZIP por un canal de confianza. Hashes no prueban autoría ni técnica.

La edición de texto excluye animación, imágenes y variantes externas de los registros,
conservando atribución documental. Usa `mediaStatus: none` y preserva el estado de origen
como `upstreamMediaStatus`. La edición preview añade solo **57 SVG de 19 candidatos**,
19 registros de procedencia y `review.html`. Todos mantienen estado `preview-unreviewed`;
`mediaApprovedForInstruction` y `translationsHumanReviewed` son falsos. No hay prompts
retenidos para estos 19, por lo que no se añaden prompts ficticios.
Los enlaces de fuente y licencia son documentación; no deben consultarse para cargar
catálogo o imágenes. No hay GIF/MP4 que descargar.

Regenerar desde la raíz de ApiGym, utilizando rutas nuevas:

```sh
npm run gymzong:audit
npm run gymzong:export -- dist/mi-paquete-texto
npm run gymzong:export -- dist/mi-paquete-preview --include-preview-media
npm run gymzong:verify -- dist/mi-paquete-texto
npm run gymzong:verify -- dist/mi-paquete-preview
```

El constructor compara cada SVG con el checksum del snapshot y rechaza script,
eventos y referencias externas básicas. El verificador detecta corrupción, faltantes,
extras, rutas inseguras, cambio de IDs, pérdida de avisos obligatorios y promoción
indebida de revisión. Es una herramienta de construcción/verificación en Node 24;
no se copia `src/gymzong-offline.js` al runtime React Native, pues utiliza `node:fs`.

## Archivos modificados o añadidos

- `.gitignore`: excluye artefactos regenerables en `dist/`.
- `package.json`: comandos de auditoría, exportación y verificación.
- `README.md`: uso de paquetes y límites de integración.
- `data/gymzong/historical-ids.json`: fixture de los 2,069 IDs en el commit base.
- `data/gymzong/routine-original.csv`: evidencia original preservada.
- `data/gymzong/routine-review.json`: matriz de posiciones, candidatos, rechazos y preguntas.
- `data/gymzong/visual-review.json`: inspección visual y preocupaciones por medio.
- `src/gymzong-offline.js`: auditoría, exportador determinista y verificador.
- `scripts/audit-gymzong.js`: genera auditoría JSON.
- `scripts/export-gymzong-offline.js`: CLI de exportación sin sobrescritura.
- `scripts/verify-gymzong-offline.js`: verificación de directorio, rechazando enlaces simbólicos.
- `scripts/seed-gymzong-review.py`: reproduce la matriz pendiente desde la copia local;
  herramienta de semilla, no debe usarse para reemplazar una revisión humana futura.
- `test/gymzong-offline.test.js`: siete pruebas adicionales de regresión.
- `reports/P4-00-audit.json`: evidencia machine-readable para los 41 candidatos.
- `reports/P4-00-svg-contact-sheet.png`: render local de los 57 cuadros candidatos.
- `reports/P4-00-GYMZONG-READINESS.md`: esta entrega.

`dist/gymzong-offline-v1/`, `dist/gymzong-preview-v1/` y sus ZIP son artefactos
locales ignorados por Git, regenerables a partir de la rama. No se versionan copias
adicionales de los 2,069 registros o de SVG históricos. Las carpetas previas dentro
de `dist/` son iteraciones conservadas; para revisión usar las terminadas en `-v1`.

## Pruebas realizadas

Entorno: Windows/PowerShell, Node **v24.21.0**; se usó `npm.cmd` para respetar la
política local de ejecución de PowerShell sin cambiarla.

| Verificación | Resultado |
| --- | --- |
| `npm.cmd test` | **22/22 pasan**: 15 existentes + 7 nuevas |
| `npm.cmd run check` | 2,069 ejercicios, 3,771 hashes SVG correctos; conserva cuatro ausencias de instrucciones |
| Exportación texto y preview | Ambas completas, con rutas relativas y sin descarga |
| `gymzong:verify` sobre ambos directorios `-v1` | Correcto: 2,069 ejercicios en cada uno |
| Exportación determinista | Comparación byte a byte de mapas de archivos idénticos |
| Aislamiento de red | `fetch` bloqueado durante prueba de exportación de texto |
| Negativas de integridad/política | Rechaza IDs sustituidos/duplicados, candidatos inexistentes, promoción de pendientes, archivo corrupto/extra/faltante, rutas inseguras, pérdida de licencia y CSV alterado |
| SVG de preview | Selección solo de candidatos, hashes upstream y procedencia local presentes |
| Regresión pública | Pasan pruebas HTTP, SDK, filtros, paginación, ETag, HEAD, CORS y autenticación existentes |
| Inspección visual local | 57 cuadros renderizados y revisados; sin certificación biomecánica |
| `git diff --check` | Sin errores después de normalizar final de README |
| Diff de datasets/traducciones/API pública y estado de Gym-Zong | Sin modificaciones |

En la descarga parcial hubo dos fallos por SVG todavía ausentes; tras completar el
checkout, las pruebas completas pasan. La primera captura de Chrome falló por GPU
bajo sandbox; la captura local final se obtuvo y revisó. No se ocultaron pruebas ni
se redujeron checks para compensar esos fallos de preparación.
No se construyó ni probó una APK, SQLite de Gym Zong o modo avión en teléfono.

## Pendientes de revisión humana

1. Aportar fotos/modelos de máquinas o demostración de las 27 posiciones y validar
   cada variante. Mantener `confirmedApiGymId: null` hasta tener esa evidencia.
2. Revisar los 14 borradores españoles prioritarios, sus alias y pasos; decidir
   traducciones de los 27 candidatos en inglés con revisor identificado.
3. Entrenador revisa los 19 sets y especialmente los tres conflictos visuales.
   Confirmar equipo, articulaciones, rango y correspondencia texto/dibujo.
4. Responsable de recursos evalúa procedencia incompleta y decide uso público de SVG.
   Alternativa: producir recursos propios con expediente de origen verificable.
5. Localizar commit/archivos de las 303 traducciones y del atlas experimental si
   siguen dentro del alcance. No se puede auditar contenido que no está en la base.
6. Revisar esta rama y los paquetes. La aprobación editorial/técnica debe ser un
   cambio explícito con evidencia; las comprobaciones de P4 impiden aprobar por accidente.

## Recomendación exacta de integración en Gym Zong

**Primero revisar esta entrega; no integrar ni publicar desde esta sesión.**
Tras aprobación del responsable del producto, abrir un cambio independiente en Gym Zong:

1. Empacar `dist/gymzong-offline-v1/` como assets locales de la tercera APK, conservar
   los avisos y verificar el ZIP/manifiesto durante construcción. Usar `provider: apigym`
   y cada `id` histórico literalmente; no crear IDs a partir de nombres ni slugs antiguos.
2. Implementar un adaptador local de `ExerciseCatalog` que lea el JSON o importe a
   SQLite con versión `d1498cd5949cc541`. El adaptador HTTP actual no consume este paquete
   automáticamente. Cargar los 2,069 registros; búsqueda local con nombres/alias/equipo,
   paginación estable y consultas de detalle por ID. Mantener snapshots de rutinas/historial.
3. Evitar que los filtros actuales `popular=true`/`hasAnimation=true` y el descarte
   por `language === es` oculten el paquete: texto offline no incluye animaciones y
   1,996 registros tienen fallback inglés. Mostrar idioma real y ausencia de revisión;
   no rellenar traducciones, músculos o instrucciones inexistentes.
4. Ofrecer selección manual; **no importar ni enlazar automáticamente las 27 posiciones**.
   Conservar notas originales y estado pendiente. Usar una miniatura neutral cuando falte
   medio; no ocultar el ejercicio ni descargar GIFs en listas.
5. Usar `gymzong-preview-v1/review.html` para revisión interna. No añadir estos SVG a
   la APK pública todavía. Después de aprobación por recurso, empaquetar solo archivos
   aprobados con su procedencia y resolver `media/flow/...` a assets locales estáticos
   (mapa explícito de `require`/URI local compatible con Expo, nunca `new URL` al servidor).
   Reproducir únicamente en detalle, conservando atribución y alto contraste.
6. Probar la APK en modo avión desde primer arranque: búsqueda, filtros, detalle,
   guardado y reapertura de rutina, identidad histórica y ausencia de solicitudes de
   medios. Probar además lista sin imagen, idioma inglés y estados pendientes.

La parte que puede revisarse para integración inmediata es **el paquete de texto y
trazabilidad**. Las equivalencias, el atlas y el uso instructivo de animaciones siguen
pendientes. Esta sesión se detiene para revisión sin push, merge, publicación o integración.
