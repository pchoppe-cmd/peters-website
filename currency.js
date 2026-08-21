// Currency Converter logic — uses the free frankfurter.app API (ECB reference rates)

const CURRENCY_CODES = [
  "AUD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD",
  "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK",
  "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR",
];

function currencyLabel(code) {
  return `${code} — ${window.t('currency_name_' + code)}`;
}

const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const swapBtn = document.getElementById('swap-btn');
const errorEl = document.getElementById('currency-error');
const resultCard = document.getElementById('result-card');
const resultEl = document.getElementById('conversion-result');
const rateDetailEl = document.getElementById('rate-detail');

function populateSelects() {
  for (const code of CURRENCY_CODES) {
    const opt1 = document.createElement('option');
    opt1.value = code;
    opt1.textContent = currencyLabel(code);
    fromSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = code;
    opt2.textContent = currencyLabel(code);
    toSelect.appendChild(opt2);
  }
  fromSelect.value = 'EUR';
  toSelect.value = 'GBP';
}

// Refresh option labels in place (keeping the current selection) when the
// language changes, instead of resetting back to the defaults.
function refreshCurrencyLabels() {
  const keepFrom = fromSelect.value;
  const keepTo = toSelect.value;
  document.querySelectorAll('#from-currency option, #to-currency option').forEach((opt) => {
    opt.textContent = currencyLabel(opt.value);
  });
  fromSelect.value = keepFrom;
  toSelect.value = keepTo;
}

let debounceTimer = null;
function scheduleConvert() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(convert, 300);
}

async function convert() {
  errorEl.textContent = '';
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount < 0) {
    resultCard.style.display = 'none';
    return;
  }

  if (from === to) {
    resultCard.style.display = 'block';
    resultEl.textContent = `${amount.toLocaleString()} ${from} = ${amount.toLocaleString()} ${to}`;
    rateDetailEl.textContent = window.t('currency_same');
    return;
  }

  resultCard.style.display = 'block';
  resultEl.innerHTML = `<span class="spinner"></span>${window.t('currency_converting')}`;
  rateDetailEl.textContent = '';

  try {
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${from}&to=${to}`);
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    const converted = data.rates[to];
    const rate = converted / amount;

    resultEl.textContent = `${amount.toLocaleString()} ${from} = ${converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${to}`;
    rateDetailEl.textContent = `1 ${from} = ${rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${to} · ${window.t('currency_rate_as_of')} ${data.date}`;
  } catch (err) {
    resultCard.style.display = 'none';
    errorEl.textContent = window.t('currency_error_fetch');
  }
}

swapBtn.addEventListener('click', () => {
  const tmp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tmp;
  convert();
});

amountInput.addEventListener('input', scheduleConvert);
fromSelect.addEventListener('change', convert);
toSelect.addEventListener('change', convert);

populateSelects();
convert();

// Refresh displayed text (e.g. "rates as of") when the language changes.
window.addEventListener('sd-lang-change', () => {
  refreshCurrencyLabels();
  convert();
});
