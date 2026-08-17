// Syncs accent + background with Supabase and applies them live
// via CSS vars on <html>. A custom background applies inline,
// which always outranks the prefers-color-scheme media query and
// .theme-dark class in the CSS cascade — so once one is set,
// light/dark mode has no visible effect until reset to default.
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { hexToRgba, getContrastText, isLightBg, DARK_PALETTE, LIGHT_PALETTE } from './colorMath';

export const DEFAULT_ACCENT = '#ff7a00';
export const DEFAULT_BG = '#0a0a0a';
const HEX_RE = /^#[0-9a-f]{6}$/i;
export const isValidHex = (hex) => typeof hex === 'string' && HEX_RE.test(hex);

function applyAccent(hex) {
  const root = document.documentElement.style;
  root.setProperty('--orange', hex);
  root.setProperty('--orange-tint', hexToRgba(hex, 0.12));
  root.setProperty('--btn-text', getContrastText(hex));
}

function applyBg(hex) {
  const root = document.documentElement.style;
  root.setProperty('--bg', hex);
  const palette = isLightBg(hex) ? LIGHT_PALETTE : DARK_PALETTE;
  Object.entries(palette).forEach(([key, value]) => root.setProperty(key, value));
}

export function useCustomTheme(session) {
  const [accentTheme, setAccentThemeState] = useState(DEFAULT_ACCENT);
  const [bgTheme, setBgThemeState] = useState(DEFAULT_BG);

  useEffect(() => {
    if (!session) {
      setAccentThemeState(DEFAULT_ACCENT); applyAccent(DEFAULT_ACCENT);
      setBgThemeState(DEFAULT_BG); applyBg(DEFAULT_BG);
      return;
    }
    supabase.from('profiles').select('accent_theme, bg_theme').eq('id', session.user.id).maybeSingle()
      .then(({ data }) => {
        const accent = isValidHex(data?.accent_theme) ? data.accent_theme : DEFAULT_ACCENT;
        const bg = isValidHex(data?.bg_theme) ? data.bg_theme : DEFAULT_BG;
        setAccentThemeState(accent); applyAccent(accent);
        setBgThemeState(bg); applyBg(bg);
      });
  }, [session]);

  const previewAccent = (hex) => { setAccentThemeState(hex); applyAccent(hex); };
  const commitAccent = async (hex) => {
    if (!isValidHex(hex) || !session) return;
    await supabase.from('profiles').update({ accent_theme: hex }).eq('id', session.user.id);
  };

  const previewBg = (hex) => { setBgThemeState(hex); applyBg(hex); };
  const commitBg = async (hex) => {
    if (!isValidHex(hex) || !session) return;
    await supabase.from('profiles').update({ bg_theme: hex }).eq('id', session.user.id);
  };

  return { accentTheme, previewAccent, commitAccent, bgTheme, previewBg, commitBg };
}
