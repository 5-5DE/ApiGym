"""Render alias targets and family defaults for inspection, without changing data."""
import json
from pathlib import Path
import pymupdf as fitz

root = Path(__file__).resolve().parent.parent
curation = json.loads((root / 'data/gymzong-curation.es-MX.json').read_text(encoding='utf-8'))
titles = json.loads((root / 'data/translations.es.json').read_text(encoding='utf-8'))
ids = sorted(set(curation['aliases']) | {f['defaultExerciseId'] for f in curation['families']})
out = root / 'dist/gymzong-phase3'
out.mkdir(parents=True, exist_ok=True)
for start in range(0, len(ids), 6):
    doc = fitz.open()
    page = doc.new_page(width=1100, height=1560)
    page.draw_rect(page.rect, fill=(0.10, 0.14, 0.18), color=None)
    for i, id in enumerate(ids[start:start + 6]):
        y = i * 260
        title = titles[id]['name']
        page.insert_text((12, y + 18), f'{id}: {title}', fontsize=11, color=(1, 1, 1))
        for c, frame in enumerate(curation['evidence'][id]['frames']):
            svg = fitz.open(root / 'data/flow-exercise-dataset' / frame['path'])
            pdf = fitz.open('pdf', svg.convert_to_pdf())
            page.show_pdf_page(fitz.Rect(12+c*360, y+25, 360+c*360, y+250), pdf, 0)
    page.get_pixmap().save(out / f'curation-{start//6+1:02}.png')
print(f'{len(ids)} exercises in {(len(ids)+5)//6} sheets: {out}')
