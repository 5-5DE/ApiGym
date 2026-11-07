export type Animation = {type:'svg-sequence';frames:string[];sequence:number[];frameDurationMs:number;sourceUrl:string;license:string;licenseUrl:string;attribution:string;provenanceNote:string}|{ type:'gif'|'video'; url:string; sourceUrl:string; license:string; licenseUrl:string; attribution:string; author?:string; authorUrl?:string; title?:string; changes?:string; width?:number; height?:number; };
export interface Media { thumbnailUrl:string|null; images:string[]; animation:Animation|null; imageSequence:{type:'image-sequence';frames:string[];intervalMs:number;description:string;license:string;licenseUrl:string;attribution:string}|null; variants:Animation[]; attribution:string; }
export interface Exercise {id:string;name:string;nameEn:string;nameLanguage?:'es'|'en';nameStatus?:'draft'|'missing';editorialFeatured?:boolean;aliases:string[];language:'es'|'en';requestedLanguage:'es'|'en';availableLanguages:string[];instructions:string[];instructionsAvailable:boolean;translationStatus:string;primaryMuscles:string[];secondaryMuscles:string[];equipment:string;difficulty:'beginner'|'intermediate'|'expert'|'unknown';category:string;mechanic:string|null;force:string|null;popular:boolean;media:Media;source:{id:string;url:string;license:string;licenseUrl:string;attribution:string;provenanceNote?:string};dataSources?:Exercise['source'][];movementPattern?:string|null;mediaStatus?:string;}
export interface Query {q?:string;muscle?:string;equipment?:string;difficulty?:Exercise['difficulty'];category?:string;popular?:boolean;editorialFeatured?:boolean;hasAnimation?:boolean;lang?:'es'|'en';sort?:'name'|'id';limit?:number;offset?:number;}
export interface Stats {version:string;total:number;spanish:number;popular:number;withImages:number;withImageSequence:number;withAnimation:number;withSvgAnimation:number;withGifOrVideo:number;withoutAnimation:number;mediaHosting:string;languages:string[];}
export interface Taxon {id:string;name:string;count:number;}
export class ApiGymError extends Error {status:number;code:string;constructor(status:number,code:string,message:string);}
export function createApiGymClient(options:{baseUrl:string;apiKey?:string;fetch?:typeof globalThis.fetch}):{
 list(params?:Query,signal?:AbortSignal):Promise<{data:Exercise[];pagination:{total:number;count:number;limit:number;offset:number;nextOffset:number|null}}>;
 get(id:string,lang?:'es'|'en',signal?:AbortSignal):Promise<{data:Exercise}>;
 media(id:string,signal?:AbortSignal):Promise<{data:Media & {exerciseId:string}}>;
 batch(ids:string[],lang?:'es'|'en',signal?:AbortSignal):Promise<{data:Exercise[];missingIds:string[]}>;
 taxonomy(lang?:'es'|'en',signal?:AbortSignal):Promise<{data:Record<'muscles'|'equipment'|'difficulty'|'category',Taxon[]>}>;
 stats(signal?:AbortSignal):Promise<{data:Stats}>;
};
