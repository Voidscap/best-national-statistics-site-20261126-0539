// Number and money formatting for Atlas.
export function num(n, decimals = 0) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
export function compact(n) {
  if (Math.abs(n) >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  return num(n);
}
export function pct(n, decimals = 1) {
  return n.toFixed(decimals) + '%';
}
export function yenTrillion(n) {
  return '¥' + num(n) + 'T';
}
export function usdTrillion(n) {
  return '$' + n.toFixed(2) + 'T';
}
export function yearLabel(y) {
  return String(y);
}
