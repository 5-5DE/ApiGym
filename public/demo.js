const $ = s => document.querySelector(s);
let controller, timer, playing = false;
let taxonomyLabels = {};
const label = (facet, id, lang) => lang === 'es' ? taxonomyLabels[facet]?.find(entry => entry.id === id)?.name || id : id;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
function nameNotice(e) {
  if(e.requestedLanguage === 'es' && e.nameLanguage === 'en') return 'Nombre original en inglés · traducción pendiente';
  return e.nameLanguage === 'es' ? 'Nombre en español · borrador sin revisión acreditada' : 'Nombre original en inglés';
}
async function api(path, signal) {
  const r = await fetch(path, {headers: $('#key').value ? {'X-API-Key': $('#key').value} : {}, signal});
  const body = await r.json(); if (!r.ok) throw new Error(body.error?.message || `HTTP ${r.status}`); return body;
}
async function load() {
  controller?.abort(); controller = new AbortController(); const signal = controller.signal;
  const params = new URLSearchParams(new FormData($('#filters')));
  for (const [key, value] of [...params]) { if (!value) params.delete(key); else if (value === 'on') params.set(key, 'true'); }
  params.set('offset', 0); params.set('limit', 100);
  $('#status').textContent = 'Cargando todos los ejercicios…';
  try {
    let page = await api('/api/v1/exercises?' + params, signal);
    if (signal.aborted) return;
    const total = page.pagination.total;
    let count = 0;
    $('#results').replaceChildren();
    const appendPage = exercises => {
      const cards = document.createDocumentFragment();
      for (const e of exercises) {
        const card = el('article', null, 'card'); const image = el('img'); image.alt = e.name; image.loading = 'lazy';
        if (e.media.thumbnailUrl) image.src = e.media.thumbnailUrl; else image.hidden = true;
        if (e.media.animation?.type === 'svg-sequence') image.classList.add('sketch');
        image.addEventListener('error', () => {image.hidden = true;}, {once:true});
        const metadata = e.primaryMuscles.map(id => label('muscles', id, e.requestedLanguage)).join(' · ') + ' / ' + label('equipment', e.equipment, e.requestedLanguage);
        card.append(image, el('span', e.media.animation?.type === 'svg-sequence' ? 'ILUSTRACIÓN ANIMADA' : e.media.animation ? 'GIF / VIDEO' : 'SIN ANIMACIÓN', 'badge'), el('h2', e.name), el('p', nameNotice(e), 'name-status'), el('p', metadata));
        const button = el('button', 'Ver ejercicio'); button.onclick = () => detail(e); card.append(button); cards.append(card);
      }
      $('#results').append(cards); count += exercises.length;
    };
    appendPage(page.data);
    while (page.pagination.nextOffset !== null) {
      $('#status').textContent = `Mostrando ${count} de ${total} ejercicios; cargando más…`;
      params.set('offset', page.pagination.nextOffset);
      page = await api('/api/v1/exercises?' + params, signal);
      if (signal.aborted) return;
      appendPage(page.data);
    }
    $('#status').textContent = total ? `${count} ejercicios encontrados` : 'Sin resultados. Prueba otro nombre o filtro.';
  } catch(e) { if (e.name !== 'AbortError') { $('#status').textContent = e.message; $('#results').replaceChildren(); } }
}
function detail(e) {
  stop(); const body = $('#detail-body'); body.replaceChildren(el('p', e.id, 'eyebrow'), el('h2',e.name));
  body.append(el('p', nameNotice(e), 'name-status'));
  if(e.name !== e.nameEn && e.nameEn) body.append(el('p', `Nombre original: ${e.nameEn}`, 'credit'));
  let media, frame = 0, active = false;
  const animation = e.media.animation; const sequence = e.media.imageSequence;
  if (animation?.type === 'video') { media = el('video'); media.src = animation.url; media.controls = true; media.loop = true; media.muted = true; media.playsInline = true; media.preload = 'none'; }
  else if (animation?.type === 'svg-sequence') { media = el('img'); media.alt = e.name; media.src = animation.frames[animation.sequence[0]]; media.classList.add('sketch'); }
  else { media = el('img'); media.alt = e.name; if (e.media.thumbnailUrl) media.src = e.media.thumbnailUrl; else media.hidden = true; }
  media.classList.add('demonstration');
  const notice = el('p',animation?.type === 'svg-sequence' ? 'Ilustración animada en SVG. La secuencia es orientativa; revisa las instrucciones y la nota de procedencia.' : animation ? 'Demostración animada. Pulsa reproducir para cargarla.' : sequence ? 'Secuencia de posiciones de inicio y fin. No es movimiento continuo.' : 'Este ejercicio no tiene demostración disponible.');
  body.append(media, notice);
  media.addEventListener('error', () => {stop(); active = false; media.hidden = true; play.disabled = true; play.textContent = 'No disponible'; notice.textContent = 'No se pudo cargar la demostración. El ejercicio y sus instrucciones siguen disponibles.';});
  const play = el('button', 'Reproducir');
  play.disabled = !animation && !sequence;
  play.onclick = () => {
    active = !active; playing = active; clearInterval(timer); play.textContent = active ? 'Pausar' : 'Reproducir';
    if (animation?.type === 'video') { if(active) media.play().catch(() => {notice.textContent = 'No se pudo reproducir el video.';}); else media.pause(); }
    else if (animation?.type === 'gif') { media.hidden = !active && !e.media.thumbnailUrl; if (active || e.media.thumbnailUrl) media.src = active ? animation.url : e.media.thumbnailUrl; }
    else if (animation?.type === 'svg-sequence' && active) {
      for(const url of animation.frames) { const preload = new Image(); preload.src = url; }
      timer = setInterval(() => { if (!document.hidden) { frame = (frame + 1) % animation.sequence.length; media.src = animation.frames[animation.sequence[frame]]; } }, animation.frameDurationMs);
    } else if (animation?.type === 'svg-sequence') media.src = animation.frames[animation.sequence[0]];
    else if (sequence && active) {
      for(const url of sequence.frames) { const preload = new Image(); preload.src = url; }
      timer = setInterval(() => { if (!document.hidden) { frame = (frame + 1) % sequence.frames.length; media.src = sequence.frames[frame]; } }, sequence.intervalMs);
    }
  };
  if (reduced.matches) body.append(el('p','Movimiento reducido activo: la demostración empieza en pausa.'));
  body.append(play);
  const credit = el('p', animation?.attribution || e.media.attribution, 'credit'); body.append(credit);
  const link = (label,url) => {const a=el('a',label); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; return a;};
  if (animation) { body.append(link('Fuente del medio', animation.sourceUrl), document.createTextNode(' · '),link(animation.license, animation.licenseUrl)); if(animation.authorUrl) body.append(document.createTextNode(' · '),link(animation.author,animation.authorUrl)); if(animation.provenanceNote) body.append(el('p', animation.provenanceNote, 'credit')); }
  else body.append(link('Fuente de imágenes',e.source.url),document.createTextNode(' · '),link(e.source.license,e.source.licenseUrl));
  body.append(el('h3','Instrucciones')); const list = el('ol');
  for (const step of e.instructions) list.append(el('li',step));
  body.append(list);
  if(!e.instructionsAvailable) body.append(el('p','La fuente no incluye instrucciones para este ejercicio.'));
  if(e.language === 'es') body.append(el('p','Instrucciones en español · traducción automática sin revisión acreditada.'));
  if (e.requestedLanguage !== e.language) body.append(el('p','Traducción pendiente: instrucciones originales en inglés.'));
  $('#detail').showModal();
}
function stop() { clearInterval(timer); playing=false; $('#detail').querySelector('video')?.pause(); }
$('#filters').onsubmit = event => {event.preventDefault(); load();};
$('#close').onclick = () => $('#detail').close(); $('#detail').addEventListener('close',()=>{stop();$('#detail-body').replaceChildren();});
document.addEventListener('visibilitychange',()=>{if(document.hidden && playing) $('#detail button:not(.close)')?.click();});
async function init(){
  try { const [{data:tax},{data:stats}] = await Promise.all([api('/api/v1/taxonomy'),api('/api/v1/stats')]);
    taxonomyLabels = tax;
    for (const [name, entries] of [['muscle',tax.muscles],['equipment',tax.equipment]]) {const select=$(`select[name="${name}"]`); while(select.options.length>1)select.remove(1); for(const entry of entries){if(entry.count){const option=el('option',entry.name);option.value=entry.id;select.append(option);}}}
    const coverage = stats.translationCoverage;
    $('#stats').textContent = coverage
      ? `${stats.total} ejercicios · ${coverage.spanishNames} nombres en español · ${coverage.spanishInstructions} con instrucciones en español · ${coverage.namesPendingReview} nombres pendientes de revisión · ${coverage.reviewedTranslations} traducciones con revisión acreditada · ${coverage.englishNameFallbacks} nombres con fallback inglés · ${stats.withSvgAnimation} ilustraciones animadas`
      : `${stats.total} ejercicios · ${stats.spanish} traducciones con instrucciones (contador histórico) · ${stats.withSvgAnimation} ilustraciones animadas`;
    await load();
  } catch(e){$('#status').textContent=e.message;}
}
$('#unlock').onclick=init;init();
