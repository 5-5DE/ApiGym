import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchExercise, getExercise, catalogVersion } from '../src/catalog.js';
import { resolveCandidates } from '../src/resolver.js';
import { searchDocument } from '../src/search.js';
import { createApp } from '../src/app.js';
import { createApiGymClient } from '../client/index.js';

const resolve = (name, lang = 'es') => matchExercise(new URLSearchParams({name, lang}));
const entry = (id, name, options = {}) => ({id, name, ...options, document:searchDocument({names:[name], aliases:options.aliases || [], metadata:options.metadata || [], popular:options.popular || false})});

test('resuelve nombres y alias únicos, normalización, plurales, orden de palabras y un error', () => {
  for (const name of ['Jalón al pecho en polea alta', 'JALÓN DORSAL EN POLEA', 'jalones dorsales en polea', 'polea dorsal jalon', 'jalon dorsal en poleaa']) {
    const result = resolve(name);
    assert.equal(result.best?.id, 'flow-0198', name);
    assert.equal(result.reason, 'matched');
    assert.ok(result.best.confidence >= 0.84);
    assert.ok(result.alternatives.every(e => e.id !== result.best.id));
    assert.equal(result.catalogVersion, catalogVersion);
    assert.equal(result.resolverVersion, '3');
  }
  assert.equal(resolve('Flexiones de brazos').best?.id, 'flow-0662');
  const en = resolve('Jalón al pecho en polea alta', 'en');
  assert.equal(en.best.name, getExercise('flow-0198', 'en').name);
});

test('nombres duplicados y alias compartidos se abstienen aunque haya un ejercicio popular', () => {
  for (const name of ['Sentadilla profunda con barra', 'lagartijas']) {
    const result = resolve(name);
    assert.equal(result.best, null, name);
    assert.equal(result.reason, 'ambiguous');
    assert.equal(result.alternatives.length, 5);
    assert.equal(new Set(result.alternatives.map(e => e.id)).size, 5);
  }
  const duplicates = [entry('a','Remo corto',{popular:true}), entry('b','Remo corto')];
  assert.equal(resolveCandidates(duplicates, 'remo corto').best, null);
});

test('consultas generales, palabras sobrantes, metadatos y términos desconocidos no fuerzan best', () => {
  for (const name of ['remo con barrita negra']) {
    const result = resolve(name);
    assert.equal(result.best, null, name);
    assert.equal(result.reason, 'insufficient-evidence');
    assert.ok(result.alternatives.length > 0);
  }
  const metadata = resolveCandidates([entry('a', 'Remo corto', {metadata:['cuadriceps']})], 'cuadriceps');
  assert.equal(metadata.best, null);
  assert.equal(metadata.alternatives[0].confidence, 0.2);
  for (const name of ['zzzxxyy', 'de con al', '...']) {
    const result = resolve(name);
    assert.equal(result.best, null);
    assert.deepEqual(result.alternatives, []);
    assert.equal(result.reason, 'no-candidates');
  }
});

test('títulos pendientes no se asignan automáticamente ni dejan de contar en la ambigüedad', () => {
  const result = resolve('cable thibaudeau kayak row');
  assert.equal(result.best, null);
  assert.equal(result.alternatives[0].id, 'flow-2464');
  assert.equal(result.alternatives[0].confidence, 0.79);
  const entries = [entry('clear','Remo corto'), ...Array.from({length:8}, (_,i) => entry('pending'+i, 'Remo corto', {titlePending:true}))];
  const ambiguous = resolveCandidates(entries, 'Remo corto');
  assert.equal(ambiguous.best, null);
  assert.equal(ambiguous.reason, 'ambiguous');
});

test('la identidad no se obtiene combinando idiomas, repitiendo términos o corrigiendo dos errores', () => {
  const entries = [{id:'a',name:'Remo sentado',document:searchDocument({names:['Remo sentado','seated row'],aliases:[],metadata:[],popular:false})}];
  for (const q of ['remo seated', 'remo remo', 'remoo sentadoo']) assert.equal(resolveCandidates(entries, q).best, null, q);
  const variants = [entry('a', 'Flexiones de brazos'), entry('b','Flexiones de brazos a un brazo')];
  assert.equal(resolveCandidates(variants, 'Flexiones de brazos').best.id, 'a');
});

test('el margen de confianza bloquea nombres casi equivalentes aunque uno sea exacto', () => {
  const candidates = [entry('a','Remo corto'), entry('b','Corto remo')];
  const result = resolveCandidates(candidates, 'Remo corto');
  assert.equal(result.best, null);
  assert.equal(result.reason, 'ambiguous');
  assert.equal(result.alternatives[0].confidence, 0.99);
  assert.equal(result.alternatives[1].confidence, 0.95);
});

test('valida name y lang, rechaza parámetros duplicados y desconocidos', () => {
  for (const params of ['', 'name=', 'name=%20%20', 'name=remo&name=jalon', 'name=remo&lang=fr', 'name=remo&q=remo', 'name='+'x'.repeat(201)]) {
    assert.throws(() => matchExercise(new URLSearchParams(params)), {code:'INVALID_QUERY'}, params);
  }
});

test('HTTP y SDK respetan contrato plano, ruta reservada, caché, HEAD, CORS y autenticación', async () => {
  const server = createApp({apiKey:'test-key',corsOrigins:'https://gymzong.example'});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const path = '/api/v1/exercises/match?name=jalon%20dorsal%20en%20polea';
  const headers = {'X-API-Key':'test-key', Origin:'https://gymzong.example'};
  try {
    const unauthorized = await fetch(base + path);
    assert.equal(unauthorized.status, 401); await unauthorized.text();
    const client = createApiGymClient({baseUrl:base,apiKey:'test-key'});
    const result = await client.match('jalon dorsal en polea');
    assert.equal(result.best.id, 'flow-0198'); assert.ok(!('data' in result));
    const first = await fetch(base + path, {headers});
    assert.equal(first.status, 200);
    const etag = first.headers.get('etag'); assert.ok(etag);
    assert.equal(first.headers.get('access-control-allow-origin'), 'https://gymzong.example');
    assert.equal(first.headers.get('x-catalog-version'), catalogVersion);
    assert.deepEqual(await first.json(), result);
    const cached = await fetch(base + path, {headers:{...headers,'If-None-Match':etag}});
    assert.equal(cached.status, 304); assert.equal(await cached.text(), '');
    const head = await fetch(base + path, {headers,method:'HEAD'});
    assert.equal(head.status, 200); assert.equal(head.headers.get('etag'), etag); assert.equal(await head.text(), '');
    const otherLang = await fetch(base + path + '&lang=en', {headers});
    assert.notEqual(otherLang.headers.get('etag'), etag); await otherLang.text();
    const bad = await fetch(base + '/api/v1/exercises/match', {headers});
    assert.equal(bad.status, 400); assert.equal((await bad.json()).error.code, 'INVALID_QUERY');
    const missing = await fetch(base + '/api/v1/exercises/match?name=zzzxxyy', {headers});
    assert.equal(missing.status, 200); assert.deepEqual((await missing.json()).alternatives, []);
    const options = await fetch(base + path, {method:'OPTIONS',headers:{Origin:'https://gymzong.example'}});
    assert.equal(options.status, 204);
    const spec = await (await fetch(base + '/openapi.json')).json();
    assert.ok(spec.paths['/api/v1/exercises/match'].get.parameters.find(p => p.name === 'name').required);
    assert.equal(spec.components.schemas.MatchResult.properties.alternatives.maxItems, 5);
    const ordinary = await client.get('flow-0198'); assert.equal(ordinary.data.id, 'flow-0198');
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
