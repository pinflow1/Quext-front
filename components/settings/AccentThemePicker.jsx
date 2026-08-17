import { useApp } from '../../context/AppContext';

// TEMP: bypasses the premium gate so you can preview the picker
// without a live subscription. Flip to false (or delete this line
// and swap unlocked -> isPremium below) before real users see it.
const BYPASS_PREMIUM_FOR_TESTING = true;

export default function AccentThemePicker() {
  const { isPremium, accentTheme, setShowUpsell, setShowAccentPicker } = useApp();
  const unlocked = isPremium || BYPASS_PREMIUM_FOR_TESTING;

  const handleTap = () => {
    if (!unlocked) { setShowUpsell(true); return; }
    setShowAccentPicker(true);
  };

  return (
    <div onClick={handleTap} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
      <span style={{ fontSize: 15, color: 'var(--text)', flex: 1 }}>Accent Color</span>
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
        background: accentTheme, border: '2px solid var(--hairline)',
        opacity: unlocked ? 1 : 0.35,
      }}/>
    </div>
  );
}
