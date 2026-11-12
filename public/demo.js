const $ = selector => document.querySelector(selector);
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let collection = 'historical', controller, detailController, lastButton, stopAnimation = () => {};
const labels = new Map();
const label = value => labels.get(value) || value;
async function api(path, signal) {
  const response = await fetch(path, { headers: $('#key').value ? { 'X-API-Key': $('#key').value } : {}, signal });
  const body = await response.json();
  if (!response.ok) throw Error(body.error?.message || `HTTP ${response.status}`);
  return body;
}
function thumbnail(item) {
  const animation = item.media?.animation;
  return item.media?.thumbnailUrl || animation?.frames?.[animation.sequence?.[0] ?? 0] || (animation?.type === 'gif' ? animation.url : null);
}
function card(item) {
  const node = el('article', null, 'card'); node.dataset.exerciseId = item.id;
  const image = el('img', null, 'sketch');
  image.alt = item.name; image.loading = 'lazy'; image.decoding = 'async'; image.width = 320; image.height = 220;
  const source = thumbnail(item); if (source) image.src = source; else image.hidden = true;
  image.addEventListener('error', () => { image.hidden = true; node.prepend(el('p', 'No se pudo cargar la imagen. Abre la ficha para reintentar.', 'media-status')); }, { once: true });
  node.append(image, el('span', 'ILUSTRACIÓN ANIMADA', 'badge'), el('h3', item.name), el('p', item.primaryMuscles.map(label).join(' · '), 'muscles'), el('p', label(item.equipment)));
  const button = el('button', 'Ver ejercicio y animación'); button.setAttribute('aria-label', `Ver ${item.name}`);
  button.onclick = () => { lastButton = button; void detail(item); }; node.append(button); return node;
}
function appendCards(items) {
  const nodes = document.createDocumentFragment(); items.forEach(item => nodes.append(card(item))); $('#results').append(nodes);
}
async function load() {
  controller?.abort(); controller = new AbortController(); const signal = controller.signal;
  const form = new FormData($('#filters')), query = normalize(form.get('q') || '').trim();
  $('#status').textContent = 'Cargando ejercicios con imágenes…'; $('#results').setAttribute('aria-busy', 'true'); $('#results').replaceChildren();
  try {
    let total = 0;
    if (collection === 'essential') {
      const snapshot = await api('/api/v1/selections/essential-50', signal);
      const ids = snapshot.data.map(item => item.id);
      // Use current catalog media instead of the historical editorial snapshot.
      const batch = await api('/api/v1/exercises/batch?' + new URLSearchParams({ ids: ids.join(','), lang: 'es' }), signal);
      const items = batch.data.filter(item => (!form.get('muscle') || item.primaryMuscles.includes(form.get('muscle'))) && (!form.get('equipment') || item.equipment === form.get('equipment')) && (!query || normalize([item.id, item.name, item.nameEn, ...item.aliases, ...item.primaryMuscles.map(label)].join(' ')).includes(query)));
      if (signal.aborted) return; appendCards(items); total = items.length;
    } else {
      const params = new URLSearchParams({ lang: 'es', limit: '100', offset: '0' });
      for (const name of ['q', 'muscle', 'equipment']) if (form.get(name)) params.set(name, form.get(name));
      let offset = 0;
      do {
        params.set('offset', String(offset)); const page = await api('/api/v1/exercises?' + params, signal);
        if (signal.aborted) return; appendCards(page.data); total = page.pagination.total;
        $('#status').textContent = `Cargando ${$('#results').children.length} de ${total} ejercicios…`; offset = page.pagination.nextOffset;
      } while (offset !== null);
    }
    $('#status').textContent = total ? `${total.toLocaleString('es-MX')} ejercicios con imágenes` : 'Sin resultados. Prueba otro nombre o cambia los filtros.';
  } catch (error) { if (!signal.aborted) $('#status').textContent = `No se pudo completar la carga: ${error.message}. Pulsa Buscar para reintentar.`; }
  finally { if (!signal.aborted) $('#results').setAttribute('aria-busy', 'false'); }
}
function demonstration(item) {
  stopAnimation();
  const panel = el('section', null, 'exercise-media'), animation = item.media?.animation;
  const media = el(animation?.type === 'video' ? 'video' : 'img', null, 'demonstration sketch');
  if (media.tagName === 'VIDEO') {
    media.src = animation.url; media.controls = true; media.loop = true; media.muted = true; media.playsInline = true; media.preload = 'metadata';
  } else { media.alt = `Demostración de ${item.name}`; const source = thumbnail(item); if (source) media.src = source; }
  panel.append(media);
  const play = el('button', 'Reproducir animación', 'animation-toggle'); play.setAttribute('aria-pressed', 'false'); play.disabled = !animation;
  let timer, frame = 0, playing = false;
  const pause = () => {
    clearInterval(timer); timer = undefined; playing = false;
    if (media.tagName === 'VIDEO') media.pause();
    if (animation?.type === 'gif') media.src = thumbnail(item) || animation.url;
    play.textContent = 'Reproducir animación'; play.setAttribute('aria-pressed', 'false');
  };
  const start = () => {
    if (!animation || playing) return;
    playing = true; play.textContent = 'Pausar animación'; play.setAttribute('aria-pressed', 'true');
    if (animation.type === 'svg-sequence') {
      for (const url of animation.frames) { const preload = new Image(); preload.src = url; }
      timer = setInterval(() => { frame = (frame + 1) % animation.sequence.length; media.src = animation.frames[animation.sequence[frame]]; }, animation.frameDurationMs);
    } else if (animation.type === 'gif') media.src = animation.url;
    else if (animation.type === 'video') media.play().catch(pause);
  };
  play.onclick = () => { if (playing) pause(); else start(); };
  const onVisibility = () => { if (document.hidden) pause(); };
  const onMotion = () => { if (reducedMotion.matches) pause(); };
  document.addEventListener('visibilitychange', onVisibility); reducedMotion.addEventListener('change', onMotion);
  stopAnimation = () => { pause(); document.removeEventListener('visibilitychange', onVisibility); reducedMotion.removeEventListener('change', onMotion); };
  media.addEventListener('error', () => { pause(); panel.append(el('p', 'No se pudo cargar la demostración. Cierra la ficha y vuelve a abrirla.', 'credit')); }, { once: true });
  panel.append(play);
  if (reducedMotion.matches) panel.append(el('p', 'Movimiento reducido: pulsa Reproducir para ver la animación.', 'credit'));
  if (animation?.attribution) panel.append(el('p', animation.attribution, 'credit'));
  if (animation?.sourceUrl) { const link = el('a', 'Fuente de la ilustración'); link.href = animation.sourceUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; panel.append(link); }
  if (!reducedMotion.matches && !document.hidden) start(); return panel;
}
async function detail(original) {
  detailController?.abort(); stopAnimation(); detailController = new AbortController();
  const signal = detailController.signal, body = $('#detail-body');
  body.replaceChildren(el('h2', original.name)); body.firstChild.id = 'detail-title'; body.append(el('p', 'Cargando ficha…')); $('#detail').showModal();
  try {
    const item = (await api('/api/v1/exercises/' + encodeURIComponent(original.id) + '?lang=es', signal)).data;
    if (signal.aborted) return; if (item.id !== original.id) throw Error('La identidad del ejercicio no coincide.');
    body.replaceChildren(el('p', item.id, 'eyebrow'), el('h2', item.name)); body.children[1].id = 'detail-title';
    body.append(el('p', `Músculos: ${item.primaryMuscles.map(label).join(' · ')}`), el('p', `Equipo: ${label(item.equipment)}`), demonstration(item), el('h3', 'Instrucciones'));
    if (item.language !== 'es') body.append(el('p', 'Instrucciones originales en inglés.', 'credit'));
    const list = el('ol'); item.instructions.forEach(step => list.append(el('li', step))); body.append(list);
    if (item.source) {
      body.append(el('p', `${item.source.attribution || item.source.id} · ${item.source.license || ''}`, 'credit'));
      const link = el('a', 'Consultar fuente original'); link.href = item.source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; body.append(link);
    }
  } catch (error) { if (!signal.aborted) body.append(el('p', `No pudimos cargar la ficha: ${error.message}. Cierra y vuelve a intentarlo.`)); }
}
function selectCollection(value) {
  collection = value;
  for (const name of ['essential', 'historical']) { $(`#${name}`).setAttribute('aria-pressed', String(name === value)); $(`#${name}`).classList.toggle('secondary', name !== value); }
  $('#collection-title').textContent = value === 'essential' ? 'Los 10 esenciales' : 'Catálogo completo'; void load();
}
$('#essential').onclick = () => selectCollection('essential'); $('#historical').onclick = () => selectCollection('historical');
$('#filters').onsubmit = event => { event.preventDefault(); void load(); };
$('#filters').onreset = () => { setTimeout(() => void load(), 0); };
$('#close').onclick = () => $('#detail').close();
$('#detail').addEventListener('close', () => { detailController?.abort(); stopAnimation(); $('#detail-body').replaceChildren(); lastButton?.focus(); });
async function init() {
  await Promise.allSettled([
    api('/api/v1/taxonomy?lang=es').then(({ data }) => {
      for (const [name, entries] of [['muscle', data.muscles], ['equipment', data.equipment]]) {
        const select = $(`select[name="${name}"]`); while (select.options.length > 1) select.remove(1);
        for (const entry of entries) { labels.set(entry.id, entry.name); if (!entry.count) continue; const option = el('option', entry.name); option.value = entry.id; select.append(option); }
      }
    }),
    api('/api/v1/stats').then(({ data }) => {
      $('#stats').textContent = `${data.total.toLocaleString('es-MX')} ejercicios con imágenes y animaciones`; $('#catalog-count').textContent = data.total.toLocaleString('es-MX');
    }),
  ]);
  await load();
}
$('#unlock').onclick = () => void init(); void init();
