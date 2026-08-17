import { useApp } from '../../context/AppContext';

export default function AccentThemePicker() {
  const { isPremium, accentTheme, setShowUpsell, setShowAccentPicker } = useApp();

  const handleTap = () => {
    if (!isPremium) { setShowUpsell(true); return; }
    setShowAccentPicker(true);
  };

  return (
    <div onClick={handleTap} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
      <span style={{ fontSize: 15, color: 'var(--text)', flex: 1 }}>Accent Color</span>
      {!isPremium && (
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
        opacity: isPremium ? 1 : 0.35,
      }}/>
    </div>
  );
}
