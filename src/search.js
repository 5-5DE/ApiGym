import { normalize } from './validation.js';

const stopWords = new Set(['a', 'al', 'de', 'del', 'el', 'en', 'la', 'las', 'lo', 'los', 'con', 'por', 'para', 'un', 'una', 'y', 'the', 'of', 'with', 'on', 'in', 'and']);
const words = value => normalize(value).split(' ').filter(Boolean);
const singular = word => {
  if (word.length > 5 && /(?:iones|ones|ores|ales|eles|iles|ules|ces)$/.test(word)) return word.endsWith('ces') ? word.slice(0, -3) + 'z' : word.slice(0, -2);
  return word.length > 4 && /[aeiou]s$/.test(word) ? word.slice(0, -1) : word;
};
const terms = value => words(value).filter(word => !stopWords.has(word));
const phrase = value => words(value).map(singular).join(' ');

// Insertion, deletion or substitution of one letter. Short tokens stay exact
// to avoid turning ambiguous abbreviations into unrelated movements.
function oneEdit(a, b) {
  if (Math.min(a.length, b.length) < 4 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length >= b.length) i++;
    if (b.length >= a.length) j++;
  }
  return edits + (i < a.length || j < b.length ? 1 : 0) <= 1;
}

export function searchDocument({ names, aliases, metadata, popular, isDefaultVariant = false }) {
  const namePhrases = names.map(phrase).filter(Boolean);
  const aliasPhrases = aliases.map(phrase).filter(Boolean);
  return {
    namePhrases, aliasPhrases, popular, isDefaultVariant,
    nameTerms: [...new Set(names.flatMap(terms).map(singular))],
    allTerms: [...new Set([...names, ...aliases, ...metadata].flatMap(terms).map(singular))],
  };
}

export function searchQuery(value) {
  const tokens = [...new Set(terms(value))];
  return { phrase: phrase(value), tokens, stems: tokens.map(singular) };
}

export function searchMatch(document, query, mode) {
  if (!query.tokens.length) return { matches: !query.phrase, score: 0, matchedTokens: [] };
  const matchedTokens = [];
  let exact = 0;
  for (let i = 0; i < query.tokens.length; i++) {
    const stem = query.stems[i];
    if (document.allTerms.includes(stem)) { matchedTokens.push(query.tokens[i]); exact++; }
    else if (document.allTerms.some(word => oneEdit(stem, word))) matchedTokens.push(query.tokens[i]);
  }
  const matches = mode === 'any' ? matchedTokens.length > 0 : matchedTokens.length === query.tokens.length;
  const nameExact = document.namePhrases.includes(query.phrase);
  const aliasExact = document.aliasPhrases.includes(query.phrase);
  const starts = phrase => phrase === query.phrase || phrase.startsWith(query.phrase + ' ');
  const namePrefix = document.namePhrases.some(starts);
  const aliasPrefix = document.aliasPhrases.some(starts);
  const nameCoverage = query.stems.filter(stem => document.nameTerms.some(word=>word===stem || oneEdit(stem,word))).length;
  const tier = nameExact ? 5 : aliasExact ? 4 : namePrefix ? 3 : aliasPrefix ? 2 : 1;
  // Tier dominates; within a tier prefer coverage, names, popularity and
  // fewer surplus name words. Scores rank a query; they are not confidence.
  const coverage = matchedTokens.length / query.tokens.length;
  const fieldSurpluses = [...document.namePhrases,...document.aliasPhrases].map(value=>terms(value).map(singular)).filter(field=>query.stems.every(stem=>field.some(word=>word===stem || oneEdit(stem,word)))).map(field=>Math.max(0,field.length-query.stems.length));
  const surplus = fieldSurpluses.length ? Math.min(...fieldSurpluses) : Math.max(0, document.nameTerms.length - nameCoverage);
  const score = tier * 1000000 + Math.round(coverage * 100000) +
    Math.round(nameCoverage / query.tokens.length * 10000) +
    (document.popular ? 1000 : 0) + (document.isDefaultVariant ? 500 : 0) + Math.max(0, 500 - surplus * 10) + exact;
  return { matches, score, matchedTokens };
}

// Resolution needs evidence from one complete name/alias, rather than terms
// gathered across languages or metadata. A shared muscle is not an identity.
export function resolutionConfidence(document, query) {
  let confidence = 0;
  for (const [phrases, isAlias] of [[document.namePhrases, false], [document.aliasPhrases, true]]) {
    for (const value of phrases) {
      const target = terms(value).map(singular);
      const source = terms(query.phrase).map(singular);
      const remaining = [...target];
      const unmatched = [];
      for (const token of source) {
        const index = remaining.indexOf(token);
        if (index < 0) unmatched.push(token);
        else remaining.splice(index, 1);
      }
      let typos = 0, matched = source.length - unmatched.length;
      for (const token of unmatched) {
        const index = remaining.findIndex(word => oneEdit(token, word));
        if (index >= 0) { remaining.splice(index, 1); matched++; typos++; }
      }
      let valueConfidence = 0;
      const complete = matched === source.length && source.length === target.length;
      if (value === query.phrase) valueConfidence = isAlias ? 0.97 : 0.99;
      else if (complete && typos === 0) valueConfidence = isAlias ? 0.93 : 0.95;
      else if (complete && typos === 1) valueConfidence = isAlias ? 0.84 : 0.86;
      else if (matched) valueConfidence = Math.min(0.70, 0.20 + 0.50 * matched / Math.max(source.length, target.length));
      confidence = Math.max(confidence, valueConfidence);
    }
  }
  return Math.round(confidence * 100) / 100;
}
