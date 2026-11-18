# Revisión de localización es-MX

Catálogo activo: 1257. Registros procesados: 1257. Adaptaciones con reescritura y contraste textual: 13. Borradores pendientes: 1244. Sin procesar en el inventario: 0. Ilustraciones inspeccionadas (tres cuadros): 13.

**La adaptación editorial integral de las instrucciones no está terminada.** Los borradores no son instrucciones técnicamente validadas. La revisión posterior de títulos sí cubre las 1,257 fichas y sus tres cuadros; sus resultados y conflictos están en [TITLE-REVIEW-ES-MX.md](TITLE-REVIEW-ES-MX.md). Esa revisión no aprueba automáticamente las instrucciones. La inspección visual comprueba el patrón representado y no certifica la técnica.

## Arquitectura y trazabilidad

`data/upstream/free-exercise-db.json` y `data/flow-exercise-dataset/data/exercises.json` permanecen intactos. `src/catalog.js` resuelve identidades antes de localizar. Los 812 registros retirados no vuelven a la API. Los textos anteriores se conservan en `data/localization/es-MX.previous-translations.json`. Las modificaciones editoriales reproducibles están en `es-MX.adaptations.json`; los borradores de Google Translate están separados en `es-MX.machine-drafts.json`. `npm run localization:build` trabaja sin red. El servidor solo lee los resultados persistidos.

La respuesta conserva los campos existentes, agrega `instructionsEn` y `localizationReview`, y permite `lang=en`. `popular` en las traducciones conserva la selección previa, independiente de la nueva cobertura de traducción. Male/female se retira del título y se conserva como metadato de la persona representada.

## Fuentes realmente consultadas

- [puregym-cable-kickbacks](https://www.puregym.com/exercises/glutes/glute-kickbacks/cable-kickbacks/): Contraste específico de patada de glúteo en polea: tobillera, polea baja y orientación frente a la máquina. Reescritura propia contrastada con los tres cuadros de flow-0228; el original inglés conserva una orientación contradictoria.
- [smartfit-mx-peso-libre](https://smartfit.com.mx/news/comunidad-smart-fit/que-hay-en-un-gimnasio-smart-fit-conoce-el-area-de-peso-libre/): Uso mexicano: press, curl, desplantes, aperturas y equipo; no verifica todas las variantes.
- [smartfit-mx-dominadas](https://smartfit.com.mx/news/tips/tipos-de-dominadas-y-como-hacerlas-en-el-gimnasio/): Familia de dominadas y diferencias entre agarre prono, supino y neutro.
- [smartfit-mx-agarres](https://smartfit.com.mx/news/tips/diferentes-tipos-de-agarre-en-el-gym/): Nombres y orientación de los agarres; neutro o martillo no equivale a supino.
- [smartfit-mx-flexiones](https://smartfit.com.mx/news/rutinas/realiza-tu-rutina-tabata-en-casa-video/): Uso de flexiones de brazos y lagartijas en México. No se importan las pautas de entrenamiento.
- [mayo-crunch](https://www.mayoclinic.org/es/healthy-lifestyle/fitness/multimedia/abdominal-crunch/vid-20084664): Crunch: elevación parcial del tronco; no se equipara a una incorporación completa.
- [mayo-fuerza](https://www.mayoclinic.org/es/healthy-lifestyle/fitness/in-depth/strength-training/art-20046031): Terminología general de fortalecimiento; no es una validación individual del catálogo.
- [vivagym-mancuernas](https://www.vivagym.com/es-es/ejercicios-mancuernas/): Familias de movimientos con mancuernas. Se contrasta la variante con los datos originales.
- [musclewiki-press-declinado](https://musclewiki.com/es-es/exercises/chest/dumbbells/3?model=f): Nomenclatura de press declinado, unilateral y agarre neutro. No se copian sus instrucciones.

Estas fuentes fundamentan terminología por familias; no se asignan como prueba de investigación individual a un borrador. Cada adaptación concreta declara sus referencias. No se copiaron instrucciones de sitios externos.

## Casos pendientes

La lista completa, con ID, motivo, original y rutas de ilustración, está en `spanish-localization-review.json`. No se ocultan pendientes en un porcentaje general. Además de la falta de revisión editorial, se detectan posibles conflictos de agarre, asistencia sin describir y variantes numeradas. Las alertas son indicios para revisión, no conclusiones automáticas.

- `flow-0011` (assisted hanging knee raise): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-0010` (assisted hanging knee raise with throw down): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1709` (assisted lying glutes stretch): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1710` (assisted lying gluteus and piriformis stretch): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-0014` (assisted motion russian twist): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-0015` (assisted parallel close grip pull-up): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1713` (assisted prone lying quads stretch): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1714` (assisted prone rectus femoris stretch): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-0017` (assisted pull-up): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1716` (assisted seated pectoralis major stretch with stability ball): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1712` (assisted side lying adductor stretch): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1758` (assisted sit-up): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1432` (assisted standing pull-up): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1369` (band two legs calf raise - (band under both legs) v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0077` (barbell rear lunge v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0079` (barbell revers wrist curl v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0096` (barbell side bent v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0097` (barbell side split squat v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-2810` (barbell split squat v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0119` (barbell upright row v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0121` (barbell upright row v. 3): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0125` (barbell wrist curl v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-3235` (cable assisted inverse leg curl): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-0186` (cable lying triceps extension v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0199` (cable pushdown (straight arm) v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0228` (cable standing hip extension): El original inglés indica situarse de espaldas a la polea. La adaptación española corrige a frente a la máquina tras contrastar fuente y tres cuadros; instructionsEn conserva el texto de origen.
- `flow-0287` (dumbbell arnold press v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-1657` (dumbbell cross body hammer curl v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-2136` (dumbbell cuban press v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0304` (dumbbell decline shrug v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0309` (dumbbell front raise v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0313` (dumbbell hammer curl): El título indica martillo, pero el original pide girar las palmas al frente. Confirmar agarre en la ilustración; no sustituirlo silenciosamente.
- `flow-0312` (dumbbell hammer curl v. 2): El título indica martillo, pero el original pide girar las palmas al frente. Confirmar agarre en la ilustración; no sustituirlo silenciosamente. La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-2402` (dumbbell hammer curls (with arm blaster)): El título indica martillo, pero el original pide girar las palmas al frente. Confirmar agarre en la ilustración; no sustituirlo silenciosamente.
- `flow-0317` (dumbbell incline curl v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0342` (dumbbell lying one arm press v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0360` (dumbbell one arm shoulder press v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0370` (dumbbell peacher hammer curl): El título indica martillo, pero el original pide girar las palmas al frente. Confirmar agarre en la ilustración; no sustituirlo silenciosamente.
- `flow-0395` (dumbbell seated lateral raise v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-2321` (dumbbell standing inner biceps curl v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-3698` (inchworm v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0497` (inverted row v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0513` (jump squat v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0572` (lever assisted chin-up): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-1439` (lever gripless shrug v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-2286` (lever hip extension v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-1479` (lever incline chest press v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-1614` (lever preacher curl v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-3760` (lever seated crunch v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0869` (lever shoulder press v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-2318` (lever shoulder press v. 3): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-1495` (oblique crunch v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0658` (push-up (wall) v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-3552` (quick feet v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0696` (self assisted inverse leg curl (on floor)): El título indica asistencia; las instrucciones no identifican cómo se proporciona.
- `flow-0705` (side bridge v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-0735` (sit-up v. 2): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-2138` (stationary bike run v. 3): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.
- `flow-3433` (swimmer kicks v. 2 (male)): La fuente usa un número de variante. Confirmar su diferencia con las demás fichas antes de retirar el número.

## Cómo cerrar un pendiente

Contrastar título, instrucciones, equipo y todos los cuadros de la ilustración; consultar una fuente primaria para la variante exacta; registrar denominación habitual, alias, pasos y referencias en `data/localization/es-MX.adaptations.json`. Si existe contradicción sin resolver, conservar el estado pendiente y su motivo. Ejecutar `npm run localization:build`, `npm run localization:check`, `npm test` y `npm run check`.
