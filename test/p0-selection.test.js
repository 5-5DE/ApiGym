import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createApp } from '../src/app.js';
const snapshot = JSON.parse(readFileSync(new URL('../data/essential-50.json',import.meta.url)));
test('P0 real HTTP: snapshot exacto, catálogo preservado, filtros, fichas, HEAD, CORS, ETag y clave', async () => {
  const server = createApp({apiKey:'test-only-local-key'});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const get = (path, init={})=>fetch(base+path,{...init,headers:{'X-API-Key':'test-only-local-key',...init.headers}});
  try {
    const path='/api/v1/selections/essential-50';
    assert.equal((await fetch(base+path)).status,401);
    const response=await get(path,{headers:{Origin:'http://localhost:8081'}});
    assert.equal(response.status,200); assert.equal(response.headers.get('access-control-allow-origin'),'*');
    const value=await response.json();assert.deepEqual(value,snapshot);assert.equal(new Set(value.data.map(item=>item.id)).size,10);
    assert.ok(value.data.every(item=>item.media.best===null));
    assert.equal((await get(path,{method:'HEAD'})).status,200);
    assert.equal((await get(path,{headers:{'If-None-Match':response.headers.get('etag')}})).status,304);
    assert.equal((await get(path+'?limit=10')).status,400);
    const history=await (await get('/api/v1/exercises?limit=100')).json();assert.equal(history.pagination.total,1257);
    for (const exercise of value.data) {
      const detail=await (await get('/api/v1/exercises/'+encodeURIComponent(exercise.id))).json();assert.equal(detail.data.id,exercise.id);
    }
    const filtered=await (await get('/api/v1/exercises?equipment=dumbbell&muscle=chest&q=bench')).json();
    assert.ok(filtered.data.length);assert.ok(filtered.data.every(item=>item.equipment==='dumbbell'&&item.primaryMuscles.includes('chest')));
  } finally {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
