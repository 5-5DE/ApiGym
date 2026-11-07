# P2 — Especificación de asignación automática de medios

Estado: propuesta técnica para la siguiente fase; no implementada en P1.
Requisito recibido de Diego: el usuario elige únicamente el ejercicio. ApiGym resuelve y persiste su contenido; nunca se solicita al usuario final elegir un GIF o una imagen. La revisión de ambigüedades pertenece al administrador.

## Invariantes y situación heredada

- ID ApiGym estable: no renombrar ni fusionar ejercicios para conseguir cobertura.
- Nombres normalizados generan candidatos, nunca una asociación definitiva.
- P0 detectó 131 enlaces históricos Free Exercise DB↔Flow creados por nombre. Se congelan como antecedentes unreviewed, no como mappings verificados. Los otros registros Flow mantienen su ID de origen, pero eso tampoco demuestra que el dibujo sea correcto o sus derechos estén despejados.
- La clasificación canónica machine pierde la diferencia Smith/palanca; usar también equipo original, posición y variante. Sentadilla con barra libre, Smith y mancuernas son identidades diferentes. No inferir equivalencia por músculos coincidentes.
- No se incorporan medios nuevos sin licencia, procedencia y redistribución confirmadas. Un campo license con texto no demuestra permiso.
- Integridad, identidad de variante, revisión técnica y derechos son evaluaciones independientes. Un hash correcto o una URL HTTP 200 no certifica las demás.

## Registros persistentes propuestos

Separar tres archivos versionados, con esquema y validación estricta:

1. `data/exercise-sources.json`: exerciseId → sourceIds [{provider, sourceExerciseId, revision, sourceUrl}], variant {movement, equipmentOriginal, equipmentCanonical, position, laterality, grip, support, angle}. Los desconocidos son null, no equivalencias implícitas. Cada crosswalk contiene método, evidencia, estado y revisión.
2. `data/media-manifest.json`: assetId estable, providerAssetId, providerExerciseId, sourceRevision, kind (`image|gif|video|svg-sequence`), rutas locales, MIME, dimensiones, bytes, sha256 por archivo, duración/frames/sequence, miniatura derivada y relación con original. Autor, fuente canónica, licencia SPDX/URL, atribución, evidencia del permiso, modificaciones, evidencia de procedencia, derechos de redistribución/offline/derivación y fecha/revisor por recurso. No inventar datos ausentes.
3. `data/exercise-media.json`: exerciseId, assetId, matching {method, sourceIds, variantEvidence, evidenceRefs, adapterVersion, status}, techniqueReview, rightsReview, integrity, reviewEvents y prioridad editorial opcional. Es relación muchos-a-muchos explícita, sin reutilización entre variantes por nombre.

Los tres archivos se publican de forma atómica bajo una misma versión/hash. IDs y evidencias apuntan a revisiones inmutables. La cola editorial y las evidencias privadas no forman parte del catálogo público; solo metadatos de revisión necesarios y avisos.

## Importación por lotes sin asignación individual obligatoria

CLI propuesta: `media:ingest --provider X --manifest input.json --dry-run`, luego `--apply` con el mismo hash aprobado.

1. Leer metadatos autorizados; validar esquema, IDs, revisiones y evidencia de derechos antes de descargar binarios. No scraping ni búsquedas por nombre en tiempo de uso.
2. Adaptadores por proveedor construyen candidatos por providerExerciseId/providerAssetId y crosswalk ya aprobado. Identidad directa de origen solo se acepta con contrato de proveedor fiable y variante estructurada coincidente. La política versionada especifica evidencia suficiente; no un umbral arbitrario de similitud textual.
3. Si hay varios candidatos, falta un atributo discriminante o existe contradicción, enviar a `pending` con razones (equipment-mismatch, ambiguous-position, missing-crosswalk, rights-unconfirmed, etc.). No asignar automáticamente.
4. Aplicar reglas verificadas en lote a todos los registros que compartan el mismo contrato de origen; un administrador puede aprobar un crosswalk o una regla con evidencia, no miles de imágenes una por una. No aprobar lote por similitud de nombres. Revisar calidad visual/técnica según el tipo y evidencia del proveedor; lo no revisado conserva pending.
5. Solo con derechos confirmados, descargar con HTTPS, allowlist, timeout, límite de tamaño, concurrencia limitada y defensa contra redirecciones a redes privadas. Comprobar bytes reales/MIME, hashes, dimensiones, secuencia, duración y seguridad SVG. HEAD 405/501 admite GET limitado. Sin red obligatoria en CI.
6. Generar diff reproducible: IDs afectados, nuevos enlaces, cambios, rechazos, colisiones, licencias y bytes. Escritura temporal + validación completa + rename/activación atómica. Una operación inválida no altera catálogo ni elimina asociaciones anteriores. Reimportar el mismo hash es idempotente.
7. Guardar todas las decisiones y motivos. Para revisión visual usar galería administrativa por variante con fuentes y créditos. Nunca trasladar esa decisión al usuario de Gym Zong.

El importador actual `scripts/import-media.js` solo valida registros con exerciseId y combina por URL: NO cumple este flujo y no prueba derechos. Mantenerlo como legado explícito o convertirlo en entrada al pipeline; nunca marcar verified por usarlo.

## Resolver automático y contrato compatible

Resolver determinista al construir/publicar el catálogo, sin búsquedas externas por petición:

1. Excluir recursos con identidad, variante, técnica o derechos pendientes/rechazados, o integridad rota.
2. Entre los elegibles: GIF/vídeo de demostración verificado → SVG animado verificado → imagen estática verificada → fallback propio neutro sin simular la ejecución.
3. Entre GIF y vídeo equivalentes elegir perfil de plataforma/formato (p. ej. vídeo eficiente) y orden editorial explícito; desempate estable por assetId. Sin preferencias implícitas basadas en orden del JSON.
4. `best` y el resto de opciones se guardan en el snapshot versionado. Un error de carga en el cliente recorre únicamente alternativas verificadas de ese ejercicio, después fallback. Nunca el medio de otro ejercicio parecido.

Extensión opcional propuesta de `media` (no sustituye los campos v1 existentes):

```ts
type MediaStatus = 'verified' | 'pending' | 'missing' | 'broken';
interface MediaSelection {
  status: MediaStatus;
  best: {assetId:string; kind:'gif'|'video'|'svg-sequence'|'image'; /* URLs, integridad y créditos */} | null;
  alternatives: string[]; // assetIds elegibles y ordenados
  fallback: {kind:'placeholder'; assetId:string};
  pendingCount: number;
  reasons: string[];
  manifestVersion: string;
}
```

Semántica agregada: verified si existe un best elegible; pending si no hay best pero existen candidatos pendientes; broken si solo hay asociaciones antes aprobadas ahora rotas; missing si no existe recurso/candidato autorizado. Conservar estados independientes por asset y asociación: un best verificado puede coexistir con candidatos pendientes o alternativas rotas. Fallback no cuenta como foto, animación ni verificación del movimiento.

`media.animation`, `thumbnailUrl`, `images` y `variants` mantienen compatibilidad v1 durante transición; documentar que la cobertura heredada no certifica revisión. Añadir `media.selection` y usarlo en clientes nuevos. No etiquetar como verified los 1257 Flow por su sola declaración CC0. Una retirada por derechos requiere política de publicación explícita, no sustitución silenciosa de IDs o licencias.

`src/catalog.js`: sustituir elección SVG-first actual para el nuevo resolver; precalcular índices exerciseId→assets y best; conservar avisos, sourceIds originales y stats reales (por formato/estado, sin contar fallback). Añadir hash del manifiesto al catalogVersion.

`src/validation.js`: validar relaciones sin huérfanos, evidencia, licencias permitidas para uso concreto, unicidad, rutas confinadas, tipos/MIME, estados, secuencias, dimensión y revisión. Validación compartida por importador, API y exportador.

`data/media.json`: migrar sus futuros registros legacy al manifiesto con pending por defecto; no convertir texto de licencia en clearance. Hoy está vacío. No eliminarlo sin migración documentada.

SDK/OpenAPI: tipos opcionales discriminados; resolver todas las nuevas URLs públicas por esquema conocido, incluidas miniaturas/alternativas, no solo prefijo /media/flow/. Tests de URLs relativas/absolutas y seguridad. Si se retira o cambia semántica incompatible de campos antiguos, usar v2.

## Offline y anatomía

Exportador propuesto: catálogo JSON importable a SQLite + manifiesto de versión/hash + packs por exerciseId/rutina, solo con binarios autorizados para redistribución offline. Incluir créditos, licencias y avisos. Rutas relativas confinadas dentro del pack; integridad antes de activar. Descarga selectiva con cuota; archivos pendientes/incompletos no sustituyen un pack válido. Actualizaciones transaccionales conservan todos los IDs e historial y permiten rollback de catálogo. Primer arranque con snapshot local, no depender de caché eliminable.

Gym Zong guardará exerciseId, resolverá `selection` localmente y mostrará best/fallback automáticamente. No se modificó Gym Zong en P1; su adaptador actual requiere futura actualización separada para consumir este contrato y dejar de excluir ejercicios sin animación.

La anatomía usará otro mapping versionado músculo canónico→regionIds del atlas autorizado frente/espalda. No derivar de nombre del día ni de color del medio. Regiones sin correspondencia quedan unresolved. El agregado diario se calcula localmente desde IDs reales de SQLite; sin enviar rutinas/historial al servidor y sin pedir al usuario elegir una silueta.

## Entregas y pruebas de aceptación de P2

A. Esquemas, crosswalks y pipeline dry-run con fixtures de proveedor; aún sin nuevos binarios.
B. Resolver y extensión API/SDK, galería administrativa y prueba de migración de enlaces históricos.
C. Importación de recursos cuyos derechos sí hayan sido confirmados, exportador offline y QA de plataformas.

Casos mínimos: origen exacto fiable; nombre igual con variante distinta; Smith vs libre vs mancuerna; cero/múltiples candidatos; mapping huérfano/duplicado; fuente sin revisión; licencia desconocida o revocada; recursos con técnica incorrecta; SHA/MIME corruptos; HEAD no admitido; timeout/redirect/tamaño excesivo; selección y desempate estables; secuencia fuera de rango; todos los estados; fallback offline; créditos completos; importación repetida/rollback; export sin assets no autorizados; todos los IDs históricos resuelven. Android/iOS/Web y sin red se prueban físicamente antes de afirmar compatibilidad.
