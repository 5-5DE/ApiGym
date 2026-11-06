# ApiGym

API REST independiente para el catálogo de ejercicios de un tracker de gimnasio. El tracker guarda los IDs en sus rutinas y administra sus propias series, sesiones y rachas. ApiGym proporciona nombres, instrucciones, músculos, equipo y demostraciones.

Implementada con Node.js 24 y módulos estándar: **sin paquetes npm, base de datos ni API keys de proveedores**. El catálogo se incluye en el repo y se carga en memoria; las consultas no llaman a servicios externos.

## Cobertura incluida

| Contenido | Cantidad |
| --- | ---: |
| Ejercicios deduplicados | 2,069 |
| Ilustraciones animadas SVG | 1,257 |
| Fotos reales mostradas | 0 |
| Ejercicios sin animación | 812 |
| Traducciones completas al español | 73 |

Las ilustraciones SVG usan tres cuadros vectoriales por ejercicio, reproducidos en secuencia. ApiGym sirve los cuadros localmente desde /media/flow/:id/frame-0N.svg. El catálogo combina Flow Exercise Dataset con Free Exercise DB; si un nombre coincide, conserva el ID anterior y los demás reciben IDs flow-0001. El nivel queda como unknown cuando la fuente no lo especifica.

La fuente Flow declara limitaciones de procedencia: solo conserva 13 de los prompts originales de las 1,257 animaciones y no promete verificación independiente de origen, forma física o derechos de terceros. El usuario aceptó integrar esta fuente con esa limitación. Se incluyen sus avisos, licencias y checksums en data/flow-exercise-dataset/; revisa NOTICE.md y ARTWORK-LICENSE. Los ejercicios sin SVG no reciben una ilustración inventada.

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

El visor permite buscar, filtrar y abrir instrucciones. Reproduce las ilustraciones SVG animadas, respeta la preferencia de movimiento reducido al iniciar y detiene la reproducción al cerrar o esconder la pestaña. No muestra fotos de personas.

## API

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/api/v1/exercises` | Búsqueda, filtros y paginación |
| GET | `/api/v1/exercises/:id` | Detalle con instrucciones y medios |
| GET | `/api/v1/exercises/:id/media` | URLs y atribuciones de medios |
| GET | `/media/flow/:id/:frame` | Cuadro SVG servido por ApiGym |
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
| `difficulty` | `beginner`, `intermediate`, `expert`, `unknown` |
| `category` | `strength`, `cardio`, `stretching`, etc. |
| `popular` | `true` o `false`; selección editorial de movimientos comunes, no ranking de uso medido |
| `hasAnimation` | `true` o `false`; incluye secuencias SVG, GIF y video |
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

1. Si media.animation.type === svg-sequence, reproduce frames[sequence[i]] cada frameDurationMs; el SDK incluido entrega URLs absolutas.
2. Si es video, usa <video controls loop muted playsinline> con su url. Si es gif, usa <img> y ofrece pausa.
3. Si animation es null, muestra instrucciones y marca que no hay ilustracion.

En React Native muestra cada cuadro SVG con un componente de imagen y alterna los indices de la secuencia. El SDK resuelve las rutas locales contra `baseUrl`; conserva atribuciones y avisos de licencia.

Muestra la atribucion y el enlace a la fuente y licencia de cada SVG. Los cuadros se sirven localmente desde ApiGym. Revisa la nota de procedencia antes de mostrar una ilustracion como guia de tecnica.

Los IDs existentes no se deben renombrar. `data:refresh` detiene la actualización si la fuente elimina alguno; una futura eliminación requerirá conservar el registro o definir una migración explícita. El cliente puede usar `missingIds` para detectar referencias que no conoce este catálogo.

## Configuración y despliegue

Copia `.env.example` a `.env` si necesitas cambiar la configuración:

| Variable | Predeterminado | Uso |
| --- | --- | --- |
| `PORT` | `3000` | Puerto |
| `HOST` | `0.0.0.0` | Interfaz de escucha |
| `CORS_ORIGINS` | `*` | Orígenes permitidos separados por coma |
| `API_KEY` | vacío | Si se define, exige `X-API-Key` en `/api/v1/*` |

Si usas clave, consérvala en el backend del tracker. Una clave enviada en una app pública o móvil no permanece secreta. CORS limita el acceso desde navegadores; no es autenticación. Las respuestas protegidas usan caché privada. `/health`, la documentación y el visor son públicos; el visor tiene un campo de clave solo en memoria.

```sh
docker build -t apigym .
docker run --rm -p 3000:3000 --env-file .env apigym
```

El contenedor usa un usuario sin privilegios. También puedes ejecutar `npm start` en un host de Node. Coloca TLS, límites de tráfico y caché compartida en el proxy de tu despliegue según el uso real. No hay despliegue público configurado en este repo.

Los cuadros SVG se incluyen localmente (~44 MB) y se sirven desde ApiGym. La API no muestra las fotos de la fuente Free Exercise DB. `data/media.json` permite agregar medios propios con licencia; verifica sus derechos antes de importarlo.

## Ampliar contenido

- `data/flow-exercise-dataset/`: ejercicios, cuadros SVG, checksums, avisos y procedencia de la fuente Flow.
- `data/upstream/free-exercise-db.json`: metadatos adicionales (sus fotos no se sirven).
- `data/upstream/manifest.json`: fuente, fecha, conteo y SHA-256 local.
- `data/translations.es.json`: traducciones/alias por ID, sin alterar IDs.
- `data/media.json`: medios adicionales importados por el operador, si los hay.
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
npm run media:check     # Verifica medios HTTPS adicionales importados por el operador
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

Codigo de ApiGym: MIT. Metadatos de Flow: MIT con atribucion; arte SVG: CC0-1.0 hasta donde los autores tienen derechos. La fuente declara que no existe garantia de clearance completo. Consulta data/flow-exercise-dataset/NOTICE.md y THIRD_PARTY_NOTICES.md.
