# ApiGym

API REST independiente para el catálogo de ejercicios de un tracker de gimnasio. El tracker guarda los IDs en sus rutinas y administra sus propias series, sesiones y rachas. ApiGym proporciona nombres, instrucciones, músculos, equipo y demostraciones.

Implementada con Node.js 24 y módulos estándar: **sin paquetes npm, base de datos ni API keys de proveedores**. El catálogo se incluye en el repo y se carga en memoria; las consultas no llaman a servicios externos.

## Cobertura incluida

| Contenido | Cantidad |
| --- | ---: |
| Ejercicios del snapshot de Free Exercise DB | 876 |
| Selección de ejercicios comunes con nombre, alias e instrucciones en español | 73 |
| Ejercicios con imágenes de inicio y fin | 873 |
| Ejercicios con GIF animado de Wikimedia Commons | 9 |

Los GIFs cubren flexiones, sentadilla con peso corporal, dominadas, peso muerto convencional, curl de bíceps con mancuernas, abdominal sit-up, salto de cuerda, carrera en caminadora y bicicleta estática. Son de resolución pequeña (75–152 px de ancho). Consulta dimensiones, autor y licencia en cada medio.

**Las 873 secuencias de posiciones no son videos ni animaciones de movimiento continuo.** `media.animation` es `null` cuando no existe un GIF/video registrado. `hasAnimation=true` filtra exclusivamente GIFs y videos. No se sustituyen movimientos por demostraciones de otro ejercicio.

El catálogo base conserva sus instrucciones originales en inglés. Si falta traducción, `language` indica `en` aunque `requestedLanguage` sea `es`. Las 73 traducciones fueron redactadas con asistencia de IA, no tienen revisión profesional y se identifican como `ai-authored-unreviewed`. Cuatro ejercicios originales no tienen instrucciones; se exponen con `instructionsAvailable=false`. Tres no tienen imágenes. No se inventa contenido para rellenarlos.

## Arrancar

Requisito: Node.js 24. Desde esta carpeta:

```sh
npm start
```

En PowerShell, si la política de scripts bloquea `npm.ps1`, usa el ejecutable existente:

```powershell
npm.cmd start
```

No hace falta `npm install`. Abre:

- Visor del catálogo: <http://localhost:3000/>
- Documentación con consola de consultas: <http://localhost:3000/docs>
- OpenAPI 3.1: <http://localhost:3000/openapi.json>
- Salud: <http://localhost:3000/health>

El visor permite buscar, filtrar y abrir instrucciones. Reproduce GIFs o alterna posiciones con controles de pausa, respeta la preferencia de movimiento reducido al iniciar y detiene la reproducción al cerrar o esconder la pestaña. Las atribuciones se muestran junto a los medios.

## API

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/api/v1/exercises` | Búsqueda, filtros y paginación |
| GET | `/api/v1/exercises/:id` | Detalle con instrucciones y medios |
| GET | `/api/v1/exercises/:id/media` | URLs y atribuciones de medios |
| GET | `/api/v1/exercises/batch?ids=…` | Resolver hasta 50 IDs de una rutina |
| GET | `/api/v1/taxonomy` | Músculos, equipo, niveles y categorías con conteos |
| GET | `/api/v1/stats` | Cobertura real y versión del catálogo |
| GET | `/api/v1/sources` | Fuentes incluidas y alternativas investigadas |

Se aceptan también HEAD y OPTIONS. Es una API de lectura; no contiene cuentas ni registros de entrenamientos.

```sh
curl "http://localhost:3000/api/v1/exercises?q=jalon&popular=true&lang=es"
curl "http://localhost:3000/api/v1/exercises?muscle=chest&equipment=dumbbell&limit=10"
curl "http://localhost:3000/api/v1/exercises?hasAnimation=true"
curl "http://localhost:3000/api/v1/exercises/Barbell_Squat"
curl "http://localhost:3000/api/v1/exercises/batch?ids=Barbell_Squat,Pushups,Leg_Press"
```

Filtros combinables:

| Parámetro | Valores / comportamiento |
| --- | --- |
| `q` | Hasta 200 caracteres; busca todas las palabras sin distinguir acentos en nombres, alias, músculos y equipo en español/inglés |
| `muscle` | Músculo **principal** canónico, como `chest`, `biceps`, `quadriceps` |
| `equipment` | Equipo canónico: `barbell`, `dumbbell`, `machine`, `cable`, `body only`, etc. |
| `difficulty` | `beginner`, `intermediate`, `expert` |
| `category` | `strength`, `cardio`, `stretching`, etc. |
| `popular` | `true` o `false`; selección editorial de movimientos comunes, no ranking de uso medido |
| `hasAnimation` | `true` o `false`; indica GIF/video registrado |
| `lang` | `es` (predeterminado) o `en` |
| `limit` | Entero de 1 a 100, predeterminado 20 |
| `offset` | Entero desde 0 |
| `sort` | `name` o `id`; desempate por ID |

`/taxonomy` devuelve los IDs y las etiquetas para construir los filtros del tracker. `q` reconoce etiquetas en español; los filtros usan IDs canónicos en inglés. Los conteos de taxonomía son globales, no dependen de los filtros de otra consulta.

Una lista devuelve `{data, pagination: {total, count, limit, offset, nextOffset}}`. El detalle devuelve `{data}`. Batch conserva el orden, elimina IDs duplicados y separa los desconocidos en `missingIds`, con HTTP 200 para una resolución parcial. Un detalle desconocido devuelve 404.

Errores: `{error: {code, message}}`. Parámetros desconocidos, repetidos o inválidos devuelven 400; métodos de escritura, 405. Las respuestas incluyen `ETag` y `X-Catalog-Version`. Envía `If-None-Match` para recibir 304 sin cuerpo cuando no haya cambios.

## Conectar el tracker

Copia `client/index.js` y `client/index.d.ts` al proyecto principal o importa el módulo desde un paquete interno:

```js
import { createApiGymClient } from './apigym/client/index.js';

const gym = createApiGymClient({baseUrl: 'http://localhost:3000'});
const {data, pagination} = await gym.list({q:'sentadilla', popular:true, lang:'es'});
const {data: exercise} = await gym.get('Barbell_Squat');

// En tu base de datos: guarda exercise.id, no el nombre traducido ni el índice.
const routineItem = {exerciseId: exercise.id, sets: 3, reps: 10};
const routineExercises = await gym.batch(['Barbell_Squat','Pushups']);
```

Para mostrar medios:

1. Si `media.animation.type === 'video'`, usa `<video controls loop muted playsinline>` con su `url`.
2. Si es `gif`, usa `<img>` con su `url`. Ofrece pausa cambiando a la miniatura.
3. Si es `null`, usa `imageSequence.frames` como posiciones, con su `intervalMs` y un rótulo que lo indique. Precarga las imágenes y ofrece pausa.
4. Si tampoco hay posiciones, muestra las instrucciones disponibles.

En React Native puedes mostrar los GIFs con un componente de imagen que los soporte y los videos con el reproductor elegido para tu plataforma. La API devuelve URLs HTTPS directas; no requiere cookies ni cabeceras de un proveedor de medios.

**Muestra siempre la atribución del medio junto con enlaces a `sourceUrl`, `licenseUrl` y `authorUrl` cuando exista.** `media.attribution` corresponde a las imágenes base; cada `animation` y `variant` tiene su propia atribución. Los GIFs Creative Commons conservan su licencia original. Consulta [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Los IDs existentes no se deben renombrar. `data:refresh` detiene la actualización si la fuente elimina alguno; una futura eliminación requerirá conservar el registro o definir una migración explícita. El cliente puede usar `missingIds` para detectar referencias que no conoce este catálogo.

## Configuración y despliegue

Copia `.env.example` a `.env` si necesitas cambiar la configuración:

| Variable | Predeterminado | Uso |
| --- | --- | --- |
| `PORT` | `3000` | Puerto |
| `HOST` | `0.0.0.0` | Interfaz de escucha |
| `CORS_ORIGINS` | `*` | Orígenes permitidos separados por coma |
| `API_KEY` | vacío | Si se define, exige `X-API-Key` en `/api/v1/*` |
| `MEDIA_BASE_URL` | Raw GitHub de Free Exercise DB | Base HTTP(S) de las imágenes de posiciones, con `/` final |

Si usas clave, consérvala en el backend del tracker. Una clave enviada en una app pública o móvil no permanece secreta. CORS limita el acceso desde navegadores; no es autenticación. Las respuestas protegidas usan caché privada. `/health`, la documentación y el visor son públicos; el visor tiene un campo de clave solo en memoria.

```sh
docker build -t apigym .
docker run --rm -p 3000:3000 --env-file .env apigym
```

El contenedor usa un usuario sin privilegios. También puedes ejecutar `npm start` en un host de Node. Coloca TLS, límites de tráfico y caché compartida en el proxy de tu despliegue según el uso real. No hay despliegue público configurado en este repo.

**Los archivos multimedia se sirven desde GitHub/Wikimedia, no se incluyen como binarios.** Sus enlaces pueden dejar de funcionar o estar limitados. Para alojar imágenes en tu almacenamiento, conserva la estructura del catálogo y configura `MEDIA_BASE_URL`. Para GIF/video propio, añade las URLs de tu almacenamiento al manifiesto de medios. Consulta la licencia de cada archivo antes de modificarlo o republicarlo.

## Ampliar contenido

- `data/upstream/free-exercise-db.json`: snapshot base incluido.
- `data/upstream/manifest.json`: fuente, fecha, conteo y SHA-256 local.
- `data/translations.es.json`: traducciones/alias por ID, sin alterar IDs.
- `data/media.json`: GIFs/videos y atribuciones por ejercicio.
- [docs/research.md](docs/research.md): investigación y selección de fuentes.

Para registrar un video/GIF de tu propiedad o con permiso de redistribución, usa un archivo como [docs/media.example.json](docs/media.example.json) y reemplaza las URLs de ejemplo y todos los datos de licencia por los reales:

```sh
npm run media:import -- ./mis-medios.json
npm run check
npm test
```

El importador combina por ejercicio + URL y rechaza ejercicios inexistentes, duplicados, enlaces sin HTTPS y medios sin licencia/atribución. Es una herramienta local, no un endpoint público de carga. No descarga ni verifica derechos por sí solo. Reinicia el servidor para cargar los cambios.

```sh
npm run data:refresh    # Necesita Internet; valida IDs antes de sustituir el snapshot
npm run media:check     # Todos los GIF/videos + muestra de imágenes; necesita Internet
npm run media:check -- --all
```

`media:check` verifica HTTP y MIME; no sustituye una revisión visual del movimiento. Genera `media-report.json` y sale con error si alguna URL falla. CI funciona sin depender de fuentes externas.

## Verificación

```sh
npm run check
npm test
```

15 pruebas HTTP y de integridad cubren búsqueda, filtros, paginación, idioma de reserva, medios, batch, validación, importación sin perder registros, ETag, HEAD, CORS, autenticación opcional y el SDK. El workflow de GitHub Actions ejecuta estos comandos en Node 24. No se requieren secretos.

## Licencias

Código de ApiGym: MIT. Snapshot base: Unlicense, según Free Exercise DB. GIFs: Creative Commons por archivo. Las atribuciones originales y sus enlaces están tanto en el manifiesto como en la respuesta de la API y el visor. La licencia del código no sustituye la de los medios. Las fuentes revisadas y no importadas no conceden licencias sobre este catálogo.
