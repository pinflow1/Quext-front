// Accent color: hex<->HSV math, defaults/validation, and the hook
// that syncs it with Supabase and applies it via CSS vars on <html>.
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export const DEFAULT_ACCENT = '#ff7a00';
const HEX_RE = /^#[0-9a-f]{6}$/i;
export const isValidAccent = (hex) => typeof hex === 'string' && HEX_RE.test(hex);

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

function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getContrastText(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#0A0A0A' : '#FFFFFF';
}

function applyAccent(hex) {
  const root = document.documentElement.style;
  root.setProperty('--orange', hex);
  root.setProperty('--orange-tint', hexToRgba(hex, 0.12));
  root.setProperty('--btn-text', getContrastText(hex));
}

// DB-synced accent color: previewAccent for live drag feedback
// (no write), commitAccent to persist once, on Save.
export function useAccentTheme(session) {
  const [accentTheme, setAccentThemeState] = useState(DEFAULT_ACCENT);

  useEffect(() => {
    if (!session) { setAccentThemeState(DEFAULT_ACCENT); applyAccent(DEFAULT_ACCENT); return; }
    supabase.from('profiles').select('accent_theme').eq('id', session.user.id).maybeSingle()
      .then(({ data }) => {
        const hex = isValidAccent(data?.accent_theme) ? data.accent_theme : DEFAULT_ACCENT;
        setAccentThemeState(hex);
        applyAccent(hex);
      });
  }, [session]);

  const previewAccent = (hex) => { setAccentThemeState(hex); applyAccent(hex); };

  const commitAccent = async (hex) => {
    if (!isValidAccent(hex) || !session) return;
    await supabase.from('profiles').update({ accent_theme: hex }).eq('id', session.user.id);
  };

  return { accentTheme, previewAccent, commitAccent };
}
