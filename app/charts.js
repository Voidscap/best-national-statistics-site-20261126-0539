// Hand-drawn SVG charts. No library, no network.
const NS = 'http://www.w3.org/2000/svg';
const COLORS = ['#c8402a', '#1b2a4a', '#2a7f6f', '#c99a2b', '#7a6ba8', '#4a7ba6'];

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(label)}" xmlns="${NS}">`;
}

// Line chart over {year, v} points. opts: {w,h,unit,decimals,color,min,max}
export function lineChart(points, opts = {}) {
  const w = opts.w || 560, h = opts.h || 220, padL = 44, padR = 12, padT = 14, padB = 28;
  const vals = points.map((p) => p.v);
  let min = opts.min ?? Math.min(...vals);
  let max = opts.max ?? Math.max(...vals);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const x = (i) => padL + (i * (w - padL - padR)) / (points.length - 1);
  const y = (v) => padT + ((max - v) / span) * (h - padT - padB);
  const color = opts.color || '#c8402a';
  let s = svgOpen(w, h, opts.label || 'Line chart');
  s += `<line x1="${padL}" y1="${h - padB}" x2="${w - padR}" y2="${h - padB}" stroke="#d8d2c4" stroke-width="1"/>`;
  s += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${h - padB}" stroke="#d8d2c4" stroke-width="1"/>`;
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ');
  s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="3.2" fill="#f7f5ef" stroke="${color}" stroke-width="2"/>`;
    if (i % 2 === 0 || i === points.length - 1) {
      s += `<text x="${x(i)}" y="${h - 8}" font-size="11" fill="#6b6558" text-anchor="middle">${p.year}</text>`;
    }
  });
  const dec = opts.decimals ?? 0;
  s += `<text x="6" y="${y(max) + 4}" font-size="11" fill="#6b6558">${max.toFixed(dec)}</text>`;
  s += `<text x="6" y="${y(min) + 4}" font-size="11" fill="#6b6558">${min.toFixed(dec)}</text>`;
  s += '</svg>';
  return s;
}

// Horizontal bars over {label, value} rows. opts: {w,unit,decimals,color,max}
export function hbarChart(rows, opts = {}) {
  const w = opts.w || 560, rowH = opts.rowH || 34, labelW = opts.labelW || 130;
  const h = rows.length * rowH + 8;
  const max = opts.max ?? Math.max(...rows.map((r) => r.value));
  const color = opts.color || '#1b2a4a';
  const dec = opts.decimals ?? 0;
  let s = svgOpen(w, h, opts.label || 'Bar chart');
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = Math.max(2, ((w - labelW - 64) * r.value) / max);
    const fill = r.highlight ? '#c8402a' : color;
    s += `<text x="0" y="${y + 15}" font-size="12" fill="#2b2b26">${esc(r.label)}</text>`;
    s += `<rect x="${labelW}" y="${y}" width="${bw.toFixed(1)}" height="20" rx="3" fill="${fill}"/>`;
    s += `<text x="${labelW + bw + 6}" y="${y + 15}" font-size="12" fill="#2b2b26" font-weight="600">${r.value.toFixed(dec)}${opts.unit ? ' ' + opts.unit : ''}</text>`;
  });
  s += '</svg>';
  return s;
}

// Donut over {label, share} rows.
export function donut(rows, opts = {}) {
  const size = opts.size || 220, thick = opts.thick || 34;
  const cx = size / 2, cy = size / 2, r = (size - thick) / 2 - 4;
  const total = rows.reduce((a, b) => a + b.share, 0);
  let s = svgOpen(size, size, opts.label || 'Donut chart');
  let angle = -90;
  rows.forEach((row, i) => {
    const frac = row.share / total;
    const a0 = (angle * Math.PI) / 180, a1 = ((angle + frac * 360) * Math.PI) / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}" fill="none" stroke="${COLORS[i % COLORS.length]}" stroke-width="${thick}"/>`;
    angle += frac * 360;
  });
  s += `<text x="${cx}" y="${cy - 4}" font-size="20" font-weight="700" fill="#1b2a4a" text-anchor="middle">${esc(opts.center || '')}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" font-size="11" fill="#6b6558" text-anchor="middle">${esc(opts.centerSub || '')}</text>`;
  s += '</svg>';
  return s;
}

// Age pyramid: rows of {band, share}; bars grow right from a center line.
export function pyramid(rows, opts = {}) {
  const w = opts.w || 560, rowH = opts.rowH || 20, labelW = 52;
  const h = rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.share));
  const mid = labelW + (w - labelW - 52) / 2;
  const scale = (w - labelW - 52) / 2 / max;
  let s = svgOpen(w, h, opts.label || 'Age pyramid');
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = r.share * scale;
    s += `<text x="0" y="${y + 13}" font-size="11" fill="#2b2b26">${esc(r.band)}</text>`;
    s += `<rect x="${(mid - bw).toFixed(1)}" y="${y}" width="${bw.toFixed(1)}" height="14" rx="2" fill="#1b2a4a"/>`;
    s += `<rect x="${mid}" y="${y}" width="${bw.toFixed(1)}" height="14" rx="2" fill="#c8402a"/>`;
    s += `<text x="${mid + bw + 5}" y="${y + 13}" font-size="11" fill="#6b6558">${r.share.toFixed(1)}%</text>`;
  });
  s += '</svg>';
  return s;
}
