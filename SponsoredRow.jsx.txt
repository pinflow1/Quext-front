import { PAD } from '../../lib/theme';

export default function SponsoredRow({ onWatchClick }) {
  return (
    <div style={{ padding:`8px ${PAD} 0` }}>
      <div
        onClick={() => onWatchClick('Sponsored Pick', 'Crunchyroll')}
        style={{
          display:'flex', alignItems:'center', gap:18, padding:'18px 20px',
          border:'1px dashed var(--hairline)', cursor:'pointer', transition:'border-color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor='var(--cyan)'}
        onMouseLeave={e => e.currentTarget.style.borderColor='var(--hairline)'}
      >
        <div style={{ width:46, height:64, flexShrink:0, background:'linear-gradient(160deg,#0a1620,#102838)' }}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2, color:'var(--cyan)', textTransform:'uppercase', marginBottom:6 }}>Sponsored</div>
          <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:3 }}>Stream the new season early</div>
          <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--text-dim)' }}>Available now on Crunchyroll</div>
        </div>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--text-faint)', flexShrink:0 }}>AD</span>
      </div>
    </div>
  );
}
