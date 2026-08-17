import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ColorWheel from './ColorWheel';
import { hexToHsv, hsvToHex } from '../../lib/accentColor';

export default function AccentPickerModal({ onClose }) {
  const { accentTheme, previewAccent, commitAccent } = useApp();
  const [original] = useState(accentTheme);
  const [hsv, setHsv] = useState(() => hexToHsv(accentTheme));

  const apply = (next) => {
    setHsv(next);
    previewAccent(hsvToHex(next.h, next.s, next.v));
  };

  const handleSave = async () => {
    await commitAccent(hsvToHex(hsv.h, hsv.s, hsv.v));
    onClose();
  };

  const handleCancel = () => {
    previewAccent(original);
    onClose();
  };

  const currentHex = hsvToHex(hsv.h, hsv.s, hsv.v);

  return (
    <div onClick={handleCancel} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--bg)', border: '1px solid var(--hairline)',
        borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 18,
      }}>
        <span style={{
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 11,
          letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)',
        }}>Accent Color</span>

        <ColorWheel hue={hsv.h} sat={hsv.s} val={hsv.v} onChange={apply}/>

        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: 'var(--text)' }}>
          {currentHex.toUpperCase()}
        </span>

        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <button onClick={handleCancel} style={{ flex: 1, padding: '12px 0', borderRadius: 10, background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--text)' }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 1, padding: '12px 0', borderRadius: 10, background: 'var(--text)', border: 'none', color: 'var(--bg)' }}>Save</button>
        </div>
      </div>
    </div>
  );
}
