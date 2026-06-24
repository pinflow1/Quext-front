import { PAD } from '../../lib/theme';
import { GENRE_BREAKDOWN } from '../../lib/profileData';
import { JOURNAL_ENTRIES, JOURNAL_ANIME } from '../../lib/journalData';

export default function StatsTab() {
  const stats = [
    { label:'Entries Logged', value:JOURNAL_ENTRIES.length },
    { label:'Shows Tracked', value:JOURNAL_ANIME.length },
    { label:'Episodes / Wk', value:7 },
  ];
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', padding:`0 ${PAD} 36px` }}>
        {stats.map((s,i) => (
          <div key={s.label} style={{ textAlign:'center', borderLeft: i>0 ? '1px solid var(--hairline)' : 'none' }}>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.02em', fontSize:'clamp(24px,6vw,32px)', color:'var(--orange)' }}>{s.value}</div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:1, color:'var(--text-dim)', textTransform:'uppercase', marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:`0 ${PAD} 8px` }}>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>Top Genres</span>
      </div>
      <div style={{ padding:`16px ${PAD} 0` }}>
        {GENRE_BREAKDOWN.map(g => (
          <div key={g.genre} style={{ marginBottom:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, color:'var(--text)' }}>{g.genre}</span>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--orange)' }}>{g.pct}%</span>
            </div>
            <div style={{ height:2, background:'var(--track-2)' }}>
              <div style={{ height:'100%', width:`${g.pct}%`, background:'var(--orange)' }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
