export class ApiGymError extends Error {
  constructor(status, code, message) {super(message);this.name='ApiGymError';this.status=status;this.code=code;}
}
export function createApiGymClient({baseUrl,apiKey,fetch:fetcher=globalThis.fetch}) {
  const root=new URL(baseUrl);root.search='';root.hash='';if(!root.pathname.endsWith('/'))root.pathname+='/';
  async function request(path,params={},signal){
    const url=new URL('api/v1/'+path,root);
    for(const [key,value] of Object.entries(params))if(value!==undefined&&value!==null)url.searchParams.set(key,String(value));
    const r=await fetcher(url,{headers:apiKey?{'X-API-Key':apiKey}:{},signal});const body=await r.json();
    if(!r.ok)throw new ApiGymError(r.status,body.error?.code || 'HTTP_ERROR',body.error?.message || 'Error al consultar ApiGym');
    return body;
  }
  return {
    list:(params,signal)=>request('exercises',params,signal),
    get:(id,lang='es',signal)=>request('exercises/'+encodeURIComponent(id),{lang},signal),
    media:(id,signal)=>request('exercises/'+encodeURIComponent(id)+'/media',{},signal),
    batch:(ids,lang='es',signal)=>request('exercises/batch',{ids:ids.join(','),lang},signal),
    taxonomy:(lang='es',signal)=>request('taxonomy',{lang},signal),
    stats:signal=>request('stats',{},signal),
  };
}
