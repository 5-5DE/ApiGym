const spec = await (await fetch('/openapi.json')).json();
for(const [path, methods] of Object.entries(spec.paths)) {
  const row=document.createElement('article');row.className='endpoint'; const title=document.createElement('h2');title.textContent='GET '+path;const desc=document.createElement('p');desc.textContent=methods.get.summary;row.append(title,desc);
  for(const p of methods.get.parameters || []) {const detail=document.createElement('p');detail.textContent=p.name+' — '+(p.description || p.in);row.append(detail);}
  document.querySelector('#endpoints').append(row);
}
document.querySelector('#request').onsubmit=async event=>{
  event.preventDefault();const status=document.querySelector('#status');status.textContent='Consultando…';
  try{const path=document.querySelector('#path').value;
    if(!/^\/api\/v1\//.test(path)||path.includes('\\'))throw new Error('Usa una ruta local que empiece por /api/v1/.');
    const url=new URL(path,location.origin);if(url.origin!==location.origin)throw new Error('Origen inválido');
    const key=document.querySelector('#key').value;const r=await fetch(url,{headers:key?{'X-API-Key':key}:{}});status.textContent=`HTTP ${r.status} · ETag ${r.headers.get('etag') || '—'}`;
    document.querySelector('#response').textContent=JSON.stringify(await r.json(),null,2);
  }catch(e){status.textContent=e.message;}
};
