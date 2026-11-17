// Curated terminology, separate from machine drafts. Unrecognized combinations
// are explicitly queued for review rather than treated as verified variants.
export const sources = [
  {id:'smartfit-mx-peso-libre',url:'https://smartfit.com.mx/news/comunidad-smart-fit/que-hay-en-un-gimnasio-smart-fit-conoce-el-area-de-peso-libre/',scope:'Uso mexicano: press, curl, desplantes, aperturas y equipo; no verifica todas las variantes.'},
  {id:'smartfit-mx-dominadas',url:'https://smartfit.com.mx/news/tips/tipos-de-dominadas-y-como-hacerlas-en-el-gimnasio/',scope:'Familia de dominadas y diferencias entre agarre prono, supino y neutro.'},
  {id:'smartfit-mx-agarres',url:'https://smartfit.com.mx/news/tips/diferentes-tipos-de-agarre-en-el-gym/',scope:'Nombres y orientación de los agarres; neutro o martillo no equivale a supino.'},
  {id:'smartfit-mx-flexiones',url:'https://smartfit.com.mx/news/rutinas/realiza-tu-rutina-tabata-en-casa-video/',scope:'Uso de flexiones de brazos y lagartijas en México. No se importan las pautas de entrenamiento.'},
  {id:'mayo-crunch',url:'https://www.mayoclinic.org/es/healthy-lifestyle/fitness/multimedia/abdominal-crunch/vid-20084664',scope:'Crunch: elevación parcial del tronco; no se equipara a una incorporación completa.'},
  {id:'mayo-fuerza',url:'https://www.mayoclinic.org/es/healthy-lifestyle/fitness/in-depth/strength-training/art-20046031',scope:'Terminología general de fortalecimiento; no es una validación individual del catálogo.'},
  {id:'vivagym-mancuernas',url:'https://www.vivagym.com/es-es/ejercicios-mancuernas/',scope:'Familias de movimientos con mancuernas. Se contrasta la variante con los datos originales.'},
  {id:'musclewiki-press-declinado',url:'https://musclewiki.com/es-es/exercises/chest/dumbbells/3?model=f',scope:'Nomenclatura de press declinado, unilateral y agarre neutro. No se copian sus instrucciones.'},
];

const roots = [
 ['reverse hyperextension','Hiperextensiones inversas'],['hip abduction','Abducción de cadera'],['hip adduction','Aducción de cadera'],
 ['hip internal rotation','Rotación interna de cadera'],['external shoulder rotation','Rotación externa de hombro'],['shoulder external rotation','Rotación externa de hombro'],
 ['reverse wrist curl','Extensión de muñecas'],['revers wrist curl','Extensión de muñecas'],['neutral wrist curl','Flexión de muñecas con agarre neutro'],['wrist curl','Flexión de muñecas'],
 ['hammer preacher curl','Curl predicador con agarre martillo'],['reverse preacher curl','Curl predicador con agarre prono'],['zottman preacher curl','Curl predicador Zottman'],
 ['preacher curl','Curl predicador'],['peacher hammer curl','Curl predicador con agarre martillo'],['hammer curl','Curl martillo'],['hammer curls','Curl martillo'],
 ['concentration curl','Curl concentrado'],['spider curl','Curl araña'],['zottman curl','Curl Zottman'],['reverse curl','Curl de bíceps con agarre prono'],['drag curl','Curl de arrastre'],
 ['biceps curl','Curl de bíceps'],['bicep curl','Curl de bíceps'],['biceps curls','Curl de bíceps'],
 ['romanian deadlift','Peso muerto rumano'],['stiff leg deadlift','Peso muerto con piernas rígidas'],['straight leg deadlift','Peso muerto con piernas extendidas'],['deadlift','Peso muerto'],
 ['goblet squat','Sentadilla goblet'],['pistol squat','Sentadilla a una pierna (pistol)'],['zercher squat','Sentadilla Zercher'],['hack squat','Sentadilla hack'],
 ['front squat','Sentadilla frontal'],['full squat','Sentadilla profunda'],['split squat','Sentadilla con pies en posición dividida'],['squat','Sentadilla'],
 ['bench press','Press de banca'],['chest press','Press de pecho'],['shoulder press','Press de hombros'],['military press','Press militar'],['overhead press','Press por encima de la cabeza'],
 ['hammer press','Press de pecho con agarre neutro'],['palm-in press','Press con agarre neutro'],['palms in press','Press con agarre neutro'],
 ['reverse fly','Aperturas inversas'],['revers fly','Aperturas inversas'],['rear fly','Aperturas inversas'],['chest fly','Aperturas de pecho'],['twist fly','Aperturas con giro'],['twisted flyes','Aperturas con giro'],['flyes','Aperturas'],['fly','Aperturas'],
 ['rear lateral raise','Elevaciones para deltoides posteriores'],['rear delt raise','Elevaciones para deltoides posteriores'],['lateral raise','Elevaciones laterales'],['front raise','Elevaciones frontales'],['forward raise','Elevaciones frontales'],['front shoulder raise','Elevaciones frontales'],
 ['rear delt row','Remo para deltoides posteriores'],['t-bar row','Remo en barra T'],['t bar row','Remo en barra T'],['upright row','Remo al mentón'],['high row','Remo alto'],['low row','Remo bajo'],['row','Remo'],
 ['tricep pushdown','Extensión de tríceps en polea alta'],['triceps pushdown','Extensión de tríceps en polea alta'],['triceps extension','Extensión de tríceps'],['tricep extension','Extensión de tríceps'],['kickbacks','Patada de tríceps'],['kickback','Patada de tríceps'],
 ['reverse calf raise','Elevación de puntas'],['reverse calf raises','Elevación de puntas'],['calf raises','Elevación de talones'],['calf raise','Elevación de talones'],['calf press','Extensión de tobillos en prensa'],
 ['lateral pulldown','Jalón dorsal'],['lat pulldown','Jalón dorsal'],['pulldown','Jalón dorsal'],
 ['glute bridge','Puente de glúteos'],['hip thrusts','Empuje de cadera (hip thrust)'],['hip extension','Extensión de cadera'],['hip raise','Elevación de cadera'],['hip lift','Elevación de cadera'],
 ['triceps dip','Fondos para tríceps'],['triceps dips','Fondos para tríceps'],['chest dip','Fondos para pecho'],['bench dip','Fondos en banco'],['dip','Fondos'],
 ['pull-ups','Dominadas'],['pull-up','Dominadas'],['pull up','Dominadas'],['chin-up','Dominadas con agarre supino'],['chin','Dominadas con agarre supino'],
 ['push-ups','Flexiones de brazos'],['push-up','Flexiones de brazos'],['push up','Flexiones de brazos'],
 ['knee raise','Elevación de rodillas'],['leg raise','Elevación de piernas'],['leg hip raise','Elevación de piernas y cadera'],['leg-hip raise','Elevación de piernas y cadera'],
 ['reverse crunch','Crunch inverso'],['bicycle crunch','Crunch bicicleta'],['side crunch','Crunch lateral'],['oblique crunch','Crunch oblicuo'],['crunches','Crunch abdominal'],['crunch','Crunch abdominal'],
 ['sit-up','Incorporaciones de tronco'],['sit up','Incorporaciones de tronco'],
 ['leg extension','Extensión de rodillas'],['leg curl','Curl femoral'],['leg press','Prensa de piernas'],['good morning','Buenos días'],['shrug','Encogimiento de hombros'],
 ['side bend','Flexión lateral de tronco'],['side bent','Flexión lateral de tronco'],['step-up','Subida al banco'],['step up','Subida al banco'],['lunge','Desplante'],
 ['back extension','Extensión de espalda'],['hyperextension','Hiperextensiones'],['pullover','Pullover (extensión de hombros)'],['curl','Curl de bíceps'],
];
const equipment = [['resistance band','con banda de resistencia'],['olympic barbell','con barra olímpica'],['ez barbell','con barra Z'],['ez-barbell','con barra Z'],['ez-bar','con barra Z'],['ez bar','con barra Z'],['dumbbells','con mancuernas'],['dumbbell','con mancuernas'],['barbell','con barra'],['kettlebell','con pesa rusa'],['cable','en polea'],['smith machine','en máquina Smith'],['smith','en máquina Smith'],['lever','en máquina de palanca'],['sled','en máquina de trineo'],['band','con banda elástica'],['bodyweight','con peso corporal']];
const modifiers = [
 ['on exercise ball','sobre pelota de estabilidad'],['on stability ball','sobre pelota de estabilidad'],['exercise ball','sobre pelota de estabilidad'],['stability ball','sobre pelota de estabilidad'],['on bosu ball','sobre BOSU'],['bosu ball','sobre BOSU'],
 ['on flat bench','en banco plano'],['flat bench','en banco plano'],['incline bench','en banco inclinado'],['over incline bench','con apoyo en banco inclinado'],['over a bench','con apoyo en banco'],['over bench','con apoyo en banco'],['on bench','en banco'],['on floor','en el suelo'],['floor','en el suelo'],
 ['with rope attachment','con cuerda'],['with rope','con cuerda'],['with arm blaster','con soporte para brazos (arm blaster)'],['with support','con apoyo'],['support head','con apoyo de la cabeza'],['with towel','con toalla'],
 ['close-grip','con agarre cerrado'],['close grip','con agarre cerrado'],['narrow grip','con agarre cerrado'],['wide-grip','con agarre amplio'],['wide grip','con agarre amplio'],['reverse-grip','con agarre inverso'],['reverse grip','con agarre inverso'],['revers grip','con agarre inverso'],['underhand','con agarre supino'],['overhand','con agarre prono'],['parallel grip','con agarre neutro'],['neutral grip','con agarre neutro'],['hammer grip','con agarre neutro'],['palms in','con agarre neutro'],['palm in','con agarre neutro'],['palms up','con palmas hacia arriba'],['palms down','con palmas hacia abajo'],
 ['one arm','a un brazo'],['single arm','a un brazo'],['two arm','a dos brazos'],['one leg','a una pierna'],['single leg','a una pierna'],['two legs','con ambas piernas'],['two-one','con subida bilateral y bajada unilateral'],
 ['alternating','alterno'],['alternate','alterno'],['seated','sentado'],['sitted','sentado'],['standing','de pie'],['kneeling','de rodillas'],['lying','acostado'],['prone','boca abajo'],['supine','boca arriba'],
 ['bent over','con el tronco inclinado'],['bent-over','con el tronco inclinado'],['incline','en banco inclinado'],['decline','en banco declinado'],['overhead','por encima de la cabeza'],['hanging','colgado en barra'],['assisted','asistido'],['bent knee','con rodillas flexionadas'],['bent knees','con rodillas flexionadas'],['straight leg','con piernas extendidas'],['straight arms','con brazos extendidos'],['straight arm','con brazos extendidos'],
 ['narrow stance','con postura cerrada'],['wide stance','con postura amplia'],['high bar','con barra alta'],['low bar','con barra baja'],['behind neck','tras nuca'],['behind head','detrás de la cabeza'],['rear','posterior'],['front','frontal'],['lateral','lateral'],['wide','con postura amplia'],['full','con recorrido completo'],['bent arm','con codos flexionados'],['inner','con énfasis interno'],['parallel','con agarres paralelos'],['horizontal','horizontal'],['vertical','vertical'],['twisting','con rotación'],['twist','con rotación'],['biceps','para bíceps'],['on knees','con apoyo de rodillas'],['bench','en banco'],
];
export function editorialName(original) {
  let rest = original.toLowerCase().replace(/\b(?:male|female)\b/g,'').replace(/\((?:back|side) pov\)/g,'').replace(/_/g,' ').replace(/one-arm/g,'one arm').replace(/single-arm/g,'single arm').replace(/one-leg/g,'one leg').replace(/single-leg/g,'single leg');
  const version = rest.match(/v\.\s*(\d+)/)?.[1]; rest = rest.replace(/v\.\s*\d+/g,'');
  const gear = [];
  for (const [en,es] of equipment) if (rest.startsWith(en+' ')) { gear.push(es);rest=rest.slice(en.length).trim();break; }
  let root;
  for (const [en,es] of roots) { const re=new RegExp('\\b'+en+'\\b'); if(re.test(rest)){root=es;rest=rest.replace(re,' ');break;} }
  if(!root) return null;
  const parts=[];
  for(const [en,es] of modifiers){ if(rest.includes(en)){parts.push(es);rest=rest.replaceAll(en,' ');} }
  rest=rest.replace(/[()\s.,-]/g,'');
  if(rest) return null; // Never silently drop an unrecognized variant.
  return [root,...parts,...gear,version?`(variante ${version})`:null].filter(Boolean).join(' ');
}
