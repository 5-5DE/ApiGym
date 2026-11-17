"""Contact sheets for editorial inspection; never changes catalog data."""
import json
import pathlib
import textwrap
import pymupdf as fitz

ROOT = pathlib.Path(__file__).resolve().parent.parent
report = json.loads((ROOT / 'reports/spanish-localization-review.json').read_text(encoding='utf-8'))
translations = json.loads((ROOT / 'data/localization/es-MX.title-baseline.json').read_text(encoding='utf-8'))
records = sorted(report['records'], key=lambda row: ('cable' not in row['original']['name'].lower(), report['records'].index(row)))
out = ROOT / 'dist/title-review'
out.mkdir(parents=True, exist_ok=True)
index = []
for batch in range((len(records) + 8) // 9):
    target = fitz.open()
    page = target.new_page(width=1200, height=1980)
    page.draw_rect(page.rect, color=None, fill=(0.065, 0.065, 0.08))
    group = records[batch * 9:batch * 9 + 9]
    for r, record in enumerate(group):
        y = r * 220
        original = record['original']
        heading = f"{record['id']} | {original['name']}\nES: {translations[record['id']]['name']}\nEquipment: {original['equipment']}"
        page.insert_textbox(fitz.Rect(8, y + 5, 615, y + 52), heading, fontsize=9, color=(1, 0.85, 0.4))
        steps = ' '.join(f'{i + 1}. {step}' for i, step in enumerate(original['instructions']))
        result = page.insert_textbox(fitz.Rect(8, y + 54, 615, y + 216), steps, fontsize=9, color=(1, 1, 1))
        if result < 0:
            page.draw_rect(fitz.Rect(8, y + 54, 615, y + 216), color=None, fill=(0.065, 0.065, 0.08))
            page.insert_textbox(fitz.Rect(8, y + 54, 615, y + 216), steps, fontsize=7, color=(1, 1, 1))
        for c, frame in enumerate(record['frames']):
            svg = fitz.open(ROOT / 'data/flow-exercise-dataset' / frame)
            pdf = fitz.open('pdf', svg.convert_to_pdf())
            page.show_pdf_page(fitz.Rect(620 + c * 193, y + 15, 813 + c * 193, y + 210), pdf, 0)
        page.draw_line((0, y + 219), (1200, y + 219), color=(0.3, 0.3, 0.3))
    path = out / f'sheet-{batch + 1:03}.png'
    if not path.exists():
        page.get_pixmap().save(path)
    index.append({'sheet': batch + 1, 'path': str(path), 'ids': [row['id'] for row in group]})
(out / 'index.json').write_text(json.dumps(index, indent=2), encoding='utf-8')
print(f'{len(records)} records, {len(index)} sheets: {out}')
