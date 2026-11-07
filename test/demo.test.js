import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Minimal DOM executes the production script; no snapshot of its implementation.
function browser() {
  class Element {
    constructor(tag){this.tag=tag;this.children=[];this.events={};this.className='';this.value='';this.options=[{}];this.classList={add:name=>{this.className=[...new Set([...this.className.split(' ').filter(Boolean),name])].join(' ');}};}
    append(...nodes){for(const n of nodes) this.children.push(...(n?.tag==='fragment'?n.children:[n]));}
    replaceChildren(...nodes){this.children=[];this.append(...nodes);}
    addEventListener(name,fn){this.events[name]=fn;}
    querySelector(){return null;}
    showModal(){this.open=true;}
    remove(){this.options.shift();}
  }
  const elements=new Map(); const $=key=>{if(!elements.has(key))elements.set(key,new Element(key));return elements.get(key);};
  let requests=async path=>({data:path.includes('taxonomy')?{muscles:[{id:'biceps',name:'Bíceps',count:1}],equipment:[{id:'dumbbell',name:'Mancuernas',count:1}]}:path.includes('stats')?{}:[],pagination:{total:0,nextOffset:null}});
  const context=vm.createContext({document:{querySelector:$,createElement:tag=>new Element(tag),createDocumentFragment:()=>new Element('fragment'),createTextNode:text=>text,addEventListener(){}},matchMedia:()=>({matches:false}),AbortController,URLSearchParams,FormData:class { *[Symbol.iterator](){yield ['lang','es'];} },Image:class{},setInterval:()=>1,clearInterval(){},fetch:async(path,init)=>({ok:true,json:()=>requests(path,init)})});
  vm.runInContext(readFileSync(new URL('../public/demo.js',import.meta.url),'utf8'),context);
  return { $, context, setRequests:fn=>{requests=fn;} };
}
const item={id:'flow-0372',name:'Predicador',requestedLanguage:'es',language:'en',equipment:'dumbbell',primaryMuscles:['biceps'],instructions:['Original'],instructionsAvailable:true,source:{url:'https://example.com',license:'Test',licenseUrl:'https://example.com/license'},media:{thumbnailUrl:'/media/flow/0372/frame-00.svg',images:[],animation:{type:'svg-sequence',frames:['a','b','c'],sequence:[0,1,2,1],frameDurationMs:180,sourceUrl:'https://example.com',license:'Test',licenseUrl:'https://example.com/license'}}};
const tick=()=>new Promise(resolve=>setImmediate(resolve));

test('detalle conserva sketch y demonstration, y fallo conserva instrucciones',async()=>{
  const b=browser();await tick();b.context.exercise=item;vm.runInContext('detail(exercise)',b.context);
  const body=b.$('#detail-body'), image=body.children.find(n=>n.tag==='img');
  assert.equal(image.className,'sketch demonstration');
  image.events.error();
  assert.equal(image.hidden,true);assert.ok(body.children.some(n=>n.tag==='ol'));
  assert.ok(body.children.some(n=>n.tag==='button'&&n.disabled));
});

test('primera página visible sin esperar la segunda; etiquetas españolas y tarjeta sin medio accesible',async()=>{
  const b=browser();await tick();let resolveSecond;
  b.setRequests(path=>path.includes('offset=100')?new Promise(resolve=>{resolveSecond=resolve;}):{data:[item],pagination:{total:2,nextOffset:100}});
  const loading=vm.runInContext('load()',b.context);await tick();
  assert.equal(b.$('#results').children.length,1);
  const card=b.$('#results').children[0];assert.ok(card.children.some(n=>n.textContent==='Bíceps / Mancuernas'));
  card.children[0].events.error();assert.ok(card.children.some(n=>n.tag==='button'));
  resolveSecond({data:[{...item,id:'no-media',media:{animation:null}}],pagination:{total:2,nextOffset:null}});await loading;
  assert.equal(b.$('#results').children.length,2);
});
