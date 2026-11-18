// Family-level editorial inferences, not claims that a reference describes
// every dataset variant. No catch-all value is permitted: unmatched IDs fail.
const rule=(id,pattern,difficulty,mechanic,force,source)=>({id,pattern,difficulty,mechanic,force,source});
export const researchSources={
  'nsca-complexity':{url:'https://www.nsca.com/contentassets/3d09f06f0b4c4f6fbd8cc382ed1f3d4a/ptq-10.2.1-progressive-strategies-for-teaching-fundamental-resistance-training-movement-patterns.pdf',scope:'Framework for technical complexity and progression; not per-variant difficulty ratings.'},
  'ace-joints':{url:'https://www.acefitness.org/fitness-certifications/ace-answers/exam-preparation-blog/2929/what-is-the-kinetic-chain/',scope:'Single-joint and multi-joint classification terminology.'},
  'hprc-actions':{url:'https://www.hprc-online.org/physical-fitness/training-performance/choosing-right-exercises-optimize-your-resistance-training',scope:'Definitions of push, pull and exercise categories; mixed/static are explicit catalog extensions.'},
  'ace-curl':{url:'https://www.acefitness.org/resources/everyone/exercise-library/184/seated-biceps-curl/',scope:'Supported machine biceps curl reference; variants are editorial inferences.'},
  'ace-plank':{url:'https://www.acefitness.org/resources/everyone/exercise-library/32/front-plank/',scope:'Front plank reference; other core variants are not individually certified.'},
  'ace-press':{url:'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/',scope:'Supported seated machine chest press reference.'},
  'ace-clean-press':{url:'https://www.acefitness.org/resources/everyone/exercise-library/383/clean-and-press/',scope:'Kettlebell clean-and-press reference: advanced, integrated movement.'},
  'ace-swing':{url:'https://www.acefitness.org/resources/everyone/exercise-library/391/swing/',scope:'Two-hand kettlebell swing reference: intermediate.'},
  'ace-leg-extension':{url:'https://www.acefitness.org/resources/everyone/exercise-library/133/standing-leg-extension/',scope:'Knee extension and effects of support, resistance and unstable surfaces.'},
  'nasm-leg-curl':{url:'https://www.nasm.org/resource-center/exercise-library/seated-leg-curl',scope:'Seated knee-flexion reference; does not resolve dataset animation conflicts.'},
  'nasm-progression':{url:'https://www.nasm.org/resource-center/blog/training/strength-training-routines-beginners',scope:'Stability, coordination and unilateral progression principles.'},
  'nasm-isometric':{url:'https://www.nasm.org/resource-center/exercise-library/plank',scope:'Isometric core activity; not a rating for every static hold.'},
  'ace-stretch-types':{url:'https://www.acefitness.org/fitness-certifications/ace-answers/exam-preparation-blog/2966/types-of-stretching/',scope:'Distinction between sustained static stretching and continuous dynamic mobility.'},
  'fig-elements':{url:'https://www.gymnastics.sport/site/pages/disciplines/ele-aer.php',scope:'Gymnastics distinguishes static strength supports/planches from dynamic strength and balance elements.'},
};

export const familyRules=[
  rule('dynamic-mobility',/dynamic.*stretch|rocking.*stretch|circles.*stretch|pose sequence/,'beginner','compound','mixed','ace-stretch-types'),
  rule('row',/rear.*row|crossover.*row/,'beginner','compound','pull','nsca-complexity'),
  rule('squat',/(?:clean.grip.*squat|squat.*clean grip)/,'intermediate','compound','push','nsca-complexity'),
  rule('hinge',/glute.ham raise/,'intermediate','compound','pull','nsca-complexity'),
  rule('back-extension',/lower back curl/,'beginner','isolation','pull','ace-joints'),
  rule('crunch',/curl.up/,'beginner','isolation','pull','ace-plank'),
  rule('mixed-combination',/curl.*press|cuban.*press|push.up.*side.plank/,'intermediate','compound','mixed','nsca-complexity'),
  rule('moving-plank',/plank.*(?:twist|fly|tap|point)|front lever reps|pull.in.*stability ball/,'intermediate','compound','mixed','ace-plank'),
  rule('vertical-pull',/biceps.*pull.up|cross.over.*pulldown/,'intermediate','compound','pull','nsca-complexity'),
  rule('rotational-core',/lower body rotation/,'intermediate','compound','mixed','nsca-complexity'),
  rule('scapular-protraction',/incline.*shoulder raise|elevaci[oó]n escapular/,'beginner','isolation','push','ace-joints'),
  rule('forearm-rotation',/pronation|supination|pronaci[oó]n|supinaci[oó]n/,'beginner','isolation','mixed','ace-joints'),
  rule('side-bend',/side ben[dt]|flexi[oó]n lateral.*tronco/,'beginner','isolation','mixed','ace-joints'),
  rule('finger-grip',/gripper hands|cierre de manos/,'beginner','isolation','pull','ace-joints'),
  rule('rotational-mobility',/toe touch|spine twist|circular.*arms|swing 360|around world|standing archer/,'beginner','compound','mixed','nasm-progression'),
  rule('body-crawl',/inchworm|bear crawl|caminata de gusano/,'intermediate','compound','mixed','nsca-complexity'),
  rule('static-yoga',/yoga pose|reclining big toe|seated wide angle pose|sphinx|sost[eé]n en l|l-sit|isometric chest squeeze/,'beginner','isometric','static','ace-plank'),
  rule('bicycle-core',/lying elbow to knee|elbow to knee|air bike|bicycle/,'beginner','compound','mixed','ace-plank'),
  rule('adduction-band-walk',/monster walk|lateral.*walk|caminata lateral/,'beginner','compound','mixed','nasm-progression'),
  rule('kettlebell-transfer',/figure 8|figura.*ocho|sumo high pull|pase.*pesa rusa.*ocho/,'intermediate','compound','mixed','ace-swing'),
  rule('advanced-static-skill',/\b(?:front lever|back lever|maltese|full planche|straddle planche|handstand)\b(?!.*(?:push.up|walk))/,'expert','isometric','static','fig-elements'),
  rule('advanced-integrated-skill',/muscle.up|planche.*push|handstand.*push|stalder|skin the cat|hefesto/,'expert','compound','mixed','nsca-complexity'),
  rule('integrated-lifts',/clean.*press|clean.*jerk|snatch|\bjerk\b|thruster|tire flip/,'expert','compound','mixed','ace-clean-press'),
  rule('clean',/\bclean\b/,'intermediate','compound','pull','ace-clean-press'),
  rule('kettlebell-swing',/kettlebell.*swing|swing.*kettlebell/,'intermediate','compound','pull','ace-swing'),
  rule('static-stretch',/\bstretch\b|\bstretching\b/,'beginner','isolation','static','ace-stretch-types'),
  rule('self-massage',/\bsmr\b|self.myofascial|foam.*massage/,'beginner','not-applicable','not-applicable','nasm-progression'),
  rule('arm-leg-circles',/circle|circling|wrist.*rotation|ankle.*rotation|neck.*rotation|head.*rotation/,'beginner','isolation','mixed','nasm-progression'),
  rule('mixed-combination',/curl.*(?:squat|lunge|step)|(?:squat|lunge|step).*curl|squat.*row|squat.*press|lunge.*triceps|push.up.*(?:knee|mountain|rotation)|roll.*(?:twist|rotation)/,'intermediate','compound','mixed','nsca-complexity'),
  rule('ballistic-full-body',/burpee|slam|throw|chest pass|battling.*rope|battle.*rope|sledge hammer/,'intermediate','compound','mixed','nsca-complexity'),
  rule('dynamic-cardio',/\brun(?:ning)?\b|jog|elliptical|stationary bike|cycling|pedal|stepmill|ski.*erg|star jump|jumping jack|skater|skipping|jump rope|high knee|quick feet|punch|boxing/,'beginner','compound','mixed','nasm-progression'),
  rule('jump',/\bjump|plyo|hop\b|leap/,'intermediate','compound','push','nsca-complexity'),
  rule('balance',/balance board|single.leg balance|frog planche/,'intermediate','isometric','static','nasm-progression'),
  rule('pallof',/pallof|anti.rotation/,'intermediate','isometric','static','ace-plank'),
  rule('moving-plank',/plank.*(?:walk|leg|hip|reach|knee|touch)|body saw|mountain climber/,'intermediate','compound','mixed','ace-plank'),
  rule('static-plank',/\bplank\b|lean planche|prone cobra|isometric hold/,'intermediate','isometric','static','nasm-isometric'),
  rule('supine-lower-limb-flexion',/$a/,'beginner','compound','pull','nsca-complexity'),
  rule('unstable-trunk-control',/$a/,'intermediate','compound','mixed','nasm-progression'),
  rule('ab-wheel',/rollerout|rollout|wheel.*roll|ab.*wheel/,'intermediate','compound','pull','ace-plank'),
  rule('rotational-core',/russian twist|woodchop|wood chop|cable lift|spell caster|landmine.*twist|trunk.*rotation|twisting.*crunch|oblique.*twist/,'intermediate','compound','mixed','nsca-complexity'),
  rule('wrist-extension',/reverse.*wrist|wrist.*extension|revers wrist/,'beginner','isolation','push','ace-joints'),
  rule('wrist-flexion',/wrist.*curl|wrist.*flex|finger curl/,'beginner','isolation','pull','ace-joints'),
  rule('curl-knee',/leg curl|hamstring curl|leg.*curling/,'beginner','isolation','pull','nasm-leg-curl'),
  rule('curl-arm',/\bcurl|biceps|bicep|brachialis/,'beginner','isolation','pull','ace-curl'),
  rule('knee-extension',/leg extension|knee extension/,'beginner','isolation','push','ace-leg-extension'),
  rule('reverse-calf',/reverse calf|toe raise|tibialis/,'beginner','isolation','pull','ace-joints'),
  rule('calf',/calf|calves|heel raise/,'beginner','isolation','push','ace-joints'),
  rule('triceps',/tricep|skull crusher|french press|tate press/,'beginner','isolation','push','ace-joints'),
  rule('rear-shoulder',/reverse fly|revers fly|rear fly|rear.*raise|rear lateral|reverse pec|rear delt|rear deltoid/,'beginner','isolation','pull','ace-joints'),
  rule('shoulder-raise',/lateral raise|side raise|front raise|forward raise|front shoulder raise|shoulder flex|iron cross|raise.*(?:y|t)\b|\by raise\b/,'beginner','isolation','push','ace-joints'),
  rule('hip-rotation',/hip.*(?:internal|external).*rotation/,'beginner','isolation','mixed','ace-joints'),
  rule('shoulder-rotation',/external.*rotation|internal.*rotation|rotator cuff|cuban/,'intermediate','isolation','mixed','ace-joints'),
  rule('chest-fly',/\bfly\b|crossover|cross.over|pec deck|pec fly/,'beginner','isolation','push','ace-press'),
  rule('pullover',/pullover|straight.arm.*pulldown/,'beginner','isolation','pull','ace-joints'),
  rule('shrug',/shrug|scapular.*pull/,'beginner','isolation','pull','ace-joints'),
  rule('hip-isolation',/hip abduction|hip adduction|hip extension|glute.*kick|kickback.*glute|donkey kick|abductor|adductor/,'beginner','isolation','push','ace-joints'),
  rule('hip-bridge',/glute bridge|hip thrust|hip raise|hip lift|pelvic.*tilt|pelvic.*lift/,'beginner','compound','push','nasm-progression'),
  rule('hinge',/deadlift|good morning|pull.through|windmill/,'intermediate','compound','pull','nsca-complexity'),
  rule('back-extension',/hyperextension|back extension|spine extension|superman/,'beginner','isolation','pull','ace-joints'),
  rule('squat',/squat|knee bend/,'intermediate','compound','push','nsca-complexity'),
  rule('lunge-step',/lunge|step.up|step down|step.down|stepup|split stance/,'intermediate','compound','push','nsca-complexity'),
  rule('leg-press',/leg press|leg.*press|sled.*press/,'beginner','compound','push','ace-leg-extension'),
  rule('push-up',/push.up|push up/,'intermediate','compound','push','ace-press'),
  rule('dip',/\bdip|elbow dip/,'intermediate','compound','push','ace-press'),
  rule('press',/\bpress\b|chest.*push/,'beginner','compound','push','ace-press'),
  rule('vertical-pull',/pull.up|pullup|chin.up|pulldown|pull.down|climb/,'intermediate','compound','pull','nsca-complexity'),
  rule('row',/\brow\b|rowing/,'beginner','compound','pull','nsca-complexity'),
  rule('leg-raise',/leg raise|leg.*raising|knee raise|knee.up|knee tuck|hanging.*leg|leg pull.in|flutter kick|scissor/,'intermediate','isolation','pull','ace-plank'),
  rule('crunch',/crunch|sit.up|sit up|situp|heel touch|dead bug|jackknife|jack knife|v.up|v.up|cocoon|butt.up|bottoms up|air bike|bicycle/,'beginner','isolation','pull','ace-plank'),
  rule('carry',/carry|farmers walk|farmer.*walk/,'intermediate','compound','mixed','nsca-complexity'),
];

// Observations already recorded in the per-ID visual/title audit take priority
// over a misleading source label. They do not close the identity conflict.
export const observedOverrides={
  'flow-3291':{family:'squat',reason:'Existing title audit describes a squat, not a Stalder inversion.'},
  'flow-0763':{family:'calf',reason:'Existing title audit and instructions describe raising heels, despite the reverse-calf label.'},
  'flow-1394':{family:'calf',reason:'Existing title audit and instructions describe plantar flexion, not confirmed dorsiflexion.'},
  'flow-2286':{family:'leg-press',reason:'Existing visual audit describes a seated leg press, not a glute kickback.'},
  'flow-0436':{family:'triceps',reason:'Triceps source target; precise Tate-press identity remains pending.'},
  'flow-1301':{family:'press',reason:'Press confirmed in phase 4; source movementPattern incorrectly says pull_v.'},
  'flow-1721':{family:'triceps',reason:'Source text describes elbow extension with upper arms stationary.'},
  'flow-0230':{family:'rotational-core',reason:'Source text describes diagonal cable lift and torso rotation.'},
  'flow-0337':{family:'triceps',reason:'Source target and text specify elbow extension; path across face remains unresolved.'},
  'flow-0339':{family:'supine-lower-limb-flexion',reason:'Three frames inspected: supine bilateral knee/hip flexion with load held over abdomen. Claimed hamstring exercise identity and effectiveness are not verified; classification describes the depicted motion only.'},
  'flow-1338':{family:'unstable-trunk-control',reason:'Three frames inspected: seated on one ball, holding another and changing trunk position. Setup conflict remains; classification describes the depicted whole-body control, not a confirmed named exercise.'},
  'flow-3303':{family:'advanced-static-skill',reason:'Source text and prior title audit describe an unsupported horizontal human flag hold.'},
  'flow-3419':{family:'advanced-static-skill',reason:'Unsupported L-sit hold is a gymnastics support, not a beginner yoga pose.'},
  'flow-0543':{family:'integrated-lifts',reason:'Verified Spanish title and source steps describe a kettlebell clean followed by overhead press.'},
  'flow-0705':{family:'static-plank',reason:'Source steps describe holding the side-plank position.'},
};

export function classifyResearchExercise(e) {
  const name=e.name.toLowerCase();
  const override=observedOverrides[e.id];
  let family=override?familyRules.find(r=>r.id===override.family):familyRules.find(r=>r.pattern.test(name));
  if(!family) {
    const title=e.nameEs.toLowerCase();
    const reviewedTerminology=[
      ['triceps',/tr[ií]ceps|extensi[oó]n.*antebrazos/],['curl-arm',/curl.*b[ií]ceps/],
      ['pullover',/jal[oó]n con brazos extendidos|pullover/],['rear-shoulder',/apertura.*inversa|elevaci[oó]n.*\b[ty]\b/],
      ['shoulder-raise',/elevaci[oó]n.*(?:lateral|frontal)|elevaciones.*(?:lateral|frontal)|elevaciones con mancuernas|brazos.*arriba/],
      ['press',/press.*(?:pecho|hombro)|press con|press.*soportes/],['vertical-pull',/dominada|tracci[oó]n trasera|puente de londres/],
      ['hinge',/peso muerto|buenos d[ií]as/],['hip-bridge',/puente de gl[uú]teos/],['back-extension',/extensi[oó]n.*tronco|piernas boca abajo/],
      ['squat',/sentadilla|marcha.*pared/],['lunge-step',/desplante|paso hacia adelante|saltos laterales/],
      ['row',/remo/],['push-up',/flexi[oó]n.*brazo|flexiones.*brazo/],['moving-plank',/toques alternos de hombro|extensi[oó]n abdominal/],
      ['leg-raise',/elevaci[oó]n.*pierna|extensi[oó]n y flexi[oó]n de piernas|elevaci[oó]n.*rodilla|balanceo lateral de piernas|patadas de nadador/],
      ['crunch',/abdominal|incorporaci[oó]n/],['rotational-core',/giro|rotaci[oó]n|torsiones|torsi[oó]n/],
      ['static-stretch',/estiramiento/],['dynamic-cardio',/bicicleta|erg[oó]metro|esquiador/],
    ];
    const matched=reviewedTerminology.find(([,pattern])=>pattern.test(title));
    if(matched)family=familyRules.find(r=>r.id===matched[0]);
  }
  if(!family)return null;
  let difficulty=family.difficulty;
  const modifiers=[];
  if(/wall push|incline push|assisted.*(?:pull|dip)|machine|lever /.test(name) && ['push-up','vertical-pull','dip','press','squat','leg-press'].includes(family.id)) {difficulty='beginner';modifiers.push('external-support-or-assistance');}
  if(/single.leg|one.leg|one arm|single.arm|stability ball|exercise ball|bosu|suspended|suspension|alternat|twist|rotation|decline push/.test(name) && difficulty==='beginner') {difficulty='intermediate';modifiers.push('unilateral-coordination-or-stability');}
  if(/pistol|archer|one.arm push|single.arm push|one.hand.*push|(?:standing|from bench).*roll(?:er)?out|front lever|back lever|maltese|planche.*push|handstand.*push/.test(name)) {difficulty='expert';modifiers.push('advanced-leverage-or-bodyweight-skill');}
  if(/sprint|hurdle|agility|quick feet/.test(name) && difficulty==='beginner'){difficulty='intermediate';modifiers.push('speed-and-coordination');}
  return {family:family.id,difficulty,mechanic:family.mechanic,force:family.force,source:family.source,modifiers,...(override?{observation:override.reason}:{})};
}
