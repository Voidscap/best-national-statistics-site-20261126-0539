// State saved in the browser's local storage: compare picks and display prefs.
const KEY = 'atlas-natstat-v1';
const DEFAULTS = {
  compareCountryA: 'Germany',
  compareCountryB: 'United States',
  compareIndicator: 'life',
  currency: 'usd', // 'usd' or 'yen' for GDP figures
  notes: [],
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

let state = load();

export function getState() {
  return state;
}
export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // storage unavailable: the site still works for this visit
  }
}
export function setCompare(a, b, indicator) {
  state.compareCountryA = a;
  state.compareCountryB = b;
  state.compareIndicator = indicator;
  save();
}
export function setCurrency(c) {
  state.currency = c === 'yen' ? 'yen' : 'usd';
  save();
}
export function addNote(text) {
  const t = String(text || '').trim();
  if (!t) return;
  state.notes.push({ text: t, at: new Date().toISOString().slice(0, 10) });
  save();
}
export function removeNote(i) {
  state.notes.splice(i, 1);
  save();
}
export function resetAll() {
  state = { ...DEFAULTS };
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
