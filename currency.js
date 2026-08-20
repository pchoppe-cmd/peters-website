// Currency Converter logic — uses the free frankfurter.app API (ECB reference rates)

const CURRENCIES = {
  AUD: "Australian Dollar", BRL: "Brazilian Real", CAD: "Canadian Dollar",
  CHF: "Swiss Franc", CNY: "Chinese Renminbi Yuan", CZK: "Czech Koruna",
  DKK: "Danish Krone", EUR: "Euro", GBP: "British Pound", HKD: "Hong Kong Dollar",
  HUF: "Hungarian Forint", IDR: "Indonesian Rupiah", ILS: "Israeli New Shekel",
  INR: "Indian Rupee", ISK: "Icelandic Krona", JPY: "Japanese Yen",
  KRW: "South Korean Won", MXN: "Mexican Peso", MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone", NZD: "New Zealand Dollar", PHP: "Philippine Peso",
  PLN: "Polish Zloty", RON: "Romanian Leu", SEK: "Swedish Krona",
  SGD: "Singapore Dollar", THB: "Thai Baht", TRY: "Turkish Lira",
  USD: "United States Dollar", ZAR: "South African Rand"
};

const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const swapBtn = document.getElementById('swap-btn');
const errorEl = document.getElementById('currency-error');
const resultCard = document.getElementById('result-card');
const resultEl = document.getElementById('conversion-result');
const rateDetailEl = document.getElementById('rate-detail');

function populateSelects() {
  for (const [code, name] of Object.entries(CURRENCIES)) {
    const opt1 = document.createElement('option');
    opt1.value = code;
    opt1.textContent = `${code} — ${name}`;
    fromSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = code;
    opt2.textContent = `${code} — ${name}`;
    toSelect.appendChild(opt2);
  }
  fromSelect.value = 'EUR';
  toSelect.value = 'GBP';
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
    rateDetailEl.textContent = 'Same currency — rate is 1:1';
    return;
  }

  resultCard.style.display = 'block';
  resultEl.innerHTML = '<span class="spinner"></span>Converting…';
  rateDetailEl.textContent = '';

  try {
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${from}&to=${to}`);
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    const converted = data.rates[to];
    const rate = converted / amount;

    resultEl.textContent = `${amount.toLocaleString()} ${from} = ${converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${to}`;
    rateDetailEl.textContent = `1 ${from} = ${rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${to} · rates as of ${data.date}`;
  } catch (err) {
    resultCard.style.display = 'none';
    errorEl.textContent = 'Could not fetch exchange rates. Check your internet connection and try again.';
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
