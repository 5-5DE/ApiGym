# P1 — Identidad, nombres y búsqueda

Los 2069 IDs históricos se conservan en test/historical-ids.json. No hay deduplicación destructiva.

La validación de traducciones completas ocurre después de combinar ambos catálogos y comprobar IDs únicos. Sigue exigiendo instrucciones completas y rechazando huérfanas. La prueba carga el módulo real con una traducción Flow de fixture y luego con una huérfana; no modifica el catálogo productivo.

## Nombres prioritarios para Gym Zong

names.es.json contiene dos nombres y alias en borrador para flow-0372 y flow-0599, basados en su nombre original, equipo original y las denominaciones ya presentes en Gym Zong. Cada entrada fija sourceName/sourceEquipment; el validador detecta si cambia el origen. No constituyen aprobación humana ni añaden traducciones de instrucciones.

`nameLanguage` identifica el idioma del título. `nameStatus=draft|missing` indica borrador o ausencia de traducción del nombre. `language`, `availableLanguages` y `translationStatus` conservan la semántica previa de traducción completa/instrucciones. `nameEn` nunca se reemplaza. Por ejemplo flow-0599 puede tener nameLanguage=es y language=en. Un cliente debe mostrar que las instrucciones permanecen en inglés.

No se inventaron instrucciones para los cuatro registros que carecen de ellas. La cobertura de traducciones completas permanece en 73. Los originales ambiguos de las rutinas no reciben referencias nuevas.

El índice incluye nombres ingleses, nombres españoles y alias; la normalización existente elimina acentos y equipara guiones/espacios. No traduce palabras sueltas a ciegas ni modifica asociaciones multimedia. Las variantes libre/Smith/mancuernas mantienen IDs diferentes.

## Selección editorial

editorial-featured.json conserva explícitamente los 73 IDs que anteriormente aparecían por tener traducción. Es una migración de compatibilidad de la selección histórica, no prueba de popularidad ni una nueva curación profesional. Traducir un ejercicio deja de añadirlo automáticamente.

`popular` se conserva como alias de `editorialFeatured`, tanto en respuesta como en consulta. Si se especifican ambos filtros se aplica su intersección. La cifra stats.popular cuenta la lista editorial independiente. El hash de catálogo incluye nombres y lista editorial para invalidar cachés.

OpenAPI y tipos del SDK añaden campos opcionales. Los endpoints y los valores históricos de translationStatus permanecen disponibles. La regresión compara la resolución de todos los IDs históricos.
