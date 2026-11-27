// Guide: how to read the numbers, where they come from, what they mean.
import { pageHead, card, approxNote } from './views-common.js';
import { esc } from './charts.js';

export function render() {
  return `
  ${pageHead('Guide', 'How to read this site: what each number means, where it comes from, and the honest limits of rounded public figures.')}
  ${card('Reading the figures', `<ol class="numbered">
    <li><strong>Every figure is labelled with its year.</strong> A number without a year is a number you cannot trust — so each card shows one.</li>
    <li><strong>Figures are rounded.</strong> Population is shown to one decimal place, shares to whole or one-decimal percent. Rounding means small parts may not add to exactly 100.</li>
    <li><strong>"Approximate" means what it says.</strong> The figures here are public, well-known values rounded for readability — close to the official releases, not a substitute for them. For decisions, check the source.</li>
    <li><strong>Per-person figures beat totals.</strong> A big country will always have a bigger GDP; GDP per person, beds per 1,000 people and rates per 1,000 births are the fair comparisons.</li>
  </ol>`)}
  ${card('Sources and methods', `<table class="data-table"><thead><tr><th>Topic</th><th>Main source</th><th>Notes</th></tr></thead><tbody>
    <tr><td>Population &amp; age</td><td>Statistics Bureau of Japan — Population Census &amp; estimates</td><td>Census every 5 years; yearly estimates in between</td></tr>
    <tr><td>Births, deaths, fertility</td><td>Ministry of Health, Labour and Welfare — Vital Statistics</td><td>Final figures published the following year</td></tr>
    <tr><td>GDP &amp; trade</td><td>Cabinet Office — National Accounts; Ministry of Finance — Trade Statistics</td><td>Nominal yen; US$ at the year's average rate</td></tr>
    <tr><td>Jobs &amp; prices</td><td>Statistics Bureau — Labour Force Survey; Consumer Price Index</td><td>Unemployment is seasonally adjusted</td></tr>
    <tr><td>Health</td><td>OECD Health Statistics; Ministry of Health, Labour and Welfare</td><td>Spending is current health expenditure</td></tr>
    <tr><td>Education</td><td>OECD Education at a Glance; PISA 2022</td><td>PISA tests 15-year-olds every three years</td></tr>
    <tr><td>Cross-country</td><td>World Bank, IMF, OECD</td><td>2024 approximations, rounded</td></tr>
  </tbody></table>`)}
  ${card('Glossary', `<dl class="glossary">
    <dt>Nominal GDP</dt><dd>The value of everything produced, at current prices — not adjusted for inflation.</dd>
    <dt>GDP per capita</dt><dd>GDP divided by the population: a rough gauge of average income.</dd>
    <dt>Fertility rate</dt><dd>The average number of children a woman would have in her lifetime at current birth rates. Below 2.1, a population shrinks without immigration.</dd>
    <dt>Median age</dt><dd>The age that splits the population in half — half older, half younger.</dd>
    <dt>PISA</dt><dd>The OECD's test of 15-year-olds in reading, mathematics and science, run every three years.</dd>
    <dt>Seasonally adjusted</dt><dd>A figure with regular seasonal ups and downs removed, so months can be compared fairly.</dd>
  </dl>`)}
  ${approxNote()}`;
}
