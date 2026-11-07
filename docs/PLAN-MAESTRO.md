# Plan maestro versionado

Copia íntegra del documento recibido, conservada como referencia. La instrucción posterior de Diego autoriza P0/P1 y solo el diseño de P2. El prompt histórico del apartado 7 no autoriza ejecutar P2/P3 ni publicar.

# ApiGym 2.0 — Plan maestro de calidad, medios y anatomía para Codex

**Repositorio:** https://github.com/5-5DE/ApiGym
**Fecha de auditoría documental:** 2026-11-06
**Objetivo:** convertir ApiGym en un catálogo sólido de ejercicios para Gym Zong (Expo/React Native, SQLite y uso offline), preservando la API v1 y las referencias históricas por ID.

> Este documento es una especificación para implementar, NO un certificado de que los errores ya se corrigieron. Antes de modificar nada, Codex debe inspeccionar el HEAD actual, comparar con estas observaciones y ejecutar los comandos de prueba.

## 1. Estado observado del código en `main`

- `README.md` anuncia **2,069** ejercicios, **1,257** ilustraciones animadas SVG, **812** ejercicios sin animación, **73** traducciones españolas completas.
- `data/media.json` es `[]`, `src/catalog.js:mediaFor()` construye `images=[]` y asigna miniatura solo cuando hay un cuadro Flow. Por tanto, no existen fotos reales servidas en el estado observado.
- `src/catalog.js:localize()` usa `translations[id]?.name || e.name`: la gran mayoría de nombres permanecen en inglés. `translationStatus` de textos localizados actuales es `ai-authored-unreviewed`.
- **Bloqueador de ampliación de español:** `validateTranslations(translations, legacyIds)` corre antes de incorporar los IDs nuevos `flow-...`; para traducirlos hay que validar contra el catálogo combinado, sin perder los controles de integridad. No basta con llenar el JSON.
- `src/catalog.js` equipara `popular` con `Boolean(translations[e.id])`: es una etiqueta editorial basada indirectamente en traducción, no en popularidad medida.
- `public/demo.js` añade la clase `sketch` a la imagen de detalle y después asigna `media.className = 'demonstration'`, eliminando la clase anterior.
- `scripts/validate-data.js` valida existencia, hash y aspectos de seguridad de los SVG, **no** que el movimiento ilustrado corresponda biomecánicamente al ejercicio.
- Los 1,257 medios Flow tienen advertencias de derechos/procedencia (`data/flow-exercise-dataset/NOTICE.md`). No anunciar clearance o precisión certificados.
- `test/api.test.js` fija las cifras arriba: al ampliar realmente el catálogo actualizar los fixtures y aserciones con justificación, no por silenciar fallas.
- El SDK `client/index.js` convierte rutas relativas `/media/flow/...` en URL absolutas. Cuidar compatibilidad.
- `src/app.js` expone `/api/v1` como API de solo lectura; el tracker es dueño de perfiles, rutinas, series, sesiones e historial.

Archivos principales a inspeccionar: `README.md`, `src/{catalog,app,validation,openapi}.js`, `public/{demo.js,style.css}`, `client/{index.js,index.d.ts}`, `scripts/*`, `test/*`, `data/translations.es.json`, `data/media.json`, `THIRD_PARTY_NOTICES.md`.

## 2. Principios no negociables

1. **Preservar IDs** existentes y no borrar referencias. No renombrar ni deduplicar de modo destructivo: introducir alias y una tabla de equivalencias si aparecen duplicados semánticos. Documentar migraciones.
2. **Separar catálogo y rutina.** ApiGym describe ejercicios, medios, anatomía y taxonomías. Gym Zong administra perfiles, días L/M/X/J/V/S/D, ejercicios asociados, orden, series, repeticiones, historial y sincronización offline. No guardar rutinas de usuario dentro del servidor de ApiGym.
3. **No inventar traducciones ni multimedia.** Una ilustración inexistente se reconoce como `unavailable`; un nombre sin revisión se marca como pendiente. No usar contenido de un proveedor sin licencia suficiente ni afirmar que la licencia del código cubre todos los archivos.
4. **Offline-first real.** El catálogo base y los mapas musculares deben poder funcionar sin red desde la aplicación. El caché puede mejorar la experiencia, pero no reemplaza una distribución local versionada.
5. **Accesibilidad y rendimiento.** Movimiento reducido, controles de reproducción/pausa, textos alternativos, formato eficiente de recursos y carga progresiva; no descargar 1,257 animaciones a cada cliente de golpe.
6. **No romper `/api/v1`.** Añadir campos opcionales compatibles, ampliar OpenAPI y SDK; si cambia semántica incompatible, abrir `v2`.
7. **No afirmar que está probado sin ejecutar las pruebas.** Dejar reporte con comandos, resultados, límites y tareas pendientes.

## 3. Modelo de ejercicio sugerido

```ts
type MediaState = 'verified' | 'unreviewed' | 'unavailable' | 'broken';
type MediaKind = 'image' | 'svg-sequence' | 'gif' | 'video' | 'webp';
interface CatalogExercise {
  id: string; // ID histórico estable
  name: string; // Compatibilidad v1: nombre según lang
  nameEn: string;
  displayNames?: { es?: string; en: string };
  aliases: string[];
  language: 'es' | 'en';
  translationStatus: 'reviewed' | 'draft' | 'missing';
  primaryMuscles: string[]; // taxonomía canónica
  secondaryMuscles: string[];
  anatomy?: { primaryRegionIds: string[]; secondaryRegionIds: string[]; unresolvedMuscles: string[] };
  equipment: string;
  difficulty: string;
  category: string;
  media: {
    thumbnailUrl: string | null;
    images: string[];
    animation: unknown | null; // no romper la unión de tipos que ya consume el SDK
    variants: unknown[];
    status?: MediaState;
    availableKinds?: MediaKind[];
  };
}
```

Los campos nuevos son **aditivos**, y el tipo exacto debe derivarse del código actual. Especificar fuente, copyright, licencia y atribución en **cada** recurso, no solo por ejercicio.

## 4. Epics / etapas de implementación

### P0 — Auditoría reproducible y correcciones de base
- `git status`, rama y commit, `npm run check`, `npm test`, inspeccionar OpenAPI, SDK y demo.
- Generar `reports/catalog-audit.json` y un resumen Markdown con: IDs repetidos, nombres duplicados/ambiguos, porcentajes de traducción, medios por formato/estado, faltantes, músculos sin correspondencia, problemas de MIME/ruta y procedencia.
- Diferenciar **sin medio** de **medio roto**. Comprobar funcionamiento de cada ruta local en HTTP y con el cliente; validar secuencias `sequence` contra número real de cuadros y duración positiva.
- Corregir en `public/demo.js` el reemplazo de clases de la imagen (`classList.add('demonstration')` sin perder `sketch`); comprobar si otros errores de diseño dependen del CSS.
- Conservar observabilidad: estadísticas verdaderas (no inflar `withImages` si no hay fotos).
- Tests regresión de rutas SVG, clase visual, API/media y estado sin animación.

### P1 — Nombres y búsqueda de calidad
- Corregir el orden de validación de traducciones de `src/catalog.js`: el conjunto permitido debe incluir también los IDs `flow-...` ya integrados. Agregar test para traducción de ID Flow y test para ID huérfano.
- Diseñar `data/names.es.json`/glosario editorial o migrar cuidadosamente `translations.es.json` sin romper consumidores.
- Distinguir `displayName.es`, `nameEn`, alias populares, nombre de equipo, variante, posición; evitar traducciones literales absurdas.
- Auditar prioritariamente los ejercicios de las rutinas existentes y los movimientos más habituales de máquina, polea, mancuerna y barra.
- Añadir traducción por lotes **como borrador** con `translationStatus=draft`, y cola de revisión humana para los ambiguos; nunca declarar 100% validado automáticamente.
- Normalizar acentos, guiones y sinónimos de búsqueda; mantener ID histórico incluso si mejora el nombre.
- Desacoplar `popular` del hecho de tener traducción: `editorialFeatured`/`commonInGym` curado (si se conserva `popular`, documentar semántica y migración).
- Tests de nombres clave, alias, `lang=es`, búsqueda bilingüe, colisiones y actualización de datos.

### P2 — Medios verificables y accesibles
- Incorporar `mediaManifest` por ejercicio con prioridad `approvedAnimation > approvedStill > safePlaceholder`, thumbnail, formato, dimensiones, hash, estado, autor, URL, licencia, fuente y fecha de revisión.
- Reutilizar los SVG Flow existentes solo con sus avisos; añadir una **revisión visual** de muestra y, luego, de los ejercicios principales para comprobar ejecución y que la imagen no muestra una técnica equivocada.
- Producir miniaturas WebP/PNG a partir de los primeros cuadros **que tengan uso permitido** para mejorar compatibilidad y offline. Las secuencias SVG son un medio; no llamarlas GIF.
- Si se agrega un GIF/video nuevo, registrar licencia, origen y derecho de redistribución comprobable, validar HTTP/MIME y comprobar reproducción real en Android/iOS/Web, además de simular errores de red.
- Conservar el SVG de origen y trazabilidad; no duplicar un GIF falso solo para marcar cobertura. Las 812 entradas sin animación deben mostrar imagen fija autorizada o placeholder, con estado explícito.
- Agregar galería/diagnóstico al visor `/` (filtros `broken/unreviewed/missing`, errores de medios, enlaces a registros) y tests de fallback.
- `media:check` debe admitir casos HEAD no admitido (GET con límite razonable), timeout, límite de concurrencia, comprobación de MIME y códigos, sin depender de red en CI general.

### P3 — Anatomía y mapas dinámicos
- Crear una taxonomía anatómica estable independiente de etiquetas traducidas, con regiones frontales y posteriores (pectoral, deltoides, bíceps, tríceps, dorsal, trapecio, lumbares, abdominales, glúteos, cuádriceps, isquiotibiales, pantorrillas, etc.).
- Adquirir/crear **atlas SVG propio o con licencia explícita**, con `id` por región anatómica; verificar cobertura de los grupos canónicos. Licenciar y atribuir la ilustración base.
- `muscle-to-region.json`: mapping versionado de grupo muscular canónico → `regionIds[]`; documentar términos compuestos y `unresolved` (no colorear zonas arbitrariamente).
- Añadir `anatomy` a cada ejercicio; endpoint opcional `GET /api/v1/anatomy/regions` y `GET /api/v1/anatomy/summary?ids=...` que solo agregan IDs explícitos (máximo razonable, validación y faltantes). SDK y OpenAPI actualizados.
- **El cálculo diario se realiza localmente en Gym Zong** con los IDs de los ejercicios guardados en SQLite: principales rojos, secundarios ámbar, no entrenados grises; mostrar frente y espalda. Un músculo repetido en varios ejercicios no debe duplicarse sin control.
- Regla v1 sugerida para visualización, no para estimar esfuerzo: región primaria `1.0`, secundaria `0.4`, elegir `Math.max` para región en el día. Separar *resumen visual* de *estimación de carga/fatiga*, que requiere datos reales de series.
- Un día vacío o de descanso debe mostrar una silueta neutra y texto de descanso; cambiar ejercicios actualiza mapa inmediatamente. Respetar 7 días y distintos perfiles, sin confundir martes y miércoles (`tue`/`wed`).
- Tests de pecho+tríceps, cuádriceps+glúteos, mezcla de primarios/secundarios, ejercicios desconocidos, día vacío, lunes/domingo, y diferencias por perfil.

### P4 — Distribución offline para Gym Zong
- Generar `catalog-manifest.json` versionado, con hashes, conteos y referencia de licencia; snapshot JSON importable a SQLite y paquetes de medios priorizados.
- El primer arranque usa catálogo local; la API remota es actualización opcional. Actualización transaccional que conserve favoritos, referencias por ID, sesiones históricas y rutina activa.
- Descarga selectiva de medios de ejercicios de la rutina activa; caché en almacenamiento persistente con cuota y limpieza consciente, **no confiar solo en caché eliminable por el sistema**.
- Validar ETags, versiones y compatibilidad del SDK. `localhost` en Android físico no es el servidor de desarrollo: documentar URL LAN o despliegue HTTPS cuando sea necesaria la API.
- `expo-image` para GIF/WebP/PNG y `react-native-svg` para atlas e interactividad; usar versiones recomendadas por `npx expo install`, no fijar una versión arbitraria.
- Probar Android físico sin red, cambios de idioma, instalación fresca, reinicio, falta de permisos y media corrupta.

### P5 — Producto y QA
- Buscador con lenguaje natural en español, alias; filtros de zona, equipo, dificultad y contenido multimedia.
- Ficha: título revisado, instrucciones claras, medio acreditado, advertencias sobre errores posibles de dibujos, músculos primarios/secundarios, equipo, sustituciones solo si son realmente equivalentes.
- Estadísticas de catálogo y panel de mantenimiento visual; no mezclar métricas de ejercicios con métricas de usuario.
- OpenAPI, TypeScript, documentación de integración, pruebas de API y contratos con Gym Zong, lint/check si aplica.
- Reporte final: cubiertas/no cubiertas, nuevos archivos, resultados de pruebas y alertas legales.

## 5. Semana dinámica — contrato sugerido (en Gym Zong)

El esquema es un EJEMPLO de interacción, no la rutina real de la madre del usuario:

```ts
type WeekdayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
interface RoutineDay {
  weekday: WeekdayId;
  title: string; // p. ej. «Tren inferior»; el nombre no decide los músculos
  exerciseIds: string[]; // IDs canónicos ApiGym
  isRestDay: boolean;
}
interface DayAnatomy {
  weekday: WeekdayId;
  primaryRegionIds: string[];
  secondaryRegionIds: string[];
  unresolvedExerciseIds: string[];
  atlas: 'front-back-v1';
}
```

Al pulsar «L», cargar ejercicios reales de lunes desde SQLite → resolver su anatomía → renderizar atlas anterior y posterior con colores. Cambiar un ejercicio provoca recálculo inmediato. Lo mismo para martes/miércoles/jueves/viernes y fin de semana. La API pública NO conoce ni almacena el calendario del usuario.

## 6. Criterios de aceptación

- Todos los IDs existentes siguen resolviendo o mantienen alias de migración transparente; `batch` informa IDs desconocidos.
- Cada recurso mostrado tiene URL/ruta resoluble, MIME correcto, derechos trazables y fallback explícito; `broken` jamás se anuncia como `verified`.
- Las traducciones no revisadas se identifican como borrador; el buscador devuelve resultados útiles en español.
- Cada ejercicio con músculos reconocidos produce regiones anatómicas válidas de frente/espalda; cada día configurable muestra un mapa coherente y es utilizable offline.
- No se agregan rutinas, perfiles ni historial al servidor de catálogo.
- `npm run check`, `npm test` y pruebas extra pasan; en Android/iOS/Web se prueban GIF/SVG/fallback según la plataforma disponible. Fallos de plataformas no verificadas se declaran honestamente.
- README, OpenAPI, SDK, licencias y estadísticas coinciden con el código entregado.
- El repo mantiene commits separados por etapa y PR revisable. No hacer push directo a `main`.

---

## 7. Prompt maestro para pegar en Codex

> Trabaja en el repositorio `https://github.com/5-5DE/ApiGym`.
>
> Objetivo: evolucionar ApiGym sin rehacerlo, para que sea un catálogo profesional y offline-first para Gym Zong, con nombres españoles correctos, multimedia robusta y mapas anatómicos dinámicos. Lee COMPLETO este documento, especialmente P0–P5, y compáralo con el HEAD actual.
>
> Restricciones críticas: conserva los IDs y endpoints v1; no metas perfiles/rutinas/historial en esta API; no inventes GIFs, fotos, licencias ni nombres; conserva todos los avisos de Flow; no copies contenido de terceros con restricciones; no marques material no revisado como validado. Antes de modificar, ejecuta pruebas y reporta hallazgos verificables, diferenciando bugs de funcionalidades deliberadamente ausentes.
>
> Crea una rama `feat/catalog-quality-anatomy` y aborda el proyecto **por fases con commits pequeños**, empezando ahora por **P0 y P1**; no intentes rehacer todo en un único diff. En P0 corrige el fallo `media.className` en `public/demo.js`, instrumenta auditoría de cobertura de traducciones y medios, estados `available/unavailable/broken/unreviewed`, y añade tests de regresión. En P1 incorpora una estrategia estable y revisable para nombres/alias españoles, corrige la semántica de `popular` y amplía el buscador sin cambiar IDs.
>
> Luego prepara P2 (manifest de medios locales, miniaturas y fallback) y P3 (atlas SVG frente/espalda con regiones identificadas, mapping músculos→regiones, resumen por lista de exerciseIds) como PRs/commits separados. El calendario L/M/X/J/V/S/D y los ejercicios por día pertenecen a Gym Zong: la API debe proporcionar los metadatos para calcular el mapa localmente; no almacenar los datos privados del usuario. Añade contrato TypeScript, endpoints incrementales GET si convienen, OpenAPI y pruebas, manteniendo compatibilidad.
>
> Para integración móvil, usa las versiones compatibles con el Expo real del proyecto (`expo-image`, `react-native-svg`), maneja URLs relativas, contenido offline y Android físico. Entrega siempre resultados verificables: comandos ejecutados, conteos antes/después, pruebas, screenshots o evidencias visuales cuando haya interfaz, archivos modificados y límites pendientes. Detente si hay una contradicción de licencia o migración destructiva y presenta alternativa segura.
>
> Al final de cada fase entrega: (1) diagnóstico, (2) cambios, (3) pruebas ejecutadas y resultados, (4) riesgos, (5) siguiente fase. No hagas push ni merges sin autorización explícita.


## 8. Requisito incorporado — asignación automática (06/11/2026)

El usuario final elige exclusivamente el ejercicio. ApiGym persiste la asociación por IDs de origen, mappings verificables y variantes estructuradas. Los nombres solo generan candidatos. Ambigüedad, técnica no revisada o derechos no confirmados van a revisión administrativa, nunca al usuario final. Prioridad entre medios elegibles verificados: GIF/vídeo, SVG animado, imagen y fallback. Estados verified/pending/missing/broken; exportación offline solo con recursos autorizados. Ningún nombre, hash o declaración genérica de licencia certifica por sí solo el medio.

Especificación detallada y cambios previstos: [P2-ASIGNACION-AUTOMATICA.md](P2-ASIGNACION-AUTOMATICA.md). P2 todavía no implementada.
