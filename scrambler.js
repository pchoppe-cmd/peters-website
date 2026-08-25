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
    frag.appendChild(chip);
  }
  wordListEl.appendChild(frag);
}

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
