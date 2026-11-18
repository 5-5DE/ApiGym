import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rawExercises, getExercise, queryExercises, matchExercise, exerciseFamilies, gymCuration, catalogVersion, catalogQuality } from '../src/catalog.js';
import { createCuration } from '../src/curation.js';
import { createApp } from '../src/app.js';
import { createApiGymClient } from '../client/index.js';

const read = path => JSON.parse(readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const translations = read('data/translations.es.json');
const resolve = name => matchExercise(new URLSearchParams({name}));

test('todos los alias solicitados encuentran los IDs existentes, también sin parámetros nuevos', () => {
  const cases = [
    ['pec tec','flow-0596'],['pec deck','flow-0596'],['peck deck','flow-0596'],['mariposa (máquina)','flow-0596'],
    ['chest press','flow-0576'],['chest press','flow-0577'],['abductor','flow-0597'],['aductor','flow-0598'],
    ['pantorrilla','flow-0605'],['gemelos','flow-0605'],['extensión de piernas','flow-0585'],['extensión de cuádriceps','flow-0585'],
    ['curl femoral acostado','flow-0586'],['curl femoral sentado','flow-0599'],['hack','flow-0743'],['sentadilla hack','flow-0743'],['jack','flow-0743'],
    ['remo sentado','flow-0861'],['remo en polea','flow-0239'],['pullover con cuerda','flow-0237'],['peso muerto unilateral','flow-1757'],
    ['peso muerto a una pierna','flow-1757'],['hiperextensiones','flow-0488'],['lumbares','flow-0489'],['zancadas','flow-3470'],
    ['jalón','flow-0198'],['jalón al pecho','flow-0198'],['jalón dorsal','flow-0198'],
  ];
  for (const [q,id] of cases) {
    for (const options of [{}, {sort:'relevance',match:'any'}]) {
      const result = queryExercises(new URLSearchParams({q,limit:'100',...options}));
      assert.ok(result.data.some(e => e.id === id), `${q}: ${id}`);
    }
  }
  assert.ok(getExercise('Barbell_Lunge').aliases.includes('zancada con barra'));
});

test('las familias tienen un solo representante verificado, sin clasificar movimientos ajenos', () => {
  const families = exerciseFamilies();
  assert.equal(families.length, 17);
  const assigned = new Set();
  for (const family of families) {
    assert.ok(family.exerciseIds.includes(family.defaultExerciseId));
    let defaults = 0;
    for (const id of family.exerciseIds) {
      assert.ok(!assigned.has(id)); assigned.add(id);
      const e = getExercise(id);
      assert.equal(e.familyId, family.id);
      assert.equal(e.localizationReview.titleReview.status, 'verified');
      if (e.isDefaultVariant) { defaults++; assert.equal(id, family.defaultExerciseId); }
    }
    assert.equal(defaults, 1);
  }
  assert.equal(assigned.size, 137);
  for (const id of ['flow-1644','flow-0436','flow-0078','flow-0599','flow-1398']) {
    assert.equal(getExercise(id).familyId, null, id);
    assert.equal(getExercise(id).isDefaultVariant, false, id);
  }
  assert.equal(getExercise('flow-2810').familyId, 'desplantes');
  assert.equal(getExercise('flow-0743').familyId, 'sentadilla-hack');
});

test('nombres generales seleccionan la básica sin reemplazar variantes específicas', () => {
  const cases = [['sentadilla','Barbell_Full_Squat'],['press de banca','flow-0025'],['jalón al pecho','flow-0198'],['pec tec','flow-0596'],['chest press','flow-0576'],['gemelos','flow-0605'],['remo sentado','flow-0861'],['zancadas','flow-3470'],['jack','flow-0743']];
  for (const [name,id] of cases) {
    const result = resolve(name);
    assert.equal(result.best?.id, id, name);
    assert.equal(result.resolutionMethod, 'family-default');
    assert.equal(result.best.isDefaultVariant, true);
    assert.ok(result.alternatives.every(e => e.id !== id));
  }
  const specific = resolve('Press de banca inclinado con barra');
  assert.equal(specific.best?.id, 'flow-0047');
  assert.equal(specific.resolutionMethod, 'lexical');
  assert.equal(specific.best.isDefaultVariant, false);
  assert.equal(resolve('Sentadilla profunda con barra').best, null);
  assert.equal(resolve('remo con barrita negra').best, null);
});

test('alias nuevos no aprueban títulos pendientes ni confunden abducción con aducción', () => {
  for (const [name,id] of [['curl femoral sentado','flow-0599']]) {
    const result = resolve(name);
    assert.equal(result.best, null);
    assert.equal(result.resolutionMethod, 'none');
    assert.equal(result.alternatives[0].id, id);
    assert.equal(result.alternatives[0].confidence, 0.79);
  }
  assert.equal(resolve('abductor').best.id, 'flow-0597');
  assert.equal(resolve('aductor').best.id, 'flow-0598');
});

test('familyId conserva filtros, paginación y metadatos en ambos idiomas y fichas', () => {
  const family = exerciseFamilies().find(f => f.id === 'jalon-al-pecho');
  const page = queryExercises(new URLSearchParams({familyId:family.id,limit:'100'}));
  assert.deepEqual(page.data.map(e => e.id).sort(), [...family.exerciseIds].sort());
  const filtered = queryExercises(new URLSearchParams({familyId:family.id,equipment:'cable',lang:'en',limit:'100',sort:'id'}));
  assert.ok(filtered.data.length > 0);
  for (const e of filtered.data) {
    assert.equal(e.familyId, family.id); assert.equal(e.equipment, 'cable');
    assert.equal(e.language, 'en');
    assert.equal(getExercise(e.id,'es').isDefaultVariant, e.isDefaultVariant);
  }
  const first = queryExercises(new URLSearchParams({familyId:family.id,limit:'5',sort:'id'}));
  const second = queryExercises(new URLSearchParams({familyId:family.id,limit:'5',offset:'5',sort:'id'}));
  assert.equal(new Set([...first.data,...second.data].map(e => e.id)).size, 10);
  assert.throws(() => queryExercises(new URLSearchParams('familyId=unknown')), {code:'INVALID_QUERY'});
  assert.throws(() => queryExercises(new URLSearchParams('familyId=sentadilla&familyId=desplantes')), {code:'INVALID_QUERY'});
});

test('la curación conserva textos, alias anteriores, IDs y evidencia SVG', () => {
  const checksums = read('data/flow-exercise-dataset/data/checksums.json');
  for (const e of rawExercises) {
    const es = getExercise(e.id), en = getExercise(e.id,'en');
    assert.equal(es.name, catalogQuality.entries[e.id]?.displayName || translations[e.id].name);
    assert.equal(en.nameEnOriginal || en.name, e.name);
    assert.deepEqual(es.instructions, translations[e.id].instructions.filter(s => s.trim()));
    for (const alias of translations[e.id].aliases) assert.ok(es.aliases.includes(alias));
    assert.deepEqual(es.media, en.media);
  }
  for (const proof of Object.values(gymCuration.evidence)) for (const frame of proof.frames) assert.equal(frame.sha256, checksums[frame.path]);
  assert.equal(rawExercises.length, 1257);
  assert.notEqual(catalogVersion, 'de1a61dc98f6d820');
});

test('rechaza IDs inexistentes, defaults no verificados, membresía duplicada y evidencia vencida', () => {
  const cases = [
    c => { c.aliases.nope = ['pec deck']; },
    c => { c.families[0].defaultExerciseId = 'flow-0599'; },
    c => { c.families[1].exerciseIds.push(c.families[0].exerciseIds[0]); },
    c => { c.evidence['flow-0198'].originalSha256 = 'bad'; },
    c => { c.evidence['flow-0198'].frames = []; },
  ];
  for (const mutate of cases) {
    const copy = structuredClone(gymCuration); mutate(copy);
    assert.throws(() => createCuration(copy, rawExercises, translations));
  }
});

test('HTTP/SDK exponen familias, filtro, contrato OpenAPI y caché de la nueva versión', async () => {
  const server = createApp({apiKey:''});
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const client = createApiGymClient({baseUrl:base});
  try {
    const families = await client.families(); assert.equal(families.data.length,17);
    assert.equal((await client.families('en')).data[0].name, families.data[0].nameEn);
    const page = await client.list({familyId:'sentadilla',limit:100});
    assert.ok(page.data.length); assert.ok(page.data.every(e => e.familyId === 'sentadilla'));
    const match = await client.match('chest press');
    assert.equal(match.best.id,'flow-0576'); assert.equal(match.resolutionMethod,'family-default');
    for (const path of ['/api/v1/families','/api/v1/exercises?familyId=sentadilla']) {
      const first = await fetch(base + path); const etag = first.headers.get('etag');
      assert.equal(first.headers.get('x-catalog-version'),catalogVersion); await first.text();
      const cached = await fetch(base + path,{headers:{'If-None-Match':etag}});
      assert.equal(cached.status,304); await cached.text();
      const head = await fetch(base + path,{method:'HEAD'}); assert.equal(head.headers.get('etag'),etag); assert.equal(await head.text(),'');
    }
    const invalid = await fetch(base + '/api/v1/families?lang=fr'); assert.equal(invalid.status,400); await invalid.text();
    const spec = await (await fetch(base + '/openapi.json')).json();
    assert.ok(spec.paths['/api/v1/families']);
    assert.ok(spec.components.schemas.Exercise.required.includes('familyId'));
    const html = await (await fetch(base + '/')).text(); assert.ok(html.includes('name="familyId"'));
  } finally {
    server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
  }
});
