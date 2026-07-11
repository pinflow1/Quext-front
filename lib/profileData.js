export const BANNER_PRESETS = [
  { key:'sunset',  from:'#1a1006', to:'#2e1c08' },
  { key:'ocean',   from:'#0a0d1a', to:'#101830' },
  { key:'forest',  from:'#051a0d', to:'#0a3018' },
  { key:'violet',  from:'#150a1a', to:'#2a1030' },
  { key:'crimson', from:'#1a0505', to:'#300a0a' },
];

export function getBannerGradient(key) {
  const preset = BANNER_PRESETS.find(b => b.key === key) || BANNER_PRESETS[0];
  return `linear-gradient(120deg, ${preset.from} 0%, ${preset.to} 60%, var(--orange-tint) 100%)`;
}
