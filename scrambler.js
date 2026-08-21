// Word Scrambler logic
// WORD_LIST is provided by words.js

const lettersInput = document.getElementById('letters-input');
const minLengthSelect = document.getElementById('min-length');
const maxLengthSelect = document.getElementById('max-length');
const scrambleBtn = document.getElementById('scramble-btn');
const errorEl = document.getElementById('scramble-error');
const resultsCard = document.getElementById('results-card');
const resultCountEl = document.getElementById('result-count');
const wordListEl = document.getElementById('word-list');

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

function findWords(rawInput, minLength, maxLength) {
  const cleaned = rawInput.toLowerCase().replace(/[^a-z]/g, '');
  if (!cleaned) return { error: window.t('scrambler_error_no_letters'), words: [] };
  if (cleaned.length > 24) return { error: window.t('scrambler_error_too_long'), words: [] };
  if (minLength > maxLength) return { error: window.t('scrambler_error_min_max'), words: [] };

  const available = letterCounts(cleaned);
  const found = [];
  const effectiveMax = Math.min(maxLength, cleaned.length);

  for (let i = 0; i < WORD_LIST.length; i++) {
    const word = WORD_LIST[i];
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

function runSearch() {
  errorEl.textContent = '';
  const minLength = parseInt(minLengthSelect.value, 10);
  const maxLength = parseInt(maxLengthSelect.value, 10);
  const { error, words } = findWords(lettersInput.value, minLength, maxLength);
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

// Re-run the search on language change so result text (e.g. "12 words found")
// updates to the new language, if a search is already showing.
window.addEventListener('sd-lang-change', () => {
  if (resultsCard.style.display === 'block' || errorEl.textContent) runSearch();
});
