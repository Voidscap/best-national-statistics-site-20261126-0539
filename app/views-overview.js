// Overview: Japan at a glance.
import { COUNTRY, KEY_INDICATORS, POPULATION_SERIES, GDP_SECTORS } from './data.js';
import { lineChart, donut, esc } from './charts.js';
import { pageHead, statCard, card, approxNote } from './views-common.js';
import { num, pct } from './format.js';

export function render() {
  const cards = KEY_INDICATORS.map((k) =>
    statCard(k.label, k.id === 'gdpPc' ? num(k.value) : k.value, k.unit, k.year, k.note),
  ).join('');

  const popPoints = POPULATION_SERIES.map((p) => ({ year: p.year, v: p.pop }));
  const popChart = lineChart(popPoints, { label: 'Population 2000 to 2025, millions', decimals: 1, color: '#1b2a4a', min: 120, max: 130 });
  const sectorChart = donut(GDP_SECTORS, { center: '¥610T', centerSub: 'GDP 2024', label: 'GDP by sector, 2024' });
  const SECTOR_COLORS = ['#c8402a', '#1b2a4a', '#2a7f6f', '#c99a2b', '#7a6ba8'];
  const sectorList = GDP_SECTORS.map((s, i) => `<li><span class="dot" style="background:${SECTOR_COLORS[i % SECTOR_COLORS.length]}"></span>${esc(s.label)} — <strong>${pct(s.share, 0)}</strong></li>`).join('');

  return `
  ${pageHead('Japan in Numbers', `A plain-language tour of ${COUNTRY.name}'s official statistics — people, money, health and learning — with charts you can read at a glance and figures you can check. Last updated ${COUNTRY.updated}.`)}
  <div class="stat-grid">${cards}</div>
  <div class="two-col">
    ${card('Population is shrinking', `<p>Japan's population peaked in 2008 at about 128 million and has fallen every year since. The 2025 estimate is <strong>123.3 million</strong>.</p>${popChart}<p class="chart-note">Population in millions. Census years 2000–2020; 2021–2025 are estimates.</p>`)}
    ${card('What the economy is made of', `<div class="donut-wrap">${sectorChart}<ul class="legend">${sectorList}</ul></div><p>Services dominate the economy; manufacturing still makes up a fifth of output — unusually high for a rich country.</p>`)}
  </div>
  ${card('Three things to know first', `<ol class="numbered">
    <li><strong>Japan is the world's oldest large society.</strong> About 29% of people are 65 or older, and the median age is near 50.</li>
    <li><strong>It is also the world's longest-lived.</strong> Life expectancy is about 84 years — women 87.1, men 81.1.</li>
    <li><strong>Fewer children are being born than at any time on record.</strong> Births fell to about 720,000 in 2024 while deaths reached 1.62 million.</li>
  </ol>`)}
  <p class="nav-hint">Explore: <a href="#/population">Population</a> · <a href="#/economy">Economy</a> · <a href="#/health">Health</a> · <a href="#/education">Education</a> · <a href="#/compare">Compare countries</a></p>
  ${approxNote()}`;
}
