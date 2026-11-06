export class InputError extends Error {
  constructor(message) { super(message); this.status = 400; this.code = 'INVALID_QUERY'; }
}

export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function validateDataset(data) {
  if (!Array.isArray(data) || !data.length) throw new Error('El catálogo debe ser un arreglo no vacío');
  const ids = new Set();
  const muscles = ['abdominals','abductors','adductors','biceps','calves','chest','forearms','glutes','hamstrings','lats','lower back','middle back','neck','quadriceps','shoulders','traps','triceps'];
  const equipment = [null,'body only','machine','other','foam roll','kettlebells','dumbbell','cable','barbell','bands','medicine ball','exercise ball','e-z curl bar'];
  const categories = ['strength','stretching','plyometrics','strongman','powerlifting','cardio','olympic weightlifting'];
  for (const e of data) {
    if (!e || typeof e.id !== 'string' || !/^[\w-]+$/.test(e.id) || ids.has(e.id)) throw new Error(`ID inválido o duplicado: ${e?.id}`);
    ids.add(e.id);
    if (typeof e.name !== 'string' || !e.name.trim()) throw new Error(`Nombre vacío: ${e.id}`);
    for (const key of ['primaryMuscles', 'secondaryMuscles', 'instructions', 'images']) {
      if (!Array.isArray(e[key]) || e[key].some(v => typeof v !== 'string')) throw new Error(`${e.id}: ${key} inválido`);
    }
    if (!e.primaryMuscles.length) throw new Error(`Metadatos incompletos: ${e.id}`);
    if ([...e.primaryMuscles,...e.secondaryMuscles].some(m=>!muscles.includes(m))) throw new Error(`Músculo desconocido: ${e.id}`);
    if (!equipment.includes(e.equipment) || !categories.includes(e.category) || ![null,'compound','isolation'].includes(e.mechanic) || ![null,'pull','push','static'].includes(e.force)) throw new Error(`Clasificación inválida: ${e.id}`);
    if (!['beginner', 'intermediate', 'expert'].includes(e.level)) throw new Error(`Nivel inválido: ${e.id}`);
    if (e.images.some(p => !/^[\w-]+\/[0-9]+\.(jpg|png|webp)$/.test(p))) throw new Error(`Ruta de imagen inválida: ${e.id}`);
  }
  return ids;
}

export function validateTranslations(translations, ids) {
  for (const [id, t] of Object.entries(translations)) {
    if (!ids.has(id)) throw new Error(`Traducción huérfana: ${id}`);
    if (!t.name?.trim() || !Array.isArray(t.instructions) || t.instructions.length < 2 || t.instructions.some(x => typeof x !== 'string' || !x.trim())) throw new Error(`Traducción incompleta: ${id}`);
    if (!Array.isArray(t.aliases) || t.aliases.some(x => typeof x !== 'string')) throw new Error(`Alias inválidos: ${id}`);
  }
}

export function validateMedia(records, ids) {
  if (!Array.isArray(records)) throw new Error('media.json debe ser un arreglo');
  const seen = new Set();
  for (const m of records) {
    if (!ids.has(m.exerciseId)) throw new Error(`Medio sin ejercicio: ${m.exerciseId}`);
    if (!['video', 'gif'].includes(m.type)) throw new Error('Medio debe ser video o gif');
    for (const field of ['url', 'sourceUrl', 'licenseUrl', ...(m.authorUrl ? ['authorUrl'] : [])]) {
      let url; try { url = new URL(m[field]); } catch { throw new Error(`${field} inválida`); }
      if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`${field} requiere HTTPS sin credenciales`);
    }
    if (!m.license?.trim() || !m.attribution?.trim()) throw new Error('Todo medio requiere licencia y atribución');
    for (const field of ['width','height','frameCount']) if (m[field] !== undefined && (!Number.isSafeInteger(m[field]) || m[field] < 1)) throw new Error(`${field} debe ser un entero positivo`);
    const key = `${m.exerciseId}:${m.url}`;
    if (seen.has(key)) throw new Error(`Medio duplicado: ${key}`);
    seen.add(key);
  }
}

export function integer(value, fallback, min, max, name) {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < min || Number(value) > max) throw new InputError(`${name} debe ser un entero entre ${min} y ${max}`);
  return Number(value);
}

export function choice(value, allowed, name, fallback) {
  if (value === null) return fallback;
  if (!allowed.includes(value)) throw new InputError(`${name}: valores permitidos: ${allowed.join(', ')}`);
  return value;
}

export function checkParams(params, allowed) {
  for (const key of params.keys()) {
    if (!allowed.includes(key)) throw new InputError(`Parámetro desconocido: ${key}`);
    if (params.getAll(key).length > 1) throw new InputError(`Parámetro repetido: ${key}`);
  }
}
