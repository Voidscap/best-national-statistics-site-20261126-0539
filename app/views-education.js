// Education: attainment, school results, what it costs.
import { EDUCATION } from './data.js';
import { hbarChart, esc } from './charts.js';
import { pageHead, statCard, card, approxNote } from './views-common.js';
import { num, pct } from './format.js';

export function render() {
  const pisaBars = hbarChart(
    EDUCATION.pisa.map((p) => ({ label: p.subject, value: p.score, highlight: true })),
    { label: 'PISA 2022 scores', max: 600, labelW: 110 },
  );
  const attainmentBars = hbarChart(
    EDUCATION.attainment.map((a) => ({ label: a.level, value: a.share })),
    { label: 'Highest qualification, age 25 to 64', unit: '%', labelW: 190 },
  );

  return `
  ${pageHead('Education', 'Nearly everyone finishes school, six in ten young adults hold a degree, and 15-year-olds score near the top of the world in maths and science.')}
  <div class="stat-grid">
    ${statCard('Literacy', '99', '%', '2023', 'effectively universal')}
    ${statCard('Tertiary degree, age 25–34', '62', '%', '2023', 'up from 48% in 2000')}
    ${statCard('Public spending on education', '3.1', '% of GDP', '2023', 'below the OECD average of ~4%')}
    ${statCard('Pupils per teacher, primary', '16', 'pupils', '2023', 'OECD average is 15')}
  </div>
  <div class="two-col">
    ${card('PISA 2022: near the top of the world', `<p>Japanese 15-year-olds scored well above the OECD average in all three subjects tested — and were first among large countries in mathematics.</p>${pisaBars}<p class="chart-note">PISA scores, 2022. OECD average across the three subjects is about ${EDUCATION.pisaOecdAvg}.</p>`)}
    ${card('What adults studied', `<p>About a third of adults aged 25–64 hold a bachelor's degree; another fifth hold a shorter tertiary qualification.</p>${attainmentBars}<p class="chart-note">Highest qualification, ages 25–64, 2023. Shares rounded.</p>`)}
  </div>
  ${card('How schooling works', `<ol class="numbered">
    <li><strong>School is compulsory for nine years</strong> (ages 6–15); almost everyone then continues to three years of high school.</li>
    <li><strong>University entry is fiercely competitive.</strong> About half of high-school graduates go on to university, and entrance exams shape the final school years.</li>
    <li><strong>Teachers stay with a class.</strong> In primary school one teacher usually teaches all subjects to the same class for the year, and pupils clean their own classrooms.</li>
  </ol>`)}
  ${approxNote()}`;
}
