export function formatKw(n: number, digits = 1) {
  return `${n.toFixed(digits)} kW`;
}

export function formatBtu(n: number) {
  return `${Math.round(n).toLocaleString("tr-TR")} BTU/h`;
}

export function formatMm(n: number) {
  return `${n.toLocaleString("tr-TR")} mm`;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
