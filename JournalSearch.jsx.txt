import { PAD } from '../../lib/theme';

export default function JournalSearch({ search, setSearch }) {
  return (
    <div style={{ padding:`0 ${PAD}`, marginBottom:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--hairline)', paddingBottom:12 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:15, height:15, color:'var(--text-dim)', flexShrink:0 }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search your journal..."
          style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'var(--text)', fontSize:14, fontFamily:'Inter,sans-serif' }}
        />
      </div>
    </div>
  );
}
