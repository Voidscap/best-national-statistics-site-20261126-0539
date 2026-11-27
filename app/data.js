// Atlas data: Japan in numbers. Figures are rounded approximations from public
// sources (Statistics Bureau of Japan, OECD, World Bank, IMF) for the years shown;
// see the Guide page for sources and methods. Nothing here is fetched live.
export const COUNTRY = {
  name: 'Japan',
  code: 'JPN',
  capital: 'Tokyo',
  region: 'East Asia',
  areaKm2: 377975,
  updated: 'November 2026',
};

export const KEY_INDICATORS = [
  { id: 'population', label: 'Population', value: 123.3, unit: 'million', year: 2025, note: 'falling ~0.6m a year' },
  { id: 'gdp', label: 'GDP (nominal)', value: 4.03, unit: 'US$ trillion', year: 2024, note: '¥610 trillion' },
  { id: 'gdpPc', label: 'GDP per capita', value: 32900, unit: 'US$', year: 2024, note: 'nominal' },
  { id: 'life', label: 'Life expectancy', value: 84.0, unit: 'years', year: 2023, note: 'women 87.1, men 81.1' },
  { id: 'unemployment', label: 'Unemployment', value: 2.5, unit: '%', year: 2024, note: 'among the lowest in the OECD' },
  { id: 'fertility', label: 'Fertility rate', value: 1.15, unit: 'children per woman', year: 2024, note: 'record low' },
];

// Population, millions, 2000–2025 (census years exact-ish, others estimates)
export const POPULATION_SERIES = [
  { year: 2000, pop: 126.9 }, { year: 2005, pop: 127.8 }, { year: 2010, pop: 128.1 },
  { year: 2015, pop: 127.1 }, { year: 2020, pop: 126.1 }, { year: 2021, pop: 125.5 },
  { year: 2022, pop: 124.9 }, { year: 2023, pop: 124.4 }, { year: 2024, pop: 123.9 },
  { year: 2025, pop: 123.3 },
];

// Age structure 2025, share of population in %
export const AGE_BANDS = [
  { band: '0–4', share: 3.4 }, { band: '5–9', share: 3.9 }, { band: '10–14', share: 4.3 },
  { band: '15–19', share: 4.6 }, { band: '20–24', share: 5.0 }, { band: '25–29', share: 5.2 },
  { band: '30–34', share: 5.6 }, { band: '35–39', share: 6.0 }, { band: '40–44', share: 6.6 },
  { band: '45–49', share: 6.6 }, { band: '50–54', share: 6.7 }, { band: '55–59', share: 6.9 },
  { band: '60–64', share: 6.0 }, { band: '65–69', share: 6.5 }, { band: '70–74', share: 6.4 },
  { band: '75–79', share: 5.8 }, { band: '80–84', share: 5.0 }, { band: '85+', share: 5.5 },
];

export const BIRTHS_DEATHS = [
  { year: 2015, births: 1006, deaths: 1291 }, { year: 2017, births: 946, deaths: 1341 },
  { year: 2019, births: 865, deaths: 1381 }, { year: 2021, births: 812, deaths: 1440 },
  { year: 2022, births: 777, deaths: 1569 }, { year: 2023, births: 759, deaths: 1591 },
  { year: 2024, births: 720, deaths: 1620 },
];

export const PREFECTURES = [
  { name: 'Tokyo', pop: 14.1, share: 11.4 }, { name: 'Kanagawa', pop: 9.2, share: 7.5 },
  { name: 'Osaka', pop: 8.8, share: 7.1 }, { name: 'Aichi', pop: 7.5, share: 6.1 },
  { name: 'Saitama', pop: 7.3, share: 5.9 }, { name: 'Chiba', pop: 6.3, share: 5.1 },
  { name: 'Hyogo', pop: 5.4, share: 4.4 }, { name: 'Hokkaido', pop: 5.1, share: 4.2 },
  { name: 'Fukuoka', pop: 5.1, share: 4.1 }, { name: 'Shizuoka', pop: 3.5, share: 2.9 },
];

// GDP, nominal, trillion yen
export const GDP_SERIES = [
  { year: 2015, yen: 532 }, { year: 2016, yen: 536 }, { year: 2017, yen: 545 },
  { year: 2018, yen: 549 }, { year: 2019, yen: 552 }, { year: 2020, yen: 527 },
  { year: 2021, yen: 546 }, { year: 2022, yen: 561 }, { year: 2023, yen: 593 },
  { year: 2024, yen: 610 },
];

export const GDP_SECTORS = [
  { label: 'Services', share: 70 }, { label: 'Manufacturing', share: 20 },
  { label: 'Construction', share: 6 }, { label: 'Other industry', share: 3 },
  { label: 'Agriculture & fishing', share: 1 },
];

export const UNEMPLOYMENT_SERIES = [
  { year: 2015, v: 3.4 }, { year: 2016, v: 3.1 }, { year: 2017, v: 2.8 },
  { year: 2018, v: 2.4 }, { year: 2019, v: 2.4 }, { year: 2020, v: 2.8 },
  { year: 2021, v: 2.8 }, { year: 2022, v: 2.6 }, { year: 2023, v: 2.6 },
  { year: 2024, v: 2.5 },
];

export const INFLATION_SERIES = [
  { year: 2015, v: 0.8 }, { year: 2016, v: -0.1 }, { year: 2017, v: 0.5 },
  { year: 2018, v: 1.0 }, { year: 2019, v: 0.5 }, { year: 2020, v: 0.0 },
  { year: 2021, v: -0.2 }, { year: 2022, v: 2.5 }, { year: 2023, v: 3.3 },
  { year: 2024, v: 2.7 },
];

export const TRADE = {
  exportsUsdB: 698, importsUsdB: 730, year: 2024,
  topExports: [
    { item: 'Motor vehicles', share: 13.9 }, { item: 'Machinery & parts', share: 13.2 },
    { item: 'Electrical machinery', share: 12.8 }, { item: 'Chemicals', share: 9.1 },
    { item: 'Iron & steel', share: 4.6 },
  ],
  topPartners: [
    { country: 'United States', share: 20.0 }, { country: 'China', share: 17.6 },
    { country: 'South Korea', share: 7.0 }, { country: 'Taiwan', share: 6.0 },
    { country: 'Thailand', share: 4.1 },
  ],
};

export const HEALTH = {
  spendingPctGdp: 11.1, bedsPer1000: 12.6, physiciansPer1000: 2.6,
  infantMortality: 1.8, obesityPct: 4.5, smokingPct: 15.9, year: 2023,
  lifeMale: 81.1, lifeFemale: 87.1,
  causesOfDeath: [
    { cause: 'Cancer', share: 27.4 }, { cause: 'Heart disease', share: 15.0 },
    { cause: 'Cerebrovascular disease', share: 7.6 }, { cause: 'Pneumonia', share: 5.8 },
    { cause: 'Senility (old age)', share: 10.7 }, { cause: 'Other', share: 33.5 },
  ],
};

export const EDUCATION = {
  literacyPct: 99, tertiaryPct25_34: 62, spendingPctGdp: 3.1,
  pupilsPerTeacher: 16, year: 2023,
  pisa: [
    { subject: 'Mathematics', score: 536 }, { subject: 'Reading', score: 516 },
    { subject: 'Science', score: 547 },
  ],
  pisaOecdAvg: 472,
  attainment: [
    { level: 'Upper secondary or below', share: 34 }, { level: 'Short-cycle tertiary', share: 21 },
    { level: "Bachelor's or equivalent", share: 35 }, { level: "Master's / doctorate", share: 10 },
  ],
};

// Cross-country comparison, 2024 approximations
export const COMPARE_COUNTRIES = ['Japan', 'Germany', 'South Korea', 'United States', 'United Kingdom'];
export const COMPARE_INDICATORS = [
  { id: 'population', label: 'Population (millions)', values: { Japan: 123.3, Germany: 84.7, 'South Korea': 51.7, 'United States': 340.1, 'United Kingdom': 69.3 }, higherBetter: null },
  { id: 'life', label: 'Life expectancy (years)', values: { Japan: 84.0, Germany: 81.2, 'South Korea': 83.5, 'United States': 79.1, 'United Kingdom': 80.9 }, higherBetter: true },
  { id: 'gdpPc', label: 'GDP per capita (US$)', values: { Japan: 32900, Germany: 54300, 'South Korea': 32900, 'United States': 86600, 'United Kingdom': 49500 }, higherBetter: true },
  { id: 'fertility', label: 'Fertility rate', values: { Japan: 1.15, Germany: 1.35, 'South Korea': 0.75, 'United States': 1.62, 'United Kingdom': 1.44 }, higherBetter: null },
  { id: 'unemployment', label: 'Unemployment (%)', values: { Japan: 2.5, Germany: 3.4, 'South Korea': 2.8, 'United States': 4.0, 'United Kingdom': 4.3 }, higherBetter: false },
  { id: 'tertiary', label: 'Tertiary attainment, age 25–34 (%)', values: { Japan: 62, Germany: 38, 'South Korea': 69, 'United States': 53, 'United Kingdom': 58 }, higherBetter: true },
];
