import { PAD } from '../../lib/theme';
import { SOURCE_FILTERS } from '../../lib/newsData';

export default function PlatformFilter({ active, setActive }) {
  return (
    <div style={{ display:'flex', gap:22, overflowX:'auto', padding:`0 ${PAD}`, marginBottom:24 }} className="no-scrollbar">
      {SOURCE_FILTERS.map(f => {
        const isActive = active === f;
        return (
          <button key={f} onClick={() => setActive(f)} style={{
            background:'none', border:'none', cursor:'pointer', whiteSpace:'nowrap',
            fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:700, letterSpacing:0.3,
            textTransform:'uppercase', color: isActive ? 'var(--orange)' : 'var(--text-dim)',
            padding:'0 0 10px', position:'relative', flexShrink:0,
          }}>
            {f}
            {isActive && <span style={{ position:'absolute', bottom:-1, left:0, right:0, height:2, background:'var(--orange)' }}/>}
          </button>
        );
      })}
    </div>
  );
}
