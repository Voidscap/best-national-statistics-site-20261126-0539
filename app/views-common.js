// Shared bits for the views: page head, stat cards, source note.
import { esc } from './charts.js';

export function pageHead(title, intro) {
  return `<header class="page-head"><h1>${esc(title)}</h1><p class="lede">${intro}</p></header>`;
}

export function statCard(label, value, unit, year, note) {
  return `<div class="stat"><div class="stat-label">${esc(label)}</div>
    <div class="stat-value">${esc(value)} <span class="stat-unit">${esc(unit)}</span></div>
    <div class="stat-meta">${esc(year)}${note ? ' · ' + esc(note) : ''}</div></div>`;
}

export function sourceNote(text) {
  return `<p class="source-note">Source: ${esc(text)}</p>`;
}

export function approxNote() {
  return sourceNote('Figures are rounded approximations from public sources (Statistics Bureau of Japan, OECD, World Bank, IMF). See Guide for sources and methods.');
}

export function card(title, body, extra = '') {
  return `<section class="card ${extra}"><h2>${esc(title)}</h2>${body}</section>`;
}
