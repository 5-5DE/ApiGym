// Language corrections do not resolve the recorded technical contradictions.
export const languageNames = {
  'flow-1640':'Curl predicador a un brazo con cuerda en polea (agarre por confirmar)',
  'flow-2464':'Remo a un brazo sentado en polea baja (variante por confirmar)',
  'flow-0526':'Cargada desde suspensión con dos pesas rusas (alternancia por confirmar)',
  'flow-0747':'Press tras nuca en máquina Smith (postura por confirmar)',
  'flow-1282':'Press a un brazo con mancuerna sobre pelota de estabilidad (inclinación por confirmar)',
  'flow-0764':'Press en máquina Smith (movimiento y agarre por confirmar)',
  'flow-0758':'Press inclinado en máquina Smith (agarre por confirmar)',
  'flow-0436':'Ejercicio de tríceps con mancuernas (variante por confirmar)',
  'flow-0763':'Elevación de pantorrillas en máquina Smith (variante por confirmar)',
  'flow-1394':'Elevación de pantorrillas en máquina Smith (variante por confirmar)',
};

// Editorial selection, not a usage statistic or a prescribed routine. Group
// classifications refer to joint action in the existing source and title review.
export const basicGroups = [
  {mechanic:'compound',force:'push',ids:[
    'Barbell_Full_Squat','Dumbbell_Squat','Barbell_Lunge','Dumbbell_Rear_Lunge','Smith_Single-Leg_Split_Squat',
    'Dumbbell_Bench_Press','flow-0025','flow-0030','flow-0033','flow-0047','flow-0122','flow-0301','flow-0314','flow-0340',
    'flow-0405','flow-0426','flow-2137','flow-0576','flow-0603','flow-0748','flow-0757','flow-0765','flow-0774',
    'flow-0042','flow-1760','flow-0410','flow-0534','flow-0739','flow-0740','flow-0743','flow-0744','flow-0770','flow-3281',
    'flow-0336','flow-3470','flow-0662','Incline_Push-Up','Decline_Push-Up','flow-0251','flow-0019',
  ]},
  {mechanic:'compound',force:'pull',ids:[
    'Barbell_Deadlift','Trap_Bar_Deadlift','flow-0085','flow-0117','flow-0432','flow-0300','flow-1757','flow-0752',
    'Chin-Up','Band_Assisted_Pull-Up','flow-0652','flow-0015','flow-0017','flow-0198','flow-0245','flow-2616',
    'flow-0177','flow-0579','flow-0673','flow-0861','flow-0239','flow-0213','flow-0027','flow-3017',
    'Dumbbell_Incline_Row','flow-0292','flow-0293','Inverted_Row','Suspended_Row','flow-1350','flow-0588','flow-0606','flow-0120',
  ]},
  {mechanic:'isolation',force:'pull',ids:[
    'Barbell_Curl','Cable_Preacher_Curl','flow-0070','flow-0080','flow-0106','flow-0113','flow-0165',
    'flow-0190','flow-0285','flow-0294','flow-0297','flow-0298','flow-0315','flow-0318','flow-0320',
    'flow-0372','flow-0382','flow-0391','flow-0416','flow-0421','flow-0439','flow-0447','flow-0592','flow-0575',
    'flow-0586','flow-0602','flow-0378','flow-0237','flow-0238','flow-0375',
    'Dumbbell_Shrug','Barbell_Shrug','flow-0767','flow-0604',
  ]},
  {mechanic:'isolation',force:'push',ids:[
    'Cable_Incline_Triceps_Extension','flow-0194','flow-0200','flow-0201','flow-0207','flow-0241',
    'flow-0109','flow-0351','flow-0389','flow-0423','flow-0453','flow-0607',
    'flow-0585','flow-0605','flow-0594','Barbell_Seated_Calf_Raise','flow-0417','flow-0773',
    'flow-0334','flow-0192','flow-0355','flow-0396','flow-0310','flow-0162','flow-0584',
  ]},
  {mechanic:'isolation',force:null,ids:['flow-0596','flow-0597','flow-0598','flow-0228']},
  {mechanic:null,force:null,ids:[
    'Hanging_Leg_Raise','Reverse_Crunch','Russian_Twist','Air_Bike','Dead_Bug','Alternate_Heel_Touchers',
    'flow-2355','flow-0630','flow-0705','flow-1452','flow-0798','Barbell_Glute_Bridge','flow-0685','flow-0488',
  ]},
];
