// Economy: output, jobs, prices, trade.
import { GDP_SERIES, GDP_SECTORS, UNEMPLOYMENT_SERIES, INFLATION_SERIES, TRADE } from './data.js';
import { lineChart, donut, hbarChart, esc } from './charts.js';
import { pageHead, statCard, card, approxNote } from './views-common.js';
import { getState } from './store.js';
import { num, pct } from './format.js';

function gdpLabel() {
  const c = getState().currency;
  return c === 'yen' ? 'GDP, trillion yen' : 'GDP, trillion yen (≈ US$4.03T in 2024)';
}

export function render() {
  const gdpPoints = GDP_SERIES.map((g) => ({ year: g.year, v: g.yen }));
  const gdpChart = lineChart(gdpPoints, { label: 'Nominal GDP, trillion yen, 2015 to 2024', color: '#1b2a4a', min: 500, max: 620 });
  const sectorChart = donut(GDP_SECTORS, { center: '70%', centerSub: 'services', label: 'GDP by sector, 2024' });
  const jobsPoints = UNEMPLOYMENT_SERIES.map((u) => ({ year: u.year, v: u.v }));
  const jobsChart = lineChart(jobsPoints, { label: 'Unemployment rate, percent, 2015 to 2024', color: '#2a7f6f', decimals: 1, min: 2.0, max: 3.6 });
  const cpiPoints = INFLATION_SERIES.map((u) => ({ year: u.year, v: u.v }));
  const cpiChart = lineChart(cpiPoints, { label: 'Consumer price inflation, percent, 2015 to 2024', color: '#c8402a', decimals: 1, min: -0.5, max: 3.5 });
  const exportBars = hbarChart(TRADE.topExports.map((e) => ({ label: e.item, value: e.share })), { label: 'Top exports by share, 2024', unit: '%', decimals: 1 });
  const partnerBars = hbarChart(TRADE.topPartners.map((e) => ({ label: e.country, value: e.share })), { label: 'Top trading partners by share of exports, 2024', unit: '%', decimals: 1, color: '#2a7f6f' });

  return `
  ${pageHead('Economy', 'The world’s fourth-largest economy by nominal GDP — about ¥610 trillion in 2024 — with unemployment near 2.5% and inflation back after decades of flat prices.')}
  <div class="stat-grid">
    ${statCard('GDP (nominal)', '¥610T', '≈ US$4.03T', '2024', '4th largest in the world')}
    ${statCard('GDP per capita', '$32,900', 'nominal', '2024', 'about ¥5.0 million')}
    ${statCard('Unemployment', '2.5', '%', '2024', 'lowest in the G7')}
    ${statCard('Exports minus imports', '−$32B', 'trade balance', '2024', 'exports $698B, imports $730B')}
  </div>
  <div class="two-col">
    ${card('Output, 2015–2024', `<p>Nominal GDP dipped with COVID-19 in 2020, then rose on a weak yen and higher prices. ${esc(gdpLabel())}.</p>${gdpChart}<p class="chart-note">Nominal GDP in trillion yen. Change the currency display in <a href="#/settings">Settings</a>.</p>`)}
    ${card('What the economy is made of', `<div class="donut-wrap">${sectorChart}</div><p>Services are about 70% of output. Manufacturing — cars, machinery, electronics — is still a fifth, far above most rich countries.</p>`)}
  </div>
  <div class="two-col">
    ${card('Jobs: unemployment near record lows', `${jobsChart}<p>Unemployment has sat between 2.4% and 2.8% for a decade. The labour force is about 69 million; one in seven workers is 65 or older.</p>`)}
    ${card('Prices: inflation is back', `${cpiChart}<p>After years near zero, consumer prices rose 2.5% in 2022 and 3.3% in 2023 — the fastest in four decades — before easing to 2.7% in 2024.</p>`)}
  </div>
  <div class="two-col">
    ${card('Top exports', `${exportBars}<p class="chart-note">Share of total exports by value, 2024.</p>`)}
    ${card('Top trading partners', `${partnerBars}<p class="chart-note">Share of total exports by destination, 2024.</p>`)}
  </div>
  ${approxNote()}`;
}
