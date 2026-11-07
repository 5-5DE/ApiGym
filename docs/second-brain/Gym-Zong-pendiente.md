# Actualización pendiente para la nota existente de Gym Zong

Preparada el 06/11/2026 dentro del repositorio independiente ApiGym. NO sincronizada con ARDANG_VAULT: la bóveda está fuera de las raíces de escritura autorizadas. No se alteró el repositorio de Gym Zong.

Añadir a la nota canónica existente, conservando su historia:

## ApiGym — P0 cerrada y P1 implementada

ApiGym se trabaja por separado en la rama feat/catalog-quality-p1, desde 6ced900. P0: 15 pruebas originales correctas; check verifica 3771 SVG; HTTP local y SDK verifican todos los cuadros y 2069 ejercicios. Se detectan 131 enlaces históricos por nombre pendientes de revisión, ocho grupos de nombres duplicados y advertencias de derechos de Flow.

P1 conserva los 2069 IDs, valida traducciones después de combinar Flow, separa selección editorial, añade dos nombres españoles en borrador sin inventar instrucciones y corrige el visor web. 22 pruebas correctas; check y auditoría HTTP final correctos. Commits c5695ef, de94010 y d37836b; cierre documental en el log de la rama. Sin push/merge.

La asignación automática se especifica para P2: IDs de origen, variante estructurada, revisión administrativa de ambigüedades, derechos por recurso, prioridad entre recursos verificados GIF/vídeo→SVG→imagen→fallback y packs offline. El usuario final solo elige ejercicio; no asigna imágenes. Aún no implementada. No se descargaron medios nuevos ni se modificaron rutinas o historial.

Detalle: repositorio https://github.com/5-5DE/ApiGym, reports/P1.md y docs/P2-ASIGNACION-AUTOMATICA.md en la rama local (todavía no publicada). Siguiente paso: revisar P1 y aprobar el primer incremento P2 antes de importar medios.
