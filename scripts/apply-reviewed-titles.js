import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const hash=value=>createHash('sha256').update(value).digest('hex');
export function applyReviewedTitles(translations,records){
  const path=new URL('data/localization/es-MX.title-review.json',root);
  if(!existsSync(path))return;
  const review=JSON.parse(readFileSync(path,'utf8'));
  const byId=new Map(records.map(row=>[row.id,row]));
  for(const entry of review.records){
    const row=byId.get(entry.id), t=translations[entry.id];
    if(!row||!t)throw Error(`Revisión de título huérfana: ${entry.id}`);
    if(row.originalSha256!==entry.evidence.originalSha256)throw Error(`Las instrucciones cambiaron desde la revisión del título: ${entry.id}`);
    if(entry.name!==entry.before&&entry.status!=='verified')throw Error(`Cambio de título sin verificar: ${entry.id}`);
    for(const frame of entry.evidence.frames)if(hash(readFileSync(new URL('data/flow-exercise-dataset/'+frame.path,root)))!==frame.sha256)throw Error(`La ilustración cambió desde la revisión: ${entry.id}`);
    t.name=entry.name;
    t.aliases=[...new Set([...t.aliases,...entry.aliases])];
    t.titleReview={status:entry.status,reason:entry.reason,visualReview:entry.sheet?'inspected-three-frames':'not-performed'};
    row.nameEs=t.name;
    row.titleReview=t.titleReview;
  }
}
