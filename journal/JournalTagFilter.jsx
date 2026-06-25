import { PAD } from '../../lib/theme';

export default function JournalTagFilter({ tags, activeTag, setActiveTag }) {
  return (
    <div style={{ display:'flex', gap:22, overflowX:'auto', padding:`0 ${PAD}`, marginBottom:36 }} className="no-scrollbar">
      {tags.map(t => {
        const active = activeTag === t;
        return (
          <button key={t} onClick={() => setActiveTag(t)} style={{
            background:'none', border:'none', cursor:'pointer', whiteSpace:'nowrap',
            fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:700, letterSpacing:0.3,
            textTransform:'uppercase', color: active ? 'var(--orange)' : 'var(--text-dim)',
            padding:'4px 0', position:'relative', flexShrink:0,
          }}>
            {t}
            {active && <span style={{ position:'absolute', bottom:-1, left:0, right:0, height:2, background:'var(--orange)' }}/>}
          </button>
        );
      })}
    </div>
  );
}
