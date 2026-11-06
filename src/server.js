import { createApp } from './app.js';
const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT inválido');
const server = createApp();
server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.listen(port, process.env.HOST || '0.0.0.0', () => console.log(`ApiGym lista: http://localhost:${port} · Docs: /docs · API: /api/v1/exercises`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
