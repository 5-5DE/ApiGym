# P0 — contrato para Diego Soto

Manifiesto: `data/essential-50.json`. Endpoint: `GET /api/v1/selections/essential-50` (sin parámetros; respeta X-API-Key, CORS, HEAD y ETag actuales). No requiere cambios frontend para arrancar la API. Reiniciar el servidor para cargar el snapshot.

Contrato v1: `{schemaVersion, selectionId, version, catalogVersion, catalogCount, policy, coverage, data}`. `data` conserva el orden editorial y exactamente 50 ejercicios. `version` es SHA-256 del contenido sin ese campo; `catalogVersion` identifica el catálogo fuente. Regeneración determinista: `node scripts/build-essential-50.js`; validar después con `npm test` y `npm run check`.

Cada ejercicio incluye `id`, `name`/`nameLanguage`, `nameEs=null`, `nameEsStatus=unapproved`, `nameEsDraft`, equipo canónico y etiqueta española, músculos primarios/secundarios, dificultad, categoría, mecánica, fuerza, instrucciones originales inglesas y fuentes/licencias. Los nombres españoles existentes son borradores; no mostrarlos como aprobados. No se crean traducciones. Datos técnicos cotejados con el catálogo; no equivalen a revisión profesional de técnica.

`media`: `{status: pending|missing, best: null, alternatives: [], fallback: {kind: technical-info, exerciseId}, candidates: [...]}`. Renderizar nombre, equipo, músculos e instrucciones cuando best sea null o falle un medio. No se necesita una imagen para el fallback. Los candidatos conservan secuencia SVG, atribución, procedencia y SHA-256 por cuadro; son para revisión, no para reproducción aprobada. No usar el campo legacy `media.animation` del endpoint batch como aprobación: ese endpoint sigue ofreciendo medios sin revisión. Se reutiliza `/api/v1/exercises/batch?ids=...` para consultar los 50 IDs, pero la decisión de medios es la del manifiesto P0.

Cobertura: **0 animaciones aprobadas, 0 otros visuales aprobados, 10 secuencias SVG existentes pendientes, 50 fallbacks técnicos**. Integridad y respuesta HTTP verificadas para los 30 cuadros candidatos; ello no aprueba correspondencia, técnica ni derechos. No se inventaron GIF/SVG ni se sirvieron MP4 experimentales.

Rutina: P4-01 documenta 0 correspondencias exactas confirmadas, 3 compatibles históricamente y 24 candidatas. Ninguna posición se asigna ni se marca como confirmada. La selección usa fundamentos independientes: empuje/tirón, sentadilla/bisagra, unilateral, pantorrillas, hombros, brazos, zona media y cardio. No constituye una nueva rutina prescrita.

Higgsfield: producción P1; ningún job, consulta remota de generación ni gasto. Estado documental B003: generationAuthorized=false, creditSpendingAuthorized=false, noCreditFallback=true, recuperación del rate limit no confirmada. Los siete MP4 únicos y sus informes se conservan en sus carpetas experimentales, incluidas copias históricas; `preserved-sha256.json` registra integridad. Sin cambios en medios de producción.

Build: el paquete raíz no define script build ni requiere compilación; Node sirve los módulos directamente. Validar sintaxis con `node --check`, datos con check y API con tests. No se modifican public/, client/ ni Gym Zong; no merge/push.

Pendientes para mañana: integrar este endpoint en el frontend con fallback técnico; si se exigen nombres españoles o animaciones aprobadas, falta revisión explícita (no bloquea los 50 fallbacks). Confirmar las variantes de la rutina antes de vincularla. No hace falta producir videos nuevos.

## Lista y cobertura individual

| # | ID histórico | Visual P0 | Músculo principal |
| --- | --- | --- | --- |
| 1 | `Barbell_Bench_Press_-_Medium_Grip` | Fallback técnico | chest |
| 2 | `Dumbbell_Bench_Press` | SVG pendiente; fallback técnico | chest |
| 3 | `Incline_Dumbbell_Press` | Fallback técnico | chest |
| 4 | `Dumbbell_Flyes` | Fallback técnico | chest |
| 5 | `Butterfly` | Fallback técnico | chest |
| 6 | `Pushups` | Fallback técnico | chest |
| 7 | `Machine_Bench_Press` | Fallback técnico | chest |
| 8 | `Pullups` | Fallback técnico | lats |
| 9 | `Chin-Up` | SVG pendiente; fallback técnico | lats |
| 10 | `Band_Assisted_Pull-Up` | SVG pendiente; fallback técnico | lats |
| 11 | `Wide-Grip_Lat_Pulldown` | Fallback técnico | lats |
| 12 | `Seated_Cable_Rows` | Fallback técnico | middle back |
| 13 | `Bent_Over_Barbell_Row` | Fallback técnico | middle back |
| 14 | `One-Arm_Dumbbell_Row` | Fallback técnico | middle back |
| 15 | `Face_Pull` | Fallback técnico | shoulders |
| 16 | `Straight-Arm_Pulldown` | Fallback técnico | lats |
| 17 | `Hyperextensions_Back_Extensions` | Fallback técnico | lower back |
| 18 | `Barbell_Full_Squat` | SVG pendiente; fallback técnico | quadriceps |
| 19 | `Front_Barbell_Squat` | Fallback técnico | quadriceps |
| 20 | `Goblet_Squat` | Fallback técnico | quadriceps |
| 21 | `Bodyweight_Squat` | Fallback técnico | quadriceps |
| 22 | `Leg_Press` | Fallback técnico | quadriceps |
| 23 | `Leg_Extensions` | Fallback técnico | quadriceps |
| 24 | `Lying_Leg_Curls` | Fallback técnico | hamstrings |
| 25 | `Seated_Leg_Curl` | Fallback técnico | hamstrings |
| 26 | `Barbell_Deadlift` | SVG pendiente; fallback técnico | lower back |
| 27 | `Romanian_Deadlift` | Fallback técnico | hamstrings |
| 28 | `Barbell_Hip_Thrust` | Fallback técnico | glutes |
| 29 | `Butt_Lift_Bridge` | Fallback técnico | glutes |
| 30 | `Dumbbell_Lunges` | Fallback técnico | quadriceps |
| 31 | `Standing_Calf_Raises` | Fallback técnico | calves |
| 32 | `Seated_Calf_Raise` | Fallback técnico | calves |
| 33 | `Dumbbell_Shoulder_Press` | Fallback técnico | shoulders |
| 34 | `Barbell_Shoulder_Press` | Fallback técnico | shoulders |
| 35 | `Side_Lateral_Raise` | Fallback técnico | shoulders |
| 36 | `Dumbbell_Shrug` | SVG pendiente; fallback técnico | traps |
| 37 | `Barbell_Curl` | SVG pendiente; fallback técnico | biceps |
| 38 | `Dumbbell_Bicep_Curl` | Fallback técnico | biceps |
| 39 | `Hammer_Curls` | Fallback técnico | biceps |
| 40 | `Concentration_Curls` | Fallback técnico | biceps |
| 41 | `Triceps_Pushdown_-_Rope_Attachment` | Fallback técnico | triceps |
| 42 | `Close-Grip_Barbell_Bench_Press` | Fallback técnico | triceps |
| 43 | `Dips_-_Triceps_Version` | Fallback técnico | triceps |
| 44 | `Plank` | Fallback técnico | abdominals |
| 45 | `Cable_Crunch` | Fallback técnico | abdominals |
| 46 | `Hanging_Leg_Raise` | SVG pendiente; fallback técnico | abdominals |
| 47 | `Russian_Twist` | SVG pendiente; fallback técnico | abdominals |
| 48 | `Reverse_Crunch` | SVG pendiente; fallback técnico | abdominals |
| 49 | `Bicycling_Stationary` | Fallback técnico | quadriceps |
| 50 | `Walking_Treadmill` | Fallback técnico | quadriceps |

## Validación ejecutada

- `npm test`: 63/63, sin skips; incluye API, batch de 50, control de acceso, ETag, HEAD y GET/SHA-256 de todos los cuadros candidatos. Ejecutado fuera del sandbox por EPERM al abrir sockets.
- `npm run check`: pasó (catálogo completo y lotes de nombres).
- `npm run audit:compatibility`: pasó fuera del sandbox; compara los 2,069 registros en ambos idiomas y medios legacy contra la base histórica.
- `node --check` en app, OpenAPI y generador; `git diff --check`: pasaron.
- Datos históricos sin cambios en Git; hashes de catálogo y siete MP4 únicos conservados.
- Logs: `reports/p0-essential-50/{tests,check,compatibility}.txt`. No existe script build en este paquete; no se afirma despliegue remoto ni prueba física móvil.
