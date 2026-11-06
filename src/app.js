import { createServer } from 'node:http';
import { timingSafeEqual, createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { getExercise, queryExercises, taxonomy, stats, catalogVersion } from './catalog.js';
import { readFileSync as readSync } from 'node:fs';
const flowDataset = JSON.parse(readSync(new URL('../data/flow-exercise-dataset/data/exercises.json', import.meta.url), 'utf8'));
const flowMediaPaths = new Set(flowDataset.filter(e => e.animation).flatMap(e => e.animation.frames.map(path => path.replace(/^assets\//, '/media/flow/'))));
import { choice, checkParams, InputError } from './validation.js';
import { openapi } from './openapi.js';

const sources = JSON.parse(readFileSync(new URL('../data/sources.json', import.meta.url), 'utf8'));
const files = new Map([
  ['/', ['../public/index.html', 'text/html; charset=utf-8']],
  ['/docs', ['../public/docs.html', 'text/html; charset=utf-8']],
  ['/demo.js', ['../public/demo.js', 'text/javascript; charset=utf-8']],
  ['/docs.js', ['../public/docs.js', 'text/javascript; charset=utf-8']],
  ['/style.css', ['../public/style.css', 'text/css; charset=utf-8']],
]);
const staticFiles = new Map([...files].map(([path, [file, type]]) => [path, {body: readFileSync(new URL(file, import.meta.url)), type}]));

export function createApp({ corsOrigins = process.env.CORS_ORIGINS || '*', apiKey = process.env.API_KEY || '' } = {}) {
  const origins = corsOrigins.split(',').map(s => s.trim()).filter(Boolean);
  return createServer((req, res) => {
    let head = req.method === 'HEAD';
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https:; media-src 'self' https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    res.setHeader('Vary', 'Origin');
    const origin = req.headers.origin;
    const allowedOrigin = origins.includes('*') ? '*' : origins.includes(origin) ? origin : null;
    if (allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Access-Control-Expose-Headers', 'ETag, X-Catalog-Version');
    }
    const send = (status, payload, {type = 'application/json; charset=utf-8', cache = true} = {}) => {
      const body = Buffer.isBuffer(payload) ? payload : Buffer.from(JSON.stringify(payload));
      res.setHeader('Content-Type', type);
      res.setHeader('Cache-Control', status < 300 && cache ? (apiKey ? 'private, max-age=300' : 'public, max-age=300') : 'no-store');
      res.setHeader('X-Catalog-Version', catalogVersion);
      if (status === 200 && cache) {
        const etag = `"${createHash('sha256').update(body).digest('hex')}"`;
        res.setHeader('ETag', etag);
        if ((req.headers['if-none-match'] || '').split(',').some(x => x.trim() === etag || x.trim() === `W/${etag}` || x.trim() === '*')) {
          res.writeHead(304); res.end(); return;
        }
      }
      res.setHeader('Content-Length', body.length);
      res.writeHead(status); res.end(head ? undefined : body);
    };
    const error = (status, code, message) => send(status, {error: {code, message}}, {cache: false});
    try {
      if ((req.url || '').length > 4096) return error(414, 'URI_TOO_LONG', 'URL demasiado larga');
      const url = new URL(req.url, 'http://localhost');
      const path = decodeURIComponent(url.pathname).replace(/\/$/, '') || '/';
      if (req.method === 'OPTIONS') {
        if (origin && !allowedOrigin) return error(403, 'ORIGIN_NOT_ALLOWED', 'Origen no permitido');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-API-Key, If-None-Match');
        res.setHeader('Access-Control-Max-Age', '600');
        res.writeHead(204); return res.end();
      }
      if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD, OPTIONS'); return error(405, 'METHOD_NOT_ALLOWED', 'La API es de solo lectura'); }
      if (path.startsWith('/api/v1') && apiKey) {
        const supplied = Buffer.from(req.headers['x-api-key'] || ''); const expected = Buffer.from(apiKey);
        if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return error(401, 'UNAUTHORIZED', 'X-API-Key inválida o ausente');
      }
      if (staticFiles.has(path)) { const file = staticFiles.get(path); return send(200, file.body, {type: file.type}); }
      if (path.startsWith('/media/flow/')) {
        if (!flowMediaPaths.has(path)) return error(404, 'MEDIA_NOT_FOUND', 'Animación no encontrada');
        const relative = path.replace(/^\/media\/flow\//, '');
        const body = readSync(new URL(`../data/flow-exercise-dataset/assets/${relative}`, import.meta.url));
        return send(200, body, {type:'image/svg+xml; charset=utf-8'});
      }
      if (path === '/health') return send(200, {status: 'ok', catalogVersion}, {cache: false});
      if (path === '/openapi.json') return send(200, {...openapi,security:apiKey ? [{ApiKey:[]}] : [{}]});
      if (path === '/api/v1/exercises') return send(200, queryExercises(url.searchParams));
      if (path === '/api/v1/stats') { checkParams(url.searchParams, []); return send(200, {data: stats()}); }
      if (path === '/api/v1/sources') { checkParams(url.searchParams, []); return send(200, {data: sources}); }
      const langOnly = () => { checkParams(url.searchParams, ['lang']); return choice(url.searchParams.get('lang'), ['es', 'en'], 'lang', 'es'); };
      if (path === '/api/v1/taxonomy') return send(200, {data: taxonomy(langOnly())});
      if (path === '/api/v1/exercises/batch') {
        checkParams(url.searchParams, ['ids', 'lang']);
        const lang = choice(url.searchParams.get('lang'), ['es', 'en'], 'lang', 'es');
        const values = url.searchParams.get('ids')?.split(',') || [];
        if (!values.length || values.length > 50 || values.some(s => !/^[\w-]+$/.test(s))) throw new InputError('ids requiere entre 1 y 50 identificadores separados por comas');
        const ids = [...new Set(values)]; const exercises = ids.map(id => getExercise(id, lang));
        return send(200, {data: exercises.filter(Boolean), missingIds: ids.filter((id, i) => !exercises[i])});
      }
      const match = path.match(/^\/api\/v1\/exercises\/([\w-]+)(\/media)?$/);
      if (match) {
        const lang = langOnly(); const exercise = getExercise(match[1], lang);
        if (!exercise) return error(404, 'EXERCISE_NOT_FOUND', 'Ejercicio no encontrado');
        return send(200, {data: match[2] ? {exerciseId: exercise.id, ...exercise.media} : exercise});
      }
      return error(404, 'NOT_FOUND', 'Ruta no encontrada');
    } catch (e) {
      if (e instanceof URIError) return error(400, 'INVALID_URL', 'URL inválida');
      if (e instanceof InputError) return error(e.status, e.code, e.message);
      console.error(e);
      return error(500, 'INTERNAL_ERROR', 'Error interno');
    }
  });
}
