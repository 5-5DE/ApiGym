import { createHash } from 'node:crypto';

export function validateQuality(data, exercises, translations) {
  const byId=new Map(exercises.map(e=>[e.id,e]));
  if(data.schemaVersion!==1 || data.popularIds.length!==150 || new Set(data.popularIds).size!==150 || data.popularIds.some(id=>!byId.has(id))) throw new Error('Invalid basic selection');
  const allowed={difficulty:['beginner','intermediate','expert'],mechanic:['compound','isolation','isometric','not-applicable'],force:['push','pull','static','mixed','not-applicable'],equipment:['body only','kettlebell']};
  for(const [id,row] of Object.entries(data.entries)) {
    const e=byId.get(id); if(!e)throw new Error(`Unknown quality ID: ${id}`);
    const original={name:e.name,instructions:e.instructions,equipment:e.equipment,flowInstructions:e.flowRecord?.instructions||null};
    const hash=createHash('sha256').update(JSON.stringify(original)).digest('hex');
    if(hash!==row.evidence?.originalSha256 || JSON.stringify(row.evidence.frames.map(f=>f.path))!==JSON.stringify(e.flowRecord.animation.frames))throw new Error(`Stale quality evidence: ${id}`);
    if(row.displayName && (!row.displayName.trim() || !row.nameCorrection))throw new Error(`Invalid language correction: ${id}`);
    if(row.nameCorrection==='language-only-pending-identity' && translations[id].titleReview.status!=='pending-review')throw new Error(`Pending identity changed: ${id}`);
    for(const [field,patch] of Object.entries(row.metadata||{})) {
      const previous=field==='difficulty'?e.level:e[field];
      if(!allowed[field]?.includes(patch.value) || (previous??null)!==patch.original || !patch.basis || !patch.reference)throw new Error(`Invalid metadata patch: ${id}.${field}`);
      if(patch.basis==='research-family-estimate'){
        const expected=translations[id].titleReview.status==='pending-review'?'provisional-identity':'editorial-estimate';
        if(patch.status!==expected || patch.family!==patch.reference || !patch.criteria?.length || !patch.sources?.length || patch.sources.some(url=>!Object.values(data.sources).includes(url)))throw new Error(`Invalid research provenance: ${id}.${field}`);
        if(previous && previous!=='unknown')throw new Error(`Research overwrites source: ${id}.${field}`);
      }
    }
  }
}
