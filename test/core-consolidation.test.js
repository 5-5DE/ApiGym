import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {rawExercises,stats,queryExercises,getExercise} from '../src/catalog.js';
import {validateRefreshCandidate} from '../scripts/refresh-data.js';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const fixture=()=>({previous:read('data/upstream/free-exercise-db.json'),candidate:read('data/upstream/free-exercise-db.json'),flow:read('data/flow-exercise-dataset/data/exercises.json'),translations:read('data/translations.es.json'),names:read('data/names.es.json'),media:read('data/media.json'),featuredIds:read('data/editorial-featured.json')});
test('C0-I: coverage is additive, review is not fabricated and legacy spanish keeps its meaning',()=>{
 const s=stats();assert.equal(s.spanish,73);assert.deepEqual(s.translationCoverage,{spanishNames:75,spanishInstructions:73,namesPendingReview:75,reviewedTranslations:0,englishNameFallbacks:1994});assert.equal(s.translationCoverage.spanishNames+s.translationCoverage.englishNameFallbacks,2069);
 assert.equal(getExercise('flow-0372').language,'en');assert.equal(getExercise('flow-0372').nameLanguage,'es');assert.equal(getExercise('flow-0372').nameStatus,'draft');assert.equal(getExercise('3_4_Sit-Up').nameLanguage,'en');
});
test('C0-I: all exact historical IDs resolve uniquely through search; filters still apply',()=>{
 for(const e of rawExercises){const page=queryExercises(new URLSearchParams({q:e.id,limit:100}));assert.equal(page.pagination.total,1,e.id);assert.equal(page.data[0].id,e.id);}
 assert.equal(queryExercises(new URLSearchParams({q:'flow-0372',equipment:'barbell'})).pagination.total,0);
 for(const q of ['bíceps-mancuerna-predicador','dumbbell preacher curl'])assert.ok(queryExercises(new URLSearchParams({q})).data.some(e=>e.id==='flow-0372'));
 for(const id of ['flow-0599','Barbell_Squat','Pushups'])assert.equal(queryExercises(new URLSearchParams({q:id})).data[0].id,id);
});
test('C0-I: refresh preflight supports Flow translation and media without changing input identity',()=>{
 const f=fixture(),before=JSON.stringify(f.candidate);f.translations['flow-0372']={name:'Fixture de validación',aliases:[],instructions:['Paso de fixture uno','Paso de fixture dos']};
 f.media.push({exerciseId:'flow-0599',type:'gif',url:'https://example.com/fixture.gif',sourceUrl:'https://example.com',license:'Fixture',licenseUrl:'https://example.com/license',attribution:'Fixture de validador; no recurso real'});
 const combined=validateRefreshCandidate(f);assert.equal(combined.length,2069);assert.equal(JSON.stringify(f.candidate),before);assert.deepEqual(combined.map(e=>e.id).sort(),rawExercises.map(e=>e.id).sort());
});
test('C0-I: refresh rejects orphan translations, removed IDs, stale names and reallocated Flow identities',()=>{
 let f=fixture();f.translations.unknown=f.translations.Barbell_Squat;assert.throws(()=>validateRefreshCandidate(f),/huérfana/);
 f=fixture();f.candidate.shift();assert.throws(()=>validateRefreshCandidate(f),/eliminarían IDs/);
 f=fixture();f.names['flow-0372'].sourceEquipment='barbell';assert.throws(()=>validateRefreshCandidate(f),/Origen/);
 f=fixture();const matched=rawExercises.find(e=>!e.id.startsWith('flow-')&&e.flowRecord);f.candidate.find(e=>e.id===matched.id).name+=' changed';assert.throws(()=>validateRefreshCandidate(f),/identidad histórica Flow/);
 f=fixture();f.featuredIds.push('unknown');assert.throws(()=>validateRefreshCandidate(f),/editorial/);
});
