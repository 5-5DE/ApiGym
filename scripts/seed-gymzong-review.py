"""Capture the supplied routine verbatim; never promote candidates to matches."""
import csv
import hashlib
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / 'data/gymzong/routine-original.csv'
candidate_sets = [
    ['Hack_Squat', 'flow-0743'], [], ['Thigh_Abductor', 'flow-0597'],
    ['Leg_Press', 'flow-0739', 'flow-1463'], ['One-Legged_Cable_Kickback'],
    ['Standing_Calf_Raises', 'Seated_Calf_Raise'],
    ['Wide-Grip_Lat_Pulldown', 'flow-0198'], ['Seated_Cable_Rows', 'flow-0861'],
    ['Rope_Straight-Arm_Pulldown', 'flow-0237'], ['Front_Plate_Raise'],
    ['Face_Pull'], ['Side_Lateral_Raise', 'flow-0334'],
    ['Barbell_Deadlift', 'Romanian_Deadlift'], ['Seated_Leg_Curl', 'flow-0599'],
    ['Thigh_Abductor', 'flow-0597'], ['Standing_Calf_Raises', 'Seated_Calf_Raise'],
    ['Barbell_Hip_Thrust'], ['Butterfly', 'flow-0596'],
    ['Leverage_Chest_Press', 'flow-0577', 'flow-0576'],
    ['Leverage_Incline_Chest_Press', 'flow-1299', 'flow-1479'],
    ['One_Arm_Dumbbell_Preacher_Curl', 'Two-Arm_Dumbbell_Preacher_Curl', 'flow-0372'],
    ['Triceps_Pushdown', 'Dumbbell_One-Arm_Triceps_Extension', 'flow-0607'],
    ['Barbell_Hip_Thrust'], ['One-Legged_Cable_Kickback'],
    ['Thigh_Abductor', 'flow-0597'], ['flow-1756', 'flow-1757'],
    ['Seated_Leg_Curl', 'flow-0599'],
]
questions = [
    'Confirmar orientación del cuerpo en Jack/hack invertido; estándar no demuestra equivalencia.',
    'Identificar movimiento y aparato; banco poco inclinado no identifica una extensión.',
    'Confirmar máquina sentada y movimiento de abducción.',
    'Confirmar ángulo, aparato y postura; no inferir unidad de carga.',
    'Confirmar polea con tobillera o máquina; no confundir kickback de tríceps.',
    'Confirmar sentado/de pie, aparato y recorrido.',
    'Confirmar agarre, accesorio y dirección del jalón.',
    'Identificar máquina, altura de polea y agarre de la barrita negra.',
    'Confirmar brazos rectos, polea y recorrido hacia cadera.',
    'Confirmar elevación frontal, altura y recorrido del disco.',
    'Confirmar tirón hacia cara, agarre y recorrido; cabeza no prueba face pull.',
    'Confirmar elevación lateral, postura e implemento.',
    'Confirmar convencional/rumano/otro; disco 15 no identifica variante ni unidad.',
    'Confirmar máquina de flexión de rodilla sentada; aclarar 8 lib.',
    'Confirmar máquina y si coincide con lunes.',
    'Confirmar sentado/de pie y si coincide con lunes.',
    'Confirmar barra/máquina/otro y apoyo; no sustituir por puente de glúteos.',
    'Confirmar que Pec tec es pec deck/fly y qué apoyos y agarre usa.',
    'Confirmar máquina, respaldo, agarre y trayectoria.',
    'Confirmar inclinación y máquina; planta baja es ubicación, no técnica.',
    'Confirmar unilateral/bilateral y agarre; mancuerna excluye sustitución automática por barra EZ.',
    'Confirmar cable/mancuerna/máquina, postura y recorrido.',
    'Confirmar implemento y si coincide con miércoles.',
    'Confirmar polea con tobillera o máquina y si coincide con lunes.',
    'Confirmar aparato y si coincide con lunes/miércoles.',
    'Confirmar implemento, apoyo y variante unilateral; no asumir rumano.',
    'Confirmar máquina y si coincide con miércoles.',
]
rows = list(csv.DictReader(source.read_text(encoding='utf-8-sig').splitlines()))
assert len(rows) == len(candidate_sets) == len(questions) == 27
positions = []
for index, (row, candidates, question) in enumerate(zip(rows, candidate_sets, questions), 1):
    positions.append({
        'position': index, 'day': row['dia'], 'group': row['grupo_dia'],
        'originalName': row['ejercicio_nota'], 'originalNotes': row['indicaciones_originales'],
        'legacyCandidate': row['repdb_candidato_id'] or None,
        'legacyStatus': row['estado_coincidencia'], 'legacyPending': row['pendientes'],
        'status': 'pending', 'confirmedApiGymId': None, 'candidateIds': candidates,
        'evidence': {'source': 'routine-original.csv', 'csvLine': index + 1,
                     'basis': 'Lexical candidate search plus catalog name, equipment and instructions; not observed execution.'},
        'humanReview': question,
        'rejectedCandidates': ([{'id': 'flow-0860', 'reason': 'Upstream target triceps and hand-held cable instructions; not evidence of glute kickback.'}] if index in (5, 24) else []),
    })
target = root / 'data/gymzong'
target.mkdir(parents=True, exist_ok=True)
(target / 'routine-review.json').write_text(json.dumps({
    'schemaVersion': 1, 'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'sourcePath': 'Gym-Zong/docs/references/f4-04/Gym_Personal_F4-04_Inventario_27_ejercicios_v0.2.csv',
    'sourceCommit': '6cf8a638e5386a0a8173e469a25719d8e7151729',
    'positions': positions,
}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
