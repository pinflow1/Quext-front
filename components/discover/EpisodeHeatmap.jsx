import { useState, useEffect } from 'react';
import { PAD } from '../../lib/theme';
import SectionHeader from '../ui/SectionHeader';
import { HEATMAP_SHOWS, DAY_LABELS, TODAY_INDEX } from '../../lib/animeData';

const cols = 'clamp(56px,16vw,110px) repeat(7,1fr)';

export default function EpisodeHeatmap() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('/api/anime/schedule')
      .then(r => r.json())
      .then(d => { if (d.shows?.length) setShows(d.shows); })
      .catch(() => {});
  }, []);

  // Live data: each show has a single dayIndex
  // Static data: each show has a days array
  const data = shows.length
    ? shows.map(s => ({ title:s.title, days:[s.dayIndex], intensity:s.intensity, delayed:false }))
    : HEATMAP_SHOWS;

  const eyebrow = shows.length ? 'Popular This Week' : 'Signature — Your Week';
  const title   = shows.length ? 'Airing This Week' : 'Weekly Episode Heatmap';

  return (
    <div>
      <SectionHeader eyebrow={eyebrow} title={title}/>
      <div style={{ padding:`0 ${PAD} 8px` }}>
        <div style={{ display:'grid', gridTemplateColumns:cols, gap:'clamp(3px,1vw,6px)', marginBottom:14 }}>
          <div/>
          {DAY_LABELS.map((d,i) => (
            <div key={i} style={{ textAlign:'center', fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: i===TODAY_INDEX ? 'var(--cyan)' : 'var(--text-faint)', fontWeight:600 }}>{d}</div>
          ))}
        </div>
        {data.map(show => (
          <div key={show.title} style={{ display:'grid', gridTemplateColumns:cols, gap:'clamp(3px,1vw,6px)', marginBottom:8, alignItems:'center' }}>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color:'var(--text-70)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{show.title}</div>
            {DAY_LABELS.map((_,i) => {
              const fires = show.days.includes(i);
              const isToday = i === TODAY_INDEX;
              const alpha = Math.round((show.intensity || 0.6) * 255).toString(16).padStart(2,'0');
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
