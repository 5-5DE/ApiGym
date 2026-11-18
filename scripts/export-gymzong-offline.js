import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { buildOfflineFiles } from '../src/gymzong-offline.js';

const args = process.argv.slice(2);
if (args.some(a => a.startsWith('--') && a !== '--include-preview-media') || args.filter(a => !a.startsWith('--')).length > 1) throw new Error('Usage: node scripts/export-gymzong-offline.js [output-directory] [--include-preview-media]');
const output = resolve(args.find(a => !a.startsWith('--')) ?? 'dist/gymzong-offline');
// Build and validate before writing; refuse an existing output, never replace it.
const files = buildOfflineFiles({ includePreviewMedia: args.includes('--include-preview-media') });
await mkdir(dirname(output), { recursive: true });
await mkdir(output);
for (const [path, bytes] of files) {
  const destination = join(output, path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, bytes, { flag: 'wx' });
}
console.log(JSON.stringify({ output, fileCount: files.size, bytes: [...files.values()].reduce((sum, bytes) => sum + bytes.length, 0) }));
