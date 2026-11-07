const ref = name => ({$ref: `#/components/schemas/${name}`});
const json = schema => ({'application/json': {schema}});
const response = schema => ({description: 'Respuesta correcta', content: json(schema)});
const errors = Object.fromEntries([400,401,404,405,500].map(code => [code,{description: 'Error estructurado', content: json(ref('Error'))}]));
const param = (name, schema, description) => ({name, in: 'query', required: false, schema, description});
const lang = param('lang', {type:'string', enum:['es','en'], default:'es'}, 'Idioma solicitado; language indica el idioma de instrucciones; nameLanguage distingue nombres traducidos sin instrucciones españolas.');
const get = (summary, schema, parameters = []) => ({summary, parameters, responses: {200: response(schema),304:{description:'Sin cambios (If-None-Match)'},...errors}});
const item = name => ({type:'object', required:['data'], properties:{data:ref(name)}});
const string = {type:'string'};
export const openapi = {
  openapi:'3.1.0', info:{title:'ApiGym', version:'1.0.0', description:'Catálogo independiente para trackers. 2,069 ejercicios deduplicados, 75 títulos españoles en borrador, 73 con instrucciones españolas sin revisión acreditada y 1,257 animaciones SVG locales. Consulta /api/v1/stats para la cobertura real. La fuente SVG documenta limitaciones de procedencia.'},
  servers:[{url:'/'}],
  security:[{ApiKey:[]},{}],
  paths:{
    '/health':{get:{...get('Estado del servicio',{type:'object',properties:{status:{const:'ok'},catalogVersion:string}}),security:[]}},
    '/api/v1/exercises':{get:get('Buscar y filtrar ejercicios',ref('ExercisePage'),[
      param('q',{type:'string',maxLength:200},'ID exacto prioritario; si no coincide, busca palabras sin distinguir acentos en IDs, nombres, alias, músculos y equipo en ambos idiomas. Conserva todos los filtros.'),
      param('muscle',string,'Músculo principal, ID canónico de /taxonomy, p. ej. chest.'),
      param('equipment',string,'ID canónico de equipo, p. ej. dumbbell, barbell, body only.'),
      param('difficulty',{type:'string',enum:['beginner','intermediate','expert','unknown']},'Nivel de dificultad; unknown significa que la fuente no especifica uno.'),
      param('category',string,'Categoría canónica, p. ej. strength o cardio.'),
      param('popular',{type:'boolean'},'Alias compatible de editorialFeatured; selección editorial independiente del idioma, no ranking estadístico.'),
      param('editorialFeatured',{type:'boolean'},'Selección editorial explícita. Si se combina con popular se aplican ambos filtros.'),
      param('hasAnimation',{type:'boolean'},'Solo ilustraciones SVG, GIF o video; no incluye fotos estáticas.'),lang,
      param('sort',{type:'string',enum:['name','id'],default:'name'},'Desempate por ID para paginación estable.'),
      param('limit',{type:'integer',minimum:1,maximum:100,default:20},'Tamaño de página.'),
      param('offset',{type:'integer',minimum:0,default:0},'Desplazamiento desde cero.')
    ])},
    '/api/v1/exercises/batch':{get:get('Resolver hasta 50 IDs guardados en rutinas',{type:'object',required:['data','missingIds'],properties:{data:{type:'array',items:ref('Exercise')},missingIds:{type:'array',items:string}}},[param('ids',{type:'string',example:'Barbell_Squat,Pushups'},'IDs separados por coma. Conserva orden, elimina duplicados y devuelve missingIds.'),lang])},
    '/api/v1/exercises/{id}':{get:get('Obtener un ejercicio',item('Exercise'),[{name:'id',in:'path',required:true,schema:string},lang])},
    '/api/v1/exercises/{id}/media':{get:get('Obtener medios y sus atribuciones',item('Media'),[{name:'id',in:'path',required:true,schema:string},lang])},
    '/media/flow/{id}/{frame}':{get:{summary:'Obtener un cuadro SVG de una demostración',parameters:[{name:'id',in:'path',required:true,schema:{type:'string',pattern:'^\\d{4}$'}},{name:'frame',in:'path',required:true,schema:{type:'string',pattern:'^frame-0[0-2]\\.svg$'}}],responses:{200:{description:'Imagen SVG local',content:{'image/svg+xml':{schema:{type:'string'}}}},404:{description:'Cuadro no encontrado'}}}},
    '/api/v1/taxonomy':{get:get('Músculos, equipo, categorías y niveles con conteos globales',{type:'object',properties:{data:ref('Taxonomy')}},[lang])},
    '/api/v1/stats':{get:get('Cobertura de idioma y medios',{type:'object',properties:{data:ref('Stats')}})},
    '/api/v1/sources':{get:get('Fuentes incluidas y alternativas investigadas',{type:'object',properties:{data:{type:'array',items:ref('SourceResearch')}}})},
    '/openapi.json':{get:{...get('Especificación OpenAPI',{type:'object'}),security:[]}},
  },
  components:{
    securitySchemes:{ApiKey:{type:'apiKey',in:'header',name:'X-API-Key',description:'Solo se exige si API_KEY está configurada en el servidor. Mantener claves en el backend del tracker.'}},
    schemas:{
      Error:{type:'object',required:['error'],properties:{error:{type:'object',required:['code','message'],properties:{code:string,message:string}}}},
      License:{type:'object',required:['url','license','licenseUrl','attribution'],properties:{id:string,url:{type:'string',format:'uri'},license:string,licenseUrl:{type:'string',format:'uri'},attribution:string}},
      Animation:{oneOf:[{type:'object',required:['type','frames','sequence','frameDurationMs','license','licenseUrl','sourceUrl','attribution'],properties:{type:{const:'svg-sequence'},frames:{type:'array',items:{type:'string',format:'uri'}},sequence:{type:'array',items:{type:'integer'}},frameDurationMs:{type:'integer'},license:string,licenseUrl:{type:'string',format:'uri'},sourceUrl:{type:'string',format:'uri'},attribution:string,provenanceNote:string}},{type:'object',required:['type','url','sourceUrl','license','licenseUrl','attribution'],properties:{type:{enum:['gif','video']},url:{type:'string',format:'uri'},sourceUrl:{type:'string',format:'uri'},license:string,licenseUrl:{type:'string',format:'uri'},attribution:string,author:string,authorUrl:{type:'string',format:'uri'},title:string,changes:string,width:{type:'integer'},height:{type:'integer'},frameCount:{type:'integer'}}}]},
      ImageSequence:{type:'object',required:['type','frames','intervalMs'],properties:{type:{const:'image-sequence'},frames:{type:'array',items:{type:'string',format:'uri'}},intervalMs:{type:'integer'},description:string,license:string,licenseUrl:string,attribution:string}},
      Media:{type:'object',required:['thumbnailUrl','images','animation','imageSequence','variants','attribution'],properties:{exerciseId:string,thumbnailUrl:{type:['string','null'],format:'uri'},images:{type:'array',items:{type:'string',format:'uri'}},animation:{anyOf:[ref('Animation'),{type:'null'}]},imageSequence:{anyOf:[ref('ImageSequence'),{type:'null'}]},variants:{type:'array',items:ref('Animation')},attribution:string}},
      Exercise:{type:'object',required:['id','name','nameEn','language','requestedLanguage','availableLanguages','instructions','instructionsAvailable','primaryMuscles','secondaryMuscles','equipment','difficulty','category','popular','media','source'],properties:{id:string,name:string,nameEn:string,nameLanguage:{enum:['es','en']},nameStatus:{enum:['draft','missing']},editorialFeatured:{type:'boolean'},aliases:{type:'array',items:string},language:{enum:['es','en']},requestedLanguage:{enum:['es','en']},availableLanguages:{type:'array',items:string},translationStatus:string,instructions:{type:'array',items:string},instructionsAvailable:{type:'boolean'},primaryMuscles:{type:'array',items:string},secondaryMuscles:{type:'array',items:string},equipment:string,difficulty:{enum:['beginner','intermediate','expert','unknown']},category:string,mechanic:{type:['string','null']},force:{type:['string','null']},popular:{type:'boolean'},movementPattern:{type:['string','null']},mediaStatus:string,dataSources:{type:'array',items:ref('License')},media:ref('Media'),source:ref('License')}},
      ExercisePage:{type:'object',required:['data','pagination'],properties:{data:{type:'array',items:ref('Exercise')},pagination:{type:'object',required:['total','count','limit','offset','nextOffset'],properties:{total:{type:'integer'},count:{type:'integer'},limit:{type:'integer'},offset:{type:'integer'},nextOffset:{type:['integer','null']}}}}},
      Taxonomy:{type:'object',additionalProperties:{type:'array',items:{type:'object',required:['id','name','count'],properties:{id:string,name:string,count:{type:'integer'}}}}},
      TranslationCoverage:{type:'object',properties:{spanishNames:{type:'integer'},spanishInstructions:{type:'integer'},namesPendingReview:{type:'integer'},reviewedTranslations:{type:'integer',description:'Revisión acreditada; actualmente cero. No implica revisión técnica deportiva.'},englishNameFallbacks:{type:'integer'}}},
      Stats:{type:'object',properties:{translationCoverage:ref('TranslationCoverage'),version:string,total:{type:'integer'},spanish:{type:'integer',description:'Contador histórico: registros españoles con instrucciones; no cuenta títulos traducidos sin instrucciones.'},popular:{type:'integer'},withImages:{type:'integer'},withImageSequence:{type:'integer'},withAnimation:{type:'integer'},withSvgAnimation:{type:'integer'},withGifOrVideo:{type:'integer'},withoutAnimation:{type:'integer'},mediaHosting:string,languages:{type:'array',items:string}}},
      SourceResearch:{type:'object',properties:{id:string,name:string,url:string,license:string,usage:string,included:{type:'boolean'}}}
    }
  }
};
