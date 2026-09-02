// Word Scrambler logic
// The English word list (WORD_LIST) is provided by words.js, loaded eagerly.
// Other languages' dictionaries are loaded on demand, matching the site's
// selected UI language, so switching language actually changes which words
// are matched — not just the surrounding labels.

const lettersInput = document.getElementById('letters-input');
const minLengthSelect = document.getElementById('min-length');
const maxLengthSelect = document.getElementById('max-length');
const scrambleBtn = document.getElementById('scramble-btn');
const errorEl = document.getElementById('scramble-error');
const resultsCard = document.getElementById('results-card');
const resultCountEl = document.getElementById('result-count');
const wordListEl = document.getElementById('word-list');

// Maps UI language -> { file, globalVar }. English is already loaded via words.js.
const DICTIONARIES = {
  en: { file: 'words.js', globalVar: 'WORD_LIST' },
  de: { file: 'words-de.js', globalVar: 'WORD_LIST_DE' },
  fr: { file: 'words-fr.js', globalVar: 'WORD_LIST_FR' },
  es: { file: 'words-es.js', globalVar: 'WORD_LIST_ES' },
};

const loadedLists = { en: window.WORD_LIST };
const loadingPromises = {};

function loadDictionary(lang) {
  if (loadedLists[lang]) return Promise.resolve(loadedLists[lang]);
  if (loadingPromises[lang]) return loadingPromises[lang];

  const dict = DICTIONARIES[lang] || DICTIONARIES.en;
  loadingPromises[lang] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = dict.file;
    script.onload = () => {
      loadedLists[lang] = window[dict.globalVar] || [];
      resolve(loadedLists[lang]);
    };
    script.onerror = () => reject(new Error(`Failed to load dictionary: ${dict.file}`));
    document.body.appendChild(script);
  });
  return loadingPromises[lang];
}

function letterCounts(str) {
  const counts = Object.create(null);
  for (const ch of str) {
    counts[ch] = (counts[ch] || 0) + 1;
  }
  return counts;
}

function canFormWord(word, availableCounts) {
  const needed = Object.create(null);
  for (const ch of word) {
    needed[ch] = (needed[ch] || 0) + 1;
    if (!availableCounts[ch] || needed[ch] > availableCounts[ch]) return false;
  }
  return true;
}

function findWords(rawInput, minLength, maxLength, wordList) {
  // \p{L} matches any Unicode letter, so accented characters (é, ñ, ü, ß, …)
  // used by German/French/Spanish words are preserved, not stripped.
  const cleaned = rawInput.toLowerCase().replace(/[^\p{L}]/gu, '');
  if (!cleaned) return { error: window.t('scrambler_error_no_letters'), words: [] };
  if (cleaned.length > 24) return { error: window.t('scrambler_error_too_long'), words: [] };
  if (minLength > maxLength) return { error: window.t('scrambler_error_min_max'), words: [] };

  const available = letterCounts(cleaned);
  const found = [];
  const effectiveMax = Math.min(maxLength, cleaned.length);

  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    if (word.length < minLength || word.length > effectiveMax) continue;
    if (canFormWord(word, available)) found.push(word);
  }

  found.sort((a, b) => b.length - a.length || a.localeCompare(b));
  return { error: null, words: found };
}

function render(words) {
  wordListEl.innerHTML = '';
  if (words.length === 0) {
    resultsCard.style.display = 'block';
    resultCountEl.textContent = window.t('scrambler_no_words');
    return;
  }
  resultsCard.style.display = 'block';
  resultCountEl.textContent = words.length === 1
    ? window.t('scrambler_word_found_singular')
    : window.t('scrambler_words_found', { n: words.length });
  const frag = document.createDocumentFragment();
  for (const w of words) {
    const chip = document.createElement('span');
    chip.className = 'word-chip';
    chip.textContent = w;
    chip.title = window.t('scrambler_def_hint');
    chip.setAttribute('role', 'button');
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('aria-expanded', 'false');
    frag.appendChild(chip);
  }
  wordListEl.appendChild(frag);
}

// Definitions: fetched on demand (one word at a time, on click) rather than
// for every result up front — result lists can easily have 50+ words, and
// eagerly fetching all of them would be slow and unfriendly to a free API.
//
// English uses Wiktionary's REST API directly (Wikimedia-hosted, reliable).
// German/French/Spanish fall back to dictionaryapi.dev — a free, unofficial,
// no-key API that also happens to use the same language codes as this site,
// but has no SLA and can go down; Wiktionary's own per-language REST
// endpoints turned out to be unsupported for de/fr/es (consistent 501s).

const definitionCache = new Map(); // `${lang}:${word}` -> {pos, text} | null (null = confirmed no entry)

// Strips HTML tags/entities from Wiktionary's definition markup down to plain
// text. Safe: `tmp` is never inserted into the document, only read from.
// Definitions occasionally embed a <style> tag (e.g. for "defdate" labels)
// whose CSS text would otherwise leak into .textContent, so drop it first.
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelectorAll('style, script').forEach((el) => el.remove());
  return (tmp.textContent || '').replace(/\s+/g, ' ').trim();
}

async function fetchDefinitionEn(word) {
  const res = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`);
  if (!res.ok) return null;
  const data = await res.json();
  // Prefer the English-language section; some queried words are foreign
  // terms with only non-English entries, so fall back to whatever's there.
  const entries = data.en || data[Object.keys(data)[0]];
  const first = entries && entries[0];
  const defHtml = first && first.definitions && first.definitions[0] && first.definitions[0].definition;
  return defHtml ? { pos: first.partOfSpeech || '', text: stripHtml(defHtml) } : null;
}

async function fetchDefinitionOther(word, lang) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${encodeURIComponent(word)}`);
  if (!res.ok) return null;
  const data = await res.json();
  const meaning = data[0] && data[0].meanings && data[0].meanings[0];
  const text = meaning && meaning.definitions && meaning.definitions[0] && meaning.definitions[0].definition;
  return text ? { pos: meaning.partOfSpeech || '', text } : null;
}

async function fetchDefinition(word, lang) {
  const key = `${lang}:${word}`;
  if (definitionCache.has(key)) return { result: definitionCache.get(key), errored: false };
  try {
    const result = lang === 'en' ? await fetchDefinitionEn(word) : await fetchDefinitionOther(word, lang);
    definitionCache.set(key, result);
    return { result, errored: false };
  } catch (err) {
    // Network/CORS failure — don't cache, so the user can retry by clicking again.
    return { result: null, errored: true };
  }
}

function closeDefinition(chip) {
  chip.classList.remove('is-open');
  chip.setAttribute('aria-expanded', 'false');
  const next = chip.nextElementSibling;
  if (next && next.classList.contains('word-definition')) next.remove();
}

async function toggleDefinition(chip) {
  if (chip.classList.contains('is-open')) {
    closeDefinition(chip);
    return;
  }
  // Only one definition open at a time, to keep the results readable.
  wordListEl.querySelectorAll('.word-chip.is-open').forEach(closeDefinition);

  chip.classList.add('is-open');
  chip.setAttribute('aria-expanded', 'true');
  const panel = document.createElement('div');
  panel.className = 'word-definition';
  panel.textContent = window.t('scrambler_def_loading');
  chip.after(panel);

  const lang = window.getLang();
  const word = chip.textContent;
  const { result, errored } = await fetchDefinition(word, lang);

  // The panel may have been removed already (chip re-clicked, new search run,
  // or language changed mid-flight) — bail out rather than resurrecting it.
  if (!panel.isConnected) return;

  panel.innerHTML = '';
  if (errored) {
    panel.textContent = window.t('scrambler_def_error');
  } else if (!result) {
    panel.textContent = window.t('scrambler_def_not_found');
  } else {
    if (result.pos) {
      const posEl = document.createElement('span');
      posEl.className = 'word-definition-pos';
      posEl.textContent = result.pos;
      panel.appendChild(posEl);
    }
    panel.appendChild(document.createTextNode(result.text));
  }
}

wordListEl.addEventListener('click', (e) => {
  const chip = e.target.closest('.word-chip');
  if (!chip) return;
  toggleDefinition(chip);
});

wordListEl.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const chip = e.target.closest('.word-chip');
  if (!chip) return;
  e.preventDefault();
  toggleDefinition(chip);
});

async function runSearch() {
  errorEl.textContent = '';
  const lang = window.getLang();
  const minLength = parseInt(minLengthSelect.value, 10);
  const maxLength = parseInt(maxLengthSelect.value, 10);

  let wordList;
  try {
    scrambleBtn.disabled = true;
    wordList = await loadDictionary(lang);
  } catch (err) {
    scrambleBtn.disabled = false;
    errorEl.textContent = window.t('scrambler_error_no_letters');
    resultsCard.style.display = 'none';
    return;
  }
  scrambleBtn.disabled = false;

  const { error, words } = findWords(lettersInput.value, minLength, maxLength, wordList);
  if (error) {
    errorEl.textContent = error;
    resultsCard.style.display = 'none';
    return;
  }
  render(words);
}

scrambleBtn.addEventListener('click', runSearch);
lettersInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') runSearch();
});

// Re-run the search on language change so both the result text (e.g. "12 words
// found") AND the actual matched words update to the new language's dictionary,
// if a search is already showing.
window.addEventListener('sd-lang-change', () => {
  if (resultsCard.style.display === 'block' || errorEl.textContent) runSearch();
});

// Pre-warm the dictionary for the current language (if not English) so the
// first search doesn't have to wait on a network fetch.
loadDictionary(window.getLang());
