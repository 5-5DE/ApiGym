# Investigación de fuentes

Consulta: 6 de noviembre de 2026. Se distinguieron código abierto, acceso gratuito a un servicio y permisos de reutilización del contenido. Las cantidades anunciadas por proveedores no se sumaron al catálogo de ApiGym.

| Fuente | Hallazgo en la fuente primaria | Decisión |
| --- | --- | --- |
| [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) y [Unlicense](https://github.com/yuhonas/free-exercise-db/blob/main/LICENSE.md) | JSON, equipo, dificultad, músculos e imágenes de posiciones; snapshot recuperado con 876 registros | Base incluida, 873 registros con dos imágenes |
| [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Fitness_animations) | Archivos animados con autor, licencia y conteo de cuadros por archivo | 9 referencias GIF incluidas; detalles por archivo en `data/media.json` |
| [wger](https://github.com/wger-project/wger), [API oficial](https://wger.readthedocs.io/en/latest/api/api.html) | Software AGPL; datos Creative Commons por entrada; API pública con ejercicios y medios | Alternativa para ampliar; requiere conservar la licencia de cada traducción y medio. No importada |
| [OpenExerciseDB](https://github.com/rfivesix/OpenExerciseDB) | Fork de wger con clasificación y textos en varios idiomas; CC BY-SA 4.0 y atribución por entrada | Alternativa de taxonomía/traducciones; no importada |
| [ExerciseDB](https://github.com/ExerciseDB/exercisedb-api) | Anuncia 11,000+ ejercicios. El repo actual contiene README y LICENSE; una licencia de código no otorga permiso general sobre el catálogo o los medios de un servicio | Investigada; no se copió contenido del servicio |
| [Dataset 1,324](https://github.com/hasaneyldrm/exercises-dataset/blob/main/NOTICE.md) | El aviso indica que los medios son de Gym visual y que clonar el repo no concede derechos más allá de sus términos | No importado |
| [API Ninjas](https://api-ninjas.com/api/exercises) | Anuncia más de 3,000 ejercicios; requiere API key; incluye filtros y posiciones en imágenes según plan | Referencia funcional, no dataset abierto importado |
| [MuscleWiki](https://api.musclewiki.com/documentation), [términos oficiales](https://api.musclewiki.com/api-terms) | Servicio comercial. Sus términos prohíben redistribuir datos a terceros y construir una API o dataset competidor | No usado como fuente de una API independiente |
| [YMove / 25 videos](https://github.com/ymove-app/exercise-api/blob/main/free-videos/README.md) | Permite uso en apps y sitios; prohíbe vender o redistribuir videos como producto o biblioteca independiente | No se importó esa biblioteca en ApiGym |
| [Free Exercise DB with Videos (fork)](https://github.com/michael-lemarec/free-exercise-db-api) | 317 ejercicios y 593 videos anunciados; el propio README declara que no conoce la procedencia original de los videos comprados | No se importaron los videos ni metadatos |
| [Form motion studio](https://github.com/blwsk/exercise-animations) | Ocho movimientos procedurales y exportación GIF; documenta figura MakeHuman CC0 | Alternativa futura para producir assets propios, requiere revisar código/activos y movimiento; no importada |

## Procedencia del snapshot

La terminal no pudo acceder a GitHub en este entorno. El JSON de Free Exercise DB se recuperó mediante la herramienta de consulta web, reconstruyendo todas las líneas numeradas del archivo. Se escaparon saltos de línea literales dentro de cadenas JSON para obtener JSON válido. El SHA-256 del manifiesto certifica el snapshot local, **no una coincidencia byte a byte contra un blob Git remoto**. Se conservaron IDs, metadatos, instrucciones y rutas recibidas. El script `data:refresh` permite sustituirlo por una descarga HTTPS directa y registrar su checksum cuando haya conexión.

La consulta de las páginas de Commons confirmó nombres, autores, licencias, resolución y cuadros animados. Sus enlaces de archivo devolvieron MIME `image/gif` en la herramienta web, que no reproduce GIFs. La reproducción local no fue verificada; `media:check` permite comprobar disponibilidad en el entorno de despliegue y el visor permite revisar el resultado.

## Criterio de cobertura

El conjunto español prioriza movimientos habituales con barra, mancuernas, poleas, máquinas, peso corporal y cardio. `popular=true` significa selección editorial; no implica estadísticas de popularidad. No se asignaron GIFs genéricos a variaciones distintas. Las imágenes de inicio/fin se exponen como secuencia y no como movimiento continuo. La cobertura GIF sigue siendo parcial; el mecanismo de importación admite reemplazarla por material propio o debidamente licenciado.
