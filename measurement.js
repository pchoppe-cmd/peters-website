// Measurement / Unit Converter logic

const UNIT_CATEGORIES = {
  length: {
    label: 'Length',
    // factors convert 1 unit -> meters (the base unit)
    units: {
      mile: { label: 'Miles', factor: 1609.344 },
      kilometer: { label: 'Kilometers', factor: 1000 },
      meter: { label: 'Meters', factor: 1 },
      centimeter: { label: 'Centimeters', factor: 0.01 },
      millimeter: { label: 'Millimeters', factor: 0.001 },
      yard: { label: 'Yards', factor: 0.9144 },
      foot: { label: 'Feet', factor: 0.3048 },
      inch: { label: 'Inches', factor: 0.0254 },
    },
    defaultFrom: 'mile',
    defaultTo: 'kilometer',
  },
  weight: {
    label: 'Weight',
    // factors convert 1 unit -> grams (the base unit)
    units: {
      kilogram: { label: 'Kilograms', factor: 1000 },
      gram: { label: 'Grams', factor: 1 },
      milligram: { label: 'Milligrams', factor: 0.001 },
      pound: { label: 'Pounds', factor: 453.59237 },
      ounce: { label: 'Ounces', factor: 28.349523125 },
      stone: { label: 'Stone', factor: 6350.29318 },
      tonne: { label: 'Metric tonnes', factor: 1000000 },
    },
    defaultFrom: 'kilogram',
    defaultTo: 'pound',
  },
  temperature: {
    label: 'Temperature',
    units: {
      celsius: { label: 'Celsius (°C)' },
      fahrenheit: { label: 'Fahrenheit (°F)' },
      kelvin: { label: 'Kelvin (K)' },
    },
    defaultFrom: 'celsius',
    defaultTo: 'fahrenheit',
  },
  volume: {
    label: 'Volume',
    // factors convert 1 unit -> liters (the base unit)
    units: {
      liter: { label: 'Liters', factor: 1 },
      milliliter: { label: 'Milliliters', factor: 0.001 },
      gallon_us: { label: 'Gallons (US)', factor: 3.785411784 },
      quart_us: { label: 'Quarts (US)', factor: 0.946352946 },
      pint_us: { label: 'Pints (US)', factor: 0.473176473 },
      cup_us: { label: 'Cups (US)', factor: 0.2365882365 },
      fluid_ounce_us: { label: 'Fluid ounces (US)', factor: 0.0295735295625 },
      gallon_uk: { label: 'Gallons (UK)', factor: 4.54609 },
      pint_uk: { label: 'Pints (UK)', factor: 0.56826125 },
      fluid_ounce_uk: { label: 'Fluid ounces (UK)', factor: 0.0284130625 },
    },
    defaultFrom: 'liter',
    defaultTo: 'gallon_uk',
  },
  speed: {
    label: 'Speed',
    // factors convert 1 unit -> km/h (the base unit)
    units: {
      kmh: { label: 'km/h', factor: 1 },
      mph: { label: 'mph', factor: 1.609344 },
      ms: { label: 'm/s', factor: 3.6 },
      knot: { label: 'Knots', factor: 1.852 },
    },
    defaultFrom: 'mph',
    defaultTo: 'kmh',
  },
};

const categoryTabs = document.getElementById('unit-category-tabs');
const valueInput = document.getElementById('unit-value');
const fromSelect = document.getElementById('unit-from');
const toSelect = document.getElementById('unit-to');
const swapBtn = document.getElementById('unit-swap-btn');
const errorEl = document.getElementById('unit-error');
const resultCard = document.getElementById('unit-result-card');
const resultEl = document.getElementById('unit-result');
const rateDetailEl = document.getElementById('unit-rate-detail');

let currentCategory = 'volume';

function toCelsius(value, unit) {
  if (unit === 'celsius') return value;
  if (unit === 'fahrenheit') return (value - 32) * (5 / 9);
  if (unit === 'kelvin') return value - 273.15;
}

function fromCelsius(value, unit) {
  if (unit === 'celsius') return value;
  if (unit === 'fahrenheit') return value * (9 / 5) + 32;
  if (unit === 'kelvin') return value + 273.15;
}

function convertValue(value, fromUnit, toUnit, category) {
  if (category === 'temperature') {
    return fromCelsius(toCelsius(value, fromUnit), toUnit);
  }
  const units = UNIT_CATEGORIES[category].units;
  const baseValue = value * units[fromUnit].factor;
  return baseValue / units[toUnit].factor;
}

function populateUnitSelects(category) {
  const { units, defaultFrom, defaultTo } = UNIT_CATEGORIES[category];
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';
  for (const [key, def] of Object.entries(units)) {
    const opt1 = document.createElement('option');
    opt1.value = key;
    opt1.textContent = def.label;
    fromSelect.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = key;
    opt2.textContent = def.label;
    toSelect.appendChild(opt2);
  }
  fromSelect.value = defaultFrom;
  toSelect.value = defaultTo;
}

function runConvert() {
  errorEl.textContent = '';
  const raw = valueInput.value;
  const value = parseFloat(raw);
  if (raw === '' || isNaN(value)) {
    resultCard.style.display = 'none';
    return;
  }

  const fromUnit = fromSelect.value;
  const toUnit = toSelect.value;
  const result = convertValue(value, fromUnit, toUnit, currentCategory);
  const fromLabel = UNIT_CATEGORIES[currentCategory].units[fromUnit].label;
  const toLabel = UNIT_CATEGORIES[currentCategory].units[toUnit].label;

  resultCard.style.display = 'block';
  resultEl.innerHTML = `
    <div class="result-from">${value.toLocaleString()} ${fromLabel} =</div>
    <div class="result-to">${result.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${toLabel}</div>
  `;

  if (fromUnit === toUnit) {
    rateDetailEl.textContent = 'Same unit — value is unchanged';
  } else if (currentCategory === 'temperature') {
    rateDetailEl.textContent = '';
  } else {
    const oneUnitResult = convertValue(1, fromUnit, toUnit, currentCategory);
    rateDetailEl.textContent = `1 ${fromLabel} = ${oneUnitResult.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${toLabel}`;
  }
}

function switchCategory(category) {
  currentCategory = category;
  for (const btn of categoryTabs.querySelectorAll('button')) {
    btn.classList.toggle('active', btn.dataset.category === category);
  }
  populateUnitSelects(category);
  runConvert();
}

categoryTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-category]');
  if (!btn) return;
  switchCategory(btn.dataset.category);
});

swapBtn.addEventListener('click', () => {
  const tmp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tmp;
  runConvert();
});

valueInput.addEventListener('input', runConvert);
fromSelect.addEventListener('change', runConvert);
toSelect.addEventListener('change', runConvert);

populateUnitSelects(currentCategory);
runConvert();
