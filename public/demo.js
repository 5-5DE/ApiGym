const $ = selector => document.querySelector(selector);
const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
let collection = 'essential', controller, detailController, nextOffset = null, total = 0, lastButton;
const labels = new Map();
const label = value => labels.get(value) || value;
async function api(path, signal) {
  const response = await fetch(path, { headers: $('#key').value ? { 'X-API-Key': $('#key').value } : {}, signal });
  const body = await response.json();
  if (!response.ok) throw Error(body.error?.message || `HTTP ${response.status}`);
  return body;
}
function validateSelection(snapshot) {
  if (snapshot.schemaVersion !== 1 || snapshot.selectionId !== 'essential-50-p0' || !Array.isArray(snapshot.data) || snapshot.data.length !== 10 || new Set(snapshot.data.map(item => item.id)).size !== 10) throw Error('La selección oficial está incompleta. Puedes consultar el catálogo completo.');
  return snapshot.data;
}
function technicalFallback(item) {
  const panel = el('div', null, 'technical-fallback');
  panel.append(el('span', 'GUÍA DEL EJERCICIO', 'eyebrow'), el('h3', item.media?.status === 'pending' || item.media?.animation ? 'Demostración en revisión' : 'Demostración no disponible'), el('p', 'Consulta los datos y las indicaciones. No hay un recurso aprobado disponible para reproducir.'));
  return panel;
}
function card(item) {
  const node = el('article', null, 'card');
  node.append(el('span', 'FICHA TÉCNICA', 'badge'), el('h3', item.name), el('p', item.primaryMuscles.map(label).join(' · ') || 'Músculo no especificado', 'muscles'), el('p', label(item.equipment) || 'Equipo no especificado'), el('p', item.media?.best != null ? 'Demostración no compatible por ahora' : item.media?.status === 'pending' || item.media?.animation ? 'Demostración en revisión' : 'Sin demostración aprobada', 'media-status'));
  const button = el('button', 'Consultar ejercicio');
  button.setAttribute('aria-label', `Consultar ${item.name}`);
  button.onclick = () => { lastButton = button; void detail(item); };
  node.append(button); return node;
}
async function load(more = false) {
  controller?.abort(); controller = new AbortController(); const signal = controller.signal;
  const form = new FormData($('#filters')), query = normalize(form.get('q') || '').trim();
  $('#more').disabled = true; $('#status').textContent = 'Buscando ejercicios…'; $('#results').setAttribute('aria-busy', 'true');
  if (!more) { $('#results').replaceChildren(); nextOffset = null; $('#more').hidden = true; }
  try {
    let items;
    if (collection === 'essential') {
      const snapshot = await api('/api/v1/selections/essential-50', signal);
      items = validateSelection(snapshot).filter(item => (!form.get('muscle') || [...item.primaryMuscles, ...item.secondaryMuscles].includes(form.get('muscle'))) && (!form.get('equipment') || item.equipment === form.get('equipment')) && (!query || normalize([item.id, item.name, item.equipment, ...item.primaryMuscles].join(' ')).includes(query)));
      total = items.length;
    } else {
      const params = new URLSearchParams({ lang: 'en', limit: '24', offset: String(more ? nextOffset : 0) });
      for (const name of ['q', 'muscle', 'equipment']) if (form.get(name)) params.set(name, form.get(name));
      const page = await api('/api/v1/exercises?' + params, signal);
      items = page.data; total = page.pagination.total; nextOffset = page.pagination.nextOffset;
    }
    if (signal.aborted) return;
    const nodes = document.createDocumentFragment(); items.forEach(item => nodes.append(card(item))); $('#results').append(nodes);
    $('#status').textContent = total ? `${$('#results').children.length} de ${total} ejercicios` : 'Sin resultados. Prueba otro nombre o cambia los filtros.';
    $('#more').hidden = nextOffset === null; $('#more').disabled = false;
  } catch (error) {
    if (signal.aborted) return;
    $('#status').textContent = collection === 'essential' ? `No se pudo cargar la selección oficial: ${error.message}. El catálogo completo sigue disponible.` : `No se pudo cargar el catálogo: ${error.message}. Reintenta con Buscar.`;
    $('#more').disabled = false;
  } finally { if (!signal.aborted) $('#results').setAttribute('aria-busy', 'false'); }
}
async function detail(original) {
  detailController?.abort(); detailController = new AbortController();
  const signal = detailController.signal, body = $('#detail-body');
  body.replaceChildren(el('h2', original.name)); body.firstChild.id = 'detail-title';
  body.append(el('p', 'Cargando ficha…')); $('#detail').showModal();
  try {
    const item = collection === 'essential' ? original : (await api('/api/v1/exercises/' + encodeURIComponent(original.id) + '?lang=en', signal)).data;
    if (signal.aborted) return;
    if (item.id !== original.id) throw Error('La identidad del ejercicio no coincide.');
    body.replaceChildren(el('p', 'APIGYM · EJERCICIO', 'eyebrow'), el('h2', item.name)); body.children[1].id = 'detail-title';
    body.append(el('p', `Músculos: ${item.primaryMuscles.map(label).join(' · ') || 'No especificados'}`), el('p', `Equipo: ${label(item.equipment) || 'No especificado'}`), technicalFallback(item), el('h3', 'Instrucciones originales'));
    const language = item.instructionsLanguage || item.language;
    if (language !== 'es') body.append(el('p', 'Contenido original en inglés. No hay traducción aprobada disponible.', 'credit'));
    const list = el('ol'); (item.instructions || []).forEach(step => list.append(el('li', step))); body.append(list);
    if (!item.instructions?.length) body.append(el('p', 'La fuente no incluye instrucciones para este ejercicio.'));
    if (item.source) {
      body.append(el('p', `${item.source.attribution || item.source.id} · ${item.source.license || 'Licencia no especificada'}`, 'credit'));
      try { const url = new URL(item.source.url); if (url.protocol === 'https:') { const link = el('a', 'Consultar fuente original'); link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; body.append(link); } } catch {}
    }
  } catch (error) { if (!signal.aborted) body.append(el('p', `No pudimos cargar la ficha: ${error.message}. Cierra y vuelve a intentarlo.`)); }
}
function selectCollection(value) {
  collection = value; nextOffset = null;
  for (const name of ['essential', 'historical']) { $(`#${name}`).setAttribute('aria-pressed', String(name === value)); $(`#${name}`).classList.toggle('secondary', name !== value); }
  $('#collection-title').textContent = value === 'essential' ? 'Los 10 esenciales' : 'Catálogo completo'; void load();
}
$('#essential').onclick = () => selectCollection('essential'); $('#historical').onclick = () => selectCollection('historical');
$('#filters').onsubmit = event => { event.preventDefault(); void load(); };
$('#filters').onreset = () => { queueMicrotask(() => void load()); };
$('#more').onclick = () => void load(true);
$('#close').onclick = () => $('#detail').close();
$('#detail').addEventListener('close', () => { detailController?.abort(); lastButton?.focus(); });
async function init() {
  // Taxonomy/stat failures must not prevent the official snapshot from loading.
  await Promise.allSettled([
    api('/api/v1/taxonomy?lang=es').then(({ data }) => {
      for (const [name, entries] of [['muscle', data.muscles], ['equipment', data.equipment]]) {
        const select = $(`select[name="${name}"]`); while (select.options.length > 1) select.remove(1);
        for (const entry of entries) { labels.set(entry.id, entry.name); const option = el('option', entry.name); option.value = entry.id; select.append(option); }
      }
    }),
    api('/api/v1/stats').then(({ data }) => { $('#stats').textContent = `${data.total.toLocaleString('es-MX')} ejercicios en la biblioteca`; }),
  ]);
  await load();
}
$('#unlock').onclick = () => void init(); void init();
