// Atlas router: hash pages, one file per section.
import { render as renderOverview } from './views-overview.js';
import { render as renderPopulation } from './views-population.js';
import { render as renderEconomy } from './views-economy.js';
import { render as renderHealth } from './views-health.js';
import { render as renderEducation } from './views-education.js';
import { render as renderCompare, bind as bindCompare } from './views-compare.js';
import { render as renderGuide } from './views-guide.js';
import { render as renderSettings, bind as bindSettings } from './views-settings.js';

const PAGES = {
  '': { title: 'Overview', render: renderOverview },
  'population': { title: 'Population', render: renderPopulation },
  'economy': { title: 'Economy', render: renderEconomy },
  'health': { title: 'Health', render: renderHealth },
  'education': { title: 'Education', render: renderEducation },
  'compare': { title: 'Compare', render: renderCompare, bind: bindCompare },
  'guide': { title: 'Guide', render: renderGuide },
  'settings': { title: 'Settings', render: renderSettings, bind: bindSettings },
};

const NAV = ['', 'population', 'economy', 'health', 'education', 'compare', 'guide', 'settings'];

function currentPage() {
  const hash = location.hash.replace(/^#\/?/, '').split('/')[0];
  return PAGES[hash] ? hash : '';
}

function render() {
  const key = currentPage();
  const page = PAGES[key];
  const app = document.getElementById('app');
  app.innerHTML = page.render();
  document.querySelectorAll('#site-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.page === key);
    if (a.dataset.page === key) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.title = `Atlas — ${page.title} · Japan in Numbers`;
  if (page.bind) page.bind();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
