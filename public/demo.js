const $ = s => document.querySelector(s);
let offset = 0, total = 0, controller, timer, playing = false;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
async function api(path, signal) {
  const r = await fetch(path, {headers: $('#key').value ? {'X-API-Key': $('#key').value} : {}, signal});
  const body = await r.json(); if (!r.ok) throw new Error(body.error?.message || `HTTP ${r.status}`); return body;
}
async function load() {
  controller?.abort(); controller = new AbortController(); const signal = controller.signal;
  const params = new URLSearchParams(new FormData($('#filters')));
  for (const [key, value] of [...params]) { if (!value) params.delete(key); else if (value === 'on') params.set(key, 'true'); }
  params.set('offset', offset); params.set('limit', 12);
  $('#status').textContent = 'Cargando ejercicios…';
  try {
    const {data, pagination} = await api('/api/v1/exercises?' + params, signal); total = pagination.total;
    $('#results').replaceChildren();
    for (const e of data) {
      const card = el('article', null, 'card'); const image = el('img'); image.alt = e.name; image.loading = 'lazy';
      if (e.media.thumbnailUrl) image.src = e.media.thumbnailUrl;
      image.addEventListener('error', () => {image.hidden = true;}, {once:true});
      card.append(image, el('span', e.media.animation ? 'GIF / VIDEO' : e.media.imageSequence ? 'POSICIONES' : 'SIN MEDIO', 'badge'), el('h2', e.name), el('p', e.primaryMuscles.join(' · ') + ' / ' + e.equipment));
      const button = el('button', 'Ver ejercicio'); button.onclick = () => detail(e); card.append(button); $('#results').append(card);
    }
    $('#status').textContent = total ? `${total} ejercicios encontrados` : 'Sin resultados. Prueba otro nombre o filtro.';
    $('#page').textContent = total ? `${offset+1}–${Math.min(offset+12,total)} de ${total}` : '0 resultados';
    $('#prev').disabled = offset === 0; $('#next').disabled = pagination.nextOffset === null;
  } catch(e) { if (e.name !== 'AbortError') { $('#status').textContent = e.message; $('#results').replaceChildren(); $('#prev').disabled = true; $('#next').disabled = true; } }
}
function detail(e) {
  stop(); const body = $('#detail-body'); body.replaceChildren(el('p', e.id, 'eyebrow'), el('h2',e.name));
  let media, frame = 0, active = false;
  const animation = e.media.animation; const sequence = e.media.imageSequence;
  if (animation?.type === 'video') { media = el('video'); media.src = animation.url; media.controls = true; media.loop = true; media.muted = true; media.playsInline = true; media.preload = 'none'; }
  else { media = el('img'); media.alt = e.name; if (e.media.thumbnailUrl) media.src = e.media.thumbnailUrl; }
  media.className = 'demonstration';
  const notice = el('p',animation ? 'Demostración animada. Pulsa reproducir para cargarla.' : sequence ? 'Secuencia de posiciones de inicio y fin. No es movimiento continuo.' : 'Este ejercicio no tiene demostración disponible.');
  body.append(media, notice);
  media.addEventListener('error', () => {notice.textContent = 'No se pudo cargar el medio externo. Consulta las instrucciones o la fuente.';});
  const play = el('button', 'Reproducir');
  play.disabled = !animation && !sequence;
  play.onclick = () => {
    active = !active; playing = active; clearInterval(timer); play.textContent = active ? 'Pausar' : 'Reproducir';
    if (animation?.type === 'video') { if(active) media.play().catch(() => {notice.textContent = 'No se pudo reproducir el video.';}); else media.pause(); }
    else if (animation?.type === 'gif') media.src = active ? animation.url : e.media.thumbnailUrl;
    else if (sequence && active) {
      for(const url of sequence.frames) { const preload = new Image(); preload.src = url; }
      timer = setInterval(() => { if (!document.hidden) { frame = (frame + 1) % sequence.frames.length; media.src = sequence.frames[frame]; } }, sequence.intervalMs);
    }
  };
  if (reduced.matches) body.append(el('p','Movimiento reducido activo: la demostración empieza en pausa.'));
  body.append(play);
  const credit = el('p', animation?.attribution || e.media.attribution, 'credit'); body.append(credit);
  const link = (label,url) => {const a=el('a',label); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; return a;};
  if (animation) { body.append(link('Fuente del medio', animation.sourceUrl), document.createTextNode(' · '),link(animation.license, animation.licenseUrl)); if(animation.authorUrl) body.append(document.createTextNode(' · '),link(animation.author,animation.authorUrl)); }
  else body.append(link('Fuente de imágenes',e.source.url),document.createTextNode(' · '),link(e.source.license,e.source.licenseUrl));
  body.append(el('h3','Instrucciones')); const list = el('ol');
  for (const step of e.instructions) list.append(el('li',step));
  body.append(list);
  if(!e.instructionsAvailable) body.append(el('p','La fuente no incluye instrucciones para este ejercicio.'));
  if (e.requestedLanguage !== e.language) body.append(el('p','Traducción pendiente: instrucciones originales en inglés.'));
  $('#detail').showModal();
}
function stop() { clearInterval(timer); playing=false; $('#detail').querySelector('video')?.pause(); }
$('#filters').onsubmit = event => {event.preventDefault(); offset=0; load();};
$('#prev').onclick = () => {offset=Math.max(0,offset-12);load();}; $('#next').onclick = () => {if(offset+12<total){offset+=12;load();}};
$('#close').onclick = () => $('#detail').close(); $('#detail').addEventListener('close',()=>{stop();$('#detail-body').replaceChildren();});
document.addEventListener('visibilitychange',()=>{if(document.hidden && playing) $('#detail button:not(.close)')?.click();});
async function init(){
  try { const [{data:tax},{data:stats}] = await Promise.all([api('/api/v1/taxonomy'),api('/api/v1/stats')]);
    for (const [name, entries] of [['muscle',tax.muscles],['equipment',tax.equipment]]) {const select=$(`select[name="${name}"]`); while(select.options.length>1)select.remove(1); for(const entry of entries){if(entry.count){const option=el('option',entry.name);option.value=entry.id;select.append(option);}}}
    $('#stats').textContent=`${stats.total} ejercicios · ${stats.spanish} en español · ${stats.withAnimation} con GIF / video · ${stats.withImageSequence} con posiciones`;
    await load();
  } catch(e){$('#status').textContent=e.message;}
}
$('#unlock').onclick=init;init();
