import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { verifyOfflineFiles } from '../src/gymzong-offline.js';

if (process.argv.length !== 3) throw new Error('Usage: node scripts/verify-gymzong-offline.js <package-directory>');
const root = resolve(process.argv[2]);
const files = new Map();
async function visit(relative = '') {
  for (const entry of await readdir(join(root, relative), { withFileTypes: true })) {
    const path = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Symlink not permitted: ${path}`);
    if (entry.isDirectory()) await visit(path);
    else if (entry.isFile()) files.set(path, await readFile(join(root, path)));
    else throw new Error(`Unsupported package entry: ${path}`);
  }
}
await visit();
const manifest = verifyOfflineFiles(files);
console.log(JSON.stringify({ valid: true, exerciseCount: manifest.exerciseCount, catalogVersion: manifest.catalogVersion, fileCount: files.size }));
