import { useApp } from '../../context/AppContext';

// TEMP: bypasses the premium gate so you can preview color
// pickers without a live subscription. Flip to false when done.
const BYPASS_PREMIUM_FOR_TESTING = true;

export default function ThemeColorRow({ label, target }) {
  const { isPremium, accentTheme, bgTheme, setShowUpsell, setColorPickerTarget } = useApp();
  const unlocked = isPremium || BYPASS_PREMIUM_FOR_TESTING;
  const hex = target === 'bg' ? bgTheme : accentTheme;

  const handleTap = () => {
    if (!unlocked) { setShowUpsell(true); return; }
    setColorPickerTarget(target);
  };

  return (
    <div onClick={handleTap} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
      <span style={{ fontSize: 15, color: 'var(--text)', flex: 1 }}>{label}</span>
      {!unlocked && (
        <span style={{
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          color: 'var(--orange)', border: '1px solid var(--orange)',
          borderRadius: 4, padding: '2px 6px',
        }}>Pro</span>
      )}
      <span style={{
        width: 26, height: 26, borderRadius: '50%',
        background: hex, border: '2px solid var(--hairline)',
        opacity: unlocked ? 1 : 0.35,
      }}/>
    </div>
  );
}
