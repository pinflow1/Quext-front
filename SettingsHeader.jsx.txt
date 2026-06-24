import { PAD } from '../../lib/theme';

export default function SettingsHeader({ onBack }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:16, padding:`24px ${PAD} 8px` }}>
      <button onClick={onBack} style={{ background:'none', border:'none', color:'var(--text)', cursor:'pointer', padding:0, display:'flex' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.01em', fontSize:20, color:'var(--text)' }}>Settings</span>
    </div>
  );
}
