import { test } from 'node:test';
import assert from 'node:assert/strict';
import { queryExercises } from '../src/catalog.js';
import { searchDocument, searchMatch, searchQuery } from '../src/search.js';
import { createApp } from '../src/app.js';
import { createApiGymClient } from '../client/index.js';

const search = (q, options = {}) => queryExercises(new URLSearchParams({ q, sort: 'relevance', ...options }));

test('relevancia resuelve las regresiones de sentadilla y jalón sin cambiar IDs', () => {
  for (const q of ['sentadilla', 'sentadillas', 'sentadila', 'SENTÁDILLA']) {
    assert.equal(search(q).data[0].id, 'Barbell_Full_Squat', q);
    assert.deepEqual(search(q).data[0].matchedTokens, [q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()]);
  }
  assert.equal(search('jalon').data[0].id, 'flow-0198');
  assert.equal(search('Jalón al pecho en polea alta').data[0].id, 'flow-0198');
  assert.equal(search('pecho jalon').data[0].id, search('jalon pecho').data[0].id);
  const a = search('sentadilla', { limit: '100' }), b = search('sentadillas', { limit: '100' });
  assert.deepEqual(a.data.map(e => e.id), b.data.map(e => e.id));
});

test('match any admite palabras sobrantes, conserva filtros y explica qué coincidió', () => {
  assert.equal(search('remo con barrita negra').pagination.total, 0);
  const partial = search('remo con barrita negra', { match: 'any', equipment: 'cable', muscle: 'middle back', limit: '100' });
  assert.ok(partial.data.length > 0);
  for (const e of partial.data) {
    assert.equal(e.equipment, 'cable');
    assert.ok(e.primaryMuscles.includes('middle back'));
    assert.ok(e.matchedTokens.includes('remo'));
    assert.ok(!e.matchedTokens.includes('con'));
    assert.ok(Number.isInteger(e.score));
  }
});

test('la jerarquía prioriza nombre, alias, prefijo, popularidad y menos palabras sobrantes', () => {
  const score = (name, aliases = [], popular = false) => searchMatch(searchDocument({names:[name], aliases, metadata:[], popular}), searchQuery('remo'), 'all').score;
  assert.ok(score('Remo') > score('Tracción', ['remo']));
  assert.ok(score('Tracción', ['remo']) > score('Remo sentado', [], true));
  assert.ok(score('Remo sentado') > score('Tracción', ['remo sentado'], true));
  assert.ok(score('Remo sentado largo', [], true) > score('Remo sentado'));
  assert.ok(score('Remo sentado') > score('Remo sentado largo'));
});

test('tolerancia de una letra permite inserción, omisión y sustitución sin aproximar abreviaturas', () => {
  const doc = searchDocument({ names:['sentadilla'], aliases:[], metadata:[], popular:false });
  for (const q of ['sentadila', 'sentadillaa', 'sentadillu']) assert.equal(searchMatch(doc, searchQuery(q), 'all').matches, true, q);
  assert.equal(searchMatch(doc, searchQuery('sentaxilx'), 'all').matches, false);
  const short = searchDocument({ names:['remo'], aliases:[], metadata:[], popular:false });
  assert.equal(searchMatch(short, searchQuery('rem'), 'all').matches, false);
  assert.equal(search('zzzxxyy', { match:'any' }).pagination.total, 0);
});

test('consultas vacías, conectores, opciones inválidas y compatibilidad anterior', () => {
  const legacy = queryExercises(new URLSearchParams('q=sentadilla'));
  assert.equal(legacy.data[0].id, 'flow-1644');
  assert.ok(!('score' in legacy.data[0]));
  assert.equal(queryExercises(new URLSearchParams('q=sentadila')).pagination.total, 0);
  assert.equal(search('de con al').pagination.total, 0);
  const all = search('');
  assert.equal(all.pagination.total, 1257);
  assert.equal(all.data[0].score, 0);
  assert.deepEqual(all.data[0].matchedTokens, []);
  for (const query of ['match=maybe', 'match=any&match=all', 'sort=similarity']) {
    assert.throws(() => queryExercises(new URLSearchParams(query)), {code:'INVALID_QUERY'});
  }
});

test('paginación por relevancia es estable y no pierde ni duplica resultados', () => {
  const whole = search('sentadilla', { limit:'100' });
  const ids = [];
  let offset = 0;
  do {
    const page = search('sentadilla', { limit:'13', offset:String(offset) });
    assert.equal(page.pagination.total, whole.pagination.total);
    ids.push(...page.data.map(e => e.id));
    offset = page.pagination.nextOffset;
  } while (offset !== null);
  assert.deepEqual(ids, whole.data.map(e => e.id));
  assert.equal(new Set(ids).size, ids.length);
  for (let i=1; i<whole.data.length; i++) assert.ok(whole.data[i-1].score >= whole.data[i].score);
});

test('HTTP y SDK exponen relevancia, validación, OpenAPI, HEAD y caché 304', async () => {
  const server = createApp({apiKey:'', corsOrigins:'*'});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const client = createApiGymClient({baseUrl:base});
    const page = await client.list({q:'sentadila', sort:'relevance', match:'any'});
    assert.equal(page.data[0].id, 'Barbell_Full_Squat');
    assert.deepEqual(page.data[0].matchedTokens, ['sentadila']);
    const path = '/api/v1/exercises?q=sentadila&sort=relevance&match=any';
    const first = await fetch(base + path);
    const etag = first.headers.get('etag');
    assert.ok(etag); assert.equal(first.status, 200); await first.text();
    const cached = await fetch(base + path, {headers:{'If-None-Match':etag}});
    assert.equal(cached.status, 304); assert.equal(await cached.text(), '');
    const head = await fetch(base + path, {method:'HEAD'});
    assert.equal(head.headers.get('etag'), etag); assert.equal(await head.text(), '');
    const bad = await fetch(base + '/api/v1/exercises?match=maybe');
    assert.equal(bad.status, 400); assert.equal((await bad.json()).error.code, 'INVALID_QUERY');
    const spec = await (await fetch(base + '/openapi.json')).json();
    const params = spec.paths['/api/v1/exercises'].get.parameters;
    assert.ok(params.find(p => p.name === 'sort').schema.enum.includes('relevance'));
    assert.deepEqual(params.find(p => p.name === 'match').schema.enum, ['all','any']);
    const script = await (await fetch(base + '/demo.js')).text();
    assert.ok(script.includes("params.set('sort', 'relevance')"));
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
