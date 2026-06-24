import { PAD } from '../../lib/theme';

export default function JournalEntryRow({ entry, anime }) {
  if (!anime) return null;
  return (
    <div style={{
      display:'flex', gap:'clamp(12px,3vw,24px)', padding:`18px ${PAD}`,
      borderTop:'1px solid var(--hairline)', transition:'background 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
      <div style={{ width:'clamp(48px,12vw,64px)', flexShrink:0, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-faint)', paddingTop:3 }}>
        {entry.date}
      </div>
      <div style={{ width:8, height:8, borderRadius:50, flexShrink:0, marginTop:6, background:`linear-gradient(135deg,${anime.palette[0]},${anime.palette[1]})`, border:'1px solid var(--hairline)' }}/>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:8, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)' }}>{anime.title}</span>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:1, color:'var(--cyan)', textTransform:'uppercase' }}>{anime.tag}</span>
        </div>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, lineHeight:1.7, color:'var(--text-60)', margin:0, maxWidth:560 }}>{entry.note}</p>
      </div>
    </div>
  );
}
