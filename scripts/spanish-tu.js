// Grammatical register only. These edits never approve technique or change
// loads, equipment, grip, range, repetitions or review status.
const verbs = {
  haga:'haz', contraiga:'contrae', inhale:'inhala', exhale:'exhala', mantenga:'mantén', sostenga:'sostén',
  coloque:'coloca', regrese:'regresa', extienda:'extiende', flexione:'flexiona', levante:'levanta', baje:'baja',
  repita:'repite', comience:'comienza', empiece:'empieza', tire:'tira', empuje:'empuja', gire:'gira',
  mueva:'mueve', lleve:'lleva', tome:'toma', use:'usa', utilice:'utiliza', evite:'evita', permita:'permite',
  deje:'deja', apriete:'aprieta', asegure:'asegura', bloquee:'bloquea', retraiga:'retrae', relaje:'relaja',
  cambie:'cambia', alterne:'alterna', doble:'dobla', junte:'junta', separe:'separa', ajuste:'ajusta',
  eleve:'eleva', sujete:'sujeta', agarre:'agarra', coloque:'coloca', apoye:'apoya', cruce:'cruza',
  mire:'mira', salte:'salta', empiece:'empieza', realice:'realiza', intente:'intenta', respire:'respira',
  presione:'presiona', incline:'inclina', suba:'sube', vuelva:'vuelve', siga:'sigue', continúe:'continúa',
  asegúrese:'asegúrate', colóquese:'colócate', recuéstese:'recuéstate', acuéstese:'acuéstate',
  siéntese:'siéntate', párese:'párate', levántese:'levántate', bájese:'bájate', inclínese:'inclínate',
  manténgase:'mantente', apóyese:'apóyate', arrodíllese:'arrodíllate', agáchese:'agáchate',
  concéntrese:'concéntrate', pídale:'pídele', manténgala:'mantenla', manténgalo:'mantenlo',
  manténgalas:'mantenlas', manténgalos:'mantenlos', levántelo:'levántalo', levántela:'levántala',
  levántelos:'levántalos', levántelas:'levántalas', extiéndalos:'extiéndelos', extiéndalas:'extiéndelas',
  sosténgalo:'sostenlo', sosténgala:'sostenla', sosténgalos:'sostenlos', sosténgalas:'sostenlas',
  bájelo:'bájalo', bájela:'bájala', dé:'da', ensanche:'ensancha', aleje:'aleja', acerque:'acerca',
  involucre:'involucra', conecte:'conecta', instale:'instala', sujétese:'sujétate', enganche:'engancha',
  fije:'fija', suelte:'suelta', camine:'camina', estire:'estira', configure:'configura', cuélguese:'cuélgate',
  inicie:'inicia', libere:'libera', invierta:'invierte', aléjese:'aléjate', asuma:'asume', pase:'pasa',
  retire:'retira', tenga:'ten', suspenda:'suspende', saque:'saca', sienta:'siente', cuelgue:'cuelga',
  necesitará:'necesitarás', devuelva:'devuelve', adopte:'adopta', ancle:'ancla', active:'activa',
  avance:'avanza', estírese:'estírate', encuentre:'encuentra', balancee:'balancea', deslice:'desliza',
  atrape:'atrapa', retroceda:'retrocede', destrabe:'destraba', disminuya:'disminuye', enfríe:'enfría',
  cargue:'carga', empújelo:'empújalo', empújela:'empújala',
};
const alternation = Object.keys(verbs).sort((a,b)=>b.length-a.length).join('|');
const pattern = new RegExp(`(?<![\\p{L}])(${alternation})(?![\\p{L}])`, 'giu');
const bodySubject = /(?:la|el|los|las|una?|tus?)\s+(?:barra|peso|mancuerna|brazo|pierna|rodilla|codo|cadera|pelvis|pecho|torso|cuerpo|banda|cable|talón|hombro|mano|pie|antebrazo)(?:\s+(?:de|del|la|el|tu|derech[oa]|izquierd[oa]|se|no)){0,3}\s*$/iu;
const initialCase = (from, to) => from[0] === from[0].toUpperCase() ? to[0].toUpperCase()+to.slice(1) : to;
const protectedContext = (word, prefix) =>
  (['agarre','empuje','pase','cruce','avance','ajuste'].includes(word.toLowerCase()) && /\b(?:un|el|este|ese|de|del|con|sin|mismo|otro|tu|su|mejor|peor|buen|nuevo)\s*$/iu.test(prefix)) ||
  bodySubject.test(prefix) || /(?:compañero|pareja|ayudante)(?:\s+\p{L}+){0,4}\s+que\s*$/iu.test(prefix) || /\b(?:permite|permita|deja|deje) que\s*$/iu.test(prefix);

export function normalizeTu(text) {
  let value = text.replace(/\b(?:frente a|detrás de|delante de|encima de|debajo de|sobre|hacia|contra|para) usted\b/giu, match=>match.replace(/usted/iu,'ti'));
  value = value.replace(/\busted\b/giu, word=>initialCase(word,'tú'));
  value = value.replace(/\b(no) se (mueva|incline|balancee|apoye|levante|baje|gire|desplace|arquee)\b/giu,(_,no,verb)=>no+' te '+verb.toLowerCase()+'s');
  // Possessives for the reader's body. Objects and a partner keep their own
  // possessives (e.g. "la cuerda anclada en su centro").
  value = value.replace(/\b(sus?)\s+(cuerpo|torso|cabeza|cuello|espalda|abdomen|pecho|cintura|cadera[s]?|pierna[s]?|brazo[s]?|mano[s]?|pie[s]?|rodilla[s]?|codo[s]?|hombro[s]?|muñeca[s]?|antebrazo[s]?|muslo[s]?|dedo[s]?|tal[oó]n(?:es)?|glúteo[s]?|abdominales|zona lumbar|peso|compañero|pareja|posición|costado[s]?|lado[s]?|agarre)\b/giu, (_, possessive, noun)=>initialCase(possessive,possessive.toLowerCase()==='sus'?'tus':'tu')+' '+noun);
  value = value.replace(pattern,(word, _, offset, full)=>{
    const prefix=full.slice(0,offset);
    if (protectedContext(word,prefix)) return word;
    // Negative and subordinate second-person forms need the subjunctive;
    // "no bloquees", not the affirmative imperative "no bloquea".
    if (/\bno\s*$/iu.test(prefix)) {
      const special={haga:'hagas',dé:'des',vuelva:'vuelvas',siga:'sigas',suba:'subas',mantenga:'mantengas',sostenga:'sostengas'};
      return initialCase(word,special[word.toLowerCase()] || word.toLowerCase()+'s');
    }
    return initialCase(word,verbs[word.toLowerCase()]);
  });
  // Present indicative with an explicit second-person context.
  value = value.replace(/\b(mientras|a medida que) (inhala|exhala|realiza|mantiene|sostiene|gira|hace|flexiona|extiende)\b/giu,(_,connector,verb)=>connector+' '+({inhala:'inhalas',exhala:'exhalas',realiza:'realizas',mantiene:'mantienes',sostiene:'sostienes',gira:'giras',hace:'haces',flexiona:'flexionas',extiende:'extiendes'}[verb.toLowerCase()]));
  value = value.replace(/\bmientras lo hace\b/giu,'mientras lo haces').replace(/\bsi le resulta\b/giu,'si te resulta').replace(/\blo más que pueda\b/giu,'lo más que puedas');
  return value;
}

export function formalAddressFindings(text) {
  const findings=[];
  for (const match of text.matchAll(pattern)) if (!protectedContext(match[0],text.slice(0,match.index))) findings.push(match[0]);
  if (/\busted(?:es)?\b/iu.test(text)) findings.push('usted');
  return findings;
}
