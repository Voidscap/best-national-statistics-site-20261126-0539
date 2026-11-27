// Compare: pick two countries and one indicator, see the bars; the full table below.
import { COMPARE_COUNTRIES, COMPARE_INDICATORS } from './data.js';
import { hbarChart, esc } from './charts.js';
import { pageHead, card, approxNote } from './views-common.js';
import { getState, setCompare } from './store.js';
import { num } from './format.js';

export function render() {
  const st = getState();
  const ind = COMPARE_INDICATORS.find((i) => i.id === st.compareIndicator) || COMPARE_INDICATORS[0];
  const a = st.compareCountryA, b = st.compareCountryB;
  const rows = [
    { label: a, value: ind.values[a], highlight: true },
    { label: b, value: ind.values[b], highlight: false },
  ];
  const chart = hbarChart(rows, { label: `${ind.label}: ${a} vs ${b}`, decimals: ind.id === 'gdpPc' ? 0 : 1, labelW: 120, color: '#2a7f6f' });
  const opt = (list, sel) => list.map((c) => `<option value="${esc(c)}" ${c === sel ? 'selected' : ''}>${esc(c)}</option>`).join('');
  const indOpt = COMPARE_INDICATORS.map((i) => `<option value="${esc(i.id)}" ${i.id === ind.id ? 'selected' : ''}>${esc(i.label)}</option>`).join('');

  const head = `<tr><th>Indicator (2024)</th>${COMPARE_COUNTRIES.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>`;
  const body = COMPARE_INDICATORS.map((i) => {
    const cells = COMPARE_COUNTRIES.map((c) => {
      const v = i.values[c];
      const best = i.higherBetter === true ? v === Math.max(...Object.values(i.values)) : i.higherBetter === false ? v === Math.min(...Object.values(i.values)) : false;
      return `<td${best ? ' class="best"' : ''}>${num(v, i.id === 'fertility' || i.id === 'life' ? 2 : i.id === 'population' ? 1 : 0)}</td>`;
    }).join('');
    return `<tr><td>${esc(i.label)}</td>${cells}</tr>`;
  }).join('');

  return `
  ${pageHead('Compare Countries', 'Japan against four other large economies on the same six measures. Pick any two countries and one indicator — your picks are saved on this device.')}
  <div class="card">
    <h2>Head to head</h2>
    <form id="compare-form" class="compare-form">
      <label>Country A <select id="cmp-a" name="a">${opt(COMPARE_COUNTRIES, a)}</select></label>
      <label>Country B <select id="cmp-b" name="b">${opt(COMPARE_COUNTRIES, b)}</select></label>
      <label>Indicator <select id="cmp-i" name="i">${indOpt}</select></label>
      <button type="submit" class="btn">Compare</button>
    </form>
    ${chart}
    <p class="chart-note">${esc(ind.label)} — ${esc(a)} vs ${esc(b)}, 2024 approximations.</p>
  </div>
  ${card('The full table', `<p>The bold figure in a row is the best of the five on that measure (where "best" has a clear meaning).</p>
  <div class="table-scroll"><table class="data-table"><thead>${head}</thead><tbody>${body}</tbody></table></div>`)}
  ${approxNote()}`;
}

// Wire the form after the view is in the page.
export function bind() {
  const form = document.getElementById('compare-form');
  if (!form) return;
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const a = document.getElementById('cmp-a').value;
    const b = document.getElementById('cmp-b').value;
    const i = document.getElementById('cmp-i').value;
    if (a === b) {
      alert('Pick two different countries to compare.');
      return;
    }
    setCompare(a, b, i);
    location.hash = '#/compare';
    window.dispatchEvent(new Event('hashchange'));
  });
}
