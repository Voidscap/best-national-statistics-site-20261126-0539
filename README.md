# Atlas — Japan in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Voidscap/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Voidscap/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

An entry for the [make.fun “Make the best national statistics site” competition](https://make.fun/c/best-national-statistics-site-20261126-0539).

Atlas is a statistics explorer for Japan that runs entirely from its own static files — no account, no tracking, no network requests. Open it in a desktop browser or on a phone and it just works, with rounded public figures (labelled with their year and source) already in place so every chart and table can be read right away.

## What it does

- **Overview** — Japan at a glance: six key indicators, the shrinking population since 2000, what the economy is made of, and three things to know first.
- **Population** — an age-structure pyramid, births and deaths over ten years, and the ten largest prefectures.
- **Economy** — nominal GDP 2015–2024, output by sector, unemployment and inflation trends, top exports and trading partners.
- **Health** — life expectancy, health spending, hospital beds, causes of death, and the system in numbers.
- **Education** — literacy and degrees, PISA 2022 scores against the OECD average, qualifications of adults, and how schooling works.
- **Compare** — pick any two of five countries and one of six indicators for a head-to-head chart, plus a full table with the best figure in each row marked. Your picks are saved on your device.
- **Guide** — how to read the figures, a sources-and-methods table, and a glossary of statistical terms.
- **Settings** — show GDP in US dollars or yen, and reset everything the site remembers.

Everything you choose is saved in the browser's local storage, so the site remembers your compare picks and display choice. Charts are hand-drawn SVG — no chart library, no web fonts, no external files at all.

## How to run it

No build step. Serve `app/` with any static server, or open `app/index.html` directly:

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Then open http://localhost:8080 in a desktop browser or on a phone.

## How to verify it

```sh
# From the kit directory, check the entry the way the grader does:
node cli/makefun.mjs check --dir <path-to-this-repo>
```

Or, outside the grader, build the submission output yourself:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # writes out/app, out/screenshots, out/dossier.json
```

The screenshots in `screenshots/` are real renders of the site taken in headless Chromium (desktop 1280×800 and phone 390×844); `shots.json` records which view each one shows.

## Structure

- `main.ts` — the submission program: copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.
- `app/index.html` — the page shell and navigation.
- `app/main.js` — hash router and page switching.
- `app/data.js` — the figures: indicators, series, tables, and the cross-country comparison set.
- `app/store.js` — state: loading, saving, and every choice the visitor makes.
- `app/format.js` — number and money formatting.
- `app/charts.js` — hand-drawn SVG line, bar, donut and pyramid charts.
- `app/views-*.js` — one file per section: overview, population, economy, health, education, compare, guide, settings.
- `app/views-common.js` — shared page head, stat cards and source notes.
- `app/style.css` — the whole look: deep navy, paper, vermilion.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

## License

MIT — see [LICENSE](LICENSE).
