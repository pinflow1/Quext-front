import { PAD } from '../../lib/theme';
import SectionHeader from '../ui/SectionHeader';
import { HEATMAP_SHOWS, DAY_LABELS, TODAY_INDEX } from '../../lib/animeData';

const cols = 'clamp(56px,16vw,110px) repeat(7,1fr)';

export default function EpisodeHeatmap() {
  return (
    <div>
      <SectionHeader eyebrow="Signature — Your Week" title="Weekly Episode Heatmap"/>
      <div style={{ padding:`0 ${PAD} 8px` }}>
        <div style={{ display:'grid', gridTemplateColumns:cols, gap:'clamp(3px,1vw,6px)', marginBottom:14 }}>
          <div/>
          {DAY_LABELS.map((d,i) => (
            <div key={i} style={{ textAlign:'center', fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: i===TODAY_INDEX ? 'var(--cyan)' : 'var(--text-faint)', fontWeight:600 }}>{d}</div>
          ))}
        </div>
        {HEATMAP_SHOWS.map(show => (
          <div key={show.title} style={{ display:'grid', gridTemplateColumns:cols, gap:'clamp(3px,1vw,6px)', marginBottom:8, alignItems:'center' }}>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color:'var(--text-70)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{show.title}</div>
            {DAY_LABELS.map((_, i) => {
              const fires = show.days.includes(i);
              const isToday = i === TODAY_INDEX;
              const alpha = Math.round(show.intensity * 255).toString(16).padStart(2,'0');
              return (
                <div key={i} style={{
                  aspectRatio:'1', maxWidth:48, maxHeight:48, margin:'0 auto', width:'100%',
                  background: fires ? `var(--orange)${alpha}` : 'var(--surface)',
                  border: fires && show.delayed ? '1.5px solid var(--red)' : isToday ? '1px solid var(--cyan)' : 'none',
                }}/>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:20, padding:`16px ${PAD} 0`, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--text-dim)', flexWrap:'wrap' }}>
        <span><span style={{ color:'var(--orange)' }}>■</span> AIRS</span>
        <span><span style={{ color:'var(--red)' }}>□</span> DELAYED</span>
        <span><span style={{ color:'var(--cyan)' }}>□</span> TODAY</span>
      </div>
    </div>
  );
}
