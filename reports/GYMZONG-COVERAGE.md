# Fase 4: cobertura y nombres

Catálogo: `f1c2e8d5958e86dd`; 1257 fichas activas y 1257 animaciones SVG. Se conservan los IDs y los medios existentes.

**Decisión del usuario:** esperar animaciones verificadas antes de incorporar ejercicios ausentes. No se crean fichas de texto sin animación ni se reutilizan imágenes de otro movimiento.

## Resultado de cada petición

| Petición | Estado | IDs activos | Motivo |
| --- | --- | --- | --- |
| Face pull | awaiting-verified-animation | — | Existe en el snapshot histórico, pero fue retirado por falta de medios. Se espera una animación verificada antes de restaurarlo. |
| Elevación frontal con disco | awaiting-verified-animation | — | Existe en el snapshot histórico sin animación. La variante con barra no sustituye a la que usa disco. |
| Patada de glúteo en polea | available | flow-0228 | La extensión unilateral de cadera con tobillera ya tiene animación. Se corrigen nombre, alias y orientación de las instrucciones españolas; instructionsEn conserva el original contradictorio. |
| Patada de glúteo en máquina | awaiting-verified-animation | — | No se encontró una animación correspondiente en el catálogo. Se mantiene pendiente, sin reutilizar una prensa de piernas. |
| Remo sentado en polea con agarre en V | available | flow-0213 | Los tres cuadros y el texto muestran tracción horizontal sentado con triángulo. Se elimina la afirmación no respaldada de remo alto del nombre español; nameEn conserva la etiqueta original. |
| Press de pecho sentado en máquina | available | flow-0576, flow-0577, flow-1301 | Se aclara la postura sentada en los nombres. flow-1301 se corrige de aperturas a press según el texto original y los cuadros. La familia conserva flow-0576 como representante sin fusionar IDs. |
| Sentadilla hack inversa | awaiting-verified-animation | — | No existe una animación de la orientación inversa en los snapshots examinados. La sentadilla hack convencional no se etiqueta como inversa. |

## Correcciones realizadas

- flow-0228: Patada de glúteo de pie en polea. El texto original indicaba ponerse de espaldas; los tres cuadros muestran frente a la máquina. La adaptación española se reescribió con contraste de una fuente primaria del ejercicio y los cuadros. instructionsEn permanece intacto y localizationReview.reasons registra original-orientation-corrected.
- flow-0213: Remo sentado en polea con agarre en V. Se añaden triángulo y sus variantes de búsqueda. La fuente lo llamaba high row, pero el texto y los cuadros muestran tracción horizontal; no se conserva esa afirmación en español ni se alteran los originales.
- flow-0576 y flow-0577: Press de pecho sentado en máquina. Se aclara la postura, manteniendo ambos IDs y flow-0576 como representante de la familia.
- flow-1301: se corrige Aperturas de pecho sentado en máquina a Press de pecho sentado en máquina. El alias erróneo aperturas en máquina de palanca se retira de esta ficha; no se mantiene como sinónimo de press. No se fusiona con los otros IDs.
- flow-0237: Pullover con cuerda en polea alta. La advertencia anterior atribuía al texto una flexión de codos de 90 grados inexistente. El original indica brazos extendidos y coincide con los cuadros. Se cierra la revisión del título, sin aprobar automáticamente sus instrucciones traducidas.

## Revisiones que siguen abiertas

- flow-0599: La animación termina con elevación de los pies y extensión de rodilla. No permite confirmar la dirección de resistencia de un curl femoral sentado. Se conserva el estado pendiente y best:null.
- flow-2286 no se considera patada de glúteo: muestra empuje sentado. No se cambia su identidad por la similitud del nombre inglés.
- Los nombres duplicados y la calidad general del español siguen en la fase 5. La incorporación de los cuatro ejercicios pendientes de medios requiere otra entrega con animaciones verificadas.

## Alcance de la búsqueda de faltantes

Se revisaron nombres, IDs y registros en los 1257 ejercicios activos, 876 registros del snapshot Free Exercise DB y 1324 de Flow. Face_Pull y Front_Plate_Raise están en el snapshot histórico pero no tienen animación local y continúan retirados. No se afirma que los movimientos no existan fuera de estas fuentes.

## Fuentes consultadas

- [www.nasm.org](https://www.nasm.org/resource-center/exercise-library/face-pull)
- [www.puregym.com](https://www.puregym.com/exercises/arms-and-shoulders/front-raises/plate-front-raise/)
- [www.puregym.com](https://www.puregym.com/exercises/glutes/glute-kickbacks/cable-kickbacks/)
- [www.technogym.com](https://www.technogym.com/en-INT/product/pure-strength-rear-kick_MG40.html)
- [github.com](https://github.com/ozansozuozgit/flow-exercise-dataset)
- [eu.gymshark.com](https://eu.gymshark.com/blog/article/the-ultimate-guide-to-hack-squats)

Las fuentes externas se utilizaron para contrastar identidad y terminología. No se copiaron imágenes, vídeos ni instrucciones completas. Los cuadros locales de 1301, 0213, 0228, 2286, 0599, 0237, 0576 y 0577 se inspeccionaron durante esta fase. La evidencia SHA-256 se conserva en data/localization/es-MX.title-review.json; los originales y las licencias permanecen intactos.

Títulos verificados: 911; pendientes: 346. Adaptaciones españolas contrastadas: 13; traducciones pendientes: 1244. Estas cifras no representan aprobación profesional de la técnica.

## API y visor

Al buscar el nombre completo de un faltante conocido, la lista y el resolver añaden unavailable con requestId (identifica la petición, no un ejercicio activo), nombre, estado awaiting-verified-animation y motivo. El resolver devuelve best:null y alternatives:[] para no proponer otra variante como sustitución. El visor avisa que falta una animación verificada; si la búsqueda tolerante devuelve otras fichas, las identifica como coincidencias de palabras.

Reconstrucción editorial: npm run titles:compile, npm run localization:build y npm run curation:compile, en ese orden. Informes: npm run curation:report y npm run coverage:report. Pruebas: test/coverage.test.js.
