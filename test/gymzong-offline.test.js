import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rawExercises, getExercise } from '../src/catalog.js';
import { buildOfflineFiles, verifyOfflineFiles, validateReadiness, routineReview, historicalIds, readinessAudit, sha256 } from '../src/gymzong-offline.js';

test('P4 retains active historical IDs after authorized pruning and rejects replacement or duplication', () => {
  assert.equal(historicalIds.ids.length, 2069);
  assert.equal(validateReadiness(), true);
  assert.throws(() => validateReadiness(routineReview, rawExercises.slice(1).map(e => e.id)), /Historical IDs/);
  const ids = [...historicalIds.ids]; ids[0] = ids[1];
  assert.throws(() => validateReadiness(routineReview, ids), /Historical IDs/);
  ids[0] = 'new-id';
  assert.throws(() => validateReadiness(routineReview, ids), /Historical IDs/);
});

test('all 27 distinct routine positions preserve pending status and original evidence', () => {
  assert.deepEqual(routineReview.positions.map(p => p.position), Array.from({length:27}, (_, i) => i + 1));
  const copy = structuredClone(routineReview);
  copy.positions[0].confirmedApiGymId = 'Hack_Squat'; copy.positions[0].status = 'confirmed';
  assert.throws(() => validateReadiness(copy), /no evidence-backed/);
  copy.positions[0] = structuredClone(routineReview.positions[0]); copy.positions[0].candidateIds.push('no-such-id');
  assert.throws(() => validateReadiness(copy), /Unknown/);
  assert.equal(routineReview.positions[1].candidateIds.length, 0);
  assert.equal(routineReview.positions.filter(p => p.originalName === 'Abductor').length, 3);
  for (const index of [4, 23]) {
    assert.ok(routineReview.positions[index].rejectedCandidates.some(e => e.id === 'flow-0860'));
    assert.ok(!routineReview.positions[index].candidateIds.includes('flow-0860'));
  }
});

test('offline text bundle is deterministic, keeps source text and needs no fetch', t => {
  t.mock.method(globalThis, 'fetch', () => { throw new Error('Network forbidden in offline export'); });
  const a = buildOfflineFiles(), b = buildOfflineFiles();
  assert.deepEqual(a, b);
  const manifest = verifyOfflineFiles(a);
  assert.equal(manifest.policy.previewMediaIncluded, false);
  assert.equal(manifest.policy.translationsHumanReviewed, false);
  assert.equal(manifest.policy.mediaApprovedForInstruction, false);
  const catalog = JSON.parse(a.get('catalog.json'));
  assert.equal(catalog.data.length, 1257);
  for (const e of catalog.data) {
    const original = getExercise(e.id);
    for (const key of ['name', 'aliases', 'instructions', 'primaryMuscles', 'secondaryMuscles', 'translationStatus']) assert.deepEqual(e[key], original[key]);
    assert.equal(e.media.animation, null);
    assert.equal(e.media.thumbnailUrl, null);
    assert.equal(e.mediaStatus, 'none');
  }
  assert.equal([...a.keys()].some(p => p.endsWith('.svg')), false);
  for (const name of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'data/flow-exercise-dataset/NOTICE.md']) assert.ok(a.has(`notices/${name}`));
});

test('offline policy, source routine and mandatory licenses cannot be dropped or promoted', () => {
  const bundle = buildOfflineFiles();
  for (const mutate of [
    (files, manifest) => { manifest.policy.translationsHumanReviewed = true; },
    (files, manifest) => {
      const path = 'notices/data/flow-exercise-dataset/NOTICE.md';
      files.delete(path); manifest.files = manifest.files.filter(e => e.path !== path);
    },
    (files, manifest) => {
      const path = 'routine-original.csv', bytes = Buffer.from('modified source');
      files.set(path, bytes); Object.assign(manifest.files.find(e => e.path === path), { bytes: bytes.length, sha256: sha256(bytes) });
    },
  ]) {
    const files = new Map(bundle), manifest = JSON.parse(files.get('manifest.json'));
    mutate(files, manifest); files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));
    assert.throws(() => verifyOfflineFiles(files));
  }
});

test('offline verifier detects missing, corrupt, extra and unsafe files', () => {
  const bundle = buildOfflineFiles();
  for (const mutate of [
    files => files.delete('catalog.json'),
    files => files.set('catalog.json', Buffer.from('{}')),
    files => files.set('unexpected.svg', Buffer.from('<svg/>')),
    files => {
      const manifest = JSON.parse(files.get('manifest.json')); manifest.files[0].path = '../escape.json';
      files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));
    },
    files => {
      const manifest = JSON.parse(files.get('manifest.json')); manifest.files.push(manifest.files[0]);
      files.set('manifest.json', Buffer.from(JSON.stringify(manifest)));
    },
  ]) { const files = new Map(bundle); mutate(files); assert.throws(() => verifyOfflineFiles(files)); }
});

test('optional preview only packages candidate frames with verified upstream hashes and provenance', () => {
  const files = buildOfflineFiles({ includePreviewMedia: true });
  const manifest = verifyOfflineFiles(files);
  assert.equal(manifest.policy.mediaApprovedForInstruction, false);
  const checksums = JSON.parse(readFileSync(new URL('../data/flow-exercise-dataset/data/checksums.json', import.meta.url)));
  const candidates = new Set(routineReview.positions.flatMap(p => p.candidateIds));
  const catalog = JSON.parse(files.get('catalog.json'));
  let frames = 0;
  for (const e of catalog.data.filter(e => e.media.animation)) {
    assert.ok(candidates.has(e.id));
    for (const path of e.media.animation.frames) {
      assert.equal(sha256(files.get(path)), checksums[path.replace('media/flow/', 'assets/')]);
      const flowId = path.split('/')[2];
      assert.ok(files.has(`provenance/${flowId}.json`)); frames++;
    }
  }
  assert.ok(frames > 0);
});

test('audit never silently promotes translations, technique or atlas to approved', () => {
  const audit = readinessAudit();
  assert.equal(audit.stats.total, 1257); assert.equal(audit.stats.spanish, 1257);
  assert.equal(audit.confirmed, 0); assert.equal(audit.pending, 27);
  assert.equal(audit.atlas.includedInOfflinePackage, false);
  assert.ok(audit.candidates.every(e => e.nameReview !== 'human-reviewed' && e.techniqueReview === 'pending-human-review'));
  assert.equal(audit.candidates.filter(e => e.hasSvg).length, 19);
  assert.ok(audit.candidates.filter(e => e.hasSvg).every(e => e.visualScreening?.observed && e.visualScreening?.concern));
});
