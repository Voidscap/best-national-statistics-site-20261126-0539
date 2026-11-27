// Population: age structure, births and deaths, where people live.
import { AGE_BANDS, BIRTHS_DEATHS, PREFECTURES, POPULATION_SERIES } from './data.js';
import { pyramid, lineChart, esc } from './charts.js';
import { pageHead, statCard, card, approxNote } from './views-common.js';
import { num, pct } from './format.js';

export function render() {
  const pyramidChart = pyramid(AGE_BANDS, { label: 'Population by five-year age band, 2025, percent of population' });
  const births = BIRTHS_DEATHS.map((d) => ({ year: d.year, v: d.births }));
  const deaths = BIRTHS_DEATHS.map((d) => ({ year: d.year, v: d.deaths }));
  const birthsChart = lineChart(births, { label: 'Live births per year, thousands', color: '#2a7f6f', min: 600, max: 1100 });
  const deathsChart = lineChart(deaths, { label: 'Deaths per year, thousands', color: '#c8402a', min: 1200, max: 1700 });
  const rows = PREFECTURES.map((p) => `<tr><td>${esc(p.name)}</td><td>${num(p.pop, 1)}</td><td>${pct(p.share)}</td></tr>`).join('');
  const total65 = AGE_BANDS.filter((b) => parseInt(b.band, 10) >= 65 || b.band === '85+').reduce((a, b) => a + b.share, 0);

  return `
  ${pageHead('Population', '123.3 million people in 2025 — and an age structure no other large country has. The pyramid below is upside down: the oldest bands are the widest.')}
  <div class="stat-grid">
    ${statCard('Population, 2025', '123.3', 'million', '2025', 'down from a 128.1m peak in 2010')}
    ${statCard('Aged 65+', pct(total65), 'of everyone', '2025', 'about 36 million people')}
    ${statCard('Median age', '49.5', 'years', '2025', 'the highest of any large country')}
    ${statCard('Births minus deaths, 2024', '−900k', 'people', '2024', '720k births, 1.62m deaths')}
  </div>
  <div class="two-col">
    ${card('Age structure, 2025', `<p>Each bar is the share of the population in a five-year age band. The bulge at 50–59 is the second baby-boom generation (born 1971–74); the narrow base is the low birth rate.</p>${pyramidChart}<p class="chart-note">Share of total population, %. Left and right bars are the same values shown twice for the pyramid shape.</p>`)}
    ${card('Births are falling, deaths rising', `<p>Births have fallen in 9 of the last 10 years. Deaths rise as the large post-war generations age.</p><h3>Live births (thousands)</h3>${birthsChart}<h3>Deaths (thousands)</h3>${deathsChart}`)}
  </div>
  ${card('Where people live — ten largest prefectures', `<p>About 29% of Japan lives in the three prefectures of Greater Tokyo (Tokyo, Kanagawa, Saitama, Chiba). The ten largest prefectures hold two-thirds of the country.</p>
  <table class="data-table"><thead><tr><th>Prefecture</th><th>Population (m)</th><th>Share of Japan</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="chart-note">Population in millions, 2024 estimates; shares rounded.</p>`)}
  ${approxNote()}`;
}
