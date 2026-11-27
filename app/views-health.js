// Health: how long people live, what they die of, what care costs.
import { HEALTH } from './data.js';
import { hbarChart, esc } from './charts.js';
import { pageHead, statCard, card, approxNote } from './views-common.js';
import { num, pct } from './format.js';

export function render() {
  const causeBars = hbarChart(HEALTH.causesOfDeath.map((c) => ({ label: c.cause, value: c.share })), { label: 'Causes of death by share, 2024', unit: '%', decimals: 1, labelW: 170 });
  const rows = [
    ['Life expectancy, women', '87.1 years', '2023'],
    ['Life expectancy, men', '81.1 years', '2023'],
    ['Health spending', '11.1% of GDP', '2023'],
    ['Hospital beds', '12.6 per 1,000 people', '2023'],
    ['Physicians', '2.6 per 1,000 people', '2023'],
    ['Infant mortality', '1.8 per 1,000 live births', '2023'],
    ['Adult obesity (BMI ≥ 30)', '4.5%', '2023'],
    ['Adults who smoke', '15.9%', '2023'],
  ].map(([a, b, c]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('');

  return `
  ${pageHead('Health', 'Japan lives longer than any other large country — about 84 years at birth — on health spending of roughly 11% of GDP, with more hospital beds per person than anywhere else in the OECD.')}
  <div class="stat-grid">
    ${statCard('Life expectancy', '84.0', 'years', '2023', 'women 87.1, men 81.1')}
    ${statCard('Health spending', '11.1', '% of GDP', '2023', 'about ¥68 trillion')}
    ${statCard('Hospital beds', '12.6', 'per 1,000 people', '2023', 'highest in the OECD')}
    ${statCard('Infant mortality', '1.8', 'per 1,000 births', '2023', 'among the lowest in the world')}
  </div>
  <div class="two-col">
    ${card('What people die of', `<p>Cancer is the leading cause of death, followed by heart disease. "Senility" — old age itself — is recorded for about one death in ten, a sign of how old the population is.</p>${causeBars}<p class="chart-note">Share of all deaths, 2024. Shares rounded; "Other" includes accidents, kidney disease and more.</p>`)}
    ${card('The system in numbers', `<table class="data-table"><thead><tr><th>Measure</th><th>Value</th><th>Year</th></tr></thead><tbody>${rows}</tbody></table><p>Everyone is covered by public health insurance, and patients typically pay 30% of the cost at the point of care (less for children and older people).</p>`)}
  </div>
  ${card('Two contrasts worth knowing', `<ol class="numbered">
    <li><strong>Long lives, long hospital stays.</strong> The average hospital stay is about 16 days — several times the OECD average — because hospitals also serve as long-term care for older patients.</li>
    <li><strong>Thin but long-lived.</strong> Adult obesity is about 4.5%, the lowest in the OECD, while smoking has fallen from over 30% in the 1990s to about 16% today.</li>
  </ol>`)}
  ${approxNote()}`;
}
