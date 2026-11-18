# Investigación de dificultad, tipo y acción

Catálogo: `47778a9dcb80da73`. 1257 ejercicios activos. Revisión del 18 de noviembre de 2026.

## Alcance y método

Se consultaron fuentes primarias de NSCA, ACE, NASM, HPRC y World Gymnastics para definir familias de movimiento y criterios de clasificación. Se aplicó una rúbrica editorial a cada registro mediante su nombre original, terminología revisada y evidencia de identificación previa. No se consultaron 1,257 páginas externas ni se verificó de nuevo individualmente toda la técnica de las animaciones. Las propuestas por familia son inferencias y se identifican como tales. Los campos originales conocidos y las correcciones documentadas de la fase 5 tienen prioridad; esta ampliación solo completa vacíos.

Dificultad significa complejidad técnica orientativa con ejecución controlada. La rúbrica considera apoyo externo, estabilidad, coordinación unilateral, velocidad e integración de movimientos. No equivale a carga, esfuerzo, seguridad individual ni recomendación clínica. Las fuentes no usan una escala universal: por eso una referencia de familia no certifica cada variante.

Tipo distingue compuesto, aislamiento e isométrico. Acción distingue empuje, tracción, estática y mixta. Mixta describe tareas que combinan direcciones o fases cíclicas. No aplica queda reservado para tareas como automasaje; no es un reemplazo de unknown. Son extensiones explícitas del contrato y el visor las traduce al español.

## Cobertura medida

| Campo | Vacíos antes | Vacíos después | Original o revisión previa | Estimación editorial | Provisional por identidad |
| --- | ---: | ---: | ---: | ---: | ---: |
| difficulty | 1081 | 0 | 176 | 783 | 298 |
| mechanic | 989 | 0 | 268 | 686 | 303 |
| force | 636 | 0 | 621 | 451 | 185 |

Se cubren 60 familias. 346 fichas conservan conflictos de identificación: las nuevas especificaciones de esas fichas llevan status=provisional-identity. Completar metadatos no aprueba sus nombres, traducciones ni instrucciones.

## Trazabilidad y límites

data/metadata-research.es-MX.json contiene las propuestas, criterios, referencias y hashes originales por ID. data/catalog-quality.es-MX.json contiene únicamente los cambios aplicados. Cada campo nuevo de la API expone metadataReview con basis=research-family-estimate, status, family, criteria y sources. La ficha muestra clasificación orientativa, el aviso provisional cuando corresponde y enlaces a las fuentes.

Las observaciones previas por ID prevalecen frente a nombres engañosos. flow-0339 y flow-1338 conservan explícitamente sus conflictos: sus propuestas describen el movimiento representado, sin confirmar el nombre ni su eficacia. También se separaron planchas móviles de sostenidas, movilidad dinámica de estiramiento estático, remos de deltoide de aperturas y sentadillas con agarre clean de cargadas.

## Fuentes consultadas

- [nsca-complexity](https://www.nsca.com/contentassets/3d09f06f0b4c4f6fbd8cc382ed1f3d4a/ptq-10.2.1-progressive-strategies-for-teaching-fundamental-resistance-training-movement-patterns.pdf): Framework for technical complexity and progression; not per-variant difficulty ratings.
- [ace-joints](https://www.acefitness.org/fitness-certifications/ace-answers/exam-preparation-blog/2929/what-is-the-kinetic-chain/): Single-joint and multi-joint classification terminology.
- [hprc-actions](https://www.hprc-online.org/physical-fitness/training-performance/choosing-right-exercises-optimize-your-resistance-training): Definitions of push, pull and exercise categories; mixed/static are explicit catalog extensions.
- [ace-curl](https://www.acefitness.org/resources/everyone/exercise-library/184/seated-biceps-curl/): Supported machine biceps curl reference; variants are editorial inferences.
- [ace-plank](https://www.acefitness.org/resources/everyone/exercise-library/32/front-plank/): Front plank reference; other core variants are not individually certified.
- [ace-press](https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/): Supported seated machine chest press reference.
- [ace-clean-press](https://www.acefitness.org/resources/everyone/exercise-library/383/clean-and-press/): Kettlebell clean-and-press reference: advanced, integrated movement.
- [ace-swing](https://www.acefitness.org/resources/everyone/exercise-library/391/swing/): Two-hand kettlebell swing reference: intermediate.
- [ace-leg-extension](https://www.acefitness.org/resources/everyone/exercise-library/133/standing-leg-extension/): Knee extension and effects of support, resistance and unstable surfaces.
- [nasm-leg-curl](https://www.nasm.org/resource-center/exercise-library/seated-leg-curl): Seated knee-flexion reference; does not resolve dataset animation conflicts.
- [nasm-progression](https://www.nasm.org/resource-center/blog/training/strength-training-routines-beginners): Stability, coordination and unilateral progression principles.
- [nasm-isometric](https://www.nasm.org/resource-center/exercise-library/plank): Isometric core activity; not a rating for every static hold.
- [ace-stretch-types](https://www.acefitness.org/fitness-certifications/ace-answers/exam-preparation-blog/2966/types-of-stretching/): Distinction between sustained static stretching and continuous dynamic mobility.
- [fig-elements](https://www.gymnastics.sport/site/pages/disciplines/ele-aer.php): Gymnastics distinguishes static strength supports/planches from dynamic strength and balance elements.

## Registro de los ejercicios

| ID | Nombre visible | Dificultad | Tipo | Acción | Familia investigada | Estado de los campos nuevos |
| --- | --- | --- | --- | --- | --- | --- |
| 3_4_Sit-Up | Incorporaciones de tronco con recorrido de tres cuartos | beginner | compound | pull | crunch | source-or-prior-review |
| Air_Bike | Abdominales bicicleta | beginner | compound | pull | bicycle-core | source-or-prior-review |
| Alternate_Heel_Touchers | Toques alternos de talones | beginner | isolation | pull | crunch | source-or-prior-review |
| Ankle_Circles | Círculos de tobillos | beginner | isolation | pull | arm-leg-circles | source-or-prior-review |
| Balance_Board | Equilibrio sobre tabla inestable | beginner | compound | static | balance | editorial-estimate |
| Band_Assisted_Pull-Up | Dominadas asistidas con banda | beginner | compound | pull | vertical-pull | source-or-prior-review |
| Barbell_Curl | Curl de bíceps con barra | beginner | isolation | pull | curl-arm | source-or-prior-review |
| Barbell_Deadlift | Peso muerto convencional | intermediate | compound | pull | hinge | source-or-prior-review |
| Barbell_Full_Squat | Sentadilla profunda con barra | intermediate | compound | push | squat | source-or-prior-review |
| Barbell_Glute_Bridge | Puente de glúteos con barra | intermediate | compound | push | hip-bridge | source-or-prior-review |
| Barbell_Guillotine_Bench_Press | Press de banca guillotina con barra | intermediate | compound | push | press | source-or-prior-review |
| Barbell_Hack_Squat | Sentadilla hack con barra | intermediate | compound | push | squat | source-or-prior-review |
| Barbell_Incline_Shoulder_Raise | Elevación escapular con barra en banco inclinado | beginner | compound | push | scapular-protraction | source-or-prior-review |
| Barbell_Lunge | Desplante con barra | intermediate | compound | push | lunge-step | source-or-prior-review |
| Barbell_Rear_Delt_Row | Remo para deltoides posteriores con barra | beginner | compound | pull | row | source-or-prior-review |
| Barbell_Seated_Calf_Raise | Elevación de talones sentado con barra | beginner | isolation | push | calf | source-or-prior-review |
| Barbell_Shrug | Encogimiento de hombros con barra | beginner | isolation | pull | shrug | source-or-prior-review |
| Barbell_Side_Split_Squat | Desplante lateral con barra | beginner | compound | push | squat | source-or-prior-review |
| Battling_Ropes | Ondas con cuerdas de batalla | beginner | compound | push | ballistic-full-body | source-or-prior-review |
| Behind_Head_Chest_Stretch | Estiramiento de pecho con las manos detrás de la cabeza | expert | isolation | static | static-stretch | source-or-prior-review |
| Body-Up | Extensión de tríceps con peso corporal desde antebrazos | intermediate | isolation | push | triceps | source-or-prior-review |
| Bottoms_Up | Elevación de piernas y cadera | beginner | compound | pull | crunch | source-or-prior-review |
| Butt-Ups | Elevación de cadera desde plancha | beginner | compound | pull | crunch | source-or-prior-review |
| Cable_Hip_Adduction | Aducción de cadera en polea | beginner | isolation | pull | hip-isolation | source-or-prior-review |
| Cable_Incline_Pushdown | Jalón con brazos extendidos en banco inclinado y polea | beginner | isolation | pull | pullover | source-or-prior-review |
| Cable_Incline_Triceps_Extension | Extensión de tríceps en banco inclinado en polea | beginner | isolation | push | triceps | source-or-prior-review |
| Cable_Judo_Flip | Giro de judo en polea | beginner | compound | pull | rotational-core | source-or-prior-review |
| Cable_Preacher_Curl | Curl predicador en polea | beginner | isolation | pull | curl-arm | source-or-prior-review |
| Cable_Reverse_Crunch | Crunch inverso en polea | beginner | isolation | pull | crunch | source-or-prior-review |
| Cable_Seated_Crunch | Crunch abdominal sentado en polea | beginner | isolation | pull | crunch | source-or-prior-review |
| Cable_Shoulder_Press | Press de hombros en polea | beginner | compound | push | press | source-or-prior-review |
| Cable_Wrist_Curl | Flexión de muñecas en polea baja con agarre supino | beginner | isolation | pull | wrist-flexion | source-or-prior-review |
| Chair_Leg_Extended_Stretch | Estiramiento de pierna extendida con apoyo en silla | beginner | isolation | static | static-stretch | source-or-prior-review |
| Chest_And_Front_Of_Shoulder_Stretch | Estiramiento de pecho y parte anterior del hombro | beginner | isolation | static | static-stretch | source-or-prior-review |
| Chin-Up | Dominadas con agarre supino | beginner | compound | pull | vertical-pull | source-or-prior-review |
| Clock_Push-Up | Flexiones de brazos con desplazamiento en reloj | intermediate | compound | push | push-up | source-or-prior-review |
| Cocoons | Encogimiento abdominal con flexión de piernas y tronco | beginner | compound | pull | crunch | source-or-prior-review |
| Cross-Body_Crunch | Crunch cruzado | beginner | compound | pull | crunch | source-or-prior-review |
| Crunch_-_Hands_Overhead | Crunch abdominal con brazos por encima de la cabeza | beginner | isolation | pull | crunch | source-or-prior-review |
| Dead_Bug | Extensión alterna de brazo y pierna contrarios (dead bug) | beginner | compound | pull | crunch | source-or-prior-review |
| Decline_Crunch | Crunch abdominal en banco declinado | intermediate | isolation | pull | crunch | source-or-prior-review |
| Decline_Push-Up | Flexiones de brazos con pies elevados | beginner | compound | push | push-up | source-or-prior-review |
| Dumbbell_Bench_Press | Press de banca con mancuernas | beginner | compound | push | press | source-or-prior-review |
| Dumbbell_Clean | Cargada con mancuernas | intermediate | compound | pull | clean | source-or-prior-review |
| Dumbbell_Incline_Row | Remo en banco inclinado con mancuernas | beginner | compound | pull | row | source-or-prior-review |
| Dumbbell_Incline_Shoulder_Raise | Elevación escapular con mancuernas en banco inclinado | beginner | isolation | push | scapular-protraction | source-or-prior-review |
| Dumbbell_Lying_One-Arm_Rear_Lateral_Raise | Elevaciones para deltoides posteriores a un brazo acostado con mancuernas | intermediate | isolation | pull | rear-shoulder | source-or-prior-review |
| Dumbbell_Lying_Pronation | Pronación de antebrazo acostado con mancuerna | intermediate | isolation | pull | forearm-rotation | source-or-prior-review |
| Dumbbell_Lying_Rear_Lateral_Raise | Aperturas inversas con mancuernas boca abajo en banco | intermediate | isolation | pull | rear-shoulder | source-or-prior-review |
| Dumbbell_Lying_Supination | Supinación de antebrazo acostado con mancuerna | intermediate | isolation | pull | forearm-rotation | source-or-prior-review |
| Dumbbell_One-Arm_Shoulder_Press | Press de hombros a un brazo con mancuernas | intermediate | compound | push | press | source-or-prior-review |
| Dumbbell_One-Arm_Upright_Row | Remo al mentón a un brazo con mancuernas | intermediate | compound | pull | row | source-or-prior-review |
| Dumbbell_Prone_Incline_Curl | Curl araña con mancuernas en banco inclinado | intermediate | isolation | pull | curl-arm | source-or-prior-review |
| Dumbbell_Raise | Elevaciones con mancuernas | beginner | compound | pull | shoulder-raise | source-or-prior-review |
| Dumbbell_Rear_Lunge | Desplante hacia atrás con mancuernas | intermediate | compound | push | lunge-step | source-or-prior-review |
| Dumbbell_Seated_One-Leg_Calf_Raise | Elevación de talones a una pierna sentado con mancuernas | beginner | isolation | push | calf | source-or-prior-review |
| Dumbbell_Shrug | Encogimientos de hombros con mancuernas | beginner | isolation | pull | shrug | source-or-prior-review |
| Dumbbell_Side_Bend | Flexión lateral de tronco con mancuernas | beginner | isolation | pull | side-bend | source-or-prior-review |
| Dumbbell_Squat | Sentadilla con mancuernas | beginner | compound | push | squat | source-or-prior-review |
| Elbow_to_Knee | Crunch cruzado de codo a rodilla | beginner | compound | pull | bicycle-core | source-or-prior-review |
| Finger_Curls | Flexión de dedos con barra | beginner | isolation | pull | wrist-flexion | source-or-prior-review |
| Flutter_Kicks | Patadas alternas boca abajo en banco | beginner | compound | pull | leg-raise | source-or-prior-review |
| Frankenstein_Squat | Sentadilla frontal con brazos extendidos (Frankenstein) | intermediate | compound | push | squat | source-or-prior-review |
| Glute_Ham_Raise | Elevación de glúteos e isquiotibiales en banco GHD | intermediate | compound | pull | hinge | source-or-prior-review |
| Hamstring_Stretch | Estiramiento de isquiotibiales con correa | beginner | isolation | static | static-stretch | source-or-prior-review |
| Hanging_Leg_Raise | Elevación de piernas colgado en barra | expert | isolation | pull | leg-raise | source-or-prior-review |
| Hanging_Pike | Elevación de piernas hacia la barra | expert | compound | pull | leg-raise | source-or-prior-review |
| Inchworm | Caminata de manos y pies (gusano) | beginner | compound | mixed | body-crawl | editorial-estimate |
| Incline_Push-Up | Flexiones de brazos con manos elevadas | beginner | compound | push | push-up | source-or-prior-review |
| Incline_Push-Up_Depth_Jump | Flexiones con salto entre apoyos y pies elevados | beginner | compound | push | jump | source-or-prior-review |
| Intermediate_Hip_Flexor_and_Quad_Stretch | Estiramiento de flexores de cadera y cuádriceps con correa | intermediate | compound | static | static-stretch | source-or-prior-review |
| Inverted_Row | Remo invertido | beginner | compound | pull | row | source-or-prior-review |
| Inverted_Row_with_Straps | Remo invertido en suspensión | beginner | compound | pull | row | source-or-prior-review |
| Isometric_Wipers | Flexiones de brazos con desplazamiento lateral | beginner | compound | push | push-up | source-or-prior-review |
| Jackknife_Sit-Up | Abdominales en V con brazos y piernas extendidos | beginner | compound | pull | crunch | source-or-prior-review |
| Janda_Sit-Up | Incorporaciones de tronco con contracción de glúteos (Janda) | beginner | isolation | pull | crunch | source-or-prior-review |
| Kettlebell_Arnold_Press | Press Arnold con pesa rusa | intermediate | compound | push | press | source-or-prior-review |
| Kettlebell_Figure_8 | Pase de pesa rusa en ocho entre las piernas | intermediate | compound | pull | kettlebell-transfer | editorial-estimate |
| Kettlebell_Hang_Clean | Cargada con pesa rusa desde suspensión | intermediate | compound | pull | clean | source-or-prior-review |
| Kettlebell_Pistol_Squat | Sentadilla a una pierna con pesa rusa (pistol) | expert | compound | push | squat | source-or-prior-review |
| Kettlebell_Seated_Press | Press con pesa rusa sentado en el suelo | intermediate | compound | push | press | source-or-prior-review |
| Kettlebell_Seesaw_Press | Press alterno con pesas rusas | intermediate | compound | push | press | source-or-prior-review |
| Kettlebell_Sumo_High_Pull | Jalón alto en postura sumo con pesa rusa | intermediate | compound | pull | kettlebell-transfer | source-or-prior-review |
| Kettlebell_Thruster | Sentadilla con press de pesas rusas (thruster) | intermediate | compound | push | integrated-lifts | source-or-prior-review |
| Kettlebell_Turkish_Get-Up_Squat_style | Levantamiento turco con pesa rusa, variante con sentadilla | intermediate | compound | push | squat | source-or-prior-review |
| Kettlebell_Windmill | Molino con pesa rusa | intermediate | compound | pull | hinge | source-or-prior-review |
| Leg-Up_Hamstring_Stretch | Estiramiento de isquiotibiales con pierna elevada | beginner | isolation | push | static-stretch | source-or-prior-review |
| Lower_Back_Curl | Flexión de espalda baja | beginner | isolation | static | back-extension | provisional-identity |
| Medicine_Ball_Chest_Pass | Pase de pecho con balón medicinal | beginner | compound | push | ballistic-full-body | source-or-prior-review |
| Monster_Walk | Caminata lateral con banda elástica | beginner | compound | pull | adduction-band-walk | source-or-prior-review |
| Muscle_Up | Dominada con transición a fondo (muscle-up) | intermediate | compound | pull | advanced-integrated-skill | source-or-prior-review |
| One_Arm_Against_Wall | Estiramiento de pecho con un brazo contra la pared | beginner | isolation | static | static-stretch | source-or-prior-review |
| One_Arm_Chin-Up | Dominada a un brazo con agarre supino | expert | compound | pull | vertical-pull | source-or-prior-review |
| Otis-Up | Incorporación de tronco con carga elevada (Otis-up) | beginner | compound | pull | crunch | source-or-prior-review |
| Pelvic_Tilt_Into_Bridge | Basculación pélvica con puente de glúteos | intermediate | compound | static | hip-bridge | source-or-prior-review |
| Peroneals_Stretch | Estiramiento de peroneos | intermediate | isolation | static | static-stretch | provisional-identity |
| Plyo_Push-up | Flexiones de brazos pliométricas | beginner | compound | push | jump | source-or-prior-review |
| Posterior_Tibialis_Stretch | Estiramiento del tibial posterior | intermediate | isolation | static | static-stretch | provisional-identity |
| Power_Clean | Cargada de potencia con barra | intermediate | compound | pull | clean | source-or-prior-review |
| Push_Up_to_Side_Plank | Flexión de brazos con transición a plancha lateral | beginner | compound | push | mixed-combination | source-or-prior-review |
| Reverse_Crunch | Crunch inverso | beginner | isolation | pull | crunch | source-or-prior-review |
| Ring_Dips | Fondos en anillas | intermediate | compound | push | dip | source-or-prior-review |
| Rope_Climb | Trepa de cuerda | intermediate | compound | pull | vertical-pull | source-or-prior-review |
| Russian_Twist | Giros rusos | intermediate | compound | pull | rotational-core | source-or-prior-review |
| Scapular_Pull-Up | Dominadas escapulares | beginner | isolation | pull | shrug | source-or-prior-review |
| Side-Lying_Floor_Stretch | Estiramiento de tronco acostado de lado | beginner | isolation | static | static-stretch | provisional-identity |
| Single-Arm_Push-Up | Flexiones de brazos a un brazo | intermediate | compound | push | push-up | source-or-prior-review |
| Smith_Single-Leg_Split_Squat | Sentadilla búlgara en máquina Smith | beginner | compound | push | squat | source-or-prior-review |
| Snatch_Pull | Tirón de arranque con barra | intermediate | compound | pull | integrated-lifts | source-or-prior-review |
| Spell_Caster | Giros diagonales de tronco con mancuernas | beginner | compound | pull | rotational-core | source-or-prior-review |
| Split_Squats | Desplantes estáticos | intermediate | compound | push | squat | provisional-identity |
| Squat_Jerk | Envión con recepción en sentadilla | expert | compound | push | integrated-lifts | source-or-prior-review |
| Standing_Lateral_Stretch | Estiramiento lateral de pie | beginner | isolation | static | static-stretch | editorial-estimate |
| Standing_Pelvic_Tilt | Basculación pélvica de pie | beginner | isolation | static | hip-bridge | source-or-prior-review |
| Suspended_Push-Up | Flexiones de brazos en suspensión | beginner | compound | push | push-up | source-or-prior-review |
| Suspended_Reverse_Crunch | Crunch inverso en suspensión | beginner | isolation | pull | crunch | source-or-prior-review |
| Suspended_Row | Remo en suspensión | beginner | compound | pull | row | source-or-prior-review |
| Suspended_Split_Squat | Desplante con pie trasero en suspensión | intermediate | compound | push | squat | source-or-prior-review |
| Tire_Flip | Volteo de llanta | intermediate | compound | pull | integrated-lifts | source-or-prior-review |
| Trap_Bar_Deadlift | Peso muerto con barra hexagonal | beginner | compound | pull | hinge | source-or-prior-review |
| Triceps_Stretch | Estiramiento de tríceps | beginner | isolation | static | static-stretch | source-or-prior-review |
| Tuck_Crunch | Crunch con rodillas flexionadas hacia el pecho | beginner | isolation | pull | crunch | source-or-prior-review |
| flow-0002 | Flexión lateral del tronco a 45° | beginner | isolation | mixed | side-bend | provisional-identity |
| flow-1512 | Estiramiento de cuádriceps en cuatro apoyos | beginner | isolation | static | static-stretch | provisional-identity |
| flow-0007 | Jalón al pecho alterno sentado en poleas | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-3293 | Dominadas arquero | expert | compound | pull | vertical-pull | editorial-estimate |
| flow-3294 | Flexiones arquero | expert | compound | push | push-up | editorial-estimate |
| flow-2355 | Elevación de rodillas colgado en barra | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-2333 | Elevación de piernas extendidas colgado en barra (ilustración 2) | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-3214 | Flexión de tronco a una pierna con alcance hacia el pie | beginner | compound | mixed | rotational-mobility | editorial-estimate |
| flow-3204 | Incorporaciones completas de tronco con brazos extendidos sobre la cabeza | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0009 | Fondos para pecho asistidos en máquina con apoyo de rodillas | beginner | compound | push | dip | editorial-estimate |
| flow-0011 | Elevación de rodillas colgado en barra con asistencia | intermediate | isolation | pull | leg-raise | provisional-identity |
| flow-0010 | Elevación de rodillas colgado con impulso asistido hacia abajo | intermediate | compound | mixed | ballistic-full-body | provisional-identity |
| flow-1708 | Estiramiento de pantorrillas en tumbado asistido | beginner | isolation | static | static-stretch | provisional-identity |
| flow-1709 | Estiramiento de glúteos asistido en tumbado. | beginner | isolation | static | static-stretch | provisional-identity |
| flow-1710 | Estiramiento asistido de glúteos y piriformes en decúbito supino | beginner | isolation | static | static-stretch | provisional-identity |
| flow-0012 | Elevación de piernas acostado con empuje lateral asistido | intermediate | compound | mixed | ballistic-full-body | provisional-identity |
| flow-0013 | Elevación de piernas acostado con empuje asistido hacia abajo | intermediate | compound | mixed | ballistic-full-body | provisional-identity |
| flow-0014 | Giros rusos con asistencia | intermediate | compound | mixed | rotational-core | provisional-identity |
| flow-0015 | Dominadas asistidas en máquina con agarre neutro cerrado | beginner | compound | pull | vertical-pull | editorial-estimate |
| flow-0016 | Estiramiento asistido de isquiotibiales boca abajo | beginner | isolation | static | static-stretch | provisional-identity |
| flow-1713 | Estiramiento de cuádriceps boca abajo con ayuda de la mano | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-1714 | Estiramiento del recto femoral boca abajo con ayuda de la mano | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-0017 | Dominadas asistidas en máquina con agarre prono | beginner | compound | pull | vertical-pull | editorial-estimate |
| flow-1716 | Estiramiento asistido del pectoral mayor sentado con balón de estabilidad | intermediate | isolation | static | static-stretch | provisional-identity |
| flow-1712 | Estiramiento de aductores en decúbito lateral asistido | beginner | isolation | static | static-stretch | provisional-identity |
| flow-1758 | Incorporaciones de tronco con los pies sujetos | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1431 | Dominadas con agarre supino de pie asistido | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-1432 | Dominadas asistidas en máquina con apoyo de pies | beginner | compound | pull | vertical-pull | editorial-estimate |
| flow-0018 | Extensión de tríceps sobre la cabeza con toalla | beginner | isolation | push | triceps | editorial-estimate |
| flow-0019 | Fondos para tríceps asistidos en máquina con apoyo de rodillas | beginner | compound | push | triceps | editorial-estimate |
| flow-2364 | Fondos para pecho asistidos en máquina con agarre amplio y apoyo de rodillas | beginner | compound | push | dip | editorial-estimate |
| flow-3220 | Saltos con apertura de piernas | intermediate | compound | push | jump | editorial-estimate |
| flow-3672 | Paso hacia adelante y hacia atrás | intermediate | compound | push | lunge-step | provisional-identity |
| flow-1314 | Extensión de espalda sobre pelota de estabilidad | intermediate | isolation | pull | back-extension | editorial-estimate |
| flow-3297 | Plancha dorsal en suspensión (back lever) | expert | isometric | static | advanced-static-skill | provisional-identity |
| flow-1405 | Estiramiento de pecho con brazos hacia atrás | beginner | isolation | static | static-stretch | provisional-identity |
| flow-1473 | Salto hacia atrás | intermediate | compound | push | jump | editorial-estimate |
| flow-0968 | Curl de bíceps alterno con banda elástica | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-0969 | Abdominales en V alternos con banda elástica | intermediate | isolation | pull | crunch | editorial-estimate |
| flow-0971 | Extensión con rueda abdominal y asistencia de banda | intermediate | compound | pull | ab-wheel | provisional-identity |
| flow-1254 | Press de banca con banda elástica | beginner | compound | push | press | editorial-estimate |
| flow-0980 | Extensión de cadera con el tronco inclinado con banda elástica | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-0972 | Crunch bicicleta con banda elástica | beginner | compound | mixed | bicycle-core | provisional-identity |
| flow-0974 | Jalón dorsal con agarre cerrado con banda elástica | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0975 | Flexiones de brazos con agarre cerrado con banda elástica | intermediate | compound | push | push-up | editorial-estimate |
| flow-0976 | Curl concentrado con banda elástica | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-3117 | Jalón sentado con banda elástica, agarre cerrado y tronco erguido | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-3116 | Jalón con banda de pie, agarre supino y tronco erguido | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0977 | Elevación frontal con banda elástica | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0978 | Elevaciones frontales con banda elástica | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-1408 | Puente de glúteos con banda alrededor de las rodillas | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-0979 | Press Pallof horizontal con banda | intermediate | isometric | static | pallof | editorial-estimate |
| flow-0981 | Abdominales en V con banda elástica | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0983 | Jalón dorsal a un brazo de rodillas con banda elástica | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0985 | Rotación de tronco de rodillas con banda elástica | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-0984 | Rotación interna de cadera acostado con banda elástica | intermediate | isolation | mixed | hip-rotation | provisional-identity |
| flow-1002 | Elevación de piernas extendidas acostado con banda elástica | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-0986 | Curl de bíceps a un brazo por encima de la cabeza con banda elástica | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-0987 | Sentadilla con pies en posición dividida a un brazo a una pierna con banda elástica | intermediate | compound | push | squat | provisional-identity |
| flow-0988 | Remo bajo a un brazo de pie con banda elástica | intermediate | compound | pull | row | editorial-estimate |
| flow-0989 | Press de pecho a un brazo con giro de tronco y banda elástica | intermediate | compound | push | press | editorial-estimate |
| flow-0990 | Remo a un brazo sentado con giro de tronco y banda elástica | intermediate | compound | pull | row | editorial-estimate |
| flow-0991 | Extensión de cadera con banda entre las piernas (pull-through) | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0992 | Incorporaciones de tronco con empuje de banda | beginner | isolation | pull | crunch | provisional-identity |
| flow-0993 | Aperturas inversas con banda elástica | beginner | isolation | pull | rear-shoulder | provisional-identity |
| flow-0994 | Extensión de muñecas con banda elástica | beginner | isolation | push | wrist-extension | editorial-estimate |
| flow-0996 | Rotación interna de cadera sentado con banda elástica | intermediate | isolation | mixed | hip-rotation | provisional-identity |
| flow-1011 | Giros de tronco sentado con banda | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-0997 | Press de hombros con banda elástica | beginner | compound | push | press | editorial-estimate |
| flow-1018 | Encogimiento de hombros con banda elástica | beginner | isolation | pull | shrug | editorial-estimate |
| flow-0998 | Extensión de tríceps lateral con banda | beginner | isolation | push | triceps | provisional-identity |
| flow-0999 | Elevación de talones a una pierna con banda elástica | intermediate | isolation | push | calf | editorial-estimate |
| flow-1000 | Elevación de puntas a una pierna con banda elástica | intermediate | isolation | pull | reverse-calf | provisional-identity |
| flow-1001 | Sentadilla con pies en posición dividida a una pierna con banda elástica | intermediate | compound | push | squat | provisional-identity |
| flow-1004 | Sentadilla con banda elástica | intermediate | compound | push | squat | provisional-identity |
| flow-1003 | Sentadilla con remo y banda elástica | intermediate | compound | mixed | mixed-combination | provisional-identity |
| flow-1005 | Crunch abdominal de pie con banda elástica | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1022 | Remo para deltoides posteriores de pie con banda elástica | beginner | compound | pull | row | provisional-identity |
| flow-1007 | Crunch abdominal de pie con rotación con banda elástica | intermediate | compound | mixed | rotational-core | provisional-identity |
| flow-1008 | Subida al banco con banda elástica | intermediate | compound | push | lunge-step | provisional-identity |
| flow-1009 | Peso muerto con piernas rígidas con banda elástica | intermediate | compound | pull | hinge | provisional-identity |
| flow-1023 | Peso muerto con banda elástica, piernas semirrígidas y espalda recta | intermediate | compound | pull | hinge | editorial-estimate |
| flow-1010 | Peso muerto con piernas extendidas con banda elástica | intermediate | compound | pull | hinge | editorial-estimate |
| flow-1012 | Press por encima de la cabeza con rotación con banda elástica | intermediate | compound | push | press | provisional-identity |
| flow-1369 | Elevación de talones con ambos pies sobre banda elástica (variante 2) | beginner | isolation | push | calf | editorial-estimate |
| flow-1013 | Jalón dorsal con agarre supino con banda elástica | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-1014 | Abdominales en V con banda elástica (ilustración 2) | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1015 | Press Pallof vertical con banda | intermediate | isometric | static | pallof | provisional-identity |
| flow-1016 | Flexión de muñecas con banda elástica | beginner | isolation | pull | wrist-flexion | provisional-identity |
| flow-1017 | Elevaciones de brazos en Y con banda | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0023 | Curl de bíceps alterno con barra | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-0024 | Sentadilla frontal al banco con barra | intermediate | compound | push | squat | editorial-estimate |
| flow-0025 | Press de banca con barra | beginner | compound | push | press | editorial-estimate |
| flow-0026 | Sentadilla con barra al banco | intermediate | compound | push | squat | editorial-estimate |
| flow-1316 | Pullover con barra y codos flexionados en banco plano | intermediate | compound | pull | pullover | source-or-prior-review |
| flow-0027 | Remo inclinado con barra | beginner | compound | pull | row | source-or-prior-review |
| flow-2407 | Curl de bíceps con barra y soporte para brazos | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0028 | Cargada y press con barra | expert | compound | push | integrated-lifts | editorial-estimate |
| flow-0029 | Sentadilla frontal con agarre de cargada | intermediate | compound | push | squat | editorial-estimate |
| flow-0030 | Press de banca con agarre cerrado con barra | beginner | compound | push | press | source-or-prior-review |
| flow-0033 | Press de banca declinado con barra | beginner | compound | push | press | source-or-prior-review |
| flow-0034 | Pullover con barra y codos flexionados en banco declinado | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0035 | Extensión de tríceps en banco declinado con barra y agarre cerrado | beginner | compound | push | press | editorial-estimate |
| flow-1255 | Pullover (extensión de hombros) en banco declinado con barra | beginner | isolation | pull | pullover | provisional-identity |
| flow-0036 | Press declinado con barra y agarre amplio | beginner | compound | push | press | editorial-estimate |
| flow-0037 | Pullover (extensión de hombros) con agarre amplio en banco declinado con barra | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0038 | Curl de arrastre con barra | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1370 | Elevación de talones en el suelo con barra | beginner | isolation | push | calf | provisional-identity |
| flow-0039 | Sentadilla frontal con barra apoyada en el pecho | intermediate | compound | push | squat | editorial-estimate |
| flow-0041 | Elevaciones frontales con barra | beginner | isolation | push | shoulder-raise | provisional-identity |
| flow-0040 | Elevación frontal y pullover con barra | beginner | isolation | pull | shoulder-raise | provisional-identity |
| flow-0042 | Sentadilla frontal con barra | intermediate | compound | push | squat | editorial-estimate |
| flow-1461 | Sentadilla profunda con barra (vista posterior) | intermediate | compound | push | squat | editorial-estimate |
| flow-1462 | Sentadilla profunda con barra (vista lateral) | intermediate | compound | push | squat | editorial-estimate |
| flow-1545 | Sentadilla Zercher profunda con barra | intermediate | compound | push | squat | editorial-estimate |
| flow-3562 | Puente de glúteos en banco con ambas piernas con barra | beginner | compound | push | hip-bridge | provisional-identity |
| flow-0044 | Buenos días con barra | intermediate | compound | pull | hinge | editorial-estimate |
| flow-1436 | Sentadilla con barra alta en la espalda | intermediate | compound | push | squat | editorial-estimate |
| flow-0047 | Press de banca inclinado con barra | beginner | compound | push | press | editorial-estimate |
| flow-1719 | Press de banca inclinado con barra y agarre cerrado | beginner | compound | push | press | editorial-estimate |
| flow-0048 | Press inclinado con barra y agarre supino | beginner | compound | push | press | editorial-estimate |
| flow-0049 | Remo con barra y pecho apoyado en banco inclinado | beginner | compound | pull | row | editorial-estimate |
| flow-0051 | Sentadilla Jefferson con barra | intermediate | compound | push | squat | provisional-identity |
| flow-0052 | Press JM con barra | beginner | compound | push | press | provisional-identity |
| flow-0053 | Sentadilla con salto y barra | intermediate | compound | push | jump | editorial-estimate |
| flow-1410 | Desplante lateral con barra (ilustración 2) | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-1435 | Sentadilla con barra baja en la espalda | intermediate | compound | push | squat | editorial-estimate |
| flow-1720 | Extensión de tríceps acostado con barra detrás de la cabeza | beginner | isolation | push | triceps | editorial-estimate |
| flow-0055 | Press de banca con barra y agarre cerrado | beginner | compound | push | press | editorial-estimate |
| flow-0056 | Press francés acostado con barra y agarre cerrado | beginner | isolation | push | triceps | editorial-estimate |
| flow-0057 | Extensión de tríceps acostado con barra | beginner | isolation | push | triceps | editorial-estimate |
| flow-0058 | Puente de glúteos con barra acostado en el suelo | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-0059 | Curl predicador acostado con barra | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0061 | Extensión de tríceps acostado con barra (ilustración 2) | beginner | isolation | push | triceps | editorial-estimate |
| flow-0060 | Press francés acostado con barra | beginner | isolation | push | triceps | editorial-estimate |
| flow-0063 | Sentadilla con postura cerrada con barra | intermediate | compound | push | squat | provisional-identity |
| flow-0064 | Remo a un brazo con el tronco inclinado con barra | intermediate | compound | pull | row | provisional-identity |
| flow-0065 | Press a un brazo con barra en el suelo | intermediate | compound | push | press | provisional-identity |
| flow-0066 | Peso muerto lateral con barra a un brazo | intermediate | compound | pull | hinge | provisional-identity |
| flow-0067 | Arranque con barra a un brazo | expert | compound | mixed | integrated-lifts | editorial-estimate |
| flow-0068 | Sentadilla a una pierna con barra | expert | compound | push | squat | source-or-prior-review |
| flow-0069 | Sentadilla con barra sobre la cabeza | intermediate | compound | push | squat | editorial-estimate |
| flow-1411 | Flexión de muñecas con apoyo en banco con palmas hacia abajo con barra | beginner | isolation | pull | wrist-flexion | provisional-identity |
| flow-1412 | Flexión de muñecas con barra y antebrazos apoyados en banco | beginner | isolation | pull | wrist-flexion | source-or-prior-review |
| flow-3017 | Remo Pendlay con barra | beginner | compound | pull | row | editorial-estimate |
| flow-1751 | Press con barra desde soportes de seguridad | beginner | compound | push | press | provisional-identity |
| flow-0070 | Curl predicador con barra | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0071 | Incorporación de tronco con press de barra | beginner | compound | push | press | provisional-identity |
| flow-0072 | Curl araña con barra en banco inclinado | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0073 | Pullover con barra en banco plano | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0022 | Pullover con transición a press con barra | beginner | isolation | pull | pullover | provisional-identity |
| flow-0074 | Peso muerto parcial con barra desde soportes (rack pull) | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0075 | Elevaciones para deltoides posteriores con barra | beginner | isolation | pull | rear-shoulder | provisional-identity |
| flow-0078 | Desplante posterior con barra | intermediate | compound | push | lunge-step | provisional-identity |
| flow-0077 | Desplante hacia atrás con barra (variante 2) | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-0079 | Extensión de muñecas con barra (variante 2) | beginner | isolation | push | wrist-extension | editorial-estimate |
| flow-2187 | Press de banca con barra, agarre cerrado y supino | beginner | compound | push | press | editorial-estimate |
| flow-0080 | Curl de bíceps con agarre prono con barra | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-0118 | Remo con agarre inverso con el tronco inclinado con barra | beginner | compound | pull | row | provisional-identity |
| flow-1256 | Press de banca declinado con barra y agarre supino | beginner | compound | push | press | editorial-estimate |
| flow-1257 | Press de banca con agarre inverso en banco inclinado con barra | beginner | compound | push | press | provisional-identity |
| flow-1317 | Remo en banco inclinado con agarre inverso con barra | beginner | compound | pull | row | provisional-identity |
| flow-1721 | Press francés con barra y agarre supino | beginner | isolation | push | triceps | editorial-estimate |
| flow-0081 | Curl predicador con agarre prono con barra | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0082 | Extensión de muñecas con barra | beginner | isolation | push | wrist-extension | editorial-estimate |
| flow-0084 | Extensión abdominal con barra rodante | intermediate | compound | pull | ab-wheel | editorial-estimate |
| flow-0083 | Extensión abdominal con barra rodante desde banco | intermediate | compound | pull | ab-wheel | provisional-identity |
| flow-0085 | Peso muerto rumano con barra | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0086 | Press militar tras nuca sentado con barra | beginner | compound | push | press | editorial-estimate |
| flow-0087 | Press Bradford sentado con barra | beginner | compound | push | press | provisional-identity |
| flow-1371 | Elevación de talones sentado con barra (ilustración 2) | beginner | isolation | push | calf | source-or-prior-review |
| flow-1718 | Extensión de tríceps sobre la cabeza sentado con barra y agarre cerrado | beginner | isolation | push | triceps | editorial-estimate |
| flow-0089 | Curl concentrado con agarre cerrado sentado con barra | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0090 | Buenos días sentado con barra | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0091 | Press de hombros sentado con barra | beginner | compound | push | press | editorial-estimate |
| flow-0092 | Extensión de tríceps sobre la cabeza sentado con barra | beginner | isolation | push | triceps | editorial-estimate |
| flow-0094 | Giros de tronco sentado con barra | intermediate | compound | mixed | rotational-core | provisional-identity |
| flow-0096 | Flexión lateral de tronco con barra (variante 2) | beginner | isolation | mixed | side-bend | provisional-identity |
| flow-0097 | Desplante lateral con barra (variante 2) | intermediate | compound | push | squat | editorial-estimate |
| flow-1756 | Peso muerto a una pierna con barra | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0099 | Sentadilla con pies en posición dividida a una pierna con barra | intermediate | compound | push | squat | provisional-identity |
| flow-2799 | Elevación de piernas alterno sentado con barra | intermediate | isolation | pull | leg-raise | provisional-identity |
| flow-2800 | Elevación de piernas alterno sentado con barra (ilustración 2) | intermediate | isolation | pull | leg-raise | provisional-identity |
| flow-0100 | Balanceo de barra tipo esquiador | beginner | compound | mixed | dynamic-cardio | provisional-identity |
| flow-0101 | Sentadilla rápida con barra | intermediate | compound | push | squat | editorial-estimate |
| flow-2810 | Desplante con barra (variante 2) | intermediate | compound | push | squat | editorial-estimate |
| flow-0102 | Sentadilla de rodillas con barra | intermediate | compound | push | squat | editorial-estimate |
| flow-2798 | Sentadilla con salto y desplante hacia atrás con barra | intermediate | compound | push | jump | editorial-estimate |
| flow-0103 | Extensión abdominal de pie con barra rodante | expert | compound | pull | ab-wheel | editorial-estimate |
| flow-0104 | Flexión de muñecas con barra detrás del cuerpo de pie | beginner | isolation | pull | wrist-flexion | editorial-estimate |
| flow-0105 | Press Bradford de pie con barra | beginner | compound | push | press | provisional-identity |
| flow-1372 | Elevación de talones de pie con barra | beginner | isolation | push | calf | source-or-prior-review |
| flow-0106 | Curl de bíceps con agarre cerrado de pie con barra | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-1456 | Press militar de pie con barra y agarre cerrado | beginner | compound | push | press | editorial-estimate |
| flow-2414 | Curl concentrado de pie con barra | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0107 | Elevación frontal con barra por encima de la cabeza | beginner | isolation | push | shoulder-raise | provisional-identity |
| flow-0108 | Elevación de pantorrilla con barra de pie | beginner | isolation | push | calf | provisional-identity |
| flow-0109 | Extensión de tríceps sobre la cabeza de pie con barra | beginner | isolation | push | triceps | source-or-prior-review |
| flow-0110 | Curl de bíceps con agarre inverso de pie con barra | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0111 | Elevación de talones con balanceo y barra | beginner | isolation | push | calf | provisional-identity |
| flow-0112 | Giros de tronco de pie con barra | intermediate | compound | mixed | rotational-core | provisional-identity |
| flow-1629 | Curl de bíceps de pie con barra y agarre amplio (ilustración 2) | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1457 | Press militar de pie con barra y agarre amplio | beginner | compound | push | press | editorial-estimate |
| flow-0113 | Curl de bíceps de pie con barra y agarre amplio | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-0114 | Subida al banco con barra | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-0115 | Buenos días con barra y piernas semirrígidas | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0116 | Peso muerto con barra y piernas extendidas | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0117 | Peso muerto sumo con barra | intermediate | compound | pull | hinge | editorial-estimate |
| flow-3305 | Sentadilla con press de barra (thruster) | expert | compound | mixed | integrated-lifts | editorial-estimate |
| flow-0120 | Remo al mentón con barra | beginner | compound | pull | row | source-or-prior-review |
| flow-0119 | Remo al mentón con barra (variante 2) | beginner | compound | pull | row | editorial-estimate |
| flow-0121 | Remo al mentón con barra (variante 3) | beginner | compound | pull | row | editorial-estimate |
| flow-0122 | Press de banca con barra y agarre amplio | beginner | compound | push | press | editorial-estimate |
| flow-1258 | Press de banca con barra y agarre supino amplio | beginner | compound | push | press | editorial-estimate |
| flow-0124 | Sentadilla con barra y postura amplia | intermediate | compound | push | squat | editorial-estimate |
| flow-0123 | Remo al mentón con agarre amplio con barra | beginner | compound | pull | row | editorial-estimate |
| flow-0126 | Flexión de muñecas con barra | beginner | isolation | pull | wrist-flexion | editorial-estimate |
| flow-0125 | Flexión de muñecas con barra (variante 2) | beginner | isolation | pull | wrist-flexion | editorial-estimate |
| flow-0127 | Sentadilla Zercher con barra | intermediate | compound | push | squat | editorial-estimate |
| flow-3212 | Flexión de tronco para tocar los pies | beginner | compound | mixed | rotational-mobility | editorial-estimate |
| flow-3360 | Caminata de oso | intermediate | compound | mixed | body-crawl | editorial-estimate |
| flow-0129 | Fondos en banco (rodillas dobladas) | intermediate | compound | push | dip | provisional-identity |
| flow-1399 | Fondos en banco en el suelo | intermediate | compound | push | dip | provisional-identity |
| flow-0130 | Empuje de cadera con espalda apoyada en banco (hip thrust) | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-3019 | Remo invertido con pies elevados en banco | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-3639 | Giros acostado con rodillas flexionadas | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-1770 | Curl de concentración de piernas con bíceps | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0139 | Dominadas estrechas de bíceps | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0140 | Dominadas para bíceps | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-3543 | Sentadilla con salto y caída con peso corporal | intermediate | compound | push | jump | provisional-identity |
| flow-3544 | Plancha lateral inclinada con peso corporal | intermediate | isometric | static | static-plank | provisional-identity |
| flow-1771 | Extensión de tríceps de rodillas con peso corporal | beginner | isolation | push | triceps | editorial-estimate |
| flow-1769 | Curl de bíceps acostado de lado con peso corporal | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-3168 | Remo en cuclillas con peso corporal | intermediate | compound | mixed | mixed-combination | provisional-identity |
| flow-3167 | Remo en sentadilla con toalla | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-1373 | Elevación de talones de pie con peso corporal | beginner | isolation | push | calf | editorial-estimate |
| flow-3156 | Remo con agarre cerrado a un brazo de pie con peso corporal | intermediate | compound | pull | row | provisional-identity |
| flow-3158 | Remo con agarre cerrado de pie con peso corporal | beginner | compound | pull | row | provisional-identity |
| flow-3162 | Remo a un brazo de pie con peso corporal | intermediate | compound | pull | row | provisional-identity |
| flow-3161 | Remo con toalla a un brazo de pie con peso corporal | intermediate | compound | pull | row | provisional-identity |
| flow-3166 | Remo de pie con peso corporal | beginner | compound | pull | row | provisional-identity |
| flow-3165 | Remo con toalla de pie con peso corporal | beginner | compound | pull | row | provisional-identity |
| flow-1374 | Salto de caja hacia abajo con estabilización de una pierna | intermediate | compound | push | jump | provisional-identity |
| flow-2466 | Escaladores cruzados | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-1160 | Burpee | intermediate | compound | mixed | ballistic-full-body | editorial-estimate |
| flow-1494 | Postura de mariposa | beginner | isometric | push | static-yoga | editorial-estimate |
| flow-0148 | Press de hombros alterno de pie en poleas | intermediate | compound | push | press | editorial-estimate |
| flow-0149 | Extensión de tríceps alterno en polea | intermediate | isolation | push | triceps | provisional-identity |
| flow-3235 | Curl de piernas inverso asistido por cable | beginner | isolation | pull | curl-knee | provisional-identity |
| flow-0150 | Jalón lateral con barra de cable | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0151 | Press de banca en polea | beginner | compound | push | press | provisional-identity |
| flow-1630 | Curl de bíceps con agarre cerrado en polea | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1631 | Curl concentrado en polea | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0152 | Extensión de tríceps a un brazo en polea con apoyo en la rodilla | beginner | isolation | push | triceps | editorial-estimate |
| flow-0153 | Jalón dorsal cruzado en poleas | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0154 | Aperturas inversas cruzadas en polea alta con el tronco inclinado | beginner | isolation | push | rear-shoulder | editorial-estimate |
| flow-0155 | Cruces de pecho de pie en poleas | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0868 | Curl de bíceps de pie en polea baja | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0157 | Peso muerto en polea | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0158 | Aperturas en banco declinado en polea | beginner | isolation | push | chest-fly | provisional-identity |
| flow-1260 | Press de pecho declinado a un brazo en polea | intermediate | compound | push | press | editorial-estimate |
| flow-1261 | Press de pecho declinado en poleas | beginner | compound | push | press | editorial-estimate |
| flow-0159 | Remo con agarre amplio sentado en banco declinado en polea | beginner | compound | pull | row | provisional-identity |
| flow-1632 | Curl de arrastre en polea | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0160 | Remo en el suelo con agarre amplio sentado en polea | beginner | compound | pull | row | provisional-identity |
| flow-0161 | Elevaciones frontales en polea | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0162 | Elevaciones frontales en polea (ilustración 2) | beginner | isolation | push | shoulder-raise | source-or-prior-review |
| flow-0164 | Elevaciones frontales en polea (ilustración 3) | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0165 | Curl martillo con cuerda en polea | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1722 | Extensión de tríceps sobre la cabeza con cuerda en polea alta | beginner | isolation | push | triceps | editorial-estimate |
| flow-0167 | Remo alto de rodillas en polea | beginner | compound | pull | row | provisional-identity |
| flow-0169 | Press de pecho inclinado en poleas | beginner | compound | push | press | editorial-estimate |
| flow-1318 | Remo en banco inclinado en polea | beginner | compound | pull | row | provisional-identity |
| flow-0171 | Aperturas de pecho en banco inclinado en poleas | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0170 | Aperturas inclinadas en poleas sobre pelota de estabilidad | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-0860 | Patada de tríceps en polea | beginner | isolation | push | triceps | editorial-estimate |
| flow-0175 | Crunch abdominal de rodillas en polea | beginner | isolation | pull | crunch | editorial-estimate |
| flow-3697 | Remo para deltoides posteriores de rodillas con cuerda en polea | beginner | compound | pull | row | editorial-estimate |
| flow-0176 | Extensión de tríceps de rodillas en polea | beginner | isolation | push | triceps | provisional-identity |
| flow-2330 | Jalón al pecho en polea con recorrido completo | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0177 | Jalón al pecho con cuerda en polea alta | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-2616 | Jalón al pecho con agarre en V en polea alta | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0178 | Elevaciones laterales en polea | beginner | isolation | push | shoulder-raise | provisional-identity |
| flow-0179 | Aperturas en polea baja | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0180 | Remo sentado en polea baja | beginner | compound | pull | row | editorial-estimate |
| flow-1634 | Curl de bíceps acostado en banco plano en polea baja | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0182 | Curl de bíceps con agarre cerrado acostado en polea | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0184 | Pullover acostado con cuerda en polea | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0185 | Aperturas de pecho en banco plano en poleas | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0186 | Extensión de tríceps acostado en polea (variante 2) | beginner | isolation | push | triceps | provisional-identity |
| flow-0188 | Aperturas de pecho en poleas a media altura | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0189 | Remo a un brazo en polea con el tronco inclinado | intermediate | compound | pull | row | editorial-estimate |
| flow-0190 | Curl de bíceps a un brazo en polea baja | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1262 | Aperturas de pecho a un brazo en banco declinado en polea | intermediate | isolation | push | chest-fly | provisional-identity |
| flow-1263 | Aperturas sobre pelota de estabilidad a un brazo en polea | intermediate | isolation | push | chest-fly | provisional-identity |
| flow-1264 | Aperturas sobre pelota de estabilidad a un brazo en banco inclinado en polea | intermediate | isolation | push | chest-fly | provisional-identity |
| flow-1265 | Press de pecho inclinado a un brazo en polea | intermediate | compound | push | press | editorial-estimate |
| flow-1266 | Cable con un brazo inclinado press sobre pelota de ejercicio | intermediate | compound | push | press | provisional-identity |
| flow-0191 | Apertura inversa a un brazo en polea con el tronco inclinado | intermediate | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0192 | Elevación lateral a un brazo en polea baja | intermediate | isolation | push | shoulder-raise | editorial-estimate |
| flow-1633 | Curl predicador a un brazo en polea | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1267 | Press de pecho a un brazo en polea sentado sobre pelota de estabilidad | intermediate | compound | push | press | editorial-estimate |
| flow-3563 | Jalón al pecho a un brazo en polea alta | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-1635 | Curl predicador con agarre prono a un brazo en polea | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-0193 | Remo unilateral de rodillas en polea con el tronco erguido | intermediate | compound | pull | row | editorial-estimate |
| flow-1723 | Extensión de tríceps a un brazo en polea alta | intermediate | isolation | push | triceps | editorial-estimate |
| flow-1636 | Curl de bíceps en polea alta | intermediate | isolation | pull | curl-arm | source-or-prior-review |
| flow-1637 | Curl de bíceps sobre pelota de estabilidad por encima de la cabeza en polea | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-0194 | Extensión de tríceps sobre la cabeza con cuerda en polea | beginner | isolation | push | triceps | editorial-estimate |
| flow-1319 | Remo a un brazo en polea con giro de muñeca | intermediate | compound | pull | row | editorial-estimate |
| flow-1268 | Press de pecho en poleas sentado sobre pelota de estabilidad | intermediate | compound | push | press | editorial-estimate |
| flow-0196 | Pasacables (con cuerda) | intermediate | compound | pull | hinge | provisional-identity |
| flow-0198 | Jalón al pecho en polea alta | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0197 | Jalón al pecho con barra Pro Lat en polea alta | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-1638 | Curl de bíceps con polea | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0201 | Extensión de tríceps con barra en polea alta | beginner | isolation | push | triceps | editorial-estimate |
| flow-0199 | Jalón con brazos extendidos en polea alta (variante 2) | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0200 | Extensión de tríceps con cuerda en polea alta | beginner | isolation | push | triceps | editorial-estimate |
| flow-0202 | Remo para deltoides posteriores a un brazo en polea con el tronco inclinado | beginner | compound | pull | row | editorial-estimate |
| flow-0203 | Remo para deltoides posteriores con cuerda en polea baja | beginner | compound | pull | row | editorial-estimate |
| flow-0204 | Cable de tracción trasera | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0205 | Jalón dorsal posterior en polea | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0206 | Curl de bíceps con agarre prono en polea | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-2406 | Empuje de tríceps con agarre inverso con cable (barra sz) (con brazo blaster) | beginner | isolation | push | triceps | provisional-identity |
| flow-1413 | Curl inverso a un brazo en polea baja | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0209 | Curl predicador con agarre prono en polea | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0210 | Extensión de muñecas en polea | beginner | isolation | push | wrist-extension | editorial-estimate |
| flow-0207 | Extensión de tríceps con agarre supino en polea alta | beginner | isolation | push | triceps | editorial-estimate |
| flow-0208 | Remo alto sentado en polea con agarre supino y tronco erguido | beginner | compound | pull | row | editorial-estimate |
| flow-1320 | Remo sentado en polea con cuerdas cruzadas | beginner | compound | pull | row | editorial-estimate |
| flow-1321 | Remo sentado con cuerda en polea desde banco elevado | beginner | compound | pull | row | editorial-estimate |
| flow-1322 | Remo con cuerda en polea sentado en banco inclinado | beginner | compound | pull | row | editorial-estimate |
| flow-1639 | Curl predicador martillo con cuerda en polea baja | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1724 | Extensión de tríceps sobre la cabeza con cuerda en polea alta (ilustración 2) | beginner | isolation | push | triceps | editorial-estimate |
| flow-1725 | Cable cuerda inclinación extensión de tríceps | beginner | isolation | push | triceps | provisional-identity |
| flow-1726 | Extensión de tríceps acostado en el suelo con cuerda en polea baja | beginner | isolation | push | triceps | editorial-estimate |
| flow-1640 | Curl predicador a un brazo con cuerda en polea (agarre por confirmar) | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-1323 | Remo sentado con cuerda en polea baja | beginner | compound | pull | row | editorial-estimate |
| flow-0211 | Giros rusos en polea sentado sobre pelota de estabilidad | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-2144 | Press de pecho sentado en polea | beginner | compound | push | press | editorial-estimate |
| flow-1641 | Curl de bíceps sentado en polea | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0213 | Remo sentado en polea con agarre en V | beginner | compound | pull | row | editorial-estimate |
| flow-0214 | Remo a un brazo alterno sentado en polea | intermediate | compound | pull | row | provisional-identity |
| flow-1642 | Curl concentrado a un brazo sentado en polea | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1643 | Curl de bíceps sentado por encima de la cabeza en polea | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0215 | Aperturas inversas sentado en poleas | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0861 | Remo sentado en polea | beginner | compound | pull | row | editorial-estimate |
| flow-0216 | Rotación interna del hombro sentado con cable | intermediate | isolation | mixed | shoulder-rotation | provisional-identity |
| flow-2399 | Rotación de tronco sentado en polea | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-0218 | Remo sentado en polea con agarre amplio | beginner | compound | pull | row | editorial-estimate |
| flow-0220 | Encogimiento de hombros en polea | beginner | isolation | pull | shrug | editorial-estimate |
| flow-0222 | Flexión lateral de tronco en polea | beginner | isolation | mixed | side-bend | provisional-identity |
| flow-0221 | Crunch con flexión lateral del cable (bola bosu) | intermediate | isolation | mixed | side-bend | provisional-identity |
| flow-0223 | Crunch lateral en polea | beginner | isolation | pull | crunch | provisional-identity |
| flow-1717 | Sentadilla con remo en polea y cuerda | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-1644 | Curl de bíceps en sentadilla en polea baja | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-0224 | Curl de muñeca con cable de pie hacia atrás | beginner | isolation | pull | wrist-flexion | provisional-identity |
| flow-1375 | Elevación de talones de pie en polea | beginner | isolation | push | calf | editorial-estimate |
| flow-0225 | Aperturas inversas cruzadas de pie en polea alta | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0226 | Crunch abdominal de pie en polea | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0874 | Crunch abdominal de pie con cuerda en polea alta | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0227 | Aperturas de pecho de pie en poleas | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0228 | Patada de glúteo de pie en polea | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-0229 | Curl de bíceps de pie con énfasis interno en polea | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0230 | Elevación diagonal de abajo hacia arriba en polea | beginner | compound | pull | rotational-core | source-or-prior-review |
| flow-0231 | Extensión de tríceps a un brazo de pie en polea | intermediate | isolation | push | triceps | provisional-identity |
| flow-1376 | Elevación de talones a una pierna de pie en polea | intermediate | isolation | push | calf | editorial-estimate |
| flow-0232 | Jalón dorsal con cuerda de pie en polea | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0233 | Remo para deltoides posteriores de pie con cuerda en polea | beginner | compound | pull | row | editorial-estimate |
| flow-1727 | Extensión de tríceps a un brazo sobre la cabeza en polea con agarre supino | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0234 | Remo de pie en polea con agarre en V | beginner | compound | pull | row | editorial-estimate |
| flow-0235 | Rotación externa de hombro de pie en polea | intermediate | isolation | mixed | shoulder-rotation | provisional-identity |
| flow-0236 | Remo de pie con giro de tronco y agarre en V en polea | intermediate | compound | pull | row | editorial-estimate |
| flow-1269 | Cruces de pecho de pie en poleas con el tronco erguido | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0238 | Jalón con brazos extendidos en polea alta | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0237 | Pullover con cuerda en polea alta | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0239 | Remo sentado en polea con el tronco erguido | beginner | compound | pull | row | editorial-estimate |
| flow-0240 | Aperturas inversas boca arriba en polea | beginner | isolation | pull | rear-shoulder | provisional-identity |
| flow-2464 | Remo a un brazo sentado en polea baja (variante por confirmar) | beginner | compound | pull | row | provisional-identity |
| flow-0241 | Extensión de tríceps con agarre en V en polea alta | beginner | isolation | push | triceps | editorial-estimate |
| flow-2405 | Extensión de tríceps en polea alta con agarre en V y soporte para brazos | beginner | isolation | push | triceps | editorial-estimate |
| flow-0242 | Abdominales invertidos con cable | beginner | isolation | pull | crunch | provisional-identity |
| flow-0243 | Rotación de tronco de pie en polea | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-0862 | Torsión del cable (arriba-abajo) | intermediate | compound | mixed | rotational-core | provisional-identity |
| flow-0244 | Remo unilateral con giro de tronco en polea | intermediate | compound | pull | row | editorial-estimate |
| flow-1645 | Curl de bíceps con ambos brazos en banco inclinado en poleas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1728 | Patada de tríceps con ambos brazos en poleas | beginner | isolation | push | triceps | editorial-estimate |
| flow-0245 | Jalón al pecho en polea alta con agarre supino | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-1270 | Cruces de cable en la parte superior del pecho | beginner | isolation | push | chest-fly | provisional-identity |
| flow-1324 | Remo alto de pie en polea con barra | beginner | compound | pull | row | editorial-estimate |
| flow-0246 | Remo al mentón en polea | beginner | compound | pull | row | editorial-estimate |
| flow-1325 | Jalón dorsal con agarre amplio tras nuca posterior en polea | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-1407 | Estiramiento de pantorrilla con apoyo de manos en pared | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-1377 | Estiramiento de pantorrillas con las manos contra la pared. | beginner | isolation | static | static-stretch | provisional-identity |
| flow-1378 | Estiramiento de pantorrilla con cuerda | beginner | isolation | static | static-stretch | provisional-identity |
| flow-0248 | Fila acostada con barra curvada | beginner | compound | pull | row | provisional-identity |
| flow-2963 | Elevación de piernas extendidas con apoyo de antebrazos en silla romana | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-0251 | Fondos para pecho | intermediate | compound | push | dip | editorial-estimate |
| flow-1430 | Fondos para pecho en estación de dominadas y paralelas | intermediate | compound | pull | dip | editorial-estimate |
| flow-2462 | Fondos de pecho en barra recta | intermediate | compound | push | dip | provisional-identity |
| flow-1272 | Estiramiento de pecho con pelota de ejercicios | intermediate | isolation | static | static-stretch | provisional-identity |
| flow-3216 | Flexiones de brazos con toque de pecho | intermediate | compound | push | push-up | editorial-estimate |
| flow-0253 | Dominadas (agarre paralelo estrecho) | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0257 | Estiramiento de rodillas en círculos | beginner | compound | mixed | dynamic-mobility | provisional-identity |
| flow-1273 | Flexiones de brazos con palmada | intermediate | compound | push | push-up | editorial-estimate |
| flow-1327 | Dominadas con agarre supino con agarre cerrado | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0259 | Flexiones de brazos con agarre cerrado | intermediate | compound | push | push-up | editorial-estimate |
| flow-2398 | Flexiones de brazos con agarre cerrado con apoyo de rodillas | intermediate | compound | push | mixed-combination | provisional-identity |
| flow-1468 | Toque de pie con mano contraria en apoyo de cangrejo | intermediate | compound | mixed | rotational-mobility | editorial-estimate |
| flow-0271 | Crunch abdominal sobre pelota de estabilidad | intermediate | isolation | pull | crunch | editorial-estimate |
| flow-0272 | Crunch abdominal con brazos extendidos sobre pelota de estabilidad | intermediate | isolation | pull | crunch | editorial-estimate |
| flow-0274 | Crunch abdominal en el suelo | beginner | isolation | pull | crunch | editorial-estimate |
| flow-3016 | Acurrucarse | beginner | isolation | pull | crunch | provisional-identity |
| flow-3769 | Desplante cruzado hacia atrás | intermediate | compound | push | squat | editorial-estimate |
| flow-2331 | Bicicleta elíptica | beginner | compound | mixed | dynamic-cardio | provisional-identity |
| flow-0282 | Incorporaciones de tronco en banco declinado | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1274 | Flexiones de brazos en déficit sobre mancuernas | intermediate | compound | push | push-up | editorial-estimate |
| flow-0283 | Flexiones diamante | intermediate | compound | push | push-up | editorial-estimate |
| flow-0284 | Elevación de talones con el tronco inclinado y apoyo de manos | beginner | isolation | push | calf | editorial-estimate |
| flow-1275 | Soltar empujar hacia arriba | intermediate | compound | push | push-up | provisional-identity |
| flow-0285 | Curl de bíceps alterno con mancuernas | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-2403 | Curl alterno con mancuernas y soporte para brazos | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1646 | Curl predicador martillo alterno con mancuernas | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1647 | Curl predicador alterno con mancuernas | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1648 | Curl martillo alterno sentado con mancuernas | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0286 | Press de hombros alterno de pie con mancuernas | intermediate | compound | push | press | editorial-estimate |
| flow-1649 | Curl alterno de bíceps de pie con un pie apoyado en pelota de estabilidad | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1650 | Curl alterno de bíceps sentado sobre pelota de estabilidad con mancuernas | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-2137 | Press Arnold sentado con mancuernas | intermediate | compound | push | press | source-or-prior-review |
| flow-0287 | Press Arnold sentado con mancuernas (variante 2) | beginner | compound | push | press | editorial-estimate |
| flow-0288 | Pullover con mancuerna en banco plano | beginner | isolation | pull | pullover | editorial-estimate |
| flow-0290 | Press de banca sentado con mancuernas | beginner | compound | push | press | provisional-identity |
| flow-0291 | Sentadilla en banco con mancuernas | intermediate | compound | push | squat | provisional-identity |
| flow-0293 | Remo inclinado con mancuernas | beginner | compound | pull | row | editorial-estimate |
| flow-1651 | Desplante con curl de bíceps y gesto de boliche con mancuernas | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-1652 | Curl de bíceps con mancuernas sentado sobre pelota de estabilidad con una pierna elevada | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1653 | Curl de bíceps con mancuernas en apoyo a una pierna | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0294 | Curl de bíceps con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2401 | Curl de bíceps con mancuernas y soporte para brazos | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1654 | Curl de bíceps con mancuernas hacia atrás | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1655 | Sentadilla con curl de bíceps y mancuernas | intermediate | compound | mixed | mixed-combination | provisional-identity |
| flow-1656 | Curl de bíceps con mancuernas v sentarse en una pelota bosu | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-1201 | Burpee con mancuernas | intermediate | compound | mixed | ballistic-full-body | editorial-estimate |
| flow-1731 | Press con agarre cerrado con mancuernas (ilustración 2) | beginner | compound | push | press | provisional-identity |
| flow-0296 | Press con agarre cerrado con mancuernas | beginner | compound | push | press | provisional-identity |
| flow-0297 | Curl concentrado con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-3635 | Desplante hacia adelante contralateral con mancuernas | intermediate | compound | push | lunge-step | provisional-identity |
| flow-0298 | Curl martillo cruzado con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1657 | Curl martillo cruzado con mancuernas (variante 2) | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0299 | Press cubano con mancuernas | intermediate | compound | push | mixed-combination | provisional-identity |
| flow-2136 | Press cubano con mancuernas v.2 | intermediate | compound | push | mixed-combination | provisional-identity |
| flow-0300 | Peso muerto con mancuernas | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0301 | Press de banca declinado con mancuernas | beginner | compound | push | press | source-or-prior-review |
| flow-0302 | Aperturas con mancuernas en banco declinado | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0303 | Press de banca declinado con mancuernas y agarre neutro | beginner | compound | push | press | editorial-estimate |
| flow-1276 | Aperturas a un brazo con mancuerna en banco declinado | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-1617 | Press de pecho declinado con mancuerna a un brazo y agarre neutro | intermediate | compound | push | press | editorial-estimate |
| flow-0305 | Encogimiento de hombros en banco declinado con mancuernas | beginner | isolation | pull | shrug | provisional-identity |
| flow-0304 | Encogimiento de hombros boca abajo en banco declinado con mancuernas (variante 2) | beginner | isolation | pull | shrug | editorial-estimate |
| flow-0306 | Press francés con mancuernas en banco declinado | beginner | isolation | push | triceps | source-or-prior-review |
| flow-0307 | Aperturas con giro de muñecas y mancuernas en banco declinado | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-1437 | Flexión de dedos con mancuerna | beginner | isolation | pull | wrist-flexion | editorial-estimate |
| flow-0308 | Aperturas con mancuernas | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-1277 | Aperturas con mancuernas sobre pelota de estabilidad | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-1732 | Desplante al frente y extensión de tríceps con mancuernas sobre la cabeza | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-0310 | Elevaciones frontales con mancuernas | beginner | isolation | push | shoulder-raise | source-or-prior-review |
| flow-0309 | Elevaciones frontales con mancuernas (variante 2) | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0311 | Elevación lateral con lata completa con mancuernas | beginner | isolation | push | shoulder-raise | provisional-identity |
| flow-1760 | Sentadilla goblet con mancuerna | intermediate | compound | push | squat | editorial-estimate |
| flow-0313 | Curl martillo con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1659 | Curl martillo con mancuernas sentado sobre pelota de estabilidad | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0312 | Curl martillo con mancuernas (variante 2) | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-2402 | Curl martillo con soporte para brazos (arm blaster) con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1664 | Curl alto con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-3545 | Press de pecho inclinado alterno con mancuernas | intermediate | compound | push | press | editorial-estimate |
| flow-0314 | Press de banca inclinado con mancuernas | beginner | compound | push | press | editorial-estimate |
| flow-0315 | Curl de bíceps con mancuernas en banco inclinado | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0316 | Press de pecho con mancuernas en banco inclinado | beginner | compound | push | press | editorial-estimate |
| flow-0318 | Curl de bíceps en banco inclinado con mancuernas | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-0317 | Curl de bíceps en banco inclinado con mancuernas (variante 2) | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0319 | Aperturas con mancuernas en banco inclinado | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-1278 | Aperturas con mancuernas en banco inclinado y apoyo sobre pelota | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-0320 | Curl martillo con mancuernas en banco inclinado | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0321 | Press de banca inclinado con mancuernas y agarre neutro | beginner | compound | push | press | editorial-estimate |
| flow-1618 | Press de pecho con agarre neutro sobre pelota de estabilidad en banco inclinado con mancuernas | intermediate | compound | push | press | provisional-identity |
| flow-0322 | Curl de bíceps en banco inclinado con énfasis interno con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1279 | Aperturas a un brazo con mancuerna en banco inclinado | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-1280 | Aperturas sobre pelota de estabilidad a un brazo en banco inclinado con mancuernas | intermediate | isolation | push | chest-fly | provisional-identity |
| flow-1619 | Press inclinado a un brazo con mancuerna y agarre neutro | intermediate | compound | push | press | editorial-estimate |
| flow-1620 | Press de pecho con agarre neutro sobre pelota de estabilidad a un brazo en banco inclinado con mancuernas | intermediate | compound | push | press | provisional-identity |
| flow-0323 | Elevación lateral con mancuerna a un brazo sentado en banco inclinado | intermediate | isolation | push | shoulder-raise | editorial-estimate |
| flow-1281 | Press de pecho inclinado a un brazo con mancuerna | intermediate | compound | push | press | editorial-estimate |
| flow-1282 | Press a un brazo con mancuerna sobre pelota de estabilidad (inclinación por confirmar) | intermediate | compound | push | press | provisional-identity |
| flow-0324 | Press inclinado con mancuernas y palmas enfrentadas | beginner | compound | push | press | editorial-estimate |
| flow-1283 | Press inclinado con mancuernas sobre pelota de ejercicio. | intermediate | compound | push | press | provisional-identity |
| flow-0325 | Press con mancuernas en banco inclinado | beginner | compound | push | press | editorial-estimate |
| flow-0326 | Aperturas inversas con mancuernas y pecho apoyado en banco inclinado | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0329 | Encogimiento de hombros en banco inclinado con mancuernas | beginner | isolation | pull | shrug | editorial-estimate |
| flow-3542 | Elevaciones en T con mancuernas boca abajo en banco inclinado | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0330 | Extensión de tríceps sobre la cabeza con mancuernas en banco inclinado | beginner | isolation | push | triceps | editorial-estimate |
| flow-0331 | Aperturas con giro de muñecas y mancuernas en banco inclinado | intermediate | compound | push | rotational-core | editorial-estimate |
| flow-1733 | Extensión de tríceps con ambos brazos y mancuernas en banco inclinado | beginner | isolation | push | triceps | editorial-estimate |
| flow-3541 | Elevaciones en Y con mancuernas boca abajo en banco inclinado | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0332 | Elevación lateral con mancuernas y brazos en cruz | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0333 | Patada de tríceps con mancuernas | beginner | isolation | push | triceps | editorial-estimate |
| flow-1734 | Patada de tríceps con mancuernas sentado sobre pelota de estabilidad | intermediate | isolation | push | triceps | editorial-estimate |
| flow-1660 | Curl de bíceps de rodillas con mancuernas y codos sobre pelota de estabilidad | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0334 | Elevaciones laterales con mancuernas | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0335 | Elevaciones laterales y frontales con mancuernas | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0336 | Desplante con mancuernas | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-1658 | Desplante al frente y curl de bíceps con mancuernas | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-0337 | Extensión acostada con mancuernas (a través de la cara) | beginner | isolation | push | triceps | provisional-identity |
| flow-1729 | Extensión de tríceps alterna con mancuernas acostado en banco plano | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0338 | Extensión de tríceps acostado con mancuernas y codos abiertos | beginner | compound | push | press | editorial-estimate |
| flow-0863 | Rotación externa de hombro acostado de lado con mancuerna | intermediate | isolation | mixed | shoulder-rotation | editorial-estimate |
| flow-0339 | Mancuerna acostada femoral | beginner | compound | pull | supine-lower-limb-flexion | provisional-identity |
| flow-0340 | Press de banca con mancuernas y agarre neutro | beginner | compound | push | press | editorial-estimate |
| flow-2470 | Aperturas inversas con mancuernas boca abajo en el suelo | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0341 | Apertura inversa a un brazo con mancuerna boca abajo en banco | intermediate | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0343 | Press de pecho a un brazo con mancuerna en banco plano | intermediate | compound | push | press | editorial-estimate |
| flow-0342 | Press de pecho a un brazo con mancuerna en banco plano (variante 2) | intermediate | compound | push | press | editorial-estimate |
| flow-0344 | Extensión de tríceps acostado a un brazo con mancuerna y agarre prono | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0346 | Extensión de tríceps acostado a un brazo con mancuerna y agarre supino | intermediate | isolation | push | triceps | editorial-estimate |
| flow-2705 | Pronación acostada con mancuernas en el suelo | beginner | isolation | mixed | forearm-rotation | provisional-identity |
| flow-1284 | Pullover con mancuerna sobre pelota de estabilidad | intermediate | isolation | pull | pullover | editorial-estimate |
| flow-1328 | Remo para deltoides posteriores con mancuernas boca abajo en banco | beginner | compound | pull | row | editorial-estimate |
| flow-1735 | Extensión de tríceps acostado a un brazo con mancuerna | beginner | isolation | push | triceps | editorial-estimate |
| flow-2706 | Curl de bíceps con mancuernas acostado en el suelo con agarre supino | beginner | isolation | mixed | forearm-rotation | editorial-estimate |
| flow-1661 | Curl de bíceps con mancuernas boca arriba en banco plano (ilustración 2) | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0350 | Curl de bíceps con mancuernas boca arriba en banco plano | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-0351 | Press francés con mancuernas en banco plano | beginner | isolation | push | triceps | editorial-estimate |
| flow-1662 | Curl de bíceps con mancuernas boca arriba y brazos abiertos en banco | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0352 | Press de banca con agarre neutro con mancuernas | beginner | compound | push | press | editorial-estimate |
| flow-1285 | Apertura de pecho a un brazo con mancuerna en banco plano | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-0292 | Remo a un brazo con el tronco inclinado con mancuernas | intermediate | compound | pull | row | editorial-estimate |
| flow-1286 | Apertura de pecho a un brazo con mancuerna sobre pelota de estabilidad | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-0353 | Curl concentrado sobre pelota de estabilidad a un brazo con mancuernas | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-1287 | Press de pecho declinado a un brazo con mancuerna | intermediate | compound | push | press | editorial-estimate |
| flow-1288 | Apertura a un brazo con mancuerna sobre pelota de estabilidad | intermediate | isolation | push | chest-fly | editorial-estimate |
| flow-1736 | Mancuerna con un brazo, prensa francesa sobre pelota de ejercicio. | intermediate | isolation | push | triceps | provisional-identity |
| flow-1663 | Curl predicador martillo a un brazo con mancuerna | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1621 | Press de hombros a un brazo con mancuerna y agarre neutro sentado sobre pelota de estabilidad | intermediate | compound | push | press | editorial-estimate |
| flow-1289 | Press de pecho inclinado a un brazo con mancuerna (ilustración 2) | intermediate | compound | push | press | editorial-estimate |
| flow-0354 | Patada de tríceps a un brazo con mancuerna | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0355 | Elevación lateral a un brazo con mancuerna | intermediate | isolation | push | shoulder-raise | editorial-estimate |
| flow-0356 | Elevación lateral a un brazo con mancuerna y apoyo de la mano libre | intermediate | isolation | push | shoulder-raise | editorial-estimate |
| flow-1290 | Press de hombros a un brazo con mancuerna sentado sobre pelota de estabilidad | intermediate | compound | push | press | editorial-estimate |
| flow-1665 | Curl de bíceps a un brazo con mancuerna boca abajo en banco | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1666 | Curl martillo a un brazo con mancuerna boca abajo en banco | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1291 | Pullover (extensión de hombros) sobre pelota de estabilidad a un brazo con mancuernas | intermediate | isolation | pull | pullover | provisional-identity |
| flow-0358 | Extensión de muñeca con mancuerna a un brazo | intermediate | isolation | push | wrist-extension | editorial-estimate |
| flow-0359 | Apertura inversa a un brazo con mancuerna y apoyo en banco | intermediate | isolation | pull | rear-shoulder | editorial-estimate |
| flow-1622 | Press con agarre inverso con un brazo con mancuernas | intermediate | compound | push | press | provisional-identity |
| flow-1414 | Curl predicador con agarre prono a un brazo con mancuernas | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-1667 | Curl de araña invertido con un brazo y mancuernas | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-1668 | Curl de bíceps a un brazo con mancuerna sentado sobre pelota de estabilidad | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1669 | Curl martillo concentrado a un brazo con mancuerna sentado | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1415 | Flexión de muñecas con agarre neutro a un brazo sentado con mancuernas | intermediate | isolation | pull | wrist-flexion | provisional-identity |
| flow-0360 | Press de hombros a un brazo con mancuernas (variante 2) | intermediate | compound | push | press | editorial-estimate |
| flow-3888 | Arranque a un brazo con mancuerna | expert | compound | mixed | integrated-lifts | editorial-estimate |
| flow-1670 | Curl de bíceps a un brazo de pie con mancuerna | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1671 | Curl martillo a un brazo de pie con mancuerna | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0362 | Extensión de tríceps sobre la cabeza a un brazo sentado con mancuerna | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0364 | Flexión de muñeca a un brazo con mancuerna | intermediate | isolation | pull | wrist-flexion | editorial-estimate |
| flow-1672 | Curl predicador Zottman a un brazo con mancuernas | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-1292 | Aperturas sobre pelota de estabilidad a una pierna con mancuernas | intermediate | isolation | push | chest-fly | provisional-identity |
| flow-0365 | Flexión de muñecas con agarre neutro con apoyo en banco con mancuernas | beginner | isolation | pull | wrist-flexion | provisional-identity |
| flow-0366 | Flexión de muñecas con agarre neutro con apoyo en banco a un brazo con mancuernas | intermediate | isolation | pull | wrist-flexion | provisional-identity |
| flow-1441 | Extensión de muñeca con mancuerna a un brazo y antebrazo apoyado en banco | intermediate | isolation | push | wrist-extension | editorial-estimate |
| flow-0367 | Flexión de muñecas con apoyo en banco a un brazo con mancuernas | intermediate | isolation | pull | wrist-flexion | provisional-identity |
| flow-0368 | Extensión de muñecas con mancuernas y antebrazos apoyados en banco | beginner | isolation | push | wrist-extension | editorial-estimate |
| flow-0369 | Flexión de muñecas con mancuernas y antebrazos apoyados en banco | beginner | isolation | pull | wrist-flexion | editorial-estimate |
| flow-1329 | Remo inclinado con mancuernas y giro de muñecas | intermediate | compound | pull | row | editorial-estimate |
| flow-1623 | Press de banca con agarre neutro en banco inclinado con mancuernas | beginner | compound | push | press | provisional-identity |
| flow-0370 | Curl predicador con agarre martillo con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0371 | Sentadilla plyo con mancuernas | intermediate | compound | push | jump | provisional-identity |
| flow-0372 | Curl predicador con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1673 | Curl predicador con mancuernas y brazos apoyados en pelota de estabilidad | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1293 | Press de pecho con mancuernas sobre pelota de estabilidad | intermediate | compound | push | press | editorial-estimate |
| flow-0373 | Extensión de tríceps con agarre pronado y mancuernas | beginner | isolation | push | triceps | provisional-identity |
| flow-1674 | Curl martillo con mancuernas boca abajo en banco inclinado | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0375 | Pullover con mancuerna en banco plano (ilustración 2) | beginner | isolation | pull | pullover | editorial-estimate |
| flow-1294 | Pullover con mancuerna y elevación de cadera sobre pelota de estabilidad | intermediate | isolation | pull | pullover | editorial-estimate |
| flow-1295 | Pullover con mancuerna sobre pelota de estabilidad (ilustración 2) | intermediate | isolation | pull | pullover | editorial-estimate |
| flow-1700 | Press de hombros con impulso de piernas y mancuernas (push press) | beginner | compound | push | press | editorial-estimate |
| flow-2292 | Aperturas inversas con mancuernas y tronco inclinado (ilustración 2) | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0377 | Remo para deltoides posteriores con mancuernas y tronco inclinado | beginner | compound | pull | row | editorial-estimate |
| flow-0378 | Aperturas inversas con mancuernas | beginner | isolation | push | rear-shoulder | editorial-estimate |
| flow-0380 | Aperturas inversas con mancuernas y tronco inclinado | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0379 | Aperturas inversas con mancuernas y frente apoyada en banco | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0382 | Curl inverso de bíceps con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1624 | Press de banca inverso con mancuernas | beginner | compound | push | press | provisional-identity |
| flow-0383 | Aperturas inversas con mancuernas (ilustración 2) | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-1330 | Remo en banco inclinado con agarre inverso a un brazo con mancuernas | intermediate | compound | pull | row | provisional-identity |
| flow-1331 | Remo con mancuernas y agarre supino con pecho apoyado en banco inclinado | beginner | compound | pull | row | editorial-estimate |
| flow-2327 | Remo inclinado con mancuernas y agarre supino | beginner | compound | pull | row | editorial-estimate |
| flow-0384 | Curl predicador con agarre prono con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1675 | Curl de araña invertido con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0385 | Extensión de muñecas con mancuernas | beginner | isolation | push | wrist-extension | editorial-estimate |
| flow-1459 | Peso muerto rumano con mancuernas | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0386 | Aperturas inversas con mancuernas y giro de muñecas | intermediate | isolation | pull | rear-shoulder | editorial-estimate |
| flow-2397 | Prensa scott con mancuernas | beginner | compound | push | press | provisional-identity |
| flow-0387 | Elevaciones frontales alternas sentado con mancuernas | intermediate | isolation | push | shoulder-raise | editorial-estimate |
| flow-1676 | Curl martillo alterno con mancuernas sentado sobre pelota de estabilidad | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0388 | Press de hombros alterno sentado con mancuernas | intermediate | compound | push | press | editorial-estimate |
| flow-3546 | Press de hombros alterno sentado con mancuernas (ilustración 2) | intermediate | compound | push | press | editorial-estimate |
| flow-0389 | Extensión de tríceps sobre la cabeza sentado con mancuerna | beginner | isolation | push | triceps | editorial-estimate |
| flow-2317 | Elevación lateral sentado con mancuernas y codos flexionados | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-1730 | Patada de tríceps alterna sentado con mancuernas y tronco inclinado | intermediate | isolation | push | triceps | editorial-estimate |
| flow-1737 | Patada de tríceps a dos brazos sentado con mancuernas | beginner | isolation | push | triceps | editorial-estimate |
| flow-1677 | Curl de bíceps sentado con mancuernas (ilustración 2) | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0390 | Curl de bíceps con mancuernas sentado sobre pelota de estabilidad | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-3547 | Curl de bíceps y press de hombros sentado con mancuernas | intermediate | compound | push | mixed-combination | editorial-estimate |
| flow-1379 | Elevación de talones sentado con mancuernas | beginner | isolation | push | calf | editorial-estimate |
| flow-0391 | Curl de bíceps sentado con mancuernas | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-0392 | Elevaciones frontales sentado con mancuernas | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-1678 | Curl martillo sentado con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0393 | Curl concentrado bilateral con mancuernas | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-0394 | Patada de tríceps sentado con mancuernas | beginner | isolation | push | triceps | editorial-estimate |
| flow-0396 | Elevaciones laterales con mancuernas sentado | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0395 | Elevaciones laterales sentado con mancuernas (variante 2) | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0397 | Flexión de muñecas con agarre neutro sentado con mancuernas | beginner | isolation | pull | wrist-flexion | provisional-identity |
| flow-1679 | Curl de bíceps con un brazo sentado con mancuernas sobre una pelota de ejercicio con la pierna levantada | intermediate | isolation | pull | curl-arm | provisional-identity |
| flow-0398 | Patada de tríceps a un brazo sentado con mancuerna | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0399 | Curl de bíceps a un brazo sentado con giro de antebrazo y mancuerna | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-1380 | Elevación de talón a una pierna sentado con mancuerna y agarre neutro | intermediate | isolation | push | calf | editorial-estimate |
| flow-1381 | Levantamiento de pantorrilla con una pierna sentado con mancuerna - palma hacia arriba | intermediate | isolation | push | calf | provisional-identity |
| flow-0401 | Flexión de muñecas sentado con mancuernas y agarre supino | beginner | isolation | pull | wrist-flexion | source-or-prior-review |
| flow-0402 | Curl predicador a un brazo sentado con mancuerna | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0403 | Curl concentrado con agarre inverso sentado con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1738 | Extensión de tríceps a un brazo sobre la cabeza sentado con mancuerna y agarre supino | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0405 | Press de hombros sentado con mancuernas | beginner | compound | push | press | editorial-estimate |
| flow-0404 | Press de hombros con agarre neutro sentado con mancuernas | beginner | compound | push | press | provisional-identity |
| flow-2188 | Extensión de tríceps sentado con una mancuerna a dos manos | beginner | isolation | push | triceps | editorial-estimate |
| flow-0408 | Elevación lateral con mancuerna acostado de lado | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-3664 | Plancha lateral con apertura inversa con mancuerna | intermediate | compound | push | moving-plank | editorial-estimate |
| flow-3548 | Caminata con mancuerna sobre la cabeza a un brazo | intermediate | compound | mixed | carry | editorial-estimate |
| flow-0409 | Elevación de talones a una pierna con mancuernas | intermediate | isolation | push | calf | editorial-estimate |
| flow-1757 | Peso muerto a una pierna con mancuernas | intermediate | compound | pull | hinge | editorial-estimate |
| flow-2805 | Peso muerto con una sola pierna con mancuernas y soporte stepbox | intermediate | compound | pull | hinge | provisional-identity |
| flow-0410 | Sentadilla búlgara con mancuernas | intermediate | compound | push | squat | editorial-estimate |
| flow-0411 | Sentadilla a una pierna con mancuernas | intermediate | compound | push | squat | editorial-estimate |
| flow-3560 | Curl martillo alterno y press de hombro de pie con mancuernas | intermediate | compound | push | mixed-combination | editorial-estimate |
| flow-0414 | Press de hombros alterno de pie con mancuernas (ilustración 2) | intermediate | compound | push | press | editorial-estimate |
| flow-0415 | Elevaciones laterales alternas de pie con mancuernas | intermediate | isolation | push | shoulder-raise | editorial-estimate |
| flow-1739 | Patada de tríceps alterna con mancuernas y tronco inclinado | intermediate | isolation | push | triceps | editorial-estimate |
| flow-2143 | Círculos de brazos de pie con mancuernas | beginner | compound | mixed | rotational-mobility | editorial-estimate |
| flow-1740 | Extensión de tríceps a un brazo de pie con el tronco inclinado con mancuernas | beginner | isolation | push | triceps | source-or-prior-review |
| flow-1741 | Extensión de tríceps a dos brazos de pie con el tronco inclinado con mancuernas | beginner | isolation | push | triceps | source-or-prior-review |
| flow-0416 | Curl de bíceps de pie con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0417 | Elevación de talones de pie con mancuernas | intermediate | isolation | push | calf | source-or-prior-review |
| flow-0418 | Curl concentrado de pie con mancuerna y tronco inclinado | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0419 | Elevación frontal de pie con mancuernas hasta arriba de la cabeza | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-2321 | Curl de bíceps de pie con énfasis interno con mancuernas (variante 2) | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0420 | Patada de tríceps de pie con mancuernas | beginner | isolation | push | triceps | editorial-estimate |
| flow-0421 | Curl de bíceps unilateral de pie con mancuerna | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0422 | Curl unilateral de pie con mancuerna y mano libre apoyada en banco inclinado | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-1680 | Curl unilateral de pie con mancuerna y apoyo en banco inclinado | beginner | isolation | pull | curl-arm | source-or-prior-review |
| flow-0423 | Extensión de tríceps sobre la cabeza a un brazo de pie con mancuerna | intermediate | isolation | push | triceps | editorial-estimate |
| flow-0424 | Press de hombro unilateral de pie con mancuerna y agarre neutro | beginner | compound | push | press | source-or-prior-review |
| flow-0425 | Curl de bíceps con agarre prono a un brazo de pie con mancuernas | intermediate | isolation | pull | curl-arm | editorial-estimate |
| flow-0426 | Press de hombros de pie con mancuernas | beginner | compound | push | press | editorial-estimate |
| flow-0427 | Press con agarre neutro de pie con mancuernas | beginner | compound | push | press | provisional-identity |
| flow-0428 | Curl predicador de pie con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0429 | Curl de bíceps con agarre prono de pie con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0430 | Extensión de tríceps unilateral sobre la cabeza de pie con mancuerna | beginner | isolation | push | triceps | source-or-prior-review |
| flow-2293 | Curl predicador Zottman de pie con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1684 | Subida al banco con elevación de rodilla y curl de bíceps con mancuernas | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-0431 | Subida al banco con mancuernas | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-2796 | Subida al banco con mancuernas (ilustración 2) | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-2812 | Subida al banco con elevación de rodilla y mancuernas | intermediate | compound | push | squat | editorial-estimate |
| flow-0432 | Peso muerto con piernas rígidas con mancuernas | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0433 | Pullover (extensión de hombros) con brazos extendidos con mancuernas | intermediate | compound | pull | pullover | source-or-prior-review |
| flow-0434 | Peso muerto con piernas extendidas con mancuernas | intermediate | compound | pull | hinge | provisional-identity |
| flow-2808 | Sumo con mancuernas | intermediate | compound | pull | hinge | provisional-identity |
| flow-2803 | Sentadilla apoyada con mancuernas | intermediate | compound | push | squat | provisional-identity |
| flow-0436 | Ejercicio de tríceps con mancuernas (variante por confirmar) | beginner | isolation | push | triceps | provisional-identity |
| flow-1742 | Patada de tríceps con mancuerna en equilibrio sobre una pierna | beginner | isolation | push | triceps | editorial-estimate |
| flow-1743 | Press de banca con rotación con mancuernas | intermediate | compound | push | press | editorial-estimate |
| flow-0437 | Remo al mentón con mancuernas | beginner | compound | pull | row | editorial-estimate |
| flow-1765 | Remo al mentón con mancuernas (vista posterior) | beginner | compound | pull | row | editorial-estimate |
| flow-0864 | Rotación externa de hombros de pie con mancuernas y brazos elevados | intermediate | isolation | mixed | shoulder-rotation | editorial-estimate |
| flow-5201 | Curl de bíceps camarero con mancuernas | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0438 | Press de hombros sentado con mancuernas (press W) | beginner | compound | push | press | editorial-estimate |
| flow-0439 | Curl Zottman con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2294 | Curl predicador Zottman con mancuernas | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2189 | Extensión de tríceps sentado con una mancuerna a dos manos (ilustración 2) | beginner | isolation | push | triceps | editorial-estimate |
| flow-1167 | Estiramiento dinámico del pecho | beginner | compound | mixed | dynamic-mobility | editorial-estimate |
| flow-3287 | Fondos de tríceps en banco con piernas extendidas (ilustración 2) | intermediate | compound | push | dip | editorial-estimate |
| flow-1772 | Elevación de codo - flexión inversa | intermediate | compound | push | push-up | provisional-identity |
| flow-3292 | Buenos días sin peso | intermediate | compound | pull | hinge | editorial-estimate |
| flow-1332 | Pelota de ejercicios alternando brazos hacia arriba | intermediate | isolation | push | shoulder-raise | provisional-identity |
| flow-1333 | Extensión de espalda sobre pelota de estabilidad con brazos al frente | intermediate | isolation | pull | back-extension | editorial-estimate |
| flow-1334 | Extensión de espalda sobre pelota de estabilidad con manos detrás de la cabeza | intermediate | isolation | pull | back-extension | editorial-estimate |
| flow-1335 | Extensión de espalda sobre pelota de estabilidad con rodillas sin apoyo | intermediate | isolation | pull | back-extension | editorial-estimate |
| flow-1336 | Extensión de espalda sobre pelota de estabilidad con giro | intermediate | isolation | pull | back-extension | editorial-estimate |
| flow-1744 | Fondos sobre pelota de estabilidad | intermediate | compound | push | dip | editorial-estimate |
| flow-1559 | Estiramiento de flexores de cadera con el pie delantero sobre pelota de estabilidad | intermediate | isolation | static | static-stretch | editorial-estimate |
| flow-1338 | Abrazo de pelota de ejercicio | intermediate | compound | mixed | unstable-trunk-control | provisional-identity |
| flow-1339 | Inclinación lateral sentado sobre pelota de estabilidad con mancuerna sobre la cabeza | intermediate | isolation | static | static-stretch | editorial-estimate |
| flow-1341 | Extensión del tronco hacia atrás sobre pelota de estabilidad | intermediate | isolation | static | static-stretch | editorial-estimate |
| flow-1342 | Estiramiento lateral acostado de lado sobre pelota de estabilidad | intermediate | isolation | static | static-stretch | editorial-estimate |
| flow-1382 | Pelota de ejercicios en la pared elevación de pantorrillas | intermediate | isolation | push | calf | provisional-identity |
| flow-3241 | Pelota de ejercicio en la pared elevación de pantorrilla (pelota de tenis entre los tobillos) | intermediate | isolation | push | calf | provisional-identity |
| flow-3240 | Pelota de ejercicio en la pared elevación de pantorrilla (pelota de tenis entre las rodillas) | intermediate | isolation | push | calf | provisional-identity |
| flow-1416 | Rotación de cadera boca abajo sobre pelota de estabilidad con elevación alterna de pierna | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-1417 | Curl de piernas sobre pelota de estabilidad con extensión diagonal alterna | intermediate | isolation | pull | curl-knee | editorial-estimate |
| flow-1296 | Flexiones de brazos con elevación de cadera y pies sobre pelota de estabilidad | intermediate | compound | push | push-up | editorial-estimate |
| flow-1343 | Elevación de piernas sobre pelota de estabilidad boca abajo | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-1560 | Estiramiento de isquiotibiales sentado con pelota de ejercicio | intermediate | isolation | static | static-stretch | provisional-identity |
| flow-1745 | Ejercicio de estiramiento de tríceps sentado con pelota. | intermediate | isolation | static | static-stretch | provisional-identity |
| flow-1746 | Extensión de tríceps sobre pelota de estabilidad boca arriba | intermediate | isolation | push | triceps | provisional-identity |
| flow-1747 | Extensión de tríceps sobre la cabeza sentado en pelota de estabilidad con barra Z | intermediate | isolation | push | triceps | editorial-estimate |
| flow-3010 | Pullover acostado con barra Z y codos flexionados | beginner | isolation | pull | pullover | editorial-estimate |
| flow-1748 | Extensión de tríceps con agarre cerrado acostado detrás de la cabeza con barra Z | beginner | isolation | push | triceps | provisional-identity |
| flow-1344 | Remo con agarre inverso con el tronco inclinado con barra Z | beginner | compound | pull | row | editorial-estimate |
| flow-1682 | Curl concentrado con agarre cerrado sentado con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1749 | Extensión de tríceps sobre la cabeza de pie con barra Z | beginner | isolation | push | triceps | editorial-estimate |
| flow-0445 | Press antigravedad con barra ez | beginner | compound | push | press | provisional-identity |
| flow-1627 | Curl predicador con agarre cerrado con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0446 | Curl de bíceps con agarre cerrado con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0447 | Curl de bíceps con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0448 | Extensión de tríceps acostado en banco declinado con barra Z y agarre cerrado | beginner | compound | push | press | editorial-estimate |
| flow-2186 | Extensión de tríceps en banco declinado con barra Z | beginner | isolation | push | triceps | editorial-estimate |
| flow-0449 | Extensión de tríceps en banco inclinado con barra Z | beginner | isolation | push | triceps | editorial-estimate |
| flow-0450 | Press de banca con barra ez jm | beginner | compound | push | press | provisional-identity |
| flow-0451 | Curl de bíceps con agarre inverso con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0452 | Curl predicador con agarre inverso con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1458 | Curl de bíceps sentado con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0453 | Extensión de tríceps sentado con barra Z | beginner | isolation | push | triceps | editorial-estimate |
| flow-0454 | Curl araña con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1628 | Curl araña con barra Z (ilustración 2) | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2404 | Curl de bíceps con soporte para brazos (arm blaster) con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2432 | Press de banca con agarre cerrado con barra Z | beginner | compound | push | press | editorial-estimate |
| flow-2741 | Curl de bíceps con agarre amplio de pie con barra Z | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2133 | Caminata del granjero con mancuernas | intermediate | compound | mixed | carry | editorial-estimate |
| flow-3303 | Bandera humana | expert | isometric | static | advanced-static-skill | editorial-estimate |
| flow-0456 | Abdominal en V con rodillas flexionadas y manos detrás de la cabeza | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0457 | Abdominal en V con brazos extendidos | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0458 | Mosca de piso (con barra) | beginner | isolation | push | chest-fly | provisional-identity |
| flow-1472 | Salto hacia adelante | intermediate | compound | push | jump | editorial-estimate |
| flow-3470 | Desplante hacia adelante | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-2429 | Crunch con plantas de los pies juntas y rodillas abiertas | beginner | isolation | pull | crunch | editorial-estimate |
| flow-3301 | Equilibrio de rana sobre las manos | intermediate | isometric | static | balance | editorial-estimate |
| flow-3296 | Palanca delantera | expert | isometric | static | advanced-static-skill | provisional-identity |
| flow-3295 | Elevaciones a palanca frontal en barra | expert | compound | mixed | moving-plank | editorial-estimate |
| flow-0464 | Plancha frontal con giro | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-3315 | Maltés completo | expert | isometric | static | advanced-static-skill | provisional-identity |
| flow-3299 | Plancha de calistenia con piernas juntas sin apoyo de pies | expert | isometric | static | advanced-static-skill | editorial-estimate |
| flow-3327 | Flexiones de brazos en plancha de calistenia sin apoyo de pies | expert | compound | push | advanced-integrated-skill | editorial-estimate |
| flow-0466 | Barbilla esternón gironda | intermediate | compound | pull | rotational-core | provisional-identity |
| flow-3561 | Puente de glúteos con marcha alterna | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-3523 | Elevación de cadera con espalda apoyada en banco | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-0467 | Dominadas con elevación de rodillas | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0469 | Crunch inverso con rodillas flexionadas | beginner | isolation | pull | crunch | editorial-estimate |
| flow-3221 | Media sentadilla sin peso | intermediate | compound | push | squat | editorial-estimate |
| flow-3202 | Abdominal corto con elevación parcial del tronco | beginner | isolation | pull | crunch | editorial-estimate |
| flow-2139 | Bicicleta de brazos en ergómetro | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-3218 | Flexión de tronco hacia los pies con manos juntas y recorrido circular | beginner | compound | mixed | rotational-mobility | editorial-estimate |
| flow-3215 | Flexión de tronco hacia los pies con brazos en círculo inverso | beginner | compound | mixed | rotational-mobility | editorial-estimate |
| flow-3302 | Parada de manos | expert | isometric | static | advanced-static-skill | editorial-estimate |
| flow-0471 | Flexiones de brazos en parada de manos con apoyo en pared | expert | compound | push | advanced-integrated-skill | editorial-estimate |
| flow-1764 | Elevación de cadera con pierna colgando | beginner | compound | push | hip-bridge | provisional-identity |
| flow-1761 | Elevación de rodillas colgado en barra con giro lateral | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-0474 | Elevación de cadera colgado en barra con piernas extendidas | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-0475 | Elevación de piernas extendidas colgado en barra | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-0476 | Elevación de piernas extendidas y cadera colgado en barra con giro | intermediate | compound | push | hip-bridge | editorial-estimate |
| flow-3636 | Rodillas altas alternas con apoyo de manos en pared | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-0484 | Elevación de cadera con rodillas flexionadas | beginner | compound | pull | shoulder-raise | source-or-prior-review |
| flow-1418 | Sentadilla profunda con abrazo de rodillas | intermediate | compound | push | squat | editorial-estimate |
| flow-3234 | Aperturas con mancuernas en banco plano | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-0489 | Hiperextensiones | beginner | isolation | pull | back-extension | editorial-estimate |
| flow-0488 | Hiperextensiones en banco | beginner | isolation | pull | back-extension | editorial-estimate |
| flow-3289 | Caídas imposibles | intermediate | compound | push | dip | provisional-identity |
| flow-3698 | Caminata de gusano (variante 2) | intermediate | compound | mixed | body-crawl | editorial-estimate |
| flow-0490 | Flexiones de brazos con agarre cerrado en banco inclinado | intermediate | compound | push | push-up | provisional-identity |
| flow-0491 | Elevación de piernas extendidas y cadera en banco inclinado | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-3785 | Flexiones de brazos con manos sobre cajón | beginner | compound | push | push-up | editorial-estimate |
| flow-0494 | Flexiones de brazos con agarre inverso en banco inclinado | beginner | compound | push | push-up | source-or-prior-review |
| flow-3011 | Inclinar la escápula hacia arriba | intermediate | compound | push | push-up | provisional-identity |
| flow-0495 | Incorporaciones de tronco en banco inclinado con rotación | intermediate | isolation | pull | crunch | editorial-estimate |
| flow-0496 | Curl de piernas boca abajo con apoyo del tronco en banco | beginner | isolation | pull | curl-knee | editorial-estimate |
| flow-2400 | Curl femoral acostado en polea baja | beginner | isolation | pull | curl-knee | editorial-estimate |
| flow-2300 | Remo invertido con rodillas flexionadas | beginner | compound | pull | row | editorial-estimate |
| flow-2298 | Remo invertido sujetándose de un banco alto | beginner | compound | pull | row | editorial-estimate |
| flow-0497 | Remo invertido con pies apoyados en el suelo (variante 2) | beginner | compound | pull | row | editorial-estimate |
| flow-1419 | Estiramiento de la cruz de hierro | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-1297 | Compresión isométrica del pecho | beginner | isometric | static | static-yoga | editorial-estimate |
| flow-0501 | Jack-burpee | intermediate | compound | mixed | ballistic-full-body | provisional-identity |
| flow-3224 | Saltos de tijera | intermediate | compound | push | jump | editorial-estimate |
| flow-2612 | Saltar la cuerda | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-0514 | Sentadilla con salto | intermediate | compound | push | jump | editorial-estimate |
| flow-0513 | Sentadilla con salto (variante 2) | intermediate | compound | push | jump | editorial-estimate |
| flow-0517 | Molino avanzado con pesa rusa sobre la cabeza | intermediate | isolation | push | hinge | source-or-prior-review |
| flow-0518 | Cargada alterna con pesas rusas desde posición colgante | intermediate | compound | pull | clean | editorial-estimate |
| flow-0520 | Press de hombros alterno con pesas rusas | intermediate | compound | push | press | source-or-prior-review |
| flow-0519 | Press de pecho alterno en el suelo con pesas rusas | intermediate | compound | push | press | editorial-estimate |
| flow-0521 | Remo renegado alterno con pesas rusas | intermediate | compound | pull | row | editorial-estimate |
| flow-0522 | Remo alterno con dos pesas rusas y tronco inclinado | intermediate | isolation | pull | row | source-or-prior-review |
| flow-0524 | Press inclinado con pesas rusas | beginner | compound | push | press | provisional-identity |
| flow-0525 | Cargada desde posición colgante con pesa rusa invertida | intermediate | compound | pull | clean | editorial-estimate |
| flow-0526 | Cargada desde suspensión con dos pesas rusas (alternancia por confirmar) | intermediate | compound | pull | clean | provisional-identity |
| flow-0527 | Envión con dos pesas rusas | intermediate | compound | push | integrated-lifts | source-or-prior-review |
| flow-0528 | Press de hombros con impulso de piernas y dos pesas rusas | intermediate | compound | push | press | source-or-prior-review |
| flow-0529 | Arranque doble con pesas rusas | expert | compound | pull | integrated-lifts | source-or-prior-review |
| flow-0530 | Molino de viento doble con pesas rusas | intermediate | compound | pull | hinge | provisional-identity |
| flow-0531 | Press con un brazo de rango extendido con pesas rusas en el suelo | intermediate | compound | push | press | provisional-identity |
| flow-0533 | Sentadilla frontal con pesa rusa sostenida a dos manos | intermediate | compound | push | squat | editorial-estimate |
| flow-0534 | Sentadilla goblet con pesa rusa | intermediate | compound | push | squat | editorial-estimate |
| flow-0536 | Desplante con pase de pesa rusa por debajo de la pierna | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-0537 | Cargada y envión a un brazo con pesa rusa | intermediate | compound | push | integrated-lifts | source-or-prior-review |
| flow-1298 | Press de pecho unilateral en el suelo con pesa rusa | intermediate | compound | push | press | source-or-prior-review |
| flow-0538 | Envión unilateral con pesa rusa | intermediate | compound | push | integrated-lifts | source-or-prior-review |
| flow-0539 | Press militar unilateral con pesa rusa | intermediate | compound | push | press | source-or-prior-review |
| flow-0540 | Press de hombro unilateral con impulso de piernas y pesa rusa | intermediate | compound | push | press | source-or-prior-review |
| flow-0541 | Remo a un brazo con pesa rusa | intermediate | compound | pull | row | source-or-prior-review |
| flow-0542 | Arranque unilateral con pesa rusa | expert | compound | pull | integrated-lifts | source-or-prior-review |
| flow-0543 | Cargada y press sobre la cabeza a un brazo con pesa rusa | expert | compound | mixed | integrated-lifts | editorial-estimate |
| flow-0545 | Flexiones de brazos pliométricas sobre pesas rusas | intermediate | compound | push | jump | editorial-estimate |
| flow-1438 | Press militar sentado con dos pesas rusas | beginner | compound | push | press | editorial-estimate |
| flow-0549 | Balanceo con pesa rusa a dos manos | intermediate | compound | pull | kettlebell-swing | editorial-estimate |
| flow-0552 | Pesa rusa dos brazos limpios | intermediate | compound | pull | clean | provisional-identity |
| flow-0553 | Press militar con dos pesas rusas | intermediate | compound | push | press | source-or-prior-review |
| flow-1345 | Remo inclinado con dos pesas rusas | intermediate | compound | pull | row | source-or-prior-review |
| flow-0555 | Extensión y flexión de piernas sentado en banco | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-3640 | Crunch con toque alterno de rodilla | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1346 | Estiramiento lateral de rodillas | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-3239 | Arrodillarse tabla tocar el hombro | intermediate | compound | mixed | moving-plank | provisional-identity |
| flow-3211 | Flexiones de brazos de rodillas | intermediate | compound | push | push-up | provisional-identity |
| flow-3288 | Salsas coreanas | intermediate | compound | push | dip | provisional-identity |
| flow-3418 | Dominadas en L | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-3419 | Sostén en L sobre el suelo | expert | isometric | static | advanced-static-skill | editorial-estimate |
| flow-0562 | Rotaciones de tronco con barra anclada (landmine) | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-3237 | Elevación lateral unilateral con barra anclada (landmine) | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-3300 | Inclinación al frente en plancha de calistenia con pies apoyados | intermediate | isometric | static | static-plank | editorial-estimate |
| flow-2271 | Gancho de izquierda de boxeo | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-0570 | Recogida de rodillas sentado en banco plano | beginner | compound | pull | leg-raise | source-or-prior-review |
| flow-2287 | Prensa de piernas alterna en máquina de palanca | intermediate | compound | push | leg-press | editorial-estimate |
| flow-0571 | Remo alterno sentado en máquina con agarre cerrado | intermediate | compound | pull | row | editorial-estimate |
| flow-0572 | Dominadas con agarre supino asistido en máquina de palanca | beginner | compound | pull | vertical-pull | provisional-identity |
| flow-0573 | Extensión de espalda en máquina de palanca | beginner | isolation | pull | back-extension | editorial-estimate |
| flow-0574 | Remo con el tronco inclinado en máquina de palanca | beginner | compound | pull | row | provisional-identity |
| flow-3200 | Remo inclinado en máquina de palanca con agarre en V | beginner | compound | pull | row | editorial-estimate |
| flow-0575 | Curl de bíceps en máquina de palanca | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2289 | Elevación de talones sentado en máquina de palanca (ilustración 2) | beginner | isolation | push | calf | editorial-estimate |
| flow-0577 | Press de pecho sentado en máquina (ilustración 2) | beginner | compound | push | press | editorial-estimate |
| flow-0576 | Press de pecho sentado en máquina | beginner | compound | push | press | source-or-prior-review |
| flow-0578 | Peso muerto en máquina de palanca | intermediate | compound | pull | hinge | editorial-estimate |
| flow-1300 | Press de pecho en banco declinado en máquina de palanca | beginner | compound | push | press | editorial-estimate |
| flow-1253 | Elevación de pantorrilla en burro con palanca | beginner | isolation | push | calf | provisional-identity |
| flow-0579 | Jalón dorsal frontal en máquina de palanca | beginner | compound | pull | vertical-pull | editorial-estimate |
| flow-0580 | Encogimiento de hombros sin agarre de palanca | beginner | isolation | pull | shrug | provisional-identity |
| flow-1439 | Encogimiento de hombros sin agarre con palanca v.2 | beginner | isolation | pull | shrug | provisional-identity |
| flow-2288 | Cierre de manos en máquina de agarre | beginner | isolation | pull | finger-grip | editorial-estimate |
| flow-1615 | Curl predicador con agarre neutro en máquina de palanca | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-0581 | Remo alto en máquina de palanca | beginner | compound | pull | row | editorial-estimate |
| flow-2286 | Extensión de cadera en máquina de palanca (variante 2) | beginner | compound | push | leg-press | provisional-identity |
| flow-2611 | Prensa horizontal unilateral en máquina | intermediate | compound | push | leg-press | editorial-estimate |
| flow-1299 | Press de pecho en banco inclinado en máquina de palanca | beginner | compound | push | press | editorial-estimate |
| flow-1479 | Press de pecho en banco inclinado en máquina de palanca (variante 2) | beginner | compound | push | press | editorial-estimate |
| flow-0582 | Curl femoral de rodillas en máquina de palanca | beginner | isolation | pull | curl-knee | provisional-identity |
| flow-0583 | Rotación de tronco de rodillas en máquina | intermediate | compound | mixed | rotational-core | editorial-estimate |
| flow-0584 | Elevaciones laterales en máquina de palanca | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-0585 | Extensión de rodillas en máquina de palanca | beginner | isolation | push | knee-extension | editorial-estimate |
| flow-0586 | Curl femoral acostado en máquina de palanca | beginner | isolation | pull | curl-knee | editorial-estimate |
| flow-3195 | Curl femoral con subida bilateral y bajada unilateral acostado en máquina de palanca | intermediate | isolation | pull | curl-knee | provisional-identity |
| flow-0587 | Press militar en máquina de palanca | beginner | compound | push | press | editorial-estimate |
| flow-0588 | Remo con agarre cerrado sentado en máquina de palanca | beginner | compound | pull | row | editorial-estimate |
| flow-0589 | Remo unilateral inclinado con barra de palanca | intermediate | compound | pull | row | editorial-estimate |
| flow-1356 | Remo alto unilateral sentado en máquina de palanca | intermediate | compound | pull | row | editorial-estimate |
| flow-1347 | Jalón unilateral en máquina con trayectoria hacia la cadera contraria | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-0590 | Press de hombros a un brazo en máquina de palanca | intermediate | compound | push | press | editorial-estimate |
| flow-0591 | Fondos para tríceps con agarre prono en máquina de palanca | beginner | isolation | push | triceps | editorial-estimate |
| flow-0592 | Curl predicador en máquina de palanca | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1614 | Curl predicador en máquina de palanca (variante 2) | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-2285 | Pullover (extensión de hombros) en máquina de palanca | beginner | isolation | pull | pullover | editorial-estimate |
| flow-2736 | Jalón dorsal con agarre inverso en máquina de palanca | beginner | compound | pull | vertical-pull | provisional-identity |
| flow-1616 | Curl predicador con agarre inverso en máquina de palanca | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-1348 | Remo sentado en máquina con agarre supino | beginner | compound | pull | row | editorial-estimate |
| flow-0593 | Hiperextensiones inversas en máquina de palanca | beginner | isolation | pull | back-extension | editorial-estimate |
| flow-1349 | Remo en máquina de palanca con barra T y agarre prono | beginner | compound | pull | row | editorial-estimate |
| flow-2315 | Elevación de talones sentado en máquina rotatoria | beginner | isolation | push | calf | editorial-estimate |
| flow-2335 | Elevación de talones sentado en máquina de palanca con apoyo en muslos | beginner | isolation | push | calf | editorial-estimate |
| flow-0594 | Elevación de talones sentado en máquina de palanca | beginner | isolation | push | calf | editorial-estimate |
| flow-1452 | Crunch abdominal sentado en máquina de palanca | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0595 | Abdominales sentado con palanca (almohadilla para el pecho) | beginner | isolation | pull | crunch | provisional-identity |
| flow-3760 | Crunch abdominal sentado en máquina de palanca (variante 2) | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1451 | Fondos sentado en máquina de palanca | beginner | compound | push | dip | editorial-estimate |
| flow-0596 | Aperturas sentado en máquina de palanca | beginner | isolation | push | chest-fly | editorial-estimate |
| flow-3759 | Buenos días sentado en máquina de palanca | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0597 | Abducción de cadera sentado en máquina de palanca | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-0598 | Aducción de cadera sentado en máquina de palanca | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-0599 | Curl femoral sentado en máquina de palanca | beginner | isolation | pull | curl-knee | provisional-identity |
| flow-0600 | Crunch sentado en máquina con elevación de piernas | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-0602 | Aperturas inversas sentado en máquina de palanca | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-0601 | Aperturas inversas con agarre neutro sentado en máquina de palanca | beginner | isolation | pull | rear-shoulder | editorial-estimate |
| flow-1350 | Remo sentado en máquina de palanca | beginner | compound | pull | row | editorial-estimate |
| flow-1385 | Elevación de talones sentado en prensa de piernas | intermediate | compound | mixed | mixed-combination | editorial-estimate |
| flow-0603 | Press de hombros en máquina de palanca | beginner | compound | push | press | editorial-estimate |
| flow-0869 | Press de hombros en máquina de palanca (variante 2) | beginner | compound | push | press | editorial-estimate |
| flow-2318 | Press de hombros en máquina de palanca (variante 3) | beginner | compound | push | press | editorial-estimate |
| flow-0604 | Encogimiento de hombros en máquina de palanca | beginner | isolation | pull | shrug | editorial-estimate |
| flow-0605 | Elevación de talones de pie en máquina de palanca | beginner | isolation | push | calf | editorial-estimate |
| flow-3758 | Press de pecho de pie en máquina de palanca | beginner | compound | push | press | editorial-estimate |
| flow-0606 | Remo en barra T en máquina de palanca | beginner | compound | pull | row | editorial-estimate |
| flow-1351 | Palanca barra en t fila de agarre inverso | beginner | compound | pull | row | provisional-identity |
| flow-0607 | Extensión de tríceps en máquina de palanca | beginner | isolation | push | triceps | editorial-estimate |
| flow-1313 | Palanca unilateral fila | beginner | compound | pull | row | provisional-identity |
| flow-0609 | Puente de londres | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-3013 | Puente de glúteos en el suelo de recorrido corto | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-3582 | Desplante con salto | intermediate | compound | push | jump | editorial-estimate |
| flow-1688 | Desplante con giro | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-0613 | Estiramiento de cuádriceps acostado de lado | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-2312 | Abdominal bicicleta con codo a rodilla contraria | beginner | compound | mixed | bicycle-core | editorial-estimate |
| flow-0620 | Elevación de piernas acostado en banco plano | beginner | isolation | pull | shoulder-raise | source-or-prior-review |
| flow-0865 | Elevación de piernas y cadera acostado en el suelo | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-1301 | Press de pecho sentado en máquina (ilustración 3) | beginner | compound | push | press | editorial-estimate |
| flow-0624 | Marcha en sentadilla isométrica contra la pared | intermediate | compound | push | squat | editorial-estimate |
| flow-1353 | Lanzamiento de balón medicinal sobre la cabeza con recepción | intermediate | compound | pull | ballistic-full-body | editorial-estimate |
| flow-1303 | Empuje de pecho con balón medicinal desde una posición de 3 puntos | beginner | compound | push | press | provisional-identity |
| flow-1304 | Empuje de pecho de pie con balón medicinal (variante múltiple) | beginner | compound | push | press | editorial-estimate |
| flow-1305 | Empuje de pecho de pie con balón medicinal (variante simple) | beginner | compound | push | press | editorial-estimate |
| flow-1312 | Lanzamiento de pecho con balón medicinal y carrera para recuperarlo | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-1701 | Flexiones de brazos con manos juntas sobre balón medicinal | intermediate | compound | push | push-up | editorial-estimate |
| flow-1354 | Lanzamiento de balón medicinal al suelo desde arriba de la cabeza | intermediate | compound | mixed | ballistic-full-body | editorial-estimate |
| flow-1750 | Lanzamiento con balón medicinal en posición supina sobre el pecho. | intermediate | compound | pull | ballistic-full-body | provisional-identity |
| flow-0627 | Dominadas con agarre mixto | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-3217 | Flexión hindú modificada | intermediate | compound | push | push-up | editorial-estimate |
| flow-1421 | Flexión de brazos con descenso a los antebrazos | intermediate | compound | push | push-up | editorial-estimate |
| flow-0630 | Escaladores | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-1401 | Muscle-up (en barra vertical) | expert | compound | mixed | advanced-integrated-skill | editorial-estimate |
| flow-2328 | Flexiones de brazos con manos juntas sobre pelota de estabilidad | intermediate | compound | pull | push-up | editorial-estimate |
| flow-1403 | Estiramiento lateral del cuello | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-0634 | Crunch con descenso lento y controlado | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1495 | Crunch oblicuo (variante 2) | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0635 | Abdominales oblicuos en el suelo | beginner | isolation | pull | crunch | editorial-estimate |
| flow-0636 | Curl martillo con barra olímpica | beginner | isolation | pull | curl-arm | provisional-identity |
| flow-0637 | Extensión de tríceps sobre la cabeza de pie con barra olímpica | beginner | isolation | push | triceps | editorial-estimate |
| flow-0639 | Fondos de tríceps a un brazo en banco | intermediate | compound | push | dip | editorial-estimate |
| flow-0640 | Lanzamiento unilateral de balón medicinal al suelo | intermediate | compound | mixed | ballistic-full-body | editorial-estimate |
| flow-1773 | Remo unilateral con toalla y tronco inclinado | intermediate | compound | pull | row | editorial-estimate |
| flow-1386 | Elevación de talón a una pierna con tronco inclinado y apoyo en banco | intermediate | isolation | push | calf | editorial-estimate |
| flow-1387 | Elevación de talones en el suelo a una pierna | intermediate | isolation | push | calf | editorial-estimate |
| flow-1476 | Sentadilla a una pierna | intermediate | compound | push | squat | editorial-estimate |
| flow-0642 | Flexiones de brazos con patada lateral hacia afuera | intermediate | compound | push | push-up | editorial-estimate |
| flow-0643 | Estiramiento de tríceps por encima de la cabeza | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-3147 | Inclinación pélvica | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-3662 | Flexiones de pica a cobra | intermediate | compound | push | push-up | editorial-estimate |
| flow-1687 | Desplante hacia atrás con brazos sobre la cabeza | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-3119 | Sentadilla sin peso con brazos al frente | intermediate | compound | push | squat | editorial-estimate |
| flow-3132 | Sentadilla con apoyo de manos en silla | intermediate | compound | push | squat | editorial-estimate |
| flow-3665 | Plancha con cambio de apoyo entre manos y antebrazos | intermediate | isometric | static | static-plank | editorial-estimate |
| flow-3203 | Abdominal corto con manos detrás de la cabeza | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1707 | Extensión y rotación de tronco boca abajo sobre pelota de estabilidad | intermediate | isolation | pull | back-extension | editorial-estimate |
| flow-0651 | Dominadas con agarre neutro | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-0650 | Elevación alterna de rodillas sentado sobre pelota de estabilidad | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-0652 | Dominadas con agarre prono | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-1689 | Flexión de brazos con descenso hasta los antebrazos | intermediate | compound | push | push-up | editorial-estimate |
| flow-3638 | Flexiones de brazos con escaladores | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-1307 | Flexiones de brazos sobre BOSU (ilustración 2) | intermediate | compound | push | push-up | provisional-identity |
| flow-0662 | Flexiones de brazos | intermediate | compound | push | push-up | editorial-estimate |
| flow-0653 | Flexiones de brazos sobre BOSU | intermediate | compound | push | push-up | provisional-identity |
| flow-0655 | Flexiones de brazos sobre pelota de estabilidad | intermediate | compound | push | push-up | editorial-estimate |
| flow-0656 | Flexiones de brazos sobre pelota de estabilidad (ilustración 2) | intermediate | compound | push | push-up | editorial-estimate |
| flow-0659 | Flexiones de brazos contra la pared | intermediate | compound | push | push-up | editorial-estimate |
| flow-0658 | Flexiones de brazos contra la pared (variante 2) | intermediate | compound | push | push-up | editorial-estimate |
| flow-0660 | Flexiones con agarre cerrado con mancuernas | intermediate | compound | push | push-up | editorial-estimate |
| flow-0661 | Flexiones de brazos con patada cruzada hacia adentro | intermediate | compound | push | push-up | editorial-estimate |
| flow-0663 | Flexiones de brazos sobre balón medicinal | intermediate | compound | push | push-up | editorial-estimate |
| flow-1467 | Flexiones en los antebrazos | intermediate | compound | push | push-up | editorial-estimate |
| flow-3145 | Flexiones de brazos con empuje escapular al final | intermediate | compound | push | push-up | editorial-estimate |
| flow-3533 | Sentadilla sin peso con brazos al frente (ilustración 2) | intermediate | compound | push | squat | editorial-estimate |
| flow-3201 | Crunch de recorrido corto | beginner | isolation | pull | crunch | editorial-estimate |
| flow-3552 | Pasos rápidos en el lugar (variante 2) | intermediate | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-0666 | Flexiones de brazos a una mano con brazo libre extendido al lado | expert | compound | push | push-up | editorial-estimate |
| flow-0668 | Puente de glúteos acostado en el suelo | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-0669 | Estiramiento del deltoides posterior | beginner | isolation | pull | static-stretch | editorial-estimate |
| flow-0670 | Dominadas posterior | intermediate | compound | pull | vertical-pull | provisional-identity |
| flow-1582 | Postura del dedo gordo reclinado con cuerda | beginner | isometric | static | static-yoga | provisional-identity |
| flow-3236 | Empuje de cadera (hip thrust) con apoyo de rodillas con banda de resistencia | beginner | compound | push | hip-bridge | provisional-identity |
| flow-3007 | Extensión de rodillas con banda de resistencia | beginner | isolation | push | knee-extension | provisional-identity |
| flow-3123 | Curl de bíceps sentado con banda de resistencia | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-3124 | Press de pecho sentado con banda de resistencia | beginner | compound | push | press | editorial-estimate |
| flow-3006 | Abducción de cadera sentado con banda de resistencia | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-3122 | Press de hombros sentado con banda de resistencia | beginner | compound | push | press | provisional-identity |
| flow-3144 | Banda de resistencia sentada en la última fila | beginner | compound | pull | row | provisional-identity |
| flow-0672 | Fondos con piernas extendidas al frente y apoyo posterior de manos | intermediate | compound | push | dip | editorial-estimate |
| flow-0673 | Jalón al pecho en máquina con agarre supino | beginner | compound | pull | vertical-pull | editorial-estimate |
| flow-0674 | Dominadas con agarre supino (ilustración 2) | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-1423 | Elevación de piernas boca abajo en banco plano | beginner | isolation | pull | back-extension | editorial-estimate |
| flow-3663 | Plancha invertida con elevación de piernas | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-2571 | Estiramiento de rana mecedora | beginner | compound | mixed | dynamic-mobility | provisional-identity |
| flow-2204 | Sierra de rodillos | intermediate | compound | mixed | moving-plank | provisional-identity |
| flow-2205 | Estiramiento lateral de cadera con rodillo | beginner | isolation | static | static-stretch | provisional-identity |
| flow-2202 | Deslizamiento sentado sobre rodillo con flexión de rodillas | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-2206 | Crunch inverso con rodillo | beginner | isolation | pull | crunch | editorial-estimate |
| flow-2203 | Elevación frontal de brazos sentado con rodillo | beginner | isolation | push | shoulder-raise | editorial-estimate |
| flow-2207 | Estiramiento lateral del lado del rodillo | beginner | isolation | static | static-stretch | provisional-identity |
| flow-0685 | Carrera en el lugar | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-0684 | Correr (equipo) | beginner | compound | mixed | dynamic-cardio | provisional-identity |
| flow-1585 | Estiramiento en desplante con pierna trasera extendida | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-3012 | Inmersiones de la escápula | intermediate | compound | push | dip | provisional-identity |
| flow-3021 | Flexiones de brazos con movimiento escapular | intermediate | compound | push | push-up | editorial-estimate |
| flow-3219 | Saltos con cruce alterno de piernas | intermediate | compound | push | jump | editorial-estimate |
| flow-1390 | Estiramiento de pantorrilla sentado | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-1424 | Estiramiento de glúteos sentado | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-0689 | Elevación de piernas sentado | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-0690 | Estiramiento de la espalda baja sentado | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-2567 | Estiramiento del piriforme sentado | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-0691 | Crunch lateral sentado con espalda contra la pared | beginner | isolation | pull | crunch | editorial-estimate |
| flow-1587 | Flexión de tronco sentado con piernas abiertas | beginner | compound | mixed | dynamic-mobility | editorial-estimate |
| flow-0697 | Flexión de rodilla hacia el pecho acostado con ayuda de las manos | beginner | isolation | pull | curl-knee | editorial-estimate |
| flow-1766 | Curl de piernas inverso autoasistido | beginner | isolation | pull | curl-knee | provisional-identity |
| flow-0696 | Curl de piernas inverso autoasistido (en el suelo) | beginner | isolation | pull | curl-knee | provisional-identity |
| flow-3222 | Salto desde media sentadilla | intermediate | compound | push | jump | editorial-estimate |
| flow-3656 | Carrera de zancada corta | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-1763 | Dominadas con agarre prono al ancho de los hombros | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-3699 | Toques alternos de hombro en plancha | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-0699 | Flexiones de brazos con toque alterno de hombro | intermediate | compound | push | push-up | editorial-estimate |
| flow-1774 | Plancha lateral con elevación de la pierna superior | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-0705 | Plancha lateral (variante 2) | intermediate | isometric | static | static-plank | editorial-estimate |
| flow-0709 | Balanceo lateral de piernas en apoyo sobre barras paralelas | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-0710 | Abducción lateral de cadera | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-3667 | Elevación lateral de pierna acostado de lado | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-1775 | Plancha lateral con elevación de la pierna superior (ilustración 2) | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-0716 | Estiramiento lateral de cuello con ayuda de la mano | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-0717 | Flexiones laterales | intermediate | compound | push | push-up | editorial-estimate |
| flow-0721 | Estiramiento lateral de la muñeca | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-0720 | Dominadas con desplazamiento lateral | intermediate | compound | pull | vertical-pull | editorial-estimate |
| flow-3213 | Flexión lateral de tronco con toque del pie del mismo lado | beginner | compound | mixed | rotational-mobility | editorial-estimate |
| flow-3645 | Puente de glúteos a una pierna con la otra extendida | intermediate | compound | push | hip-bridge | editorial-estimate |
| flow-0727 | Elevación de pantorrilla con una sola pierna (con mancuerna) | intermediate | isolation | push | calf | provisional-identity |
| flow-0730 | Desplante hacia atrás con pie sobre plataforma deslizante | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-1759 | Sentadilla a una pierna con la otra extendida al frente | expert | compound | push | squat | editorial-estimate |
| flow-1489 | Sentadilla sissy con apoyo de manos | intermediate | compound | push | squat | editorial-estimate |
| flow-0735 | Incorporaciones de tronco (variante 2) | beginner | isolation | pull | crunch | editorial-estimate |
| flow-3679 | Abdominal con brazos cruzados sobre el pecho | beginner | isolation | pull | crunch | editorial-estimate |
| flow-3361 | Saltos laterales de patinador | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-2142 | Jalón sentado en ergómetro de esquí | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-3671 | Saltos laterales alternos de esquí | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-3304 | Giro invertido en barra pasando las piernas entre los brazos | expert | compound | mixed | advanced-integrated-skill | editorial-estimate |
| flow-1425 | Prensa de piernas a 45° unilateral | intermediate | compound | push | leg-press | editorial-estimate |
| flow-0738 | Elevación de talones en prensa a 45° | beginner | isolation | push | calf | editorial-estimate |
| flow-0739 | Prensa de piernas a 45° | beginner | compound | push | leg-press | editorial-estimate |
| flow-1464 | Prensa de piernas a 45° (vista posterior) | beginner | compound | push | leg-press | editorial-estimate |
| flow-1463 | Prensa de piernas a 45° (vista lateral) | beginner | compound | push | leg-press | editorial-estimate |
| flow-0740 | Prensa de piernas a 45° con pies separados | beginner | compound | push | leg-press | editorial-estimate |
| flow-1391 | Elevación de talones en prensa de piernas con trineo | beginner | isolation | push | calf | editorial-estimate |
| flow-0741 | Sentadilla hack más cerca del trineo | intermediate | compound | push | squat | provisional-identity |
| flow-0742 | Elevación de talones en máquina hack con el cuerpo hacia el respaldo | beginner | isolation | push | calf | editorial-estimate |
| flow-0743 | Sentadilla hack en máquina de trineo | intermediate | compound | push | squat | editorial-estimate |
| flow-2334 | Elevación de talones acostado en prensa de trineo | beginner | isolation | push | calf | editorial-estimate |
| flow-0744 | Prensa de piernas acostado en máquina de trineo | intermediate | compound | push | squat | editorial-estimate |
| flow-1392 | Elevación de talón unilateral en prensa de piernas | intermediate | isolation | push | calf | editorial-estimate |
| flow-1496 | Golpes al suelo con mazo | intermediate | compound | mixed | ballistic-full-body | editorial-estimate |
| flow-0746 | Encogimiento de hombros con barra detrás del cuerpo en máquina Smith | beginner | isolation | pull | shrug | editorial-estimate |
| flow-0747 | Press tras nuca en máquina Smith (postura por confirmar) | beginner | compound | push | press | provisional-identity |
| flow-0748 | Press de banca en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-0749 | Buenos días con rodillas flexionadas en máquina Smith | intermediate | compound | pull | hinge | editorial-estimate |
| flow-1359 | Remo con el tronco inclinado en máquina Smith | beginner | compound | pull | row | editorial-estimate |
| flow-0750 | Sentadilla en silla smith | intermediate | compound | push | squat | provisional-identity |
| flow-0751 | Press de banca con agarre cerrado en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-0752 | Peso muerto en máquina Smith | intermediate | compound | pull | hinge | editorial-estimate |
| flow-0753 | Press de banca en banco declinado en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-0754 | Press de banca declinado en máquina Smith con agarre supino | beginner | compound | push | press | editorial-estimate |
| flow-1433 | Sentadilla frontal en máquina Smith con agarre de cargada | intermediate | compound | push | squat | editorial-estimate |
| flow-3281 | Sentadilla profunda en máquina Smith | intermediate | compound | push | squat | editorial-estimate |
| flow-0755 | Sentadilla hack en máquina Smith | intermediate | compound | push | squat | editorial-estimate |
| flow-0756 | Elevación de cadera con espalda en banco en máquina Smith | beginner | compound | push | hip-bridge | editorial-estimate |
| flow-0757 | Press de banca en banco inclinado en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-0758 | Press inclinado en máquina Smith (agarre por confirmar) | beginner | compound | push | press | provisional-identity |
| flow-0759 | Elevaciones de hombros inclinadas de Smith. | beginner | isolation | push | scapular-protraction | provisional-identity |
| flow-0760 | Prensa de piernas en máquina Smith | beginner | compound | push | leg-press | provisional-identity |
| flow-1434 | Sentadilla con barra baja en máquina Smith | intermediate | compound | push | squat | editorial-estimate |
| flow-1683 | Curl de bíceps en máquina Smith | beginner | isolation | pull | curl-arm | editorial-estimate |
| flow-1625 | Press de banca con agarre cerrado en banco declinado en máquina Smith | beginner | compound | pull | press | editorial-estimate |
| flow-1752 | Extensión de tríceps en banco inclinado en máquina Smith | beginner | isolation | pull | triceps | editorial-estimate |
| flow-1626 | Press de banca con agarre cerrado y descenso inverso con máquina Smith | beginner | compound | pull | press | provisional-identity |
| flow-0761 | Fila estrecha smith | beginner | compound | pull | row | provisional-identity |
| flow-1360 | Remo a un brazo en máquina Smith | intermediate | compound | pull | row | editorial-estimate |
| flow-1393 | Elevación de talones en el suelo a una pierna en máquina Smith | intermediate | isolation | push | calf | provisional-identity |
| flow-0762 | Remo para deltoides posteriores en máquina Smith | beginner | compound | pull | row | provisional-identity |
| flow-0763 | Elevación de pantorrillas en máquina Smith (variante por confirmar) | beginner | isolation | push | calf | provisional-identity |
| flow-1394 | Elevación de pantorrillas en máquina Smith (variante por confirmar) (ilustración 2) | beginner | isolation | push | calf | provisional-identity |
| flow-1361 | Remo con agarre inverso con el tronco inclinado en máquina Smith | beginner | compound | pull | row | editorial-estimate |
| flow-0764 | Press en máquina Smith (movimiento y agarre por confirmar) | beginner | compound | push | press | provisional-identity |
| flow-1395 | Elevación de talones a una pierna sentado en máquina Smith | intermediate | isolation | push | calf | editorial-estimate |
| flow-0765 | Press de hombros sentado en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-1426 | Flexión de muñecas sentado en máquina Smith | beginner | isolation | pull | wrist-flexion | editorial-estimate |
| flow-0766 | Press de hombros en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-0767 | Encogimiento de hombros en máquina Smith | beginner | isolation | pull | shrug | editorial-estimate |
| flow-0769 | Desplante con pie trasero apoyado en la barra de máquina Smith | intermediate | compound | push | lunge-step | editorial-estimate |
| flow-0770 | Sentadilla en máquina Smith | intermediate | compound | push | squat | editorial-estimate |
| flow-0771 | Smith de pie hacia atrás curl de muñeca | beginner | isolation | pull | wrist-flexion | provisional-identity |
| flow-0772 | Press militar tras nuca de pie en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-0773 | Elevación de talones de pie en máquina Smith | beginner | isolation | push | calf | editorial-estimate |
| flow-0774 | Press militar de pie en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-3142 | Sentadilla sumo en máquina Smith | intermediate | compound | push | squat | editorial-estimate |
| flow-1396 | Elevación del dedo del pie smith | beginner | isolation | pull | reverse-calf | provisional-identity |
| flow-0775 | Remo al mentón en máquina Smith | beginner | compound | pull | row | editorial-estimate |
| flow-1308 | Press de banca con agarre amplio en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-1309 | Press de banca con agarre amplio en banco declinado en máquina Smith | beginner | compound | push | press | editorial-estimate |
| flow-1362 | Extensión de tronco en postura de esfinge | beginner | isometric | static | static-yoga | editorial-estimate |
| flow-0778 | Flexiones de brazos con rodilla hacia el codo del mismo lado | intermediate | compound | push | push-up | editorial-estimate |
| flow-1363 | Estiramiento de espalda sentado con apoyo de manos atrás | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-2329 | Rotación de tronco sentado en el suelo | intermediate | compound | mixed | rotational-mobility | editorial-estimate |
| flow-1705 | Sentadilla sobre BOSU | intermediate | compound | push | squat | editorial-estimate |
| flow-1685 | Sentadilla con elevación de brazos sobre la cabeza al subir | intermediate | compound | push | squat | editorial-estimate |
| flow-1686 | Sentadilla con elevación de brazos y giro de tronco al subir | intermediate | compound | push | squat | editorial-estimate |
| flow-2297 | Crunch sobre pelota de estabilidad con manos detrás de la cabeza y recorrido completo | intermediate | isolation | pull | crunch | editorial-estimate |
| flow-3291 | Prensa stalder | intermediate | compound | push | squat | provisional-identity |
| flow-3669 | Movimiento de arquero de pie con rotación de tronco | expert | compound | mixed | rotational-mobility | editorial-estimate |
| flow-0788 | Prensa de pie detrás del cuello | beginner | compound | push | press | provisional-identity |
| flow-1490 | Elevación de pantorrillas de pie (en una escalera) | beginner | isolation | push | calf | editorial-estimate |
| flow-1397 | Elevación de talones de pie sin peso | beginner | isolation | push | calf | editorial-estimate |
| flow-1398 | Estiramiento de pantorrilla de pie con manos contra la pared | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-1599 | Estiramiento de isquiotibiales y pantorrillas de pie con correa | beginner | isolation | static | static-stretch | editorial-estimate |
| flow-0795 | Curl de pierna de pie sin peso | intermediate | isolation | pull | curl-knee | editorial-estimate |
| flow-0796 | Extensión abdominal con rueda desde posición de pie | expert | compound | pull | ab-wheel | editorial-estimate |
| flow-3223 | Salto de estrella | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-2138 | Pedaleo en bicicleta fija (variante 3) | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-0798 | Pedaleo en bicicleta fija | beginner | compound | mixed | dynamic-cardio | editorial-estimate |
| flow-3314 | Maltés a horcajadas | expert | isometric | static | advanced-static-skill | provisional-identity |
| flow-3298 | Plancha de calistenia con piernas abiertas sin apoyo de pies | expert | isometric | static | advanced-static-skill | editorial-estimate |
| flow-1427 | Elevación lateral de pierna extendida acostado de lado | beginner | isolation | push | hip-isolation | editorial-estimate |
| flow-0803 | Flexiones de brazos con elevación de brazo y pierna contrarios | beginner | isolation | push | back-extension | editorial-estimate |
| flow-0805 | Extensión abdominal de pie con correas de suspensión | intermediate | compound | mixed | moving-plank | editorial-estimate |
| flow-3433 | Patadas de nadador boca abajo (variante 2) | intermediate | isolation | pull | leg-raise | editorial-estimate |
| flow-3318 | Círculos de brazos con rotación de tronco de pie | beginner | compound | mixed | rotational-mobility | editorial-estimate |
| flow-1753 | Tres fondos de banco | intermediate | compound | push | dip | provisional-identity |
| flow-0814 | Fondos de tríceps en banco | beginner | isolation | push | triceps | editorial-estimate |
| flow-0812 | Fondos de tríceps en banco con piernas extendidas | beginner | isolation | push | triceps | editorial-estimate |
| flow-0813 | Fondos de tríceps (entre bancos) | beginner | isolation | push | triceps | editorial-estimate |
| flow-0815 | Fondos para tríceps en el suelo | beginner | isolation | push | triceps | provisional-identity |
| flow-0816 | Prensa de tríceps | beginner | isolation | push | triceps | provisional-identity |

## Reproducción

npm run research:compile, npm run quality:compile, npm run research:report y npm run quality:report. Sin red: las fuentes y decisiones ya están registradas. La línea base previa a esta ampliación es data/localization/metadata-research-baseline.json. Los compiladores fallan ante IDs sin familia o evidencias vencidas; no hay clasificación genérica de respaldo.
