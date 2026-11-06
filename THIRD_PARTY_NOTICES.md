# Contenido de terceros

El catálogo base, las traducciones locales, los medios y el código tienen procedencias distintas. Esta nota no amplía las licencias de las fuentes.

## Free Exercise DB

Fuente: <https://github.com/yuhonas/free-exercise-db>. Autoría: yuhonas y colaboradores. Dataset e imágenes publicados bajo Unlicense según el repositorio. Se incluye el texto en `data/upstream/LICENSE-Free-Exercise-DB.txt`. El README de la fuente reconoce su origen en [exercises.json](https://github.com/wrkout/exercises.json).

El snapshot se encuentra en `data/upstream/free-exercise-db.json`; fecha, método y checksum en `manifest.json`. En las respuestas se omiten pasos vacíos y se agregan traducciones locales, alias y metadatos de medios. Los textos originales no se presentan como traducciones al español. Las imágenes se enlazan sin modificaciones.

## GIFs de Wikimedia Commons

Se enlazan archivos sin modificaciones. Cada entrada de `data/media.json` registra el título, autor, URL del archivo, página fuente, licencia y atribución. La API reproduce estos campos para que el tracker conserve el crédito.

| Archivo | Autor | Licencia |
| --- | --- | --- |
| [Pushups wbs.gif](https://commons.wikimedia.org/wiki/File:Pushups_wbs.gif) | Wensceslao | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| [Squats wbs.gif](https://commons.wikimedia.org/wiki/File:Squats_wbs.gif) | Wensceslao | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| [Jumpingrope wbs.gif](https://commons.wikimedia.org/wiki/File:Jumpingrope_wbs.gif) | Wensceslao | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| [Situps wbs.gif](https://commons.wikimedia.org/wiki/File:Situps_wbs.gif) | Wensceslao | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| [Pullup.gif](https://commons.wikimedia.org/wiki/File:Pullup.gif) | Extremistpullup | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| [Man Lifting Barbell Deadlift GIF Animation Loop.gif](https://commons.wikimedia.org/wiki/File:Man_Lifting_Barbell_Deadlift_GIF_Animation_Loop.gif) | [Videoplasty.com](https://videoplasty.com/) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| [Man Lifting Dumbbells GIF Animation Loop.gif](https://commons.wikimedia.org/wiki/File:Man_Lifting_Dumbbells_GIF_Animation_Loop.gif) | [Videoplasty.com](https://videoplasty.com/) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| [Man on a Treadmill GIF Animation Loop.gif](https://commons.wikimedia.org/wiki/File:Man_on_a_Treadmill_GIF_Animation_Loop.gif) | [Videoplasty.com](https://videoplasty.com/) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| [Man on an Exercise Bike GIF Animation Loop.gif](https://commons.wikimedia.org/wiki/File:Man_on_an_Exercise_Bike_GIF_Animation_Loop.gif) | [Videoplasty.com](https://videoplasty.com/) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

Muestra el crédito completo (título, autor, fuente y licencia), con los enlaces correspondientes. Si modificas un archivo, declara los cambios y aplica las condiciones de la licencia original a la adaptación. Estos medios no pasan a ser MIT por estar referenciados en ApiGym.

## Fuentes investigadas

Las fuentes marcadas `included=false` en `data/sources.json` solo se investigaron. Su contenido no se incorpora al catálogo. Consulta `docs/research.md` para los motivos y enlaces primarios.
