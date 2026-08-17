// Pure color math + the app's two base palettes (dark/light),
// extracted from styles/globals.css so a custom background can
// reuse the *rest* of either palette (text, surfaces, hairlines,
// glass, cyan, red) while only --bg itself becomes user-picked.

export function hexToRgb(hex) {
  return { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
}

export function rgbToHex(r, g, b) {
  const h = (n) => Math.round(n).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

export function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : (d / max) * 100, v: max * 100 };
}

export function hsvToRgb(h, s, v) {
  s /= 100; v /= 100;
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] :
    h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

export function hexToHsv(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsv(r, g, b);
}

export function hsvToHex(h, s, v) {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

export function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function isLightBg(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

export function getContrastText(hex) {
  return isLightBg(hex) ? '#0A0A0A' : '#FFFFFF';
}

// Every non-bg, non-accent variable from :root / prefers-color-
// scheme:light / .theme-dark in globals.css, reused wholesale.
export const DARK_PALETTE = {
  '--surface': 'rgba(255,255,255,0.04)', '--surface-hover': 'rgba(255,255,255,0.02)',
  '--hairline': 'rgba(255,255,255,0.1)', '--text': '#FFFFFF',
  '--text-70': 'rgba(255,255,255,0.7)', '--text-65': 'rgba(255,255,255,0.65)',
  '--text-60': 'rgba(255,255,255,0.6)', '--text-dim': 'rgba(255,255,255,0.4)',
  '--text-faint': 'rgba(255,255,255,0.22)', '--track': 'rgba(255,255,255,0.15)',
  '--track-2': 'rgba(255,255,255,0.08)', '--glass-bg': 'rgba(20,20,20,0.42)',
  '--glass-border': 'rgba(255,255,255,0.1)', '--glass-active': 'rgba(255,255,255,0.12)',
  '--num-stroke': 'rgba(255,255,255,0.3)', '--rank-faint': 'rgba(255,255,255,0.18)',
  '--cyan': '#5EEBFF', '--red': '#FF4D4D', '--hero-fade': 'rgba(10,10,10,0.55)',
  '--hero-scrim': 'rgba(0,0,0,0.4)', '--scroll-thumb': '#1c1c1c',
};

export const LIGHT_PALETTE = {
  '--surface': 'rgba(10,10,10,0.04)', '--surface-hover': 'rgba(10,10,10,0.03)',
  '--hairline': 'rgba(10,10,10,0.12)', '--text': '#0A0A0A',
  '--text-70': 'rgba(10,10,10,0.72)', '--text-65': 'rgba(10,10,10,0.65)',
  '--text-60': 'rgba(10,10,10,0.6)', '--text-dim': 'rgba(10,10,10,0.45)',
  '--text-faint': 'rgba(10,10,10,0.32)', '--track': 'rgba(10,10,10,0.12)',
  '--track-2': 'rgba(10,10,10,0.08)', '--glass-bg': 'rgba(255,255,255,0.5)',
  '--glass-border': 'rgba(10,10,10,0.1)', '--glass-active': 'rgba(10,10,10,0.08)',
  '--num-stroke': 'rgba(10,10,10,0.35)', '--rank-faint': 'rgba(10,10,10,0.18)',
  '--cyan': '#0099AD', '--red': '#E0383D', '--hero-fade': 'rgba(250,250,248,0.65)',
  '--hero-scrim': 'rgba(255,255,255,0.5)', '--scroll-thumb': 'rgba(10,10,10,0.2)',
};
