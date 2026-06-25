// All chrome colors reference CSS variables defined in styles/globals.css,
// which flip automatically via `prefers-color-scheme` — no JS needed.
// Anime artwork (palette gradients) stays hardcoded hex — content art
// doesn't theme-swap, same as Netflix poster art.
export const T = {
  bg: 'var(--bg)',
  white: 'var(--text)',
  orange: 'var(--orange)',
  cyan: 'var(--cyan)',
  red: 'var(--red)',
  hair: 'var(--hairline)',
  dim: 'var(--text-dim)',
  faint: 'var(--text-faint)',
  text70: 'var(--text-70)',
  text65: 'var(--text-65)',
  text60: 'var(--text-60)',
  surface: 'var(--surface)',
  surfaceHover: 'var(--surface-hover)',
  track: 'var(--track)',
  track2: 'var(--track-2)',
  glassBg: 'var(--glass-bg)',
  glassBorder: 'var(--glass-border)',
  glassActive: 'var(--glass-active)',
  numStroke: 'var(--num-stroke)',
  rankFaint: 'var(--rank-faint)',
  orangeTint: 'var(--orange-tint)',
  btnText: 'var(--btn-text)',
  heroFade: 'var(--hero-fade)',
};

// Responsive section padding — scales smoothly instead of jumping at one breakpoint
export const PAD = 'clamp(16px,5vw,32px)';

export const FONT_IMPORT_URL =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap';
