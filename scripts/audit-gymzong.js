import { mkdirSync, writeFileSync } from 'node:fs';
import { readinessAudit } from '../src/gymzong-offline.js';
mkdirSync(new URL('../reports/', import.meta.url), { recursive: true });
writeFileSync(new URL('../reports/P4-00-audit.json', import.meta.url), JSON.stringify(readinessAudit(), null, 2) + '\n');
console.log('reports/P4-00-audit.json');
