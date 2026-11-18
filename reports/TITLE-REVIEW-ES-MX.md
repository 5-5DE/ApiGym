# Revisión de títulos del catálogo: español de México

Revisadas: **1257/1257**. Títulos confirmados: **911**; modificados: **540**; pendientes: **346**; sin procesar: **0**. 542 fichas incorporan alias editoriales.

## Alcance y evidencia

Se leyó cada título junto con sus instrucciones originales y equipo, y se inspeccionaron los tres cuadros SVG locales de cada ficha (3,771 cuadros, 140 láminas). Las decisiones son individuales por ID. Las huellas SHA-256 permiten detectar cambios posteriores en los textos originales o las imágenes. El índice de láminas se conserva en `data/localization/es-MX.title-review-sheets.json`; las láminas se pueden reproducir con `python scripts/render-title-review.py` (PyMuPDF).

Las fuentes externas respaldan la terminología de familias; no se afirma haber encontrado una demostración externa independiente de cada variante. Un título confirmado significa que su nombre describe la evidencia del repositorio. No constituye validación clínica ni aprobación de las instrucciones traducidas: se conserva su revisión editorial independiente (13 adaptadas y 1,244 pendientes).

Los nombres dudosos conservan el título anterior y se marcan como pendientes. No se renombran con una suposición. Las animaciones SVG y sus atribuciones no se modifican. Los nombres originales en inglés siguen disponibles con `lang=en` y `nameEn`; los alias anteriores se conservan y se agregan alternativas útiles, sin agregar las malas traducciones como alias nuevos.

## Ejemplos solicitados

- `flow-0179`: Cable de vuelo bajo → Aperturas en polea baja. Se confirma trayectoria ascendente desde poleas bajas.
- `flow-0193`: nombre literal de remo unilateral → Remo unilateral de rodillas en polea con el tronco erguido. El texto sitúa la polea a la cintura y los cuadros muestran tracción horizontal; no se añade una trayectoria alta sin respaldo.
- `flow-2464`: pendiente. La etiqueta Thibaudeau kayak row no coincide con las instrucciones y cuadros de remo unilateral sentado en polea baja. La referencia externa describe una ejecución de pie desde polea alta. No se aprueba el alias kayak como nombre de ese movimiento.

## Fuentes consultadas

- [puregym-cable-kickbacks](https://www.puregym.com/exercises/glutes/glute-kickbacks/cable-kickbacks/): Contraste específico de patada de glúteo en polea: tobillera, polea baja y orientación frente a la máquina. Reescritura propia contrastada con los tres cuadros de flow-0228; el original inglés conserva una orientación contradictoria.
- [smartfit-mx-peso-libre](https://smartfit.com.mx/news/comunidad-smart-fit/que-hay-en-un-gimnasio-smart-fit-conoce-el-area-de-peso-libre/): Uso mexicano: press, curl, desplantes, aperturas y equipo; no verifica todas las variantes.
- [smartfit-mx-dominadas](https://smartfit.com.mx/news/tips/tipos-de-dominadas-y-como-hacerlas-en-el-gimnasio/): Familia de dominadas y diferencias entre agarre prono, supino y neutro.
- [smartfit-mx-agarres](https://smartfit.com.mx/news/tips/diferentes-tipos-de-agarre-en-el-gym/): Nombres y orientación de los agarres; neutro o martillo no equivale a supino.
- [smartfit-mx-flexiones](https://smartfit.com.mx/news/rutinas/realiza-tu-rutina-tabata-en-casa-video/): Uso de flexiones de brazos y lagartijas en México. No se importan las pautas de entrenamiento.
- [mayo-crunch](https://www.mayoclinic.org/es/healthy-lifestyle/fitness/multimedia/abdominal-crunch/vid-20084664): Crunch: elevación parcial del tronco; no se equipara a una incorporación completa.
- [mayo-fuerza](https://www.mayoclinic.org/es/healthy-lifestyle/fitness/in-depth/strength-training/art-20046031): Terminología general de fortalecimiento; no es una validación individual del catálogo.
- [vivagym-mancuernas](https://www.vivagym.com/es-es/ejercicios-mancuernas/): Familias de movimientos con mancuernas. Se contrasta la variante con los datos originales.
- [musclewiki-press-declinado](https://musclewiki.com/es-es/exercises/chest/dumbbells/3?model=f): Nomenclatura de press declinado, unilateral y agarre neutro. No se copian sus instrucciones.
- [meadows-kayak](https://www.youtube.com/watch?v=LjjCyjY9tGw): Referencia primaria de John Meadows, Thibaudeau kayak rows. Se consultó la descripción indexada; la reproducción del video no estuvo disponible. No se afirma haber visto el video.
- [hercules-kayak](https://www.hercules-gym.com/es/exercises/cable-kayak-row): Contraste adicional de kayak: de pie, polea alta y tracción alterna hacia las caderas. La ficha flow-2464 no coincide.

## Títulos modificados

| ID | Antes | Después | Alias añadidos |
| --- | --- | --- | --- |
| Cable_Wrist_Curl | Flexión de muñecas en polea | Flexión de muñecas en polea baja con agarre supino | curl de muñeca en polea |
| Dumbbell_Lying_Rear_Lateral_Raise | Elevaciones para deltoides posteriores acostado con mancuernas | Aperturas inversas con mancuernas boca abajo en banco | vuelos posteriores con pecho apoyado en banco |
| Dumbbell_Prone_Incline_Curl | Curl de bíceps boca abajo en banco inclinado con mancuernas | Curl araña con mancuernas en banco inclinado | curl de bíceps boca abajo en banco inclinado |
| Dumbbell_Rear_Lunge | Desplante posterior con mancuernas | Desplante hacia atrás con mancuernas | zancada inversa con mancuernas |
| Smith_Single-Leg_Split_Squat | Sentadilla con pies en posición dividida a una pierna en máquina Smith | Sentadilla búlgara en máquina Smith | desplante búlgaro en Smith; sentadilla dividida con pie trasero elevado en Smith |
| flow-0007 | Jalón dorsal alterno | Jalón al pecho alterno sentado en poleas | jalón dorsal alternado en poleas |
| flow-2355 | Elevación de rodillas colgado con soportes para brazos | Elevación de rodillas colgado en barra | rodillas al pecho colgado en barra fija |
| flow-2333 | Elevación de piernas extendidas colgado con soportes para brazos | Elevación de piernas extendidas colgado en barra | elevación de piernas rectas en barra fija |
| flow-3214 | Toque de pie con giro y brazos abiertos | Flexión de tronco a una pierna con alcance hacia el pie | inclinación a una pierna con toque de pie |
| flow-0009 | Fondos para pecho de rodillas asistido | Fondos para pecho asistidos en máquina con apoyo de rodillas | fondos asistidos para pecho |
| flow-0015 | Dominadas con agarre cerrado asistido con agarres paralelos | Dominadas asistidas en máquina con agarre neutro cerrado | dominadas asistidas con agarres paralelos |
| flow-1713 | Estiramiento de cuádriceps en decúbito prono asistido | Estiramiento de cuádriceps boca abajo con ayuda de la mano | estiramiento de cuádriceps en decúbito prono |
| flow-1714 | Estiramiento asistido del recto femoral en decúbito prono | Estiramiento del recto femoral boca abajo con ayuda de la mano | estiramiento anterior del muslo boca abajo |
| flow-0017 | Dominadas asistido | Dominadas asistidas en máquina con agarre prono | dominadas pronas asistidas |
| flow-1758 | Incorporaciones de tronco asistido | Incorporaciones de tronco con los pies sujetos | abdominales con sujeción de pies |
| flow-1432 | Dominadas de pie asistido | Dominadas asistidas en máquina con apoyo de pies | dominadas asistidas de pie en plataforma |
| flow-0018 | Extensión de tríceps con toalla de pie asistido | Extensión de tríceps sobre la cabeza con toalla | extensión de tríceps con ayuda de una toalla |
| flow-0019 | Fondos para tríceps de rodillas asistido | Fondos para tríceps asistidos en máquina con apoyo de rodillas | fondos asistidos para tríceps |
| flow-2364 | Fondos para pecho con agarre amplio de rodillas asistido | Fondos para pecho asistidos en máquina con agarre amplio y apoyo de rodillas | fondos asistidos con agarre abierto |
| flow-3117 | Jalón con banda, espalda fija y agarre cerrado | Jalón sentado con banda elástica, agarre cerrado y tronco erguido | jalón cerrado sentado con liga |
| flow-3116 | Jalón con banda, espalda fija y agarre supino | Jalón con banda de pie, agarre supino y tronco erguido | jalón de pie con liga y agarre invertido |
| flow-0977 | Elevaciones laterales frontal con banda elástica | Elevación frontal con banda elástica | elevaciones frontales con liga |
| flow-1408 | Elevación de cadera con banda elástica | Puente de glúteos con banda alrededor de las rodillas | elevación de cadera con banda en rodillas |
| flow-0985 | Crunch abdominal de rodillas con rotación con banda elástica | Rotación de tronco de rodillas con banda elástica | giros de tronco de rodillas con liga |
| flow-1002 | Banda acostada elevación de pierna estirada | Elevación de piernas extendidas acostado con banda elástica | elevaciones de piernas rectas con liga |
| flow-0989 | Press de pecho a un brazo con rotación con banda elástica | Press de pecho a un brazo con giro de tronco y banda elástica | press unilateral con rotación y liga |
| flow-0990 | Remo a un brazo sentado con rotación con banda elástica | Remo a un brazo sentado con giro de tronco y banda elástica | remo unilateral sentado con rotación y liga |
| flow-1023 | Peso muerto con banda y espalda recta y piernas rígidas | Peso muerto con banda elástica, piernas semirrígidas y espalda recta | peso muerto con liga y rodillas semiflexionadas |
| flow-1369 | Elevación de pantorrilla con dos piernas con banda - (banda debajo de ambas piernas) v.2 | Elevación de talones con ambos pies sobre banda elástica (variante 2) | pantorrillas con banda bajo ambos pies |
| flow-0024 | Sentadilla frontal en banco con barra | Sentadilla frontal al banco con barra | sentadilla frontal con referencia de banco |
| flow-0026 | Sentadilla en banco con barra | Sentadilla con barra al banco | sentadilla al banco con barra atrás |
| flow-1316 | Pullover (extensión de hombros) con codos flexionados con barra | Pullover con barra y codos flexionados en banco plano | extensión de hombros con barra en banco plano |
| flow-0027 | Remo con el tronco inclinado con barra | Remo inclinado con barra | remo con barra y tronco inclinado |
| flow-2407 | Curl de bíceps con soporte para brazos (arm blaster) con barra | Curl de bíceps con barra y soporte para brazos | curl con barra y arm blaster |
| flow-0033 | Press de banca en banco declinado con barra | Press de banca declinado con barra | press declinado con barra |
| flow-0034 | Pullover (extensión de hombros) en banco declinado con codos flexionados con barra | Pullover con barra y codos flexionados en banco declinado | pullover declinado con codos flexionados |
| flow-1545 | Sentadilla Zercher con recorrido completo con barra | Sentadilla Zercher profunda con barra | sentadilla Zercher con recorrido completo |
| flow-1436 | Sentadilla con barra alta con barra | Sentadilla con barra alta en la espalda | sentadilla high bar |
| flow-0047 | Press de banca en banco inclinado con barra | Press de banca inclinado con barra | press inclinado con barra |
| flow-1719 | Press de banca con agarre cerrado en banco inclinado con barra | Press de banca inclinado con barra y agarre cerrado | press inclinado cerrado con barra |
| flow-0049 | Remo en banco inclinado con barra | Remo con barra y pecho apoyado en banco inclinado | remo inclinado con apoyo de pecho y barra |
| flow-1435 | Sentadilla con barra baja con barra | Sentadilla con barra baja en la espalda | sentadilla low bar |
| flow-1720 | Barra recostada detrás de la cabeza extensión de tríceps | Extensión de tríceps acostado con barra detrás de la cabeza | press francés con barra detrás de la cabeza |
| flow-0055 | Press acostado con barra y agarre cerrado | Press de banca con barra y agarre cerrado | press cerrado acostado con barra |
| flow-0056 | Extensión de tríceps con agarre cerrado acostado con barra | Press francés acostado con barra y agarre cerrado | extensión de tríceps acostado con barra y agarre cerrado |
| flow-0058 | Elevación de cadera acostado con barra | Puente de glúteos con barra acostado en el suelo | elevación de cadera en el suelo con barra |
| flow-0069 | Sentadilla por encima de la cabeza con barra | Sentadilla con barra sobre la cabeza | sentadilla overhead con barra |
| flow-1412 | Flexión de muñecas con apoyo en banco con palmas hacia arriba con barra | Flexión de muñecas con barra y antebrazos apoyados en banco | curl de muñecas con barra y agarre supino en banco |
| flow-0072 | Curl de bíceps boca abajo en banco inclinado con barra | Curl araña con barra en banco inclinado | curl de bíceps boca abajo con barra |
| flow-0073 | Pullover (extensión de hombros) con barra | Pullover con barra en banco plano | extensión de hombros con barra acostado en banco |
| flow-0077 | Desplante posterior con barra (variante 2) | Desplante hacia atrás con barra (variante 2) | zancada inversa con barra variante 2 |
| flow-2187 | Press de banca con agarre cerrado invertido con barra | Press de banca con barra, agarre cerrado y supino | press cerrado con barra y agarre invertido |
| flow-1256 | Press de banca con agarre inverso en banco declinado con barra | Press de banca declinado con barra y agarre supino | press declinado con barra y agarre invertido |
| flow-0086 | Press militar sentado detrás de la cabeza con barra | Press militar tras nuca sentado con barra | press de hombros detrás de la cabeza sentado con barra |
| flow-1718 | Extensión de tríceps con agarre cerrado sentado tras nuca con barra | Extensión de tríceps sobre la cabeza sentado con barra y agarre cerrado | press francés sentado con barra y agarre cerrado |
| flow-0091 | Press por encima de la cabeza sentado con barra | Press de hombros sentado con barra | press por encima de la cabeza sentado con barra |
| flow-0092 | Extensión de tríceps sentado por encima de la cabeza con barra | Extensión de tríceps sobre la cabeza sentado con barra | press francés sentado con barra |
| flow-0097 | Sentadilla lateral dividida con barra v.2 | Desplante lateral con barra (variante 2) | zancada lateral con barra variante 2 |
| flow-2810 | Sentadilla con pies en posición dividida con barra (variante 2) | Desplante con barra (variante 2) | sentadilla dividida con barra variante 2 |
| flow-0102 | Sentadilla con apoyo de rodillas con barra | Sentadilla de rodillas con barra | extensión de cadera de rodillas con barra |
| flow-0104 | Curl de muñeca de pie con barra hacia atrás | Flexión de muñecas con barra detrás del cuerpo de pie | curl de muñecas detrás de la espalda con barra |
| flow-1456 | Press militar con agarre cerrado de pie con barra | Press militar de pie con barra y agarre cerrado | press de hombros de pie con barra y manos juntas |
| flow-0109 | Extensión de tríceps de pie por encima de la cabeza con barra | Extensión de tríceps sobre la cabeza de pie con barra | press francés de pie con barra |
| flow-1629 | Curl de bíceps con agarre amplio de pie con barra | Curl de bíceps de pie con barra y agarre amplio | curl abierto con barra |
| flow-1457 | Press militar de pie con postura amplia con barra | Press militar de pie con barra y agarre amplio | press de hombros con agarre abierto y barra |
| flow-0113 | Curl de bíceps con agarre amplio de pie con barra | Curl de bíceps de pie con barra y agarre amplio | curl con barra y manos separadas |
| flow-0115 | Pierna rígida con barra buenos días | Buenos días con barra y piernas semirrígidas | bisagra de cadera con barra en espalda y rodillas semiflexionadas |
| flow-0116 | Peso muerto con piernas extendidas con barra | Peso muerto con barra y piernas extendidas | peso muerto con piernas rectas y barra |
| flow-0122 | Press de banca con postura amplia con barra | Press de banca con barra y agarre amplio | press de banca abierto con barra |
| flow-1258 | Press de banca con agarre inverso con postura amplia con barra | Press de banca con barra y agarre supino amplio | press de banca con agarre invertido abierto |
| flow-0124 | Sentadilla con postura amplia con barra | Sentadilla con barra y postura amplia | sentadilla con pies separados y barra |
| flow-0130 | Extensión de cadera en banco | Empuje de cadera con espalda apoyada en banco (hip thrust) | hip thrust con peso corporal |
| flow-3019 | Dominadas en banco | Remo invertido con pies elevados en banco | remo australiano con pies en banco |
| flow-3167 | Remo en cuclillas con peso corporal (con toalla) | Remo en sentadilla con toalla | remo en cuclillas con toalla |
| flow-2466 | Puente - alpinista (cuerpo cruzado) | Escaladores cruzados | mountain climbers cruzados; rodilla al codo contrario en plancha |
| flow-1494 | Postura de yoga de mariposa | Postura de mariposa | estiramiento de aductores sentado en mariposa |
| flow-0148 | Press de hombros alterno en polea | Press de hombros alterno de pie en poleas | press alternado en polea |
| flow-0152 | Extensión de concentración de cable (en la rodilla) | Extensión de tríceps a un brazo en polea con apoyo en la rodilla | extensión concentrada de tríceps en polea |
| flow-0154 | Cable cruzado invertido volar | Aperturas inversas cruzadas en polea alta con el tronco inclinado | vuelos posteriores cruzados en polea |
| flow-0155 | Variación de cruce de cable | Cruces de pecho de pie en poleas | aperturas de pecho en poleas |
| flow-0868 | Curl de bíceps en polea | Curl de bíceps de pie en polea baja | curl en polea |
| flow-1260 | Press con cable declinado con un brazo | Press de pecho declinado a un brazo en polea | press declinado unilateral en polea |
| flow-1261 | Prensa de descenso de cable | Press de pecho declinado en poleas | press declinado en poleas |
| flow-1722 | Extensión de tríceps aérea en polea alta con cable | Extensión de tríceps sobre la cabeza con cuerda en polea alta | press francés con cuerda en polea alta |
| flow-0169 | Press de banca en banco inclinado en polea | Press de pecho inclinado en poleas | press inclinado en poleas |
| flow-0171 | Aperturas en banco inclinado en polea | Aperturas de pecho en banco inclinado en poleas | aperturas inclinadas en poleas |
| flow-0170 | Aperturas sobre pelota de estabilidad en banco inclinado en polea | Aperturas inclinadas en poleas sobre pelota de estabilidad | aperturas inclinadas sobre pelota en polea |
| flow-3697 | Remo para deltoides posteriores con cuerda de rodillas en polea | Remo para deltoides posteriores de rodillas con cuerda en polea | remo posterior con cuerda de rodillas |
| flow-2330 | Jalón dorsal en polea con recorrido completo | Jalón al pecho en polea con recorrido completo | jalón dorsal de recorrido completo |
| flow-0177 | Jalón dorsal con cuerda en polea | Jalón al pecho con cuerda en polea alta | jalón dorsal con cuerda |
| flow-2616 | Jalón lateral con cable con barra en V. | Jalón al pecho con agarre en V en polea alta | jalón con triángulo; jalón cerrado en polea |
| flow-0179 | Cable de vuelo bajo | Aperturas en polea baja | cruces de polea baja; aperturas de abajo hacia arriba en polea |
| flow-0180 | Fila baja sentada con cable | Remo sentado en polea baja | remo bajo sentado; remo Gironda |
| flow-1634 | Curl de bíceps acostado en polea | Curl de bíceps acostado en banco plano en polea baja | curl acostado en polea |
| flow-0184 | Pullover extensible con cable (con fijación de cuerda) | Pullover acostado con cuerda en polea | jalón con brazos extendidos acostado en polea |
| flow-0185 | Aperturas acostado en polea | Aperturas de pecho en banco plano en poleas | aperturas acostado en poleas |
| flow-0188 | Mosca media del cable | Aperturas de pecho en poleas a media altura | cruces de pecho en poleas a media altura |
| flow-0189 | Remo a un brazo con el tronco inclinado en polea | Remo a un brazo en polea con el tronco inclinado | remo unilateral inclinado en polea |
| flow-0190 | Curl de bíceps a un brazo en polea | Curl de bíceps a un brazo en polea baja | curl unilateral en polea |
| flow-1265 | Press inclinado con cable a un brazo | Press de pecho inclinado a un brazo en polea | press inclinado unilateral en polea |
| flow-0191 | Cable un brazo lateral inclinado | Apertura inversa a un brazo en polea con el tronco inclinado | vuelo posterior unilateral en polea |
| flow-0192 | Elevaciones laterales a un brazo en polea | Elevación lateral a un brazo en polea baja | elevación lateral unilateral en polea |
| flow-1267 | Cable de prensa con un brazo sobre la pelota de ejercicio. | Press de pecho a un brazo en polea sentado sobre pelota de estabilidad | press unilateral en polea sobre pelota |
| flow-3563 | Jalón dorsal a un brazo en polea | Jalón al pecho a un brazo en polea alta | jalón unilateral en polea |
| flow-0193 | Cable un brazo hacia atrás hacia atrás fila alta (de rodillas) | Remo unilateral de rodillas en polea con el tronco erguido | remo a un brazo de rodillas en polea; remo de rodillas con espalda recta |
| flow-1723 | Extensión de tríceps en polea alta a un brazo en polea | Extensión de tríceps a un brazo en polea alta | jalón de tríceps unilateral en polea |
| flow-1636 | Curl de bíceps por encima de la cabeza en polea | Curl de bíceps en polea alta | curl de bíceps con brazos elevados en polea |
| flow-0194 | Extensión de tríceps por encima de la cabeza con cable (fijación de cuerda) | Extensión de tríceps sobre la cabeza con cuerda en polea | press francés con cuerda en polea |
| flow-1319 | Fila rotacional de la palma del cable | Remo a un brazo en polea con giro de muñeca | remo unilateral en polea con supinación |
| flow-1268 | Prensa de cable en pelota de ejercicio | Press de pecho en poleas sentado sobre pelota de estabilidad | press en poleas sobre pelota |
| flow-0198 | Jalón dorsal en polea | Jalón al pecho en polea alta | jalón dorsal en polea |
| flow-0197 | Jalón dorsal en polea con barra Pro Lat | Jalón al pecho con barra Pro Lat en polea alta | jalón con barra Pro Lat |
| flow-0201 | Empuje del cable | Extensión de tríceps con barra en polea alta | jalón de tríceps con barra |
| flow-0199 | Empuje de cable (brazo recto) v. 2 | Jalón con brazos extendidos en polea alta (variante 2) | pullover de pie en polea con barra |
| flow-0200 | Empuje de cable (con accesorio de cuerda) | Extensión de tríceps con cuerda en polea alta | jalón de tríceps con cuerda |
| flow-0202 | Remo delt trasero con cable (estribos) | Remo para deltoides posteriores a un brazo en polea con el tronco inclinado | remo posterior unilateral en polea |
| flow-0203 | Remo para deltoides posteriores con cuerda en polea | Remo para deltoides posteriores con cuerda en polea baja | remo posterior con cuerda |
| flow-1413 | Curl con un brazo invertido con cable | Curl inverso a un brazo en polea baja | curl unilateral con agarre prono en polea |
| flow-0207 | Empuje con agarre inverso del cable | Extensión de tríceps con agarre supino en polea alta | jalón de tríceps con agarre invertido |
| flow-0208 | Cable con agarre inverso respaldo recto sentado fila alta | Remo alto sentado en polea con agarre supino y tronco erguido | remo alto con agarre invertido en polea |
| flow-1320 | Cable cuerda cruzado fila sentada | Remo sentado en polea con cuerdas cruzadas | remo con cuerdas cruzadas |
| flow-1321 | Cable cuerda elevado fila sentada | Remo sentado con cuerda en polea desde banco elevado | remo con cuerda desde asiento elevado |
| flow-1322 | Cable cuerda extensión banco inclinado fila | Remo con cuerda en polea sentado en banco inclinado | remo sentado con cuerda en banco inclinado |
| flow-1639 | Cable cuerda martillo predicador curl | Curl predicador martillo con cuerda en polea baja | curl Scott martillo en polea |
| flow-1724 | Cable cuerda polea alta extensión de tríceps aérea | Extensión de tríceps sobre la cabeza con cuerda en polea alta | press francés con cuerda en polea alta |
| flow-1726 | Cable cuerda tirada en el suelo extensión de tríceps | Extensión de tríceps acostado en el suelo con cuerda en polea baja | press francés en el suelo con cuerda |
| flow-1323 | Cable cuerda fila sentada | Remo sentado con cuerda en polea baja | remo bajo con cuerda |
| flow-0211 | Giros rusos del cable (en pelota de estabilidad) | Giros rusos en polea sentado sobre pelota de estabilidad | rotaciones de tronco en polea sobre pelota |
| flow-0213 | Fila alta con asiento de cable (barra en v) | Remo sentado en polea con agarre en V | remo sentado con triángulo; remo en polea con triángulo; remo sentado en polea con agarre en triángulo |
| flow-0215 | Elevaciones para deltoides posteriores sentado en polea | Aperturas inversas sentado en poleas | vuelos posteriores sentado en poleas |
| flow-2399 | Giro asentado del cable | Rotación de tronco sentado en polea | giros de tronco sentado en polea |
| flow-0218 | Remo con agarre amplio sentado en polea | Remo sentado en polea con agarre amplio | remo bajo con agarre abierto |
| flow-1717 | Remo en cuclillas con cable (con accesorio de cuerda) | Sentadilla con remo en polea y cuerda | remo con sentadilla y cuerda en polea |
| flow-1644 | Curl en cuclillas con cable | Curl de bíceps en sentadilla en polea baja | curl en cuclillas en polea |
| flow-0225 | Cable de pie cruzado mosca alta inversa | Aperturas inversas cruzadas de pie en polea alta | vuelos posteriores cruzados de pie en polea |
| flow-0874 | Crunch abdominal con cuerda de pie en polea | Crunch abdominal de pie con cuerda en polea alta | abdominales de pie con cuerda en polea |
| flow-0227 | Aperturas de pie en polea | Aperturas de pecho de pie en poleas | cruces de pecho de pie en poleas |
| flow-0228 | Extensión de cadera de pie en polea | Patada de glúteo de pie en polea | patada de glúteo en polea; glute kickback en polea; cable glute kickback |
| flow-0230 | Elevador de cable | Elevación diagonal de abajo hacia arriba en polea | levantamiento diagonal ascendente en polea |
| flow-0233 | Remo para deltoides posteriores con cuerda de pie en polea | Remo para deltoides posteriores de pie con cuerda en polea | remo posterior de pie con cuerda |
| flow-1727 | Extensión de tríceps con agarre inverso a un brazo de pie por encima de la cabeza en polea | Extensión de tríceps a un brazo sobre la cabeza en polea con agarre supino | extensión unilateral sobre la cabeza con agarre invertido en polea |
| flow-0234 | Fila de pie con cable (barra en v) | Remo de pie en polea con agarre en V | remo de pie con triángulo en polea |
| flow-0236 | Fila de torsión de pie de cable (barra en v) | Remo de pie con giro de tronco y agarre en V en polea | remo con rotación y triángulo en polea |
| flow-1269 | Cable de pie cruces rectos | Cruces de pecho de pie en poleas con el tronco erguido | aperturas cruzadas de pie en poleas |
| flow-0238 | Jalón dorsal con brazos extendidos en polea | Jalón con brazos extendidos en polea alta | pullover de pie en polea con barra |
| flow-0237 | Jalón dorsal con cuerda con brazos extendidos en polea | Pullover con cuerda en polea alta | pullover con cuerda; jalón con brazos extendidos y cuerda |
| flow-0239 | Fila sentada con respaldo recto | Remo sentado en polea con el tronco erguido | remo sentado con espalda recta en polea |
| flow-0241 | Flexión de tríceps con cable (barra en V) | Extensión de tríceps con agarre en V en polea alta | jalón de tríceps con triángulo |
| flow-2405 | Flexión de tríceps con cable (barra en V) (con brazo blaster) | Extensión de tríceps en polea alta con agarre en V y soporte para brazos | extensión de tríceps con arm blaster y agarre en V |
| flow-0243 | Giro del cable | Rotación de tronco de pie en polea | giros de tronco de pie en polea |
| flow-0244 | Tirón de torsión del cable | Remo unilateral con giro de tronco en polea | remo a un brazo con rotación en polea |
| flow-1645 | Curl con dos brazos con cable en banco inclinado | Curl de bíceps con ambos brazos en banco inclinado en poleas | curl bilateral inclinado en poleas |
| flow-1728 | Cable de retroceso de tríceps de dos brazos | Patada de tríceps con ambos brazos en poleas | extensión de tríceps hacia atrás con dos poleas |
| flow-0245 | Jalón dorsal con agarre supino en polea | Jalón al pecho en polea alta con agarre supino | jalón dorsal con agarre invertido |
| flow-1324 | Fila superior de cables | Remo alto de pie en polea con barra | remo para espalda alta en polea |
| flow-1407 | Estiramiento de empuje de pantorrilla con las manos contra la pared. | Estiramiento de pantorrilla con apoyo de manos en pared | estiramiento de gemelo contra la pared |
| flow-2963 | Silla de capitán elevación de pierna recta | Elevación de piernas extendidas con apoyo de antebrazos en silla romana | elevación de piernas en silla de capitán |
| flow-1430 | Inmersión en el pecho (en jaula de inmersión y dominadas) | Fondos para pecho en estación de dominadas y paralelas | fondos en paralelas de estación multifunción |
| flow-3216 | Flexión de pecho | Flexiones de brazos con toque de pecho | lagartijas con toque en el pecho |
| flow-1273 | Aplaudir, empujar hacia arriba | Flexiones de brazos con palmada | lagartijas con aplauso; flexiones pliométricas con palmada |
| flow-1468 | Toque del dedo del pie con giro de cangrejo | Toque de pie con mano contraria en apoyo de cangrejo | toques cruzados en posición de cangrejo |
| flow-0272 | Abdominales (sobre una pelota de estabilidad, brazos estirados) | Crunch abdominal con brazos extendidos sobre pelota de estabilidad | abdominales cortos con brazos arriba en pelota |
| flow-3769 | Sentadilla de reverencia | Desplante cruzado hacia atrás | desplante de reverencia; sentadilla de reverencia |
| flow-1274 | Flexión profunda | Flexiones de brazos en déficit sobre mancuernas | lagartijas profundas sobre mancuernas |
| flow-0284 | Cría de cría de burro | Elevación de talones con el tronco inclinado y apoyo de manos | pantorrillas tipo burro sin carga |
| flow-2403 | Curl de bíceps con soporte para brazos (arm blaster) alterno con mancuernas | Curl alterno con mancuernas y soporte para brazos | curl alternado con mancuernas y arm blaster |
| flow-1646 | Curl predicador con agarre martillo alterno con mancuernas | Curl predicador martillo alterno con mancuernas | curl Scott alternado con agarre neutro |
| flow-0286 | Press lateral alterno con mancuernas | Press de hombros alterno de pie con mancuernas | press alternado de hombros con mancuernas |
| flow-1649 | Curl de bíceps alterno con mancuernas y pierna levantada sobre una pelota de ejercicio | Curl alterno de bíceps de pie con un pie apoyado en pelota de estabilidad | curl alternado en equilibrio con pie sobre pelota |
| flow-1650 | Curl de bíceps sobre pelota de estabilidad alterno sentado con mancuernas | Curl alterno de bíceps sentado sobre pelota de estabilidad con mancuernas | curl alternado con mancuernas sentado en pelota |
| flow-2137 | Prensa Arnold con mancuernas | Press Arnold sentado con mancuernas | press de hombros Arnold |
| flow-0287 | Press Arnold con mancuernas v.2 | Press Arnold sentado con mancuernas (variante 2) | press Arnold con mancuernas variante 2 |
| flow-0288 | Mancuerna alrededor del pullover | Pullover con mancuerna en banco plano | pullover con una mancuerna acostado |
| flow-0293 | Remo con el tronco inclinado con mancuernas | Remo inclinado con mancuernas | remo con mancuernas y tronco inclinado |
| flow-1651 | Desplante con curl de bíceps y mancuernas con movimiento de bolos | Desplante con curl de bíceps y gesto de boliche con mancuernas | desplante con curl y movimiento de boliche |
| flow-1652 | Curl de bíceps con mancuernas sobre una pelota de ejercicio con la pierna levantada | Curl de bíceps con mancuernas sentado sobre pelota de estabilidad con una pierna elevada | curl sobre pelota con pierna levantada |
| flow-1653 | Curl de bíceps con mancuernas y postura de cigüeña | Curl de bíceps con mancuernas en apoyo a una pierna | curl de bíceps en equilibrio a una pierna |
| flow-2401 | Curl de bíceps con soporte para brazos (arm blaster) con mancuernas | Curl de bíceps con mancuernas y soporte para brazos | curl con mancuernas y arm blaster |
| flow-0298 | Curl de martillo con cuerpo cruzado y mancuernas | Curl martillo cruzado con mancuernas | curl martillo hacia el hombro contrario |
| flow-1657 | Curl martillo con cuerpo cruzado y mancuernas v.2 | Curl martillo cruzado con mancuernas (variante 2) | curl martillo cruzado variante 2 |
| flow-0301 | Press de banca en banco declinado con mancuernas | Press de banca declinado con mancuernas | press declinado con mancuernas |
| flow-0302 | Aperturas en banco declinado con mancuernas | Aperturas con mancuernas en banco declinado | aperturas declinadas con mancuernas |
| flow-0303 | Press de pecho con agarre neutro en banco declinado con mancuernas | Press de banca declinado con mancuernas y agarre neutro | press declinado con agarre martillo |
| flow-1276 | Aperturas a un brazo en banco declinado con mancuernas | Aperturas a un brazo con mancuerna en banco declinado | apertura unilateral declinada con mancuerna |
| flow-1617 | Press de pecho con agarre neutro a un brazo en banco declinado con mancuernas | Press de pecho declinado con mancuerna a un brazo y agarre neutro | press declinado unilateral con agarre martillo |
| flow-0304 | Encogimiento de hombros en banco declinado con mancuernas (variante 2) | Encogimiento de hombros boca abajo en banco declinado con mancuernas (variante 2) | encogimiento escapular declinado con mancuernas variante 2 |
| flow-0306 | Extensión de tríceps en banco declinado con mancuernas | Press francés con mancuernas en banco declinado | extensión de tríceps declinada con mancuernas |
| flow-0307 | Aperturas con giro en banco declinado con mancuernas | Aperturas con giro de muñecas y mancuernas en banco declinado | aperturas declinadas con rotación de muñecas |
| flow-1437 | Flexiones de dedos con mancuernas | Flexión de dedos con mancuerna | curl de dedos con mancuerna |
| flow-1277 | Aperturas sobre pelota de estabilidad con mancuernas | Aperturas con mancuernas sobre pelota de estabilidad | aperturas de pecho sobre pelota |
| flow-1732 | Extensión de tríceps con desplante hacia adelante con mancuernas | Desplante al frente y extensión de tríceps con mancuernas sobre la cabeza | desplante con press francés y mancuernas |
| flow-1760 | Sentadilla goblet con mancuernas | Sentadilla goblet con mancuerna | sentadilla copa con mancuerna al pecho |
| flow-1659 | Curl martillo sobre pelota de estabilidad con mancuernas | Curl martillo con mancuernas sentado sobre pelota de estabilidad | curl con agarre neutro sentado en pelota |
| flow-3545 | Press alternativo inclinado con mancuernas | Press de pecho inclinado alterno con mancuernas | press inclinado alternado con mancuernas |
| flow-0314 | Press de banca en banco inclinado con mancuernas | Press de banca inclinado con mancuernas | press inclinado de pecho con mancuernas |
| flow-0316 | Cría inclinada con mancuernas | Press de pecho con mancuernas en banco inclinado | press inclinado con mancuernas |
| flow-0319 | Aperturas en banco inclinado con mancuernas | Aperturas con mancuernas en banco inclinado | aperturas inclinadas con mancuernas |
| flow-1278 | Aperturas sobre pelota de estabilidad en banco inclinado con mancuernas | Aperturas con mancuernas en banco inclinado y apoyo sobre pelota | aperturas inclinadas con apoyo en pelota y banco |
| flow-0320 | Curl martillo en banco inclinado con mancuernas | Curl martillo con mancuernas en banco inclinado | curl inclinado con agarre neutro |
| flow-0321 | Press de pecho con agarre neutro en banco inclinado con mancuernas | Press de banca inclinado con mancuernas y agarre neutro | press inclinado con agarre martillo |
| flow-1279 | Aperturas a un brazo en banco inclinado con mancuernas | Aperturas a un brazo con mancuerna en banco inclinado | apertura inclinada unilateral con mancuerna |
| flow-1619 | Press de pecho con agarre neutro a un brazo en banco inclinado con mancuernas | Press inclinado a un brazo con mancuerna y agarre neutro | press inclinado unilateral con agarre martillo |
| flow-0323 | Elevaciones laterales a un brazo en banco inclinado con mancuernas | Elevación lateral con mancuerna a un brazo sentado en banco inclinado | elevación lateral unilateral sentado en banco inclinado |
| flow-1281 | Press inclinado con un brazo con mancuernas | Press de pecho inclinado a un brazo con mancuerna | press inclinado unilateral con mancuerna |
| flow-0324 | Press con agarre neutro en banco inclinado con mancuernas | Press inclinado con mancuernas y palmas enfrentadas | press inclinado con agarre neutro |
| flow-0325 | Elevación inclinada con mancuernas | Press con mancuernas en banco inclinado | press inclinado con mancuernas |
| flow-0326 | Elevaciones para deltoides posteriores en banco inclinado con mancuernas | Aperturas inversas con mancuernas y pecho apoyado en banco inclinado | vuelos posteriores con apoyo en banco inclinado |
| flow-3542 | Elevación en T inclinada con mancuernas | Elevaciones en T con mancuernas boca abajo en banco inclinado | elevaciones de brazos en T con apoyo de pecho |
| flow-0330 | Extensión de tríceps en banco inclinado con mancuernas | Extensión de tríceps sobre la cabeza con mancuernas en banco inclinado | press francés en banco inclinado con mancuernas |
| flow-0331 | Aperturas con giro en banco inclinado con mancuernas | Aperturas con giro de muñecas y mancuernas en banco inclinado | aperturas inclinadas con rotación de muñecas |
| flow-1733 | Extensión de dos brazos inclinada con mancuernas | Extensión de tríceps con ambos brazos y mancuernas en banco inclinado | extensión bilateral de tríceps en banco inclinado |
| flow-3541 | Inclinación con mancuernas y elevación | Elevaciones en Y con mancuernas boca abajo en banco inclinado | elevaciones de brazos en Y con apoyo de pecho |
| flow-0332 | Cruz de hierro con mancuernas | Elevación lateral con mancuernas y brazos en cruz | cruz con mancuernas; cruz de hierro con mancuernas |
| flow-1734 | Patada de tríceps sobre pelota de estabilidad con mancuernas | Patada de tríceps con mancuernas sentado sobre pelota de estabilidad | extensión hacia atrás de tríceps sentado en pelota |
| flow-1660 | Curl de bíceps sobre pelota de estabilidad de rodillas con mancuernas | Curl de bíceps de rodillas con mancuernas y codos sobre pelota de estabilidad | curl predicador con apoyo de brazos en pelota |
| flow-0335 | Elevación lateral con mancuernas hacia adelante | Elevaciones laterales y frontales con mancuernas | elevaciones combinadas de hombros con mancuernas |
| flow-1658 | Desplante con mancuernas y curl de bíceps | Desplante al frente y curl de bíceps con mancuernas | desplante con curl de bíceps |
| flow-1729 | Extensión alterna acostada con mancuernas | Extensión de tríceps alterna con mancuernas acostado en banco plano | press francés alterno con mancuernas |
| flow-0338 | Press de codo tumbado con mancuernas | Extensión de tríceps acostado con mancuernas y codos abiertos | press de tríceps con codos abiertos en banco |
| flow-0863 | Rotación externa de hombro acostado con mancuernas | Rotación externa de hombro acostado de lado con mancuerna | rotación externa lateral con mancuerna |
| flow-0340 | Press de pecho con agarre neutro acostado con mancuernas | Press de banca con mancuernas y agarre neutro | press plano con agarre martillo |
| flow-2470 | Elevaciones para deltoides posteriores en el suelo acostado con mancuernas | Aperturas inversas con mancuernas boca abajo en el suelo | vuelos posteriores con mancuernas en el suelo |
| flow-0341 | Mancuerna tumbada en un brazo deltoides trasero | Apertura inversa a un brazo con mancuerna boca abajo en banco | vuelo posterior unilateral boca abajo en banco |
| flow-0343 | Press con mancuernas acostado con un brazo | Press de pecho a un brazo con mancuerna en banco plano | press unilateral de pecho con mancuerna |
| flow-0342 | Press con mancuernas acostado con un brazo v.2 | Press de pecho a un brazo con mancuerna en banco plano (variante 2) | press unilateral acostado con mancuerna variante 2 |
| flow-0344 | Mancuerna acostada con un brazo en pronación de extensión de tríceps | Extensión de tríceps acostado a un brazo con mancuerna y agarre prono | press francés unilateral con agarre prono |
| flow-0346 | Mancuerna acostada con un brazo en extensión de tríceps supinado | Extensión de tríceps acostado a un brazo con mancuerna y agarre supino | press francés unilateral con agarre supino |
| flow-1284 | Pullover (extensión de hombros) sobre pelota de estabilidad acostado con mancuernas | Pullover con mancuerna sobre pelota de estabilidad | extensión de hombros con mancuerna sobre pelota |
| flow-1328 | Remo para deltoides posteriores acostado con mancuernas | Remo para deltoides posteriores con mancuernas boca abajo en banco | remo posterior con pecho apoyado en banco |
| flow-1735 | Extensión simple con mancuernas | Extensión de tríceps acostado a un brazo con mancuerna | press francés unilateral acostado |
| flow-2706 | Supinación acostada con mancuernas en el suelo | Curl de bíceps con mancuernas acostado en el suelo con agarre supino | curl supino con mancuernas en el suelo |
| flow-1661 | Curl de bíceps acostado boca arriba con mancuernas | Curl de bíceps con mancuernas boca arriba en banco plano | curl acostado supino con mancuernas |
| flow-0350 | Curl de bíceps acostado boca arriba con mancuernas | Curl de bíceps con mancuernas boca arriba en banco plano | curl de bíceps acostado en banco |
| flow-0351 | Extensión de tríceps acostado con mancuernas | Press francés con mancuernas en banco plano | extensión de tríceps acostado con mancuernas |
| flow-1662 | Curl de bíceps acostado con postura amplia con mancuernas | Curl de bíceps con mancuernas boca arriba y brazos abiertos en banco | curl acostado con brazos separados |
| flow-1285 | Aperturas a un brazo en banco con mancuernas | Apertura de pecho a un brazo con mancuerna en banco plano | apertura unilateral plana con mancuerna |
| flow-1286 | Aperturas de pecho sobre pelota de estabilidad a un brazo con mancuernas | Apertura de pecho a un brazo con mancuerna sobre pelota de estabilidad | apertura unilateral sobre pelota |
| flow-1287 | Press de pecho a un brazo en banco declinado con mancuernas | Press de pecho declinado a un brazo con mancuerna | press declinado unilateral con mancuerna |
| flow-1288 | Aperturas sobre pelota de estabilidad a un brazo con mancuernas | Apertura a un brazo con mancuerna sobre pelota de estabilidad | apertura unilateral de pecho sobre pelota |
| flow-1663 | Curl predicador con agarre martillo a un brazo con mancuernas | Curl predicador martillo a un brazo con mancuerna | curl Scott unilateral con agarre neutro |
| flow-1621 | Press de pecho con agarre neutro sobre pelota de estabilidad a un brazo con mancuernas | Press de hombros a un brazo con mancuerna y agarre neutro sentado sobre pelota de estabilidad | press unilateral de hombros con agarre martillo sobre pelota |
| flow-1289 | Press de pecho a un brazo en banco inclinado con mancuernas | Press de pecho inclinado a un brazo con mancuerna | press inclinado unilateral de pecho |
| flow-0354 | Patada de tríceps a un brazo con mancuernas | Patada de tríceps a un brazo con mancuerna | extensión hacia atrás de tríceps unilateral |
| flow-0355 | Elevaciones laterales a un brazo con mancuernas | Elevación lateral a un brazo con mancuerna | elevación lateral unilateral con mancuerna |
| flow-0356 | Elevaciones laterales con apoyo a un brazo con mancuernas | Elevación lateral a un brazo con mancuerna y apoyo de la mano libre | elevación lateral unilateral con apoyo en banco |
| flow-1290 | Press con mancuernas con un brazo sobre una pelota de ejercicio. | Press de hombros a un brazo con mancuerna sentado sobre pelota de estabilidad | press unilateral sentado sobre pelota |
| flow-1665 | Curl de bíceps a un brazo boca abajo con mancuernas | Curl de bíceps a un brazo con mancuerna boca abajo en banco | curl unilateral boca abajo en banco |
| flow-1666 | Curl martillo a un brazo boca abajo con mancuernas | Curl martillo a un brazo con mancuerna boca abajo en banco | curl unilateral prono con agarre neutro |
| flow-0358 | Extensión de muñecas a un brazo con mancuernas | Extensión de muñeca con mancuerna a un brazo | curl inverso de muñeca unilateral |
| flow-0359 | Aperturas inversas con apoyo a un brazo con mancuernas | Apertura inversa a un brazo con mancuerna y apoyo en banco | vuelo posterior unilateral con apoyo en banco |
| flow-1668 | Curl de bíceps sobre pelota de estabilidad a un brazo sentado con mancuernas | Curl de bíceps a un brazo con mancuerna sentado sobre pelota de estabilidad | curl unilateral sentado en pelota |
| flow-1669 | Curl martillo a un brazo sentado con mancuernas | Curl martillo concentrado a un brazo con mancuerna sentado | curl concentrado sentado con agarre neutro |
| flow-3888 | Arranque con mancuernas a un brazo | Arranque a un brazo con mancuerna | arranque unilateral con mancuerna |
| flow-1670 | Curl de bíceps a un brazo de pie con mancuernas | Curl de bíceps a un brazo de pie con mancuerna | curl unilateral de pie con mancuerna |
| flow-1671 | Curl martillo a un brazo de pie con mancuernas | Curl martillo a un brazo de pie con mancuerna | curl unilateral con agarre neutro de pie |
| flow-0362 | Extensión de tríceps en banco a un brazo con mancuernas | Extensión de tríceps sobre la cabeza a un brazo sentado con mancuerna | press francés unilateral sentado |
| flow-0364 | Flexión de muñecas a un brazo con mancuernas | Flexión de muñeca a un brazo con mancuerna | curl de muñeca unilateral con mancuerna |
| flow-1441 | Extensión de muñecas con apoyo en banco a un brazo con mancuernas | Extensión de muñeca con mancuerna a un brazo y antebrazo apoyado en banco | curl inverso de muñeca con apoyo en banco |
| flow-0368 | Extensión de muñecas con apoyo en banco con mancuernas | Extensión de muñecas con mancuernas y antebrazos apoyados en banco | curl inverso de muñecas con mancuernas en banco |
| flow-0369 | Flexión de muñecas con apoyo en banco con mancuernas | Flexión de muñecas con mancuernas y antebrazos apoyados en banco | curl de muñecas con mancuernas en banco |
| flow-1329 | Palma con mancuernas rotacional inclinada sobre fila | Remo inclinado con mancuernas y giro de muñecas | remo con rotación del agarre y mancuernas |
| flow-1673 | Predicador con mancuernas curl sobre pelota de ejercicio | Curl predicador con mancuernas y brazos apoyados en pelota de estabilidad | curl Scott con apoyo en pelota |
| flow-1293 | Press con mancuernas sobre una pelota de ejercicio. | Press de pecho con mancuernas sobre pelota de estabilidad | press con mancuernas apoyado sobre pelota |
| flow-1674 | Curl martillo boca abajo en banco inclinado con mancuernas | Curl martillo con mancuernas boca abajo en banco inclinado | curl araña con agarre neutro |
| flow-0375 | Pullover (extensión de hombros) con mancuernas | Pullover con mancuerna en banco plano | pullover acostado con mancuerna |
| flow-1294 | Extensión de cadera con mancuernas en pelota de ejercicio | Pullover con mancuerna y elevación de cadera sobre pelota de estabilidad | pullover con puente de glúteos sobre pelota |
| flow-1295 | Pullover (extensión de hombros) sobre pelota de estabilidad con mancuernas | Pullover con mancuerna sobre pelota de estabilidad | pullover sobre pelota |
| flow-1700 | Prensa de empuje con mancuernas | Press de hombros con impulso de piernas y mancuernas (push press) | push press con mancuernas |
| flow-2292 | Elevaciones para deltoides posteriores con mancuernas | Aperturas inversas con mancuernas y tronco inclinado | pájaros con mancuernas |
| flow-0377 | Remo delt trasero con mancuernas hombro | Remo para deltoides posteriores con mancuernas y tronco inclinado | remo posterior inclinado con mancuernas |
| flow-0380 | Elevaciones para deltoides posteriores con mancuernas | Aperturas inversas con mancuernas y tronco inclinado | vuelos posteriores inclinados con mancuernas |
| flow-0379 | Elevaciones para deltoides posteriores con apoyo de la cabeza con mancuernas | Aperturas inversas con mancuernas y frente apoyada en banco | pájaros con apoyo de la cabeza |
| flow-0382 | Curl de bíceps con agarre inverso con mancuernas | Curl inverso de bíceps con mancuernas | curl de bíceps con agarre prono |
| flow-1331 | Remo en banco inclinado con agarre inverso a dos brazos con mancuernas | Remo con mancuernas y agarre supino con pecho apoyado en banco inclinado | remo inclinado con apoyo y agarre invertido |
| flow-2327 | Remo con agarre inverso con mancuernas | Remo inclinado con mancuernas y agarre supino | remo con mancuernas y agarre invertido |
| flow-0386 | Rotación con mancuernas mosca inversa | Aperturas inversas con mancuernas y giro de muñecas | vuelos posteriores con rotación de muñecas |
| flow-0387 | Elevaciones frontales alterno sentado con mancuernas | Elevaciones frontales alternas sentado con mancuernas | elevaciones frontales alternadas sentado |
| flow-1676 | Curl martillo sobre pelota de estabilidad alterno sentado con mancuernas | Curl martillo alterno con mancuernas sentado sobre pelota de estabilidad | curl alternado con agarre neutro sobre pelota |
| flow-0388 | Press alternativo sentado con mancuernas | Press de hombros alterno sentado con mancuernas | press alternado sentado con mancuernas |
| flow-3546 | Hombro alterno sentado con mancuernas | Press de hombros alterno sentado con mancuernas | press alternado de hombros sentado |
| flow-0389 | Extensión de banco sentado con mancuernas | Extensión de tríceps sobre la cabeza sentado con mancuerna | press francés sentado con mancuerna a dos manos |
| flow-2317 | Elevaciones laterales sentado con codos flexionados con mancuernas | Elevación lateral sentado con mancuernas y codos flexionados | elevación lateral con codos a 90 grados sentado |
| flow-1730 | Patada de tríceps alterno sentado con el tronco inclinado con mancuernas | Patada de tríceps alterna sentado con mancuernas y tronco inclinado | extensión alternada hacia atrás de tríceps sentado |
| flow-1737 | Extensión de tríceps sentado con el tronco inclinado con mancuernas | Patada de tríceps a dos brazos sentado con mancuernas | extensión de tríceps hacia atrás sentado con mancuernas |
| flow-0390 | Curl de bíceps sobre pelota de estabilidad sentado con mancuernas | Curl de bíceps con mancuernas sentado sobre pelota de estabilidad | curl sentado en pelota con mancuernas |
| flow-3547 | Curl de bíceps sentado con mancuernas hasta press de hombros | Curl de bíceps y press de hombros sentado con mancuernas | curl con transición a press de hombros sentado |
| flow-0393 | Curl de bíceps sentado con énfasis interno con mancuernas | Curl concentrado bilateral con mancuernas | curl concentrado sentado a dos brazos |
| flow-0398 | Patada de tríceps a un brazo sentado con mancuernas | Patada de tríceps a un brazo sentado con mancuerna | extensión de tríceps hacia atrás unilateral sentado |
| flow-0399 | Mancuerna sentado con un brazo rotar | Curl de bíceps a un brazo sentado con giro de antebrazo y mancuerna | curl unilateral sentado con rotación de antebrazo |
| flow-1380 | Elevación de talones con agarre neutro a una pierna sentado con mancuernas | Elevación de talón a una pierna sentado con mancuerna y agarre neutro | pantorrilla unilateral sentado con agarre martillo |
| flow-0401 | Flexión de muñecas con palmas hacia arriba sentado con mancuernas | Flexión de muñecas sentado con mancuernas y agarre supino | curl de muñecas sentado con palmas arriba |
| flow-0402 | Curl predicador sentado con mancuernas | Curl predicador a un brazo sentado con mancuerna | curl Scott unilateral sentado |
| flow-1738 | Extensión de tríceps con agarre inverso a un brazo sentado por encima de la cabeza con mancuernas | Extensión de tríceps a un brazo sobre la cabeza sentado con mancuerna y agarre supino | press francés unilateral sentado con agarre invertido |
| flow-2188 | Extensión de tríceps sentado con mancuernas | Extensión de tríceps sentado con una mancuerna a dos manos | copa de tríceps sentado |
| flow-0408 | Lado con mancuernas acostado con una mano levantada | Elevación lateral con mancuerna acostado de lado | elevación de hombro en decúbito lateral |
| flow-3664 | Plancha lateral con mancuernas y apertura trasera. | Plancha lateral con apertura inversa con mancuerna | plancha de lado con vuelo posterior |
| flow-3548 | Transporte por encima de la cabeza con un solo brazo con mancuernas | Caminata con mancuerna sobre la cabeza a un brazo | paseo unilateral con mancuerna sobre la cabeza |
| flow-0410 | Sentadilla con pies en posición dividida a una pierna con mancuernas | Sentadilla búlgara con mancuernas | sentadilla dividida con pie trasero elevado |
| flow-3560 | De pie con mancuernas, curl martillo alternativo y press | Curl martillo alterno y press de hombro de pie con mancuernas | curl martillo con press alternado |
| flow-0414 | Press por encima de la cabeza alterno de pie con mancuernas | Press de hombros alterno de pie con mancuernas | press militar alternado con mancuernas |
| flow-0415 | Elevación alternativa de pie con mancuernas | Elevaciones laterales alternas de pie con mancuernas | elevación lateral alternada |
| flow-1739 | Mancuerna de pie contragolpe de tríceps alterno | Patada de tríceps alterna con mancuernas y tronco inclinado | extensión alternada de tríceps inclinado |
| flow-2143 | Mancuerna de pie alrededor del mundo | Círculos de brazos de pie con mancuernas | alrededor del mundo con mancuernas de pie |
| flow-0418 | Curl concentrado de pie con mancuernas | Curl concentrado de pie con mancuerna y tronco inclinado | curl de concentración inclinado de pie |
| flow-0419 | Elevación frontal de pie con mancuernas por encima de la cabeza | Elevación frontal de pie con mancuernas hasta arriba de la cabeza | elevación frontal de recorrido completo |
| flow-0421 | Curl concentrado a un brazo de pie con mancuernas | Curl de bíceps unilateral de pie con mancuerna | curl a un brazo de pie |
| flow-0422 | Curl con un brazo de pie con mancuernas (sobre banco inclinado) | Curl unilateral de pie con mancuerna y mano libre apoyada en banco inclinado | curl de pie con apoyo en banco |
| flow-1680 | Mancuerna de pie con un brazo doblado sobre un banco inclinado | Curl unilateral de pie con mancuerna y apoyo en banco inclinado | curl de pie con mano apoyada |
| flow-0423 | Mancuerna de pie con extensión de un brazo | Extensión de tríceps sobre la cabeza a un brazo de pie con mancuerna | copa unilateral de pie |
| flow-0424 | Mancuerna de pie con un brazo y palma en prensa | Press de hombro unilateral de pie con mancuerna y agarre neutro | press a un brazo con palma hacia adentro |
| flow-0426 | Press por encima de la cabeza de pie con mancuernas | Press de hombros de pie con mancuernas | press militar con mancuernas de pie |
| flow-0430 | Extensión de tríceps de pie con mancuernas | Extensión de tríceps unilateral sobre la cabeza de pie con mancuerna | copa a un brazo de pie |
| flow-1684 | Mancuerna aumenta el equilibrio de una sola pierna con curl de bíceps | Subida al banco con elevación de rodilla y curl de bíceps con mancuernas | step-up con rodilla arriba y curl |
| flow-2796 | Desplante con mancuernas | Subida al banco con mancuernas | step-up con mancuernas |
| flow-2812 | Sentadilla dividida con mancuernas | Subida al banco con elevación de rodilla y mancuernas | step-up con rodilla arriba |
| flow-1742 | Contragolpe de tríceps con mancuernas con postura de cigüeña | Patada de tríceps con mancuerna en equilibrio sobre una pierna | extensión de tríceps unilateral en apoyo monopodal |
| flow-0864 | Rotación externa del hombro vertical con mancuernas | Rotación externa de hombros de pie con mancuernas y brazos elevados | rotación externa con codos a la altura de los hombros |
| flow-0438 | Press con mancuernas | Press de hombros sentado con mancuernas (press W) | press W con mancuernas |
| flow-2189 | Extensión de tríceps sentado con mancuernas | Extensión de tríceps sentado con una mancuerna a dos manos | copa de tríceps sentado con mancuerna |
| flow-3287 | Fondos de codo | Fondos de tríceps en banco con piernas extendidas | fondos en banca |
| flow-3292 | Ascensor | Buenos días sin peso | bisagra de cadera de pie sin carga |
| flow-1333 | Extensión de espalda con pelota de ejercicios con brazos extendidos | Extensión de espalda sobre pelota de estabilidad con brazos al frente | extensión de tronco sobre pelota con brazos extendidos |
| flow-1334 | Extensión de espalda con pelota de ejercicio con las manos detrás de la cabeza | Extensión de espalda sobre pelota de estabilidad con manos detrás de la cabeza | extensión de tronco sobre pelota |
| flow-1335 | Extensión de espalda con pelota de ejercicio con las rodillas separadas del suelo. | Extensión de espalda sobre pelota de estabilidad con rodillas sin apoyo | extensión de tronco sobre pelota con piernas extendidas |
| flow-1336 | Extensión de espalda con pelota de ejercicios con rotación | Extensión de espalda sobre pelota de estabilidad con giro | extensión de tronco con rotación sobre pelota |
| flow-1559 | Pelota de ejercicio estiramiento del flexor de la cadera | Estiramiento de flexores de cadera con el pie delantero sobre pelota de estabilidad | estiramiento de cadera de rodillas con pelota |
| flow-1339 | Estiramiento lateral con pelota de ejercicio | Inclinación lateral sentado sobre pelota de estabilidad con mancuerna sobre la cabeza | flexión lateral con mancuerna sobre pelota |
| flow-1341 | Estiramiento de la espalda baja con pelota de ejercicios (pirámide) | Extensión del tronco hacia atrás sobre pelota de estabilidad | estiramiento de espalda sobre pelota |
| flow-1342 | Pelota de ejercicio acostada de lado estiramiento lateral | Estiramiento lateral acostado de lado sobre pelota de estabilidad | estiramiento de dorsales sobre pelota de lado |
| flow-1416 | Pelota de ejercicio con una pierna propensa a la rotación de la parte inferior del cuerpo | Rotación de cadera boca abajo sobre pelota de estabilidad con elevación alterna de pierna | rotación del tren inferior sobre pelota |
| flow-1417 | Pelota de ejercicio patada diagonal con una pierna curl de isquiotibiales | Curl de piernas sobre pelota de estabilidad con extensión diagonal alterna | curl femoral con patada diagonal sobre pelota |
| flow-1296 | Ejercicio de pica de pelota push up | Flexiones de brazos con elevación de cadera y pies sobre pelota de estabilidad | flexiones con pica sobre pelota |
| flow-1747 | Press francés con barra ez sobre pelota de ejercicio. | Extensión de tríceps sobre la cabeza sentado en pelota de estabilidad con barra Z | press francés sentado sobre pelota con barra Z |
| flow-3010 | Sudadera con capucha ez bar acostado con los brazos doblados | Pullover acostado con barra Z y codos flexionados | pullover con barra EZ |
| flow-1749 | Prensa francesa de pie con barra ez | Extensión de tríceps sobre la cabeza de pie con barra Z | press francés de pie con barra Z |
| flow-0448 | Press facial con agarre cerrado y descenso con barra ez | Extensión de tríceps acostado en banco declinado con barra Z y agarre cerrado | rompecráneos declinado con barra Z |
| flow-1458 | Rizos sentados con barra ez | Curl de bíceps sentado con barra Z | curl sentado con barra EZ |
| flow-2133 | Los agricultores caminan | Caminata del granjero con mancuernas | paseo del granjero; farmer walk |
| flow-3303 | Bandera | Bandera humana | human flag |
| flow-0456 | Flexión de piernas sentadas (rodilla doblada) | Abdominal en V con rodillas flexionadas y manos detrás de la cabeza | sit-up con elevación de rodillas |
| flow-0457 | Flexión de piernas sentadas (brazo estirado) | Abdominal en V con brazos extendidos | V-up; abdominal en V tocando los pies |
| flow-2429 | Crunch de rana | Crunch con plantas de los pies juntas y rodillas abiertas | crunch mariposa; crunch de rana |
| flow-3301 | Plancha de rana | Equilibrio de rana sobre las manos | frog stand |
| flow-3295 | Repeticiones de palanca frontal | Elevaciones a palanca frontal en barra | front lever dinámico |
| flow-3299 | Plancha completa | Plancha de calistenia con piernas juntas sin apoyo de pies | full planche |
| flow-3327 | Flexiones de plancha completas | Flexiones de brazos en plancha de calistenia sin apoyo de pies | planche push-up |
| flow-3561 | Marcha del puente de glúteos | Puente de glúteos con marcha alterna | puente con elevación alterna de rodillas |
| flow-3523 | Puente de glúteos en banco con ambas piernas | Elevación de cadera con espalda apoyada en banco | hip thrust sin peso |
| flow-0467 | Barbilla de gorila | Dominadas con elevación de rodillas | dominadas gorila |
| flow-0469 | Contracción de la ingle | Crunch inverso con rodillas flexionadas | elevación de rodillas y cadera acostado |
| flow-3221 | Dobla media rodilla | Media sentadilla sin peso | sentadilla parcial |
| flow-3202 | Medio sentado | Abdominal corto con elevación parcial del tronco | medio sit-up |
| flow-2139 | Manos bicicleta | Bicicleta de brazos en ergómetro | ergómetro de brazos |
| flow-3218 | Manos entrelazadas toque circular del dedo del pie | Flexión de tronco hacia los pies con manos juntas y recorrido circular | movilidad de tronco con manos entrelazadas |
| flow-3215 | Manos invertidas entrelazadas toque circular del dedo del pie | Flexión de tronco hacia los pies con brazos en círculo inverso | movilidad de tronco con círculo de brazos inverso |
| flow-0471 | Flexión de manos | Flexiones de brazos en parada de manos con apoyo en pared | handstand push-up contra pared |
| flow-1761 | Elevación de rodilla oblicua colgando | Elevación de rodillas colgado en barra con giro lateral | elevación de rodillas para oblicuos en barra |
| flow-0475 | Elevación de pierna estirada colgando | Elevación de piernas extendidas colgado en barra | elevación de piernas rectas en barra |
| flow-0476 | Colgando recto torciendo la pierna elevación de cadera | Elevación de piernas extendidas y cadera colgado en barra con giro | elevación de piernas con rotación en barra |
| flow-3636 | Rodilla alta contra la pared | Rodillas altas alternas con apoyo de manos en pared | carrera con rodillas arriba contra pared |
| flow-1418 | Abrazo fuerte al pecho | Sentadilla profunda con abrazo de rodillas | sentadilla abrazando las piernas |
| flow-3234 | Vuelo alto con mancuernas | Aperturas con mancuernas en banco plano | aperturas de pecho acostado |
| flow-3698 | Gusano pulgada v.2 | Caminata de gusano (variante 2) | inchworm con avance de manos y pies |
| flow-0491 | Inclinar pierna elevar cadera (pierna estirada) | Elevación de piernas extendidas y cadera en banco inclinado | elevación de piernas rectas en banco inclinado |
| flow-3785 | Flexión inclinada (en caja) | Flexiones de brazos con manos sobre cajón | flexiones inclinadas sobre cajón |
| flow-0496 | Curl de piernas inverso (apoyo en banco) | Curl de piernas boca abajo con apoyo del tronco en banco | curl femoral sin carga con apoyo en banco |
| flow-2400 | Curl de piernas inverso (en máquina de dominadas con cable) | Curl femoral acostado en polea baja | curl femoral en polea con banco |
| flow-2300 | Rodillas dobladas fila invertida | Remo invertido con rodillas flexionadas | dominadas australianas con rodillas dobladas |
| flow-2298 | Fila invertida en banco | Remo invertido sujetándose de un banco alto | remo con peso corporal bajo banco |
| flow-0497 | Fila invertida v.2 | Remo invertido con pies apoyados en el suelo (variante 2) | dominadas australianas con barra baja |
| flow-3224 | Salto de gato | Saltos de tijera | jumping jacks |
| flow-0514 | Saltar en cuclillas | Sentadilla con salto | salto desde sentadilla |
| flow-0513 | Sentadilla con salto v.2 | Sentadilla con salto (variante 2) | sentadilla con salto |
| flow-0517 | Molino de viento avanzado con pesas rusas | Molino avanzado con pesa rusa sobre la cabeza | windmill avanzado con pesa rusa |
| flow-0518 | Pesas rusas alternando colgar limpio | Cargada alterna con pesas rusas desde posición colgante | clean alternado con pesas rusas |
| flow-0520 | Prensa alterna con pesas rusas | Press de hombros alterno con pesas rusas | press alternado con kettlebells |
| flow-0519 | Press alternativo con pesas rusas en el suelo | Press de pecho alterno en el suelo con pesas rusas | floor press alternado con kettlebells |
| flow-0522 | Remo alterno con pesa rusa | Remo alterno con dos pesas rusas y tronco inclinado | remo inclinado alternado con kettlebells |
| flow-0525 | Pesas rusas con la parte inferior hacia arriba limpia desde la posición colgante | Cargada desde posición colgante con pesa rusa invertida | clean bottoms-up con pesa rusa |
| flow-0527 | Doble tirón con pesas rusas | Envión con dos pesas rusas | jerk doble con pesas rusas |
| flow-0528 | Press de doble empuje con pesas rusas | Press de hombros con impulso de piernas y dos pesas rusas | push press con dos kettlebells |
| flow-0533 | Sentadilla frontal con pesa rusa | Sentadilla frontal con pesa rusa sostenida a dos manos | sentadilla con pesa rusa al pecho |
| flow-0536 | Pase de desplante con pesas rusas | Desplante con pase de pesa rusa por debajo de la pierna | zancada con cambio de mano bajo el muslo |
| flow-0537 | Pesas rusas con un brazo en envión | Cargada y envión a un brazo con pesa rusa | clean and jerk unilateral con pesa rusa |
| flow-1298 | Press de suelo con un brazo y pesas rusas | Press de pecho unilateral en el suelo con pesa rusa | floor press a un brazo |
| flow-0538 | Tirón con un brazo con pesa rusa | Envión unilateral con pesa rusa | jerk a un brazo con kettlebell |
| flow-0539 | Press militar con un brazo y pesa rusa hacia un lado | Press militar unilateral con pesa rusa | press de hombro a un brazo con pesa rusa |
| flow-0540 | Press de empuje con un brazo con pesas rusas | Press de hombro unilateral con impulso de piernas y pesa rusa | push press a un brazo con kettlebell |
| flow-0542 | Arranque de un brazo con pesas rusas | Arranque unilateral con pesa rusa | snatch a un brazo con pesa rusa |
| flow-0543 | Piernas de cena pirata con pesas rusas | Cargada y press sobre la cabeza a un brazo con pesa rusa | clean and press unilateral con pesa rusa |
| flow-0545 | Flexiones plyo con pesas rusas | Flexiones de brazos pliométricas sobre pesas rusas | flexiones explosivas sobre kettlebells |
| flow-1438 | Press militar a dos brazos sentado con pesa rusa | Press militar sentado con dos pesas rusas | press de hombros sentado con kettlebells |
| flow-0549 | Columpio con pesas rusas | Balanceo con pesa rusa a dos manos | swing con pesa rusa |
| flow-0553 | Press militar a dos brazos con pesa rusa | Press militar con dos pesas rusas | press de hombros con kettlebells |
| flow-1345 | Remo a dos brazos con pesa rusa | Remo inclinado con dos pesas rusas | remo bilateral con kettlebells |
| flow-0555 | Echarse sentarse | Extensión y flexión de piernas sentado en banco | recogida de rodillas sentado en banco |
| flow-3640 | Crunch de toque de rodilla | Crunch con toque alterno de rodilla | abdominal corto tocando la rodilla contraria |
| flow-3418 | Pull-up | Dominadas en L | dominadas con piernas extendidas al frente |
| flow-3419 | Me siento en el suelo | Sostén en L sobre el suelo | L-sit en el suelo |
| flow-0562 | Mina terrestre 180 | Rotaciones de tronco con barra anclada (landmine) | giros de 180 grados con landmine |
| flow-3237 | Elevación lateral de minas terrestres | Elevación lateral unilateral con barra anclada (landmine) | elevación lateral con landmine |
| flow-3300 | Plancha magra | Inclinación al frente en plancha de calistenia con pies apoyados | planche lean |
| flow-2271 | Gancho de izquierda. boxeo | Gancho de izquierda de boxeo | hook izquierdo |
| flow-0570 | Tirón de piernas en banco plano | Recogida de rodillas sentado en banco plano | encogimiento de piernas sentado |
| flow-2287 | Prensa de piernas alterno en máquina de palanca | Prensa de piernas alterna en máquina de palanca | prensa unilateral alternada |
| flow-0571 | Remo con agarre cerrado alterno sentado en máquina de palanca | Remo alterno sentado en máquina con agarre cerrado | remo alternado en máquina de palanca |
| flow-3200 | Fila inclinada con palanca con barra en V | Remo inclinado en máquina de palanca con agarre en V | remo con barra en V en máquina |
| flow-2289 | Extensión de tobillos en prensa en máquina de palanca | Elevación de talones sentado en máquina de palanca | pantorrilla sentado en máquina |
| flow-0577 | Press de pecho en máquina de palanca | Press de pecho sentado en máquina | chest press |
| flow-0576 | Press de pecho en máquina de palanca | Press de pecho sentado en máquina | chest press |
| flow-2288 | Manos de agarre de palanca | Cierre de manos en máquina de agarre | apretón en máquina para antebrazo |
| flow-2611 | Prensa horizontal de palanca con una pierna | Prensa horizontal unilateral en máquina | prensa de piernas a una pierna |
| flow-0583 | Giro de palanca de rodillas | Rotación de tronco de rodillas en máquina | giros de torso de rodillas en máquina |
| flow-0589 | Remo a un brazo con el tronco inclinado en máquina de palanca | Remo unilateral inclinado con barra de palanca | remo a un brazo con barra anclada |
| flow-1356 | Remo alto a un brazo lateral en máquina de palanca | Remo alto unilateral sentado en máquina de palanca | remo alto a un brazo en máquina |
| flow-1347 | Jalón dorsal a un brazo lateral con postura amplia en máquina de palanca | Jalón unilateral en máquina con trayectoria hacia la cadera contraria | jalón cruzado a un brazo en máquina |
| flow-1348 | Remo con agarre inverso vertical en máquina de palanca | Remo sentado en máquina con agarre supino | remo en máquina con palmas hacia arriba |
| flow-1349 | Fila de barra en T inversa de palanca | Remo en máquina de palanca con barra T y agarre prono | remo con barra T en máquina |
| flow-2315 | Pantorrilla rotatoria de palanca | Elevación de talones sentado en máquina rotatoria | pantorrilla en máquina rotatoria |
| flow-2335 | Extensión de tobillos en prensa sentado en máquina de palanca | Elevación de talones sentado en máquina de palanca con apoyo en muslos | pantorrilla sentado con almohadilla sobre rodillas |
| flow-0600 | Crunch con elevación de piernas sentado con palanca | Crunch sentado en máquina con elevación de piernas | abdominal en máquina con recogida de piernas |
| flow-1385 | Levantamiento de pantorrillas en cuclillas sentado con palanca en una máquina de prensa de piernas | Elevación de talones sentado en prensa de piernas | pantorrilla en prensa sentada |
| flow-3013 | Puente bajo de glúteos en el suelo. | Puente de glúteos en el suelo de recorrido corto | puente bajo de glúteos |
| flow-0613 | Estiramiento de cuádriceps acostado (de lado) | Estiramiento de cuádriceps acostado de lado | estiramiento lateral de cuádriceps |
| flow-2312 | Recostado codo a rodilla | Abdominal bicicleta con codo a rodilla contraria | crunch bicicleta |
| flow-0620 | Elevación de piernas en banco plano acostado | Elevación de piernas acostado en banco plano | elevación de piernas en banca |
| flow-0865 | Elevación de pierna y cadera acostada | Elevación de piernas y cadera acostado en el suelo | elevación de cadera con piernas arriba |
| flow-1301 | Prensa de pecho interior de la máquina | Press de pecho sentado en máquina | press de pecho en máquina |
| flow-0624 | Marchar sentado (pared) | Marcha en sentadilla isométrica contra la pared | sentadilla en pared con elevación alterna de rodillas |
| flow-1353 | Recepción de balón medicinal y lanzamiento por encima de la cabeza. | Lanzamiento de balón medicinal sobre la cabeza con recepción | lanzamiento vertical y recepción de balón |
| flow-1304 | Balón medicinal empuje en el pecho respuesta múltiple | Empuje de pecho de pie con balón medicinal (variante múltiple) | empuje frontal con balón medicinal |
| flow-1305 | Empuje de pecho con balón medicinal de respuesta única. | Empuje de pecho de pie con balón medicinal (variante simple) | extensión de brazos al frente con balón medicinal |
| flow-1312 | Empuje de pecho con balón medicinal con liberación de carrera | Lanzamiento de pecho con balón medicinal y carrera para recuperarlo | pase de pecho con desplazamiento |
| flow-1701 | Empuje hacia arriba con agarre cercano del balón medicinal | Flexiones de brazos con manos juntas sobre balón medicinal | flexiones cerradas sobre balón |
| flow-1354 | Golpe por encima de la cabeza con balón medicinal | Lanzamiento de balón medicinal al suelo desde arriba de la cabeza | slam con balón medicinal |
| flow-1421 | Empuje modificado hacia arriba para bajar los brazos. | Flexión de brazos con descenso a los antebrazos | flexiones esfinge |
| flow-0630 | Alpinista | Escaladores | mountain climbers; rodillas alternas al pecho en plancha |
| flow-2328 | Flexión estrecha sobre una pelota de ejercicios | Flexiones de brazos con manos juntas sobre pelota de estabilidad | flexiones cerradas sobre pelota |
| flow-0634 | Crisis negativa | Crunch con descenso lento y controlado | crunch con énfasis en la fase negativa |
| flow-0637 | Extensión de tríceps con barra olímpica | Extensión de tríceps sobre la cabeza de pie con barra olímpica | press francés de pie con barra recta |
| flow-0639 | Fondos a un brazo | Fondos de tríceps a un brazo en banco | fondo unilateral en banca |
| flow-0640 | Golpe con un brazo (con balón medicinal) | Lanzamiento unilateral de balón medicinal al suelo | slam a un brazo con balón medicinal |
| flow-1773 | Fila de toalla de un brazo | Remo unilateral con toalla y tronco inclinado | remo a un brazo con toalla |
| flow-1386 | Elevación de pantorrilla en burro con una pierna | Elevación de talón a una pierna con tronco inclinado y apoyo en banco | pantorrilla unilateral tipo burro |
| flow-0642 | Flexión de patada exterior con pierna | Flexiones de brazos con patada lateral hacia afuera | flexiones con apertura lateral de pierna |
| flow-1687 | Paso posterior al alcance por encima de la cabeza | Desplante hacia atrás con brazos sobre la cabeza | zancada inversa con elevación de brazos |
| flow-3119 | Sentadillas para ir al baño | Sentadilla sin peso con brazos al frente | sentadilla con peso corporal |
| flow-3132 | Sentadillas para ir al baño con apoyo | Sentadilla con apoyo de manos en silla | sentadilla asistida con silla |
| flow-3665 | Tablón de power point | Plancha con cambio de apoyo entre manos y antebrazos | plancha comando; plancha arriba y abajo |
| flow-3203 | Prisionero medio abdominal | Abdominal corto con manos detrás de la cabeza | medio sit-up con manos en la nuca |
| flow-1707 | Giro boca abajo en la pelota de estabilidad | Extensión y rotación de tronco boca abajo sobre pelota de estabilidad | extensión de espalda con giro sobre pelota |
| flow-0650 | Pull-in (sobre pelota de estabilidad) | Elevación alterna de rodillas sentado sobre pelota de estabilidad | recogida de rodilla sentado sobre pelota |
| flow-1689 | Empujar y tirar del peso corporal | Flexión de brazos con descenso hasta los antebrazos | flexión con transición a apoyo de antebrazos |
| flow-3638 | Empujar para correr | Flexiones de brazos con escaladores | flexión seguida de rodillas alternas al pecho |
| flow-0659 | Flexiones (pared) | Flexiones de brazos contra la pared | lagartijas en pared |
| flow-0658 | Flexión (pared) v.2 | Flexiones de brazos contra la pared (variante 2) | lagartijas en pared variante 2 |
| flow-0661 | Flexión de brazos patada interior de la pierna | Flexiones de brazos con patada cruzada hacia adentro | flexiones con cruce de pierna por debajo |
| flow-0663 | Balón medicinal de flexiones | Flexiones de brazos sobre balón medicinal | lagartijas con manos sobre balón |
| flow-3145 | Flexiones más | Flexiones de brazos con empuje escapular al final | push-up plus |
| flow-3533 | Cuádriceps | Sentadilla sin peso con brazos al frente | sentadilla con peso corporal |
| flow-3201 | Cuarto de abdominales | Crunch de recorrido corto | cuarto de sit-up |
| flow-3552 | Pies rápidos v.2 | Pasos rápidos en el lugar (variante 2) | carrera rápida sin desplazamiento |
| flow-0666 | Levantar flexión de un solo brazo | Flexiones de brazos a una mano con brazo libre extendido al lado | flexión unilateral con brazo lateral |
| flow-0668 | Puente de descenso trasero | Puente de glúteos acostado en el suelo | elevación de cadera con rodillas flexionadas |
| flow-0669 | Estiramiento deltoides posterior | Estiramiento del deltoides posterior | estiramiento de hombro con brazo cruzado |
| flow-0672 | Inmersión inversa | Fondos con piernas extendidas al frente y apoyo posterior de manos | fondos inversos con piernas al frente |
| flow-0673 | Jalón lateral con máquina de agarre inverso | Jalón al pecho en máquina con agarre supino | jalón con agarre inverso en máquina |
| flow-1423 | Hiper inversa en banco plano | Elevación de piernas boca abajo en banco plano | hiperextensión inversa en banco plano |
| flow-2202 | Estiramiento de cadera con rodillo | Deslizamiento sentado sobre rodillo con flexión de rodillas | movilidad de cadera sentado sobre rodillo |
| flow-2203 | Retractor depresor flexor de hombro sentado con rodillo | Elevación frontal de brazos sentado con rodillo | movilidad de hombros sentado con rodillo |
| flow-0685 | Correr | Carrera en el lugar | trote sin desplazamiento |
| flow-1585 | Los corredores se estiran | Estiramiento en desplante con pierna trasera extendida | estiramiento del corredor |
| flow-3021 | Flexión de escápula | Flexiones de brazos con movimiento escapular | flexiones con retracción y protracción escapular |
| flow-3219 | Saltos de tijera | Saltos con cruce alterno de piernas | saltos de tijera cruzados |
| flow-0691 | Abdominales laterales sentado (pared) | Crunch lateral sentado con espalda contra la pared | abdominal lateral sentado en pared |
| flow-1587 | Secuencia de pose de gran angular sentado | Flexión de tronco sentado con piernas abiertas | estiramiento sentado en apertura de piernas |
| flow-0697 | Curl de piernas inverso autoasistido | Flexión de rodilla hacia el pecho acostado con ayuda de las manos | recogida de rodilla acostado autoasistida |
| flow-3222 | Salto en semi sentadilla | Salto desde media sentadilla | salto con flexión parcial de rodillas |
| flow-1763 | Dominadas con agarre en el hombro | Dominadas con agarre prono al ancho de los hombros | dominadas con separación de hombros |
| flow-3699 | Golpecito en el hombro | Toques alternos de hombro en plancha | plancha con toque de hombros |
| flow-0699 | Flexión de hombros | Flexiones de brazos con toque alterno de hombro | lagartijas con toque de hombros |
| flow-1774 | Abducción de cadera con puente lateral | Plancha lateral con elevación de la pierna superior | puente lateral con abducción de cadera |
| flow-0705 | Puente lateral v.2 | Plancha lateral (variante 2) | puente lateral |
| flow-0709 | Cadera lateral (en barras paralelas) | Balanceo lateral de piernas en apoyo sobre barras paralelas | elevación lateral de piernas en paralelas |
| flow-3667 | Aducción de cadera en decúbito lateral | Elevación lateral de pierna acostado de lado | abducción de cadera acostado de lado |
| flow-1775 | Aducción de cadera en plancha lateral | Plancha lateral con elevación de la pierna superior | plancha lateral con abducción de cadera |
| flow-0716 | Estiramiento del cuello con empuje lateral | Estiramiento lateral de cuello con ayuda de la mano | inclinación de cuello asistida |
| flow-0720 | Barbilla de lado a lado | Dominadas con desplazamiento lateral | dominadas de lado a lado |
| flow-3213 | Toque de lado a lado del dedo del pie | Flexión lateral de tronco con toque del pie del mismo lado | toques laterales de pies de pie |
| flow-3645 | Puente de una sola pierna con la pierna extendida | Puente de glúteos a una pierna con la otra extendida | puente unilateral con pierna al frente |
| flow-0730 | Diapositiva de plataforma de una sola pierna | Desplante hacia atrás con pie sobre plataforma deslizante | zancada inversa con deslizador |
| flow-1759 | Sentadilla con una sola pierna (pistola) | Sentadilla a una pierna con la otra extendida al frente | sentadilla pistol; sentadilla pistola |
| flow-1489 | Sentadilla mariquita | Sentadilla sissy con apoyo de manos | sissy squat asistida |
| flow-3679 | Sentarse con los brazos en el pecho | Abdominal con brazos cruzados sobre el pecho | sit-up con brazos en el pecho |
| flow-3361 | Saltos patinadores | Saltos laterales de patinador | saltos de patinador |
| flow-2142 | Esquí ergómetro | Jalón sentado en ergómetro de esquí | SkiErg sentado |
| flow-3671 | Paso de esquí | Saltos laterales alternos de esquí | pasos de esquí con salto |
| flow-3304 | Despellejar al gato | Giro invertido en barra pasando las piernas entre los brazos | skin the cat en barra |
| flow-1425 | Trineo 45 grados prensa de una pierna | Prensa de piernas a 45° unilateral | prensa inclinada a una pierna |
| flow-0738 | Trineo 45 ° prensa de pantorrillas | Elevación de talones en prensa a 45° | pantorrilla en prensa inclinada |
| flow-0739 | Trineo 45 ° prensa de piernas | Prensa de piernas a 45° | prensa inclinada de piernas |
| flow-1464 | Trineo 45 ° prensa de piernas (punto de vista posterior) | Prensa de piernas a 45° (vista posterior) | prensa inclinada vista desde atrás |
| flow-1463 | Press de piernas en trineo a 45° (punto de vista lateral) | Prensa de piernas a 45° (vista lateral) | prensa inclinada vista de lado |
| flow-0740 | Trineo 45 ° prensa de pierna ancha | Prensa de piernas a 45° con pies separados | prensa inclinada con postura amplia |
| flow-1391 | Prensa de pantorrillas en trineo en prensa de piernas | Elevación de talones en prensa de piernas con trineo | pantorrilla en prensa de trineo |
| flow-0742 | Elevación de pantorrilla en ángulo hacia adelante en trineo | Elevación de talones en máquina hack con el cuerpo hacia el respaldo | pantorrilla en hack invertida |
| flow-2334 | Extensión de tobillos en prensa acostado en máquina de trineo | Elevación de talones acostado en prensa de trineo | pantorrilla en prensa acostada |
| flow-0744 | Sentadilla acostado en máquina de trineo | Prensa de piernas acostado en máquina de trineo | prensa acostada |
| flow-1392 | Trineo con una pierna, prensa de pantorrillas, prensa de piernas | Elevación de talón unilateral en prensa de piernas | pantorrilla a una pierna en prensa |
| flow-1496 | Martillo | Golpes al suelo con mazo | golpes con martillo de entrenamiento |
| flow-0746 | Smith se encoge de hombros | Encogimiento de hombros con barra detrás del cuerpo en máquina Smith | encogimientos posteriores en Smith |
| flow-0754 | Prensa Smith Declive con agarre inverso | Press de banca declinado en máquina Smith con agarre supino | press declinado con agarre inverso en Smith |
| flow-1433 | Sentadilla frontal Smith (agarre limpio) | Sentadilla frontal en máquina Smith con agarre de cargada | sentadilla frontal en Smith con codos al frente |
| flow-0756 | Elevación de cadera en máquina Smith | Elevación de cadera con espalda en banco en máquina Smith | hip thrust en Smith |
| flow-0769 | Desplante de sprint de smith | Desplante con pie trasero apoyado en la barra de máquina Smith | sentadilla dividida con pie trasero en barra Smith |
| flow-0772 | Press militar de pie detrás de la cabeza en máquina Smith | Press militar tras nuca de pie en máquina Smith | press de hombros tras nuca en Smith |
| flow-0773 | Elevación de pantorrilla con pierna de pie de smith | Elevación de talones de pie en máquina Smith | pantorrilla de pie en Smith |
| flow-3142 | Sentadilla de sumo smith | Sentadilla sumo en máquina Smith | sentadilla en Smith con postura amplia |
| flow-1362 | Esfinge | Extensión de tronco en postura de esfinge | postura de la esfinge |
| flow-0778 | Flexión de araña arrastrada hacia arriba | Flexiones de brazos con rodilla hacia el codo del mismo lado | flexiones Spiderman |
| flow-1363 | Estiramiento de la columna | Estiramiento de espalda sentado con apoyo de manos atrás | extensión de tronco sentado |
| flow-2329 | Giro de la columna | Rotación de tronco sentado en el suelo | giro de columna sentado |
| flow-1685 | Sentadillas hasta alcanzar la altura de la cabeza | Sentadilla con elevación de brazos sobre la cabeza al subir | sentadilla con alcance hacia arriba |
| flow-1686 | Sentadilla hasta alcanzar la altura de la cabeza con giro | Sentadilla con elevación de brazos y giro de tronco al subir | sentadilla con alcance y rotación |
| flow-2297 | Crunch con balón de estabilidad (manos detrás de la cabeza en todo el rango) | Crunch sobre pelota de estabilidad con manos detrás de la cabeza y recorrido completo | crunch completo sobre pelota |
| flow-3669 | Arquero de pie | Movimiento de arquero de pie con rotación de tronco | simulación de tiro con arco de pie |
| flow-1397 | Pantorrillas de pie | Elevación de talones de pie sin peso | pantorrilla de pie con peso corporal |
| flow-1398 | Pantorrillas de pie estiramiento de pantorrillas | Estiramiento de pantorrilla de pie con manos contra la pared | estiramiento de gemelos contra pared |
| flow-0795 | Curl con una sola pierna de pie | Curl de pierna de pie sin peso | flexión de rodilla de pie |
| flow-0796 | Despliegue de rueda de pie | Extensión abdominal con rueda desde posición de pie | ab wheel de pie; rollout con rueda de pie |
| flow-2138 | Carrera en bicicleta estática v.3 | Pedaleo en bicicleta fija (variante 3) | bicicleta estacionaria variante 3 |
| flow-0798 | Paseo en bicicleta estacionaria | Pedaleo en bicicleta fija | bicicleta estacionaria |
| flow-3298 | Plancha a horcajadas | Plancha de calistenia con piernas abiertas sin apoyo de pies | straddle planche |
| flow-1427 | Abductor externo de cadera con pierna recta | Elevación lateral de pierna extendida acostado de lado | abducción de cadera de lado |
| flow-0803 | Flexiones de superman | Flexiones de brazos con elevación de brazo y pierna contrarios | flexiones Superman con apoyo diagonal |
| flow-0805 | Lluvia abdominal suspendida | Extensión abdominal de pie con correas de suspensión | fallout abdominal en suspensión |
| flow-3433 | Patadas de nadador v.2 | Patadas de nadador boca abajo (variante 2) | patadas alternas acostado boca abajo |
| flow-3318 | Columpio 360 | Círculos de brazos con rotación de tronco de pie | movilidad de tronco y brazos en círculo |
| flow-0814 | Fondos para tríceps | Fondos de tríceps en banco | fondos en banca con pies en el suelo |
| flow-0812 | Fondos de tríceps (pierna de banco) | Fondos de tríceps en banco con piernas extendidas | fondos en banca con apoyo de talones |

## Pendientes de revisión

Todos estos ejercicios sí fueron inspeccionados. Requieren resolver el conflicto indicado antes de aprobar un título nuevo.

| ID | Título original en inglés | Motivo |
| --- | --- | --- |
| Barbell_Incline_Shoulder_Raise | Barbell Incline Shoulder Raise | El texto describe protracción escapular con brazos bloqueados; la animación eleva los brazos desde abajo. No se confirma elevación escapular frente a elevación frontal. |
| Barbell_Rear_Delt_Row | Barbell Rear Delt Row | El texto describe remo inclinado para deltoides posteriores; la animación muestra desplante y press sobre la cabeza con barra. |
| Behind_Head_Chest_Stretch | Behind Head Chest Stretch | El texto requiere ayuda de un compañero sentado en el suelo; los cuadros muestran postura de pie sin asistencia. |
| Body-Up | Body-Up | El texto mantiene plancha rígida sobre antebrazos; los cuadros muestran extensión del tronco con pelvis cerca del suelo. No se confirma extensión de tríceps frente a cobra. |
| Butt-Ups | Butt-Ups | El original apoya antebrazos y eleva cadera; los cuadros mantienen brazos extendidos con apoyo en manos. No se sustituye el apoyo. |
| Cable_Incline_Pushdown | Cable Incline Pushdown | Las instrucciones requieren banco inclinado; los tres cuadros muestran ejecución de pie con el tronco inclinado. |
| Cable_Judo_Flip | Cable Judo Flip | Las instrucciones indican polea baja y giro ascendente; la animación muestra polea alta y recorrido descendente. |
| Cable_Reverse_Crunch | Cable Reverse Crunch | Las instrucciones sujetan el cable a los tobillos; la ilustración muestra sujeción con las manos detrás de la cabeza. |
| Cable_Seated_Crunch | Cable Seated Crunch | El original coloca la espalda hacia una polea alta; la ilustración muestra el cable al frente desde abajo. |
| Cable_Shoulder_Press | Cable Shoulder Press | Las instrucciones indican ejecución de pie; la ilustración muestra press sentado en banco. |
| Chair_Leg_Extended_Stretch | Chair Leg Extended Stretch | El texto abre la pierna hacia un lado; la ilustración muestra inclinación anterior sobre la pierna extendida. Trayectorias distintas. |
| Chest_And_Front_Of_Shoulder_Stretch | Chest And Front Of Shoulder Stretch | El texto usa un palo por encima de la cabeza y la ilustración muestra un brazo contra una pared. |
| Clock_Push-Up | Clock Push-Up | El original incluye impulso pliométrico y giro en el aire; los cuadros muestran desplazamiento de una mano sin confirmar ese salto. |
| Cross-Body_Crunch | Cross-Body Crunch | El texto mantiene los pies apoyados; la animación alterna elevación de rodillas y extensión de piernas, como en abdominales bicicleta. |
| Decline_Crunch | Decline Crunch | El original limita el movimiento a un crunch corto; la imagen eleva el torso hasta una incorporación casi completa. |
| Dumbbell_Incline_Shoulder_Raise | Dumbbell Incline Shoulder Raise | El original pide brazos extendidos y movimiento escapular; los cuadros muestran flexión de codos y press inclinado. |
| Dumbbell_Lying_One-Arm_Rear_Lateral_Raise | Dumbbell Lying One-Arm Rear Lateral Raise | El texto apoya el pecho boca abajo y la imagen parece colocar el cuerpo de lado. Falta confirmar el apoyo de esta variante unilateral. |
| Dumbbell_Lying_Pronation | Dumbbell Lying Pronation | El texto describe un arco de rotación con el codo flexionado que no identifica inequívocamente pronación de antebrazo; el agarre y eje deben resolverse. |
| Dumbbell_Lying_Supination | Dumbbell Lying Supination | El texto describe rotación del brazo con el codo a 90 grados; los cuadros parecen aperturas de pecho. No se confirma supinación de antebrazo. |
| Dumbbell_One-Arm_Shoulder_Press | Dumbbell One-Arm Shoulder Press | El original indica sentarse en banco con respaldo; los cuadros muestran press de hombro de pie. |
| Dumbbell_Raise | Dumbbell Raise | El original dirige las mancuernas a la barbilla guiadas por los codos, pero la ilustración representa elevaciones laterales. No se elige un movimiento por el nombre genérico. |
| Flutter_Kicks | Flutter Kicks | El texto especifica patadas alternas boca abajo en banco; los cuadros muestran patadas boca arriba en el suelo. |
| Frankenstein_Squat | Frankenstein Squat | El original apoya la barra sobre los hombros con brazos libres al frente; los cuadros sostienen la barra con las manos por delante del cuerpo. |
| Glute_Ham_Raise | Glute Ham Raise | El original flexiona rodillas hasta elevar el cuerpo; los cuadros mantienen las rodillas extendidas y flexionan la cadera en banco romano. |
| Hamstring_Stretch | Hamstring Stretch | El texto pide posición boca arriba y correa en el pie; los cuadros muestran estiramiento de pie sin correa. |
| Incline_Push-Up_Depth_Jump | Incline Push-Up Depth Jump | El texto eleva los pies y salta con las manos entre apoyos; los cuadros elevan las manos en un banco y mantienen los pies abajo. |
| Intermediate_Hip_Flexor_and_Quad_Stretch | Intermediate Hip Flexor and Quad Stretch | El texto requiere posición boca abajo con correa; la ilustración muestra estiramiento de cuádriceps de pie sin correa. |
| Isometric_Wipers | Isometric Wipers | El texto describe flexiones con desplazamiento lateral; los cuadros representan giros de piernas boca arriba. |
| Kettlebell_Arnold_Press | Kettlebell Arnold Press | El original trabaja una pesa rusa a un brazo; los cuadros muestran dos pesas rusas con ejecución bilateral. |
| Kettlebell_Seated_Press | Kettlebell Seated Press | El original indica sentado en el suelo con una pesa rusa; la ilustración muestra banco y dos pesas. |
| Kettlebell_Thruster | Kettlebell Thruster | El original combina sentadilla y press con dos pesas rusas; la ilustración usa una sola pesa sujeta con ambas manos. |
| Kettlebell_Turkish_Get-Up_Squat_style | Kettlebell Turkish Get-Up (Squat style) | El título especifica recepción con sentadilla, pero el texto y la imagen progresan por posición de desplante. |
| Kettlebell_Windmill | Kettlebell Windmill | El texto carga una pesa rusa arriba y toma otra del suelo; los cuadros solo muestran una pesa arriba y la mano libre abajo. |
| Lower_Back_Curl | Lower Back Curl | El original eleva el pecho sin apoyarse en los brazos; los cuadros muestran empuje con las manos en extensión tipo cobra. |
| Monster_Walk | Monster Walk | Las instrucciones avanzan y retroceden con banda; los cuadros describen pasos laterales. La dirección de desplazamiento debe resolverse. |
| Muscle_Up | Muscle Up | El original exige anillas y falso agarre; la ilustración muestra barra fija. No se intercambia ese equipo. |
| One_Arm_Against_Wall | One Arm Against Wall | El texto identifica dorsales y brazo flexionado; la ilustración muestra brazo extendido y apoyo de mano. Falta confirmar la zona y variante del estiramiento. |
| One_Arm_Chin-Up | One Arm Chin-Up | El original utiliza una toalla con la otra mano; los cuadros muestran apoyo de la mano libre en el antebrazo, sin toalla. |
| Otis-Up | Otis-Up | El texto exige carga sobre el pecho y press durante la incorporación; la ilustración no muestra carga. |
| Peroneals_Stretch | Peroneals Stretch | El texto define inversión del pie con correa; los cuadros no permiten distinguir con seguridad el sentido de rotación del tobillo. |
| Posterior_Tibialis_Stretch | Posterior Tibialis Stretch | La eversión indicada en las instrucciones no puede distinguirse con seguridad en estos cuadros de la correa y el pie. |
| Power_Clean | Power Clean | El título y el original son cargada de potencia; la imagen recibe la barra en sentadilla profunda. No se equipara recepción alta con profunda. |
| Russian_Twist | Russian Twist | El original fija los pies bajo un soporte; los cuadros elevan ambos pies sin apoyo. |
| Side-Lying_Floor_Stretch | Side-Lying Floor Stretch | El texto se coloca sobre un lado con una pierna extendida detrás; los cuadros parecen boca arriba y no confirman esa posición lateral. |
| Split_Squats | Split Squats | El original exige saltos y alternancia de piernas; los cuadros muestran desplante sin demostrar el salto. El título español actual dice estático y no queda confirmado. |
| Squat_Jerk | Squat Jerk | El texto recibe la barra en sentadilla completa; la ilustración presenta una recepción en desplante. |
| Suspended_Reverse_Crunch | Suspended Reverse Crunch | El texto sujeta los pies a correas en posición de plancha; la ilustración muestra elevación de rodillas colgado en barra. |
| Tuck_Crunch | Tuck Crunch | El texto mantiene piernas cruzadas y eleva hombros parcialmente; los cuadros realizan una incorporación y flexión dinámica de piernas. |
| flow-0002 | 45° side bend | El título especifica 45 grados, pero el texto y los cuadros no explican de dónde procede esa inclinación ni permiten confirmarla. |
| flow-1512 | all fours squad stretch | El nombre indica estiramiento de cuádriceps, pero el texto es contradictorio sobre extender y flexionar la rodilla; la ilustración muestra patada de cadera en cuatro apoyos. |
| flow-0011 | assisted hanging knee raise | El texto cuelga de las manos con brazos extendidos; los cuadros apoyan los antebrazos en una silla romana. No se equiparan ambos apoyos. |
| flow-0010 | assisted hanging knee raise with throw down | El texto cuelga de barra; la ilustración usa apoyo de antebrazos en silla romana. La asistencia y el impulso hacia abajo no quedan identificados. |
| flow-1708 | assisted lying calves stretch | El texto flexiona una rodilla con el pie apoyado; la ilustración eleva la pierna extendida con correa. No se confirma la posición del estiramiento de pantorrilla. |
| flow-1709 | assisted lying glutes stretch | La posición de cruce de tobillo sobre el muslo indicada en el texto no se distingue con seguridad en los cuadros de flexión de cadera. |
| flow-1710 | assisted lying gluteus and piriformis stretch | No se distingue con seguridad el cruce de tobillo ni el apoyo descrito para diferenciar la variante de piriforme del estiramiento general de glúteo. |
| flow-0012 | assisted lying leg raise with lateral throw down | El título indica empuje lateral asistido; ni texto ni cuadros identifican quién proporciona la asistencia. |
| flow-0013 | assisted lying leg raise with throw down | El título indica empuje asistido; texto y cuadros solo muestran la propia elevación y descenso de piernas. |
| flow-0014 | assisted motion russian twist | El título indica asistencia; texto y cuadros representan giros con balón medicinal sin definir una asistencia adicional. |
| flow-0016 | assisted prone hamstring | El texto mezcla curl de rodilla y rodillas extendidas; la ilustración tira del pie hacia el glúteo en un estiramiento de cuádriceps. No identifica isquiotibiales de forma coherente. |
| flow-1716 | assisted seated pectoralis major stretch with stability ball | El título dice estiramiento de pectoral, pero texto y cuadros comprimen o abrazan un balón al frente. No se confirma estiramiento frente a contracción. |
| flow-1712 | assisted side lying adductor stretch | La posición y movimiento de la pierna apoyada en el banco no permiten distinguir con seguridad estiramiento de aductores frente a movimiento activo de cadera. |
| flow-1431 | assisted standing chin-up | El título chin-up indica agarre supino y el texto especifica prono; el ángulo de las manos en la imagen no resuelve esa discrepancia. |
| flow-3672 | back and forth step | El original describe desplantes alternos al frente; la animación eleva rodillas de pie sin mostrar el desplante. |
| flow-3297 | back lever | El nombre back lever no queda confirmado por el texto, que extiende las piernas al frente, ni por la orientación del tronco en los cuadros. Revisar front lever frente a back lever. |
| flow-1405 | back pec stretch | El título indica pectoral, pero el texto estira espalda alta y hombros con manos al frente; los cuadros agregan elevación sobre la cabeza. Grupo y variante sin resolver. |
| flow-0968 | band alternating biceps curl | Texto y título alternan los brazos; los tres cuadros muestran ambos brazos flexionándose a la vez. |
| flow-0971 | band assisted wheel rollerout | El texto coloca la banda al frente y en las manos; los cuadros la anclan detrás y la pasan por la cadera para asistir a la rueda abdominal. |
| flow-0972 | band bicycle crunch | Las instrucciones no describen el anclaje ni la colocación de la banda y los cuadros no permiten confirmarlos con seguridad. |
| flow-0984 | band lying hip internal rotation | El nombre indica rotación interna de cadera, pero el texto y los cuadros separan rodillas; no se distingue rotación interna frente a externa o abducción. |
| flow-0986 | band one arm overhead biceps curl | El texto ancla la banda bajo el pie para hacer curl con el brazo arriba; la animación no confirma el anclaje y desplaza el brazo entero. Variante sin identificar. |
| flow-0987 | band one arm single leg split squat | El texto coloca el pie en un banco al frente y banda alrededor de tobillos; la ilustración apoya el pie atrás y usa una mano en un soporte, sin confirmar la banda. |
| flow-0992 | band push sit-up | El texto ancla la banda a un soporte fijo; los cuadros la sujetan entre manos y pies. No se confirma la dirección de resistencia. |
| flow-0993 | band reverse fly | El texto ancla la banda a un objeto al frente y la imagen abre una banda sostenida únicamente entre las manos. Apoyos distintos. |
| flow-0996 | band seated hip internal rotation | El título dice rotación interna, pero el texto y cuadros abren rodillas contra una banda alrededor de los muslos. No se confunde con abducción. |
| flow-0998 | band side triceps extension | El título nombra tríceps, mientras que las instrucciones flexionan codos llevando manos a hombros y los cuadros no confirman extensión lateral de tríceps. |
| flow-1000 | band single leg reverse calf raise | El título y el último cuadro elevan puntas; el original ordena levantar el talón. No se intercambian flexión dorsal y flexión plantar. |
| flow-1001 | band single leg split squat | El texto coloca banda alrededor de tobillos; la ilustración la pisa con un pie y la lleva a los hombros. |
| flow-1004 | band squat | El texto coloca banda sobre las rodillas y la imagen utiliza banda larga desde los pies hasta los hombros. |
| flow-1003 | band squat row | El texto realiza remo horizontal desde un anclaje frontal; la imagen pisa la banda y eleva los codos en un remo vertical durante la sentadilla. |
| flow-1022 | band standing rear delt row | El texto inclina el tronco y tira al pecho; los cuadros muestran tronco erguido y codos elevados en un remo vertical. |
| flow-1007 | band standing twisting crunch | El título y original indican de pie; la ilustración parece realizar el movimiento con apoyo de rodillas. |
| flow-1008 | band step-up | El texto rodea los muslos con la banda y la imagen la lleva desde los pies hasta los hombros. La colocación cambia la resistencia. |
| flow-1009 | band stiff leg deadlift | El texto coloca banda alrededor de tobillos; la ilustración la pisa y la sujeta en las manos. Falta resolver el anclaje. |
| flow-1012 | band twisting overhead press | El original exige girar el tronco durante el press; los cuadros no permiten confirmar esa rotación. |
| flow-1015 | band vertical pallof press | El título indica press Pallof vertical, pero el texto y los cuadros extienden los brazos horizontalmente al frente. |
| flow-1016 | band wrist curl | El original describe flexión de muñecas sentado con antebrazos apoyados; la ilustración muestra de pie y flexión de codos. |
| flow-0023 | barbell alternate biceps curl | El texto menciona una barra en cada mano y alternancia; los cuadros usan una sola barra con ambas manos simultáneamente. |
| flow-1255 | barbell decline pullover | La inclinación representada parece elevar la cabeza respecto a la cadera; el texto exige banco declinado. Falta confirmar la orientación del banco. |
| flow-1370 | barbell floor calf raise | El texto apoya las puntas de los pies sobre una barra en el suelo; la imagen coloca una barra cargada sobre los hombros. |
| flow-0041 | barbell front raise | El texto pide elevar al frente con brazos rectos; la ilustración flexiona codos como en curl con barra. |
| flow-0040 | barbell front raise and pullover | El texto realiza elevación frontal de pie y después pullover; la ilustración permanece acostada en banco. |
| flow-3562 | barbell glute bridge two legs on bench (male) | El texto apoya la espalda alta en un banco con pies en suelo; los cuadros apoyan los pies en banco y la espalda en suelo. |
| flow-0051 | barbell jefferson squat | El texto coloca la barra frente al cuerpo; los cuadros realizan sentadilla con la barra entre las piernas. Falta confirmar agarre y posición Jefferson. |
| flow-0052 | barbell jm bench press | El texto describe bajar la barra al pecho como un press convencional y no aclara el recorrido propio del press JM representado. |
| flow-0059 | barbell lying preacher curl | El título especifica acostado y el texto indica sentarse en predicador; los cuadros parecen apoyo de pecho en posición de pie. Postura sin resolver. |
| flow-0063 | barbell narrow stance squat | El título e imagen muestran postura estrecha, pero el texto coloca los pies al ancho de los hombros. No se confirma la separación. |
| flow-0064 | barbell one arm bent over row | Texto y título especifican barra a un brazo; la ilustración parece una mancuerna corta. El equipo no queda confirmado. |
| flow-0065 | barbell one arm floor press | El original especifica barra a un brazo y los cuadros parecen representar una mancuerna. No se intercambia equipo. |
| flow-0066 | barbell one arm side deadlift | El texto indica peso muerto lateral con barra; los cuadros muestran un objeto corto semejante a una mancuerna. Equipo sin resolver. |
| flow-1411 | barbell palms down wrist curl over a bench | El título y la imagen apoyan antebrazos en banco; el texto los apoya en los muslos. Falta confirmar el apoyo de muñecas. |
| flow-1751 | barbell pin presses | El texto inicia de pie frente a una barra a altura del pecho y no define posición acostada; los cuadros muestran press de banca desde soportes. |
| flow-0071 | barbell press sit-up | El texto indica suelo y elevación del tronco sin describir press; los cuadros muestran un banco y elevación de barra. No se confirma la combinación. |
| flow-0022 | barbell pullover to press | El original describe pullover con transición a press acostado; la ilustración realiza curl de bíceps boca abajo en banco inclinado. |
| flow-0075 | barbell rear delt raise | El texto dice elevar una barra hacia los lados, una geometría que no queda explicada por los cuadros. Debe confirmarse agarre y equipo. |
| flow-0078 | barbell rear lunge | El original describe desplante hacia atrás; la animación representa remo inclinado con barra. |
| flow-0118 | barbell reverse grip bent over row | El título indica agarre inverso, pero el texto exige agarre prono con palmas hacia abajo. No se confirma supino frente a prono. |
| flow-1257 | barbell reverse grip incline bench press | El texto requiere banco a 45 grados; los cuadros no confirman esa inclinación y parecen representar banco plano o declinado. |
| flow-1317 | barbell reverse grip incline bench row | El título indica agarre inverso y el texto especifica prono; la posición de manos en el cuadro no resuelve esa diferencia. |
| flow-0083 | barbell rollerout from bench | El texto coloca las rodillas en el suelo y la barra en banco; los cuadros no confirman dónde se apoyan las rodillas durante el recorrido sobre el banco. |
| flow-0087 | barbell seated bradford rocky press | El original y los cuadros describen press de hombros convencional, sin confirmar la alternancia delante y detrás de la cabeza propia de Bradford. |
| flow-0089 | barbell seated close-grip concentration curl | El título exige agarre cerrado y el original pide ancho de hombros; la separación no se confirma con seguridad. |
| flow-0094 | barbell seated twist | Las instrucciones sostienen la barra delante del pecho; los cuadros la apoyan sobre la espalda alta. |
| flow-0096 | barbell side bent v. 2 | El texto mantiene la barra al frente; la ilustración la coloca detrás del cuello sobre los hombros. |
| flow-0099 | barbell single leg split squat | El original no confirma un apoyo elevado del pie trasero y los cuadros usan banco para ese pie. Revisar desplante frente a búlgara. |
| flow-2799 | barbell sitted alternate leg raise | Las instrucciones elevan una pierna extendida; los cuadros mantienen rodillas flexionadas con la barra sobre muslos. |
| flow-2800 | barbell sitted alternate leg raise (female) | El original eleva una pierna recta, mientras que la ilustración mantiene rodillas flexionadas y no muestra ese recorrido. |
| flow-0100 | barbell skier | El texto exige salto y tirón de barra hasta hombros; los cuadros balancean el cuerpo lateralmente con la barra abajo. |
| flow-0105 | barbell standing bradford press | El texto solo describe press vertical y no confirma el pase delante y detrás de la cabeza que distingue Bradford. |
| flow-2414 | barbell standing concentration curl | El texto especifica una barra en una mano; los cuadros parecen representar una mancuerna. Falta confirmar el equipo. |
| flow-0107 | barbell standing front raise over head | El original termina un poco por encima del hombro; los cuadros elevan hasta arriba de la cabeza. No se cambia la amplitud. |
| flow-0108 | barbell standing leg calf raise | El original eleva talones con ambos pies apoyados; los cuadros utilizan una sola pierna sobre una plataforma. |
| flow-0110 | barbell standing reverse grip curl | El título indica curl inverso, pero el texto especifica palmas hacia arriba. El agarre queda pendiente. |
| flow-0111 | barbell standing rocking leg calf raise | El texto solo eleva talones; la variante rocking y los cuadros sugieren balanceo adicional del apoyo, sin explicación suficiente. |
| flow-0112 | barbell standing twist | El original sostiene la barra delante del pecho; los cuadros la apoyan sobre la espalda. |
| flow-0129 | bench dip (knees bent) | El título y los cuadros flexionan rodillas; las instrucciones piden extender las piernas y apoyar talones. |
| flow-1399 | bench dip on floor | El texto apoya las manos en un banco; la ilustración apoya las manos directamente en el suelo. |
| flow-1770 | biceps leg concentration curl | El título y metadatos son peso corporal y la ilustración no confirma mancuerna; las instrucciones exigen una mancuerna en curl concentrado. |
| flow-0139 | biceps narrow pull-ups | El título y los cuadros estrechan el agarre; el original especifica ancho de hombros. La anchura de la variante debe confirmarse. |
| flow-0140 | biceps pull-up | El original especifica palmas hacia afuera, pero la orientación de manos de los cuadros no permite confirmar el agarre de esta variante para bíceps. |
| flow-3543 | bodyweight drop jump squat | El texto describe salto vertical con palmada sobre la cabeza; la imagen desciende desde un cajón hacia una sentadilla. |
| flow-3544 | bodyweight incline side plank | El original mantiene apoyo en antebrazo; los cuadros parecen pasar de antebrazo a mano y no definen qué inclinación distingue la variante. |
| flow-1769 | bodyweight side lying biceps curl | No se explica qué apoyo proporciona resistencia al curl con peso corporal acostado de lado; los cuadros no resuelven esa carga. |
| flow-3168 | bodyweight squatting row | El original requiere objeto estable o correas de suspensión; la imagen mueve las manos vacías sin ningún anclaje. |
| flow-3156 | bodyweight standing close-grip one arm row | El texto requiere mancuerna; la imagen y clasificación son peso corporal, sin mancuerna visible. |
| flow-3158 | bodyweight standing close-grip row | Las instrucciones requieren barra o agarres; los cuadros no muestran equipo ni punto de anclaje. |
| flow-3162 | bodyweight standing one arm row | El texto exige una mancuerna y la ilustración solo representa movimiento de una mano vacía. |
| flow-3161 | bodyweight standing one arm row (with towel) | El original y los cuadros no identifican qué anclaje o tensión de la toalla permite el remo con peso corporal. |
| flow-3166 | bodyweight standing row | Las instrucciones sujetan una barra y los cuadros muestran manos vacías. No se confirma el apoyo que produce resistencia. |
| flow-3165 | bodyweight standing row (with towel) | No queda definido un anclaje o resistencia para el remo de pie con toalla; no se inventa un punto de apoyo. |
| flow-1374 | box jump down with one leg stabilization | El original salta hacia el cajón y estabiliza arriba; la imagen desciende desde el cajón y recibe abajo. |
| flow-0149 | cable alternate triceps extension | El original coloca el brazo paralelo al suelo; la animación muestra extensión de tríceps por encima de la cabeza. |
| flow-3235 | cable assisted inverse leg curl | El original describe curl femoral acostado; la animación muestra movimiento de cadera de pie con asistencia de apoyo. |
| flow-0150 | cable bar lateral pulldown | La posición sentada descrita y la postura de apoyo representada no se distinguen con seguridad en los cuadros. |
| flow-0151 | cable bench press | El original describe press de pecho de pie; la animación muestra press acostado en banco plano. |
| flow-1630 | cable close grip curl | El título especifica agarre cerrado; el original pide ancho de hombros. Confirmar separación exacta antes de especificarla. |
| flow-1631 | cable concentration curl | El original describe curl concentrado sentado; la ilustración representa apoyo en rodilla con postura de desplante, sin asiento. |
| flow-0153 | cable cross-over lateral pulldown | El original describe tirón de pie a altura de hombros; la ilustración muestra tirón cruzado desde poleas altas con apoyo de rodillas. |
| flow-0158 | cable decline fly | Las instrucciones describen movimiento de pie, mientras que la animación muestra aperturas en banco declinado. |
| flow-0159 | cable decline seated wide-grip row | El título menciona declinación; ni las instrucciones ni los cuadros explican un banco declinado. No se puede confirmar esa variante. |
| flow-0160 | cable floor seated wide-grip row | El texto coloca la polea detrás del cuerpo, pero la animación muestra remo sentado frente a ella. |
| flow-0167 | cable high row (kneeling) | El original dirige una barra hacia el abdomen desde altura del pecho; los cuadros muestran tirón desde arriba hacia la nuca. |
| flow-1318 | cable incline bench row | El texto indica sentarse en el banco y flexionar cadera; la animación muestra apoyo del pecho boca abajo en banco inclinado. |
| flow-0176 | cable kneeling triceps extension | El texto coloca las manos junto a la cabeza, mientras que la ilustración muestra extensión de codos hacia abajo con los brazos junto al tronco. |
| flow-0178 | cable lateral raise | La ilustración parece mostrar una elevación frontal y el original especifica elevación lateral; no se cambia la trayectoria por el título. |
| flow-0182 | cable lying close-grip curl | El título dice agarre cerrado, pero el texto pide ancho de hombros; no se confirma la separación en los cuadros. |
| flow-0186 | cable lying triceps extension v. 2 | El texto especifica cuerda y otra orientación respecto a la máquina; la ilustración representa una barra y polea desde los pies. |
| flow-1262 | cable one arm decline chest fly | La dirección de inclinación del banco representado no confirma con seguridad la variante declinada del texto. |
| flow-1263 | cable one arm fly on exercise ball | El texto indica ejecución sentado erguido en la pelota; la imagen muestra el tronco apoyado boca abajo sobre ella. |
| flow-1264 | cable one arm incline fly on exercise ball | El original y la imagen combinan pelota y banco; falta confirmar la función de cada apoyo y la inclinación exacta. |
| flow-1266 | cable one arm incline press on exercise ball | Se combinan apoyo en pelota y respaldo inclinado; no se confirma con seguridad la variante precisa ni sus apoyos. |
| flow-1635 | cable one arm reverse preacher curl | El texto apoya el brazo en el muslo; los cuadros muestran un banco predicador. Falta resolver el apoyo de la variante. |
| flow-1637 | cable overhead curl on exercise ball | El título y texto dicen curl de bíceps; los cuadros parecen una extensión de tríceps sobre la cabeza. No se cambia el grupo de movimiento sin resolverlo. |
| flow-0196 | cable pull through (with rope) | El texto indica colocarse de frente a la máquina; los cuadros muestran extensión de cadera de espaldas a ella con el cable entre las piernas. |
| flow-1638 | cable pulldown bicep curl | El original denomina curl al movimiento pero indica llevar una barra alta hacia los muslos; la trayectoria no confirma el curl representado. |
| flow-0204 | cable rear drive | El texto mezcla brazos inmóviles y tracción con tríceps; la ilustración incluye giro de tronco y cambio de posición del brazo. Falta identificar la variante. |
| flow-0205 | cable rear pulldown | El texto dirige la barra al pecho; la animación muestra un jalón detrás de la cabeza. No se decide entre pecho y tras nuca. |
| flow-0206 | cable reverse curl | El título indica curl inverso, pero las instrucciones especifican palmas hacia arriba. El agarre debe resolverse antes de confirmar la variante. |
| flow-2406 | cable reverse grip triceps pushdown (sz-bar) (with arm blaster) | El texto especifica barra recta y la variante nombra barra SZ con soporte para brazos. Los accesorios no quedan confirmados de manera coherente. |
| flow-1725 | cable rope incline tricep extension | El texto habla de cuerda y postura de pie; los cuadros muestran apoyo en banco inclinado y un agarre que no confirma la cuerda. |
| flow-1640 | cable rope one arm hammer preacher curl | El título exige agarre martillo, pero el original especifica palmas hacia arriba. Confirmar el agarre con cuerda antes de aprobarlo. |
| flow-0214 | cable seated one arm alternate row | El texto pide alternar brazos, pero los cuadros muestran un único agarre y rotación del tronco. No se confirma cómo alterna la variante. |
| flow-1643 | cable seated overhead curl | El título indica curl sobre la cabeza; las instrucciones y los cuadros muestran curl sentado desde polea baja con los codos junto al cuerpo. |
| flow-0216 | cable seated shoulder internal rotation | El texto coloca el brazo extendido al frente; la ilustración muestra rotación con el codo flexionado junto al costado. |
| flow-0222 | cable side bend | El texto baja la mano hacia la rodilla, pero los cuadros muestran sujeción elevada junto a la cabeza. No se confirma el apoyo del brazo. |
| flow-0221 | cable side bend crunch (bosu ball) | El texto describe flexión lateral de pie sin BOSU; la ilustración muestra posición sentada sobre BOSU. |
| flow-0223 | cable side crunch | El original especifica polea baja; los cuadros muestran polea alta y mano junto a la cabeza. La altura modifica la trayectoria. |
| flow-0224 | cable standing back wrist curl | El título indica muñecas detrás del cuerpo, pero texto e ilustración sitúan la barra al frente. Falta resolver posición y flexión/extensión. |
| flow-0229 | cable standing inner curl | El título especifica variante interna, pero texto y cuadros solo describen curl unilateral convencional; falta identificar la diferencia. |
| flow-0231 | cable standing one arm triceps extension | El original sitúa el brazo paralelo al suelo y los cuadros lo elevan sobre la cabeza. No se confirma la posición del hombro. |
| flow-0232 | cable standing pulldown (with rope) | El texto mezcla brazos extendidos con contracción de bíceps y llegada a los muslos; la imagen flexiona los codos hacia arriba. Movimiento sin resolver. |
| flow-0235 | cable standing shoulder external rotation | El original pide brazo extendido al frente; los cuadros muestran codo flexionado junto al costado. No se confirma el ángulo de rotación externa. |
| flow-0240 | cable supine reverse fly | El título dice supino y la animación muestra boca arriba; las instrucciones dicen boca abajo. Debe resolverse la postura. |
| flow-2464 | cable thibaudeau kayak row | La ficha y los cuadros muestran remo unilateral sentado desde polea baja. La demostración primaria de Thibaudeau/John Meadows usa tirón diagonal desde arriba de pie; no se puede confirmar que esta animación sea remo kayak. Propuesta sin aprobar: Remo tipo kayak en polea. |
| flow-0242 | cable tuck reverse crunch | El texto sujeta el cable con las manos por encima del pecho; la animación lo conecta a los tobillos. No se confirma la disposición de la carga. |
| flow-0862 | cable twist (up-down) | El título y cuadros indican diagonal de arriba hacia abajo; el texto solo describe rotación horizontal del tronco. |
| flow-1270 | cable upper chest crossovers | El título indica trayectoria hacia el pecho superior, pero no queda respaldada por texto y cuadros, que representan un cruce hacia abajo. |
| flow-1325 | cable wide grip rear pulldown behind neck | El original lleva la barra al pecho y el título y los cuadros la llevan tras nuca; no se intercambian esas trayectorias. |
| flow-1377 | calf stretch with hands against wall | La flexión de rodillas indicada en el texto no puede confirmarse en el apoyo posterior de la ilustración. |
| flow-1378 | calf stretch with rope | El texto realiza el estiramiento de pie junto a una pared; la ilustración lo realiza sentado en el suelo con correa. |
| flow-0248 | cambered bar lying row | El original describe remo boca abajo con barra curva; la imagen representa press de banca boca arriba con barra curva. |
| flow-2462 | chest dip on straight bar | El original usa barras paralelas y la imagen una sola barra recta delante del tronco. No se equiparan ambos apoyos. |
| flow-1272 | chest stretch with exercise ball | El texto sostiene una pelota sentado al frente; la imagen apoya la espalda sobre la pelota y abre los brazos. |
| flow-0253 | chin-ups (narrow parallel grip) | El título indica agarres paralelos y el original palmas hacia el cuerpo. No se confunde neutro con supino. |
| flow-0257 | circles knee stretch | Las instrucciones realizan círculos de rodillas de pie; la ilustración mueve una cadera en cuatro apoyos. |
| flow-1327 | close grip chin-up | El título chin-up indica supino y las instrucciones prono; los cuadros no resuelven con seguridad la orientación de las manos. |
| flow-2398 | close-grip push-up (on knees) | El título especifica agarre cerrado y el original ancho de hombros. Falta resolver la separación de manos. |
| flow-3016 | curl-up | El texto coloca ambas rodillas flexionadas y manos tras la cabeza; la imagen extiende una pierna y apoya manos bajo la zona lumbar. |
| flow-2331 | cycle cross trainer | El texto menciona asiento y pedaleo; la ilustración representa elíptica de pie, sin asiento. No se confirma bicicleta frente a elíptica. |
| flow-1275 | drop push up | Las instrucciones bajan las rodillas al suelo; la animación deja caer las manos desde plataformas y mantiene apoyo en pies. |
| flow-0290 | dumbbell bench seated press | El texto inclina el cuerpo hacia atrás para llevar carga junto al pecho; la ilustración mantiene el tronco erguido en press de hombros. |
| flow-0291 | dumbbell bench squat | El texto deja la mancuerna en el suelo al frente sin explicar cómo sujetarla; los cuadros la sostienen al pecho durante la sentadilla al banco. |
| flow-1654 | dumbbell biceps curl reverse | El título indica curl inverso y el texto palmas hacia el frente; el agarre de la animación no confirma una variante prona. |
| flow-1655 | dumbbell biceps curl squat | El original solo explica curl de pie; la animación incorpora sentadilla. No se confirma la combinación completa. |
| flow-1656 | dumbbell biceps curl v sit on bosu ball | El texto mantiene pies apoyados y rodillas a 90 grados; los cuadros elevan los pies en posición en V sobre BOSU. |
| flow-1731 | dumbbell close grip press | Las instrucciones llevan las mancuernas al pecho y la imagen las eleva sobre la cabeza sentado. No se confirma press de banca frente a press vertical. |
| flow-0296 | dumbbell close-grip press | El texto dirige la carga hacia el pecho y los cuadros la elevan sobre la cabeza sentado; el tipo de press queda sin resolver. |
| flow-3635 | dumbbell contralateral forward lunge | El título contralateral requiere aclarar la carga respecto a la pierna de trabajo; texto e imagen utilizan dos mancuernas sin definir esa diferencia. |
| flow-0299 | dumbbell cuban press | El texto solo gira muñecas después de un press; los cuadros incluyen rotación externa de hombro con brazos elevados. No se confirma la secuencia de press cubano. |
| flow-2136 | dumbbell cuban press v. 2 | El original no explica la rotación externa que distingue el press cubano y que sí aparece en los cuadros. |
| flow-0305 | dumbbell decline shrug | El título dice declinado, pero los cuadros colocan la cabeza por encima de las caderas en banco inclinado. La orientación no queda confirmada. |
| flow-0311 | dumbbell full can lateral raise | Full can depende de orientación de pulgares y plano del hombro; el texto solo indica brazos a los lados y los cuadros no confirman el plano escapular. |
| flow-0313 | dumbbell hammer curl | El título y los cuadros indican martillo, pero el texto ordena girar las palmas al frente. No se corrige el agarre por sustitución. |
| flow-0312 | dumbbell hammer curl v. 2 | El texto gira palmas hacia el frente y el título martillo exige agarre neutro. No se decide el agarre solo por el título. |
| flow-2402 | dumbbell hammer curls (with arm blaster) | La variante martillo con soporte para brazos contradice el giro de palmas al frente que indican las instrucciones. |
| flow-1664 | dumbbell high curl | El nombre high curl no define una diferencia de altura o apoyo frente al curl convencional mostrado. Variante alta sin confirmar. |
| flow-1618 | dumbbell incline hammer press on exercise ball | El título exige inclinación; texto y cuadros apoyan espalda sobre pelota con el tronco casi horizontal, sin definir una inclinación. |
| flow-0322 | dumbbell incline inner biceps curl | El texto conserva palmas enfrentadas; los cuadros parecen rotar a supino y el título no aclara qué significa inner. Agarre y variante sin resolver. |
| flow-1280 | dumbbell incline one arm fly on exercise ball | La variante indica inclinación, pero el texto y cuadros solo definen apoyo sobre pelota con el tronco horizontal. |
| flow-1620 | dumbbell incline one arm hammer press on exercise ball | El título indica inclinación y la imagen realiza press unilateral con el tronco horizontal sobre pelota. El texto no aporta el ángulo. |
| flow-1282 | dumbbell incline one arm press on exercise ball | El nombre exige inclinación y los cuadros y texto describen apoyo horizontal de espalda sobre pelota, sin precisar inclinación. |
| flow-1283 | dumbbell incline press on exercise ball | La inclinación del título no se encuentra definida en las instrucciones ni confirmada en el apoyo sobre pelota de los cuadros. |
| flow-0337 | dumbbell lying extension (across face) | El texto sujeta una mancuerna con ambas manos y la baja detrás de la cabeza; la imagen usa una mano y cruza delante de la cara. |
| flow-0339 | dumbbell lying femoral | El original coloca carga sobre abdomen y flexiona rodillas hacia glúteos boca arriba; los cuadros no explican cómo carga un curl femoral. Movimiento sin identificar. |
| flow-2705 | dumbbell lying pronation on floor | El título indica pronación de antebrazo, pero las instrucciones y cuadros elevan el brazo completo desde posición boca abajo. Eje de movimiento sin resolver. |
| flow-0353 | dumbbell one arm concentration curl (on stability ball) | El dibujo está incompleto y no muestra con claridad la pelota o el apoyo sentado; no permite confirmar el equipo de esta variante. |
| flow-1736 | dumbbell one arm french press on exercise ball | El título indica press francés de tríceps; texto y cuadros parecen press de hombro desde altura del hombro, sin describir flexión detrás de la cabeza. |
| flow-1291 | dumbbell one arm pullover on exercise ball | El original mantiene posición sentada sobre la pelota y no explica la transición a la postura acostada que muestran los cuadros para el pullover. |
| flow-1622 | dumbbell one arm reverse grip press | La expresión palma hacia el cuerpo no distingue con seguridad supino y neutro a altura del hombro, ni se resuelve claramente en los cuadros. |
| flow-1414 | dumbbell one arm reverse preacher curl | El título exige curl inverso y el texto usa supino; debe confirmarse el agarre antes de nombrarlo prono. |
| flow-1667 | dumbbell one arm reverse spider curl | El título dice curl araña, pero texto y cuadros realizan curl de pie sin banco ni apoyo del pecho. |
| flow-1415 | dumbbell one arm seated neutral wrist curl | El título exige muñeca con agarre neutro; las instrucciones indican palma hacia arriba. Agarre y eje de movimiento sin resolver. |
| flow-1672 | dumbbell one arm zottman preacher curl | El texto comienza en supino y vuelve a girar a supino arriba, sin explicar la bajada prona propia del Zottman; los cuadros no resuelven esa fase. |
| flow-1292 | dumbbell one leg fly on exercise ball | El original indica sentado en la pelota y los cuadros apoyan la espalda acostada en ella. Posición del tronco sin resolver. |
| flow-0365 | dumbbell over bench neutral wrist curl | El título especifica agarre neutro y el texto palmas hacia arriba; la ilustración no resuelve con seguridad el eje de muñeca. |
| flow-0366 | dumbbell over bench one arm neutral wrist curl | El texto combina palma arriba con muñeca neutra y no permite distinguir flexión de muñeca de desviación con agarre neutro. |
| flow-0367 | dumbbell over bench one arm wrist curl | Las instrucciones colocan la palma hacia abajo y la ilustración parece supina; debe confirmarse flexión frente a extensión de muñeca. |
| flow-1623 | dumbbell palms in incline bench press | El título y la imagen indican agarre neutro; el texto gira a palmas hacia el frente arriba. No se confirma si la variante mantiene el agarre o lo rota. |
| flow-0370 | dumbbell peacher hammer curl | El título martillo y la imagen contrastan con el giro a palmas hacia el frente que exigen las instrucciones. |
| flow-0371 | dumbbell plyo squat | El original alterna los pies delante y detrás en el salto; la ilustración salta con los pies paralelos. No se confirma sentadilla frente a desplante con salto. |
| flow-0373 | dumbbell pronate-grip triceps extension | El título exige agarre prono y la ilustración no permite confirmar ese agarre en la mancuerna sostenida con ambas manos sobre la cabeza. |
| flow-1624 | dumbbell reverse bench press | El título indica agarre inverso y las instrucciones prono con palmas hacia los pies. No se confirma el agarre supino de la variante. |
| flow-1330 | dumbbell reverse grip incline bench one arm row | El texto llama inverso a un agarre con palma hacia abajo; no queda definido qué orientación diferencia esta variante unilateral. |
| flow-0384 | dumbbell reverse preacher curl | El título indica predicador inverso, pero las instrucciones usan agarre supino y los cuadros no resuelven la discrepancia. |
| flow-1675 | dumbbell reverse spider curl | El título dice curl araña; texto y cuadros lo hacen de pie sin apoyo de pecho en banco. |
| flow-2397 | dumbbell scott press | El texto describe un press de hombros con extensión completa y los cuadros no confirman la trayectoria específica del press Scott. |
| flow-0397 | dumbbell seated neutral wrist curl | El nombre indica muñeca y el texto dice flexionarla, pero los cuadros realizan curl de codos con agarre martillo. |
| flow-1679 | dumbbell seated one arm bicep curl on exercise ball with leg raised | El título e imagen levantan una pierna; el original exige mantener ambos pies apoyados. El apoyo de equilibrio debe resolverse. |
| flow-1381 | dumbbell seated one leg calf raise - palm up | El texto pide mantener una pierna elevada y a la vez empujar con la punta de ese pie; no se identifica con seguridad qué pie aporta el apoyo de la elevación de talón. |
| flow-0403 | dumbbell seated revers grip concentration curl | El título indica curl concentrado inverso y las instrucciones palma hacia arriba; el agarre sigue sin confirmarse. |
| flow-0404 | dumbbell seated shoulder press (parallel grip) | El título exige agarre paralelo y texto e imagen parecen palmas al frente. Falta confirmar neutro frente a prono. |
| flow-2805 | dumbbell single leg deadlift with stepbox support | Las instrucciones indican mantener el pie trasero apoyado en el banco; la animación lo despega y extiende hacia atrás. No se confirma la variante con apoyo. |
| flow-2321 | dumbbell standing inner biceps curl v. 2 | La etiqueta afirma énfasis interno, pero el texto describe un curl supino convencional y la animación no define una trayectoria diferenciada. Falta justificar la variante 2. |
| flow-0427 | dumbbell standing palms in press | El título y el texto piden agarre neutro; los cuadros cambian a palmas al frente. No se confirma un press neutro durante todo el recorrido. |
| flow-0429 | dumbbell standing reverse curl | La etiqueta indica curl inverso, pero las instrucciones describen palmas hacia el cuerpo y no especifican mantener pronación; la ilustración no resuelve el agarre con certeza. |
| flow-0434 | dumbbell straight leg deadlift | El título dice piernas rectas y el texto pide mantener rodillas ligeramente flexionadas. Debe precisarse si es peso muerto de piernas rígidas o rumano. |
| flow-2808 | dumbbell sumo pull through | El título dice pull-through, pero los cuadros muestran una sentadilla sumo con tirón alto y las instrucciones no describen ese tirón. No coincide la trayectoria. |
| flow-2803 | dumbbell supported squat | La etiqueta dice sentadilla con apoyo, pero ni instrucciones ni cuadros identifican un apoyo externo. Falta definir la variante. |
| flow-0436 | dumbbell tate press | Se etiqueta Tate press acostado, pero los cuadros muestran un press sentado sobre la cabeza. Movimiento y postura incompatibles. |
| flow-5201 | dumbbell waiter biceps curl | Se etiqueta curl de mesero, pero texto e imágenes muestran dos mancuernas con agarre supino convencional, sin el sostén de una sola mancuerna propio de ese nombre. |
| flow-1772 | elbow lift - reverse push-up | La etiqueta dice elevación de codos y flexión inversa, pero los cuadros muestran extensión de tronco boca abajo con apoyo de manos. Falta identificar el ejercicio de origen. |
| flow-1332 | exercise ball alternating arm ups | El texto indica elevación alterna hacia el hombro; los cuadros mezclan flexión de codo y elevación lateral. No se define el movimiento de brazos. |
| flow-1338 | exercise ball hug | Las instrucciones piden sentarse y abrazar la misma pelota; los cuadros muestran una segunda pelota como asiento. No se puede definir el montaje con seguridad. |
| flow-1382 | exercise ball on the wall calf raise | Las instrucciones sitúan la pelota detrás de la espalda y las imágenes delante del abdomen contra la pared. No coincide la orientación del apoyo. |
| flow-3241 | exercise ball on the wall calf raise (tennis ball between ankles) | Se exige pelota de tenis entre tobillos, pero ese accesorio no se distingue y la posición de la pelota grande contradice el texto. |
| flow-3240 | exercise ball on the wall calf raise (tennis ball between knees) | El texto coloca la pelota detrás de la espalda; los cuadros la sitúan frente al abdomen y no permiten confirmar la pelota de tenis entre rodillas. |
| flow-1560 | exercise ball seated hamstring stretch | Se etiqueta estiramiento de isquiotibiales, pero el texto y la animación muestran desplazamiento a puente con la espalda sobre pelota. Falta confirmar el objetivo y la variante. |
| flow-1745 | exercise ball seated triceps stretch | La etiqueta dice estiramiento, pero el texto y los cuadros muestran extensión de tríceps con mancuerna. Requiere resolver si es ejercicio cargado o estiramiento. |
| flow-1746 | exercise ball supine triceps extension | El título dice acostado boca arriba; texto e imágenes muestran extensión sobre la cabeza sentado sobre la pelota. Posturas incompatibles. |
| flow-1748 | ez bar lying close grip triceps extension behind head | Las instrucciones indican palmas hacia arriba en una extensión acostada, pero las imágenes no permiten confirmar ese agarre específico. Falta resolver la orientación de manos. |
| flow-0445 | ez barbell anti gravity press | La etiqueta press antigravedad no identifica una variante: texto y animación muestran press de hombros convencional de pie con barra Z. Requiere confirmar la denominación de origen. |
| flow-0450 | ez barbell jm bench press | Se etiqueta press JM, pero el texto baja la barra al pecho y los cuadros no muestran con claridad la combinación de flexión de codos propia de esa variante. No se confirma frente a press cerrado. |
| flow-0458 | floor fly (with barbell) | Las aperturas requieren separar las manos; el texto y el dibujo sostienen una barra rígida con ambas manos. La trayectoria lateral descrita es incompatible con el equipo. |
| flow-3296 | front lever | El front lever requiere brazos extendidos; la ilustración final muestra codos flexionados y el texto no explica esa diferencia. Falta confirmar la variante. |
| flow-3315 | full maltese | La etiqueta full Maltese corresponde a un apoyo de calistenia, pero instrucciones e ilustración muestran inclinación de tronco de pie. No se confirma el ejercicio nombrado. |
| flow-0466 | gironda sternum chin | El título especifica dominada al esternón de Gironda, pero las instrucciones dicen barbilla sobre barra y la animación es vertical sin llevar el pecho a la barra. No se confirma esa variante. |
| flow-1764 | hanging leg hip raise | Las instrucciones dicen flexionar las rodillas hasta que los muslos queden paralelos; los cuadros terminan con piernas extendidas al frente. Falta distinguir elevación de rodillas de piernas. |
| flow-3289 | impossible dips | El título dice impossible dips, pero la animación y el texto solo muestran fondos convencionales en paralelas. No se identifica la variante especial. |
| flow-0490 | incline close-grip push-up | La etiqueta pide agarre cerrado y el texto coloca las manos más anchas que los hombros. Debe precisarse la separación antes de nombrar la variante. |
| flow-3011 | incline scapula push up | La etiqueta pide flexión escapular, pero las instrucciones describen flexionar los codos y acercar el pecho al banco. Los cuadros no separan el movimiento escapular del de codos. |
| flow-0501 | jack burpee | El título jack-burpee implica un componente jack que no aparece en las instrucciones ni en los tres cuadros disponibles. Solo se confirma la parte inicial de un burpee. |
| flow-0524 | kettlebell bent press | La etiqueta bent press no queda confirmada: las instrucciones empiezan presionando sobre la cabeza y los cuadros muestran un molino con el brazo ya extendido. |
| flow-0526 | kettlebell double alternating hang clean | El título dice cargadas alternas, pero instrucciones e imágenes muestran ambas pesas subiendo juntas. No se confirma la alternancia. |
| flow-0530 | kettlebell double windmill | El título dice molino doble, pero texto e imágenes muestran una sola pesa rusa. No se confirma la segunda carga. |
| flow-0531 | kettlebell extended range one arm press on floor | La etiqueta pide press de recorrido extendido en el suelo, pero las instrucciones exigen mantener el codo bloqueado. Los cuadros no resuelven si es press o apertura. |
| flow-0552 | kettlebell two arm clean | Se etiqueta cargada a dos brazos y el texto dice ambas manos, pero los cuadros muestran una sola mano sujetando la pesa. No se confirma el agarre de la variante. |
| flow-3239 | kneeling plank tap shoulder (male) | La variante indica apoyo de rodillas, pero el texto pide apoyarse en las puntas de los pies. Los cuadros muestran rodillas en el suelo; debe corregirse la contradicción. |
| flow-3211 | kneeling push-up (male) | La etiqueta y la animación son flexiones con rodillas apoyadas; las instrucciones piden apoyo sobre los pies. Falta resolver la colocación inicial. |
| flow-3288 | korean dips | El título indica fondos coreanos, pero los cuadros y el texto muestran fondos convencionales en paralelas. No aparece apoyo posterior en una barra. |
| flow-0572 | lever assisted chin-up | El título especifica dominada supina asistida, pero las instrucciones indican agarre prono y el dibujo no permite resolver la orientación de las manos. |
| flow-0574 | lever bent over row | La etiqueta y el equipo dicen máquina de palanca, pero texto y animación muestran remo con barra libre. Falta confirmar el equipo correcto. |
| flow-1253 | lever donkey calf raise | El título dice elevación de pantorrilla tipo burro; los cuadros muestran torso erguido en máquina de pie y no el apoyo con cadera flexionada de esa variante. |
| flow-0580 | lever gripless shrug | La etiqueta indica encogimientos sin agarre, pero las instrucciones exigen sujetar las asas y los cuadros no aclaran un apoyo que evite agarrarlas. |
| flow-1439 | lever gripless shrug v. 2 | La variante vuelve a indicar sin agarre, mientras el texto pide sujetar las barras. No se puede confirmar cómo se transmite la carga. |
| flow-2286 | lever hip extension v. 2 | Se etiqueta extensión de cadera, pero el texto y las imágenes muestran empuje sentado con extensión de rodillas. Requiere identificar la máquina y el movimiento. |
| flow-0582 | lever kneeling leg curl | El título indica curl de rodillas, pero los cuadros y el texto muestran el tronco acostado en banco. No se confirma la postura arrodillada. |
| flow-3195 | lever lying two-one leg curl | La etiqueta pide subir con dos piernas y bajar con una; las instrucciones no incluyen la fase unilateral y los cuadros muestran dos piernas. Falta verificar esa secuencia. |
| flow-2736 | lever reverse grip lateral pulldown | El título indica agarre inverso, pero el texto exige prono y los cuadros no confirman supinación. Falta resolver el agarre antes de nombrarlo. |
| flow-1616 | lever reverse grip preacher curl | La etiqueta especifica curl inverso, pero las instrucciones exigen agarre supino. Los cuadros no resuelven la orientación del agarre. |
| flow-0595 | lever seated crunch (chest pad) | El título y los cuadros sitúan el apoyo delante del pecho y flexión hacia delante; las instrucciones dicen apoyar la espalda e inclinarse hacia atrás. Debe resolverse la ejecución. |
| flow-0599 | lever seated leg curl | El título y el texto indican curl femoral sentado, pero los cuadros elevan las piernas hacia la extensión. Falta confirmar la dirección de trabajo de la máquina. |
| flow-1351 | lever t-bar reverse grip row | El título especifica agarre inverso y las instrucciones piden prono. Los cuadros no confirman el agarre supino. |
| flow-1313 | lever unilateral row | El título dice remo unilateral; las instrucciones y los cuadros muestran tracción con ambas manos. No se confirma la ejecución a un brazo. |
| flow-0609 | london bridge | La etiqueta London bridge no permite identificar esta variante con certeza: solo se muestra una tracción con cuerda anclada arriba y el texto no define el apoyo ni el desplazamiento propios del nombre. |
| flow-1303 | medicine ball chest push from 3 point stance | El título indica empuje de pecho con balón desde tres apoyos, pero los cuadros muestran una flexión unilateral con mano sobre el balón y el texto termina empujando el balón. Falta definir si se lanza o se usa como apoyo. |
| flow-1750 | medicine ball supine chest throw | El texto sitúa el lanzamiento acostado en el suelo y los cuadros sobre un banco. El apoyo modifica el montaje y debe precisarse. |
| flow-0627 | mixed grip chin-up | Se etiqueta agarre mixto, pero las instrucciones piden ambas manos en supinación y el dibujo no permite comprobar una mano en cada orientación. |
| flow-0636 | olympic barbell hammer curl | Se etiqueta curl martillo, pero una barra recta sujeta con ambas manos no permite el agarre neutro de martillo. Texto y dibujo muestran otra orientación. |
| flow-0651 | pull up (neutral grip) | Se exige agarre neutro, pero la imagen presenta una barra recta y manos sin orientación neutral identificable. Falta confirmar asas paralelas o el agarre real. |
| flow-1307 | push up on bosu ball | El texto pide BOSU con base plana arriba, pero los cuadros muestran manos sobre la cúpula. No se confirma la orientación del equipo. |
| flow-0653 | push-up (bosu ball) | Las instrucciones sitúan la base plana del BOSU arriba; las imágenes muestran la cúpula arriba. Debe precisarse el apoyo. |
| flow-0670 | rear pull-up | Se etiqueta dominada posterior, pero las instrucciones indican barbilla sobre barra y la vista trasera no permite confirmar un recorrido por detrás de la cabeza. |
| flow-1582 | reclining big toe pose with rope | El título y el texto son estiramiento acostado con cuerda en el pie; la animación muestra extensión de cadera de rodillas sin cuerda. Parece material visual cruzado. |
| flow-3236 | resistance band hip thrusts on knees (female) | El título y el texto indican hip thrust de rodillas con banda, pero las imágenes muestran estiramiento acostado con banda en un pie. Parece material visual cruzado. |
| flow-3007 | resistance band leg extension | Se etiqueta extensión de rodilla con banda, pero el texto pide pierna recta desde el inicio y la imagen eleva el muslo al frente. Falta distinguir flexión de cadera de extensión de rodilla. |
| flow-3122 | resistance band seated shoulder press | El texto y el título son press de hombros; los cuadros muestran remo sentado con banda bajo los pies. Movimiento incompatible. |
| flow-3144 | resistance band seated straight back row | El texto describe remo sentado con banda bajo los pies; las imágenes muestran abducción de cadera sentado en silla. Material visual incompatible. |
| flow-2571 | rocking frog stretch | El título y las instrucciones son estiramiento de rana; los cuadros son plancha invertida con pierna elevada. Material visual incompatible. |
| flow-2204 | roller body saw | La etiqueta y el texto describen plancha con rodillo, pero los cuadros muestran apoyo en anillas. Equipo y movimiento incompatibles. |
| flow-2205 | roller hip lat stretch | La etiqueta indica estiramiento lateral de cadera, pero texto e imágenes muestran desplazamiento frontal de rodillas con manos en rodillo. No se confirma qué variante de estiramiento representa. |
| flow-2207 | roller side lat stretch | El título dice estiramiento lateral de dorsales, pero texto e imágenes se flexionan al frente sin componente lateral. Falta confirmar la variante. |
| flow-0684 | run (equipment) | Los cuadros muestran carrera en caminadora; el equipo y las instrucciones dicen carrera sin aparato. Falta confirmar el equipo de esta ficha. |
| flow-3012 | scapula dips | La etiqueta fondos escapulares y los cuadros con manos en paralelas no coinciden con las instrucciones de pie inclinado con manos colgando. Debe corregirse el apoyo. |
| flow-1766 | self assisted inverse leg curl | La etiqueta indica curl inverso autoasistido sin equipo, pero texto e imágenes son curl femoral en máquina. Falta identificar la ficha correcta. |
| flow-0696 | self assisted inverse leg curl (on floor) | El texto exige mantener la cadera elevada mientras se flexionan rodillas; los cuadros mantienen la espalda y cadera acostadas. No se confirma el apoyo del curl. |
| flow-0727 | single leg calf raise (on a dumbbell) | El título indica sobre una mancuerna y el texto solo sostenerla. Los cuadros no permiten confirmar si el pie pisa la mancuerna o el suelo. |
| flow-0741 | sled closer hack squat | La etiqueta dice postura cerrada en hack, pero las instrucciones piden pies al ancho de hombros y el dibujo no confirma una separación menor. |
| flow-0747 | smith behind neck press | El texto sitúa el press tras nuca de pie, pero la animación lo muestra sentado. Debe precisarse la postura de esta variante. |
| flow-0750 | smith chair squat | La etiqueta chair squat sugiere una variante específica, pero ni texto ni imagen muestran silla o delimitan la colocación adelantada de pies. Falta confirmar qué la diferencia de una sentadilla Smith. |
| flow-0758 | smith incline reverse-grip press | La etiqueta especifica agarre inverso y el texto exige prono. Los cuadros no confirman supinación. |
| flow-0759 | smith incline shoulder raises | La etiqueta dice elevación de hombros inclinada, pero no hay banco ni inclinación corporal en texto o imagen; se muestra tracción vertical con codos flexionados. Falta identificar la variante. |
| flow-0760 | smith leg press | La imagen muestra empuje sentado contra la barra con los pies; las instrucciones describen plataforma y respaldo de prensa convencional. Falta confirmar el montaje en Smith. |
| flow-1626 | smith machine reverse decline close grip bench press | La etiqueta exige press declinado inverso con agarre cerrado, pero las instrucciones no especifican supinación y la animación no permite resolverla. |
| flow-0761 | smith narrow row | Se etiqueta remo cerrado en Smith; el texto describe una máquina con respaldo y asas, mientras la imagen se sienta en el suelo frente a una barra guiada. Montajes incompatibles. |
| flow-1393 | smith one leg floor calf raise | El texto coloca la barra sobre las piernas justo encima de los tobillos, pero la ilustración la sostiene sobre los hombros. No coincide el apoyo de la carga. |
| flow-0762 | smith rear delt row | El texto de remo indica apoyo de pecho en máquina y el dibujo muestra a la persona sentada bajo una Smith sin ese apoyo. Falta precisar el montaje. |
| flow-0763 | smith reverse calf raises | La etiqueta dice elevación inversa de pantorrilla o de puntas, pero texto y cuadros elevan talones. Falta distinguir dorsiflexión de flexión plantar. |
| flow-1394 | smith reverse calf raises | La etiqueta dice elevación inversa y las instrucciones e imágenes elevan talones. No se confirma la variante de puntas elevadas. |
| flow-0764 | smith reverse-grip press | La etiqueta dice agarre inverso y el texto pide prono; además el texto describe press de pecho y los cuadros muestran press sobre la cabeza. Movimiento y agarre sin resolver. |
| flow-0771 | smith standing back wrist curl | La etiqueta y el dibujo sitúan la barra detrás del cuerpo, pero las instrucciones la llevan hacia delante. No coincide la colocación del curl de muñeca. |
| flow-1396 | smith toe raise | La etiqueta toe raise indica elevar puntas, pero texto e imagen elevan talones. Falta resolver si trabaja dorsiflexión o flexión plantar. |
| flow-3291 | stalder press | El título Stalder press no se confirma: las instrucciones describen sentadilla con empuje y los cuadros solo muestran descenso en cuclillas, sin inversión ni apoyo final sobre manos. |
| flow-0788 | standing behind neck press | El texto y el equipo indican barra libre tras nuca, pero los tres cuadros muestran una Smith. Falta confirmar el equipo de la variante. |
| flow-3314 | straddle maltese | Se etiqueta Maltese con piernas abiertas, pero las instrucciones describen bajar desde suspensión y los cuadros terminan en apoyo con cadera flexionada. No se confirma el sostén horizontal Maltese. |
| flow-1753 | three bench dip | La etiqueta dice tres bancos, pero el texto y los cuadros muestran un solo banco con pies en el suelo. No se confirma esa variante. |
| flow-0815 | triceps dips floor | El título especifica fondos en el suelo, pero las instrucciones y los cuadros sitúan las manos en un banco. Falta resolver el apoyo. |
| flow-0816 | triceps press | Se etiqueta press de tríceps sin equipo, pero el texto solo flexiona codos de pie y los cuadros añaden flexión de rodillas sin resistencia. No permite identificar un ejercicio de tríceps preciso. |

El registro completo, incluidos títulos confirmados sin cambios, alias y huellas de evidencia, está en [es-MX.title-review.json](../data/localization/es-MX.title-review.json).
