import { PAD } from '../../lib/theme';
import { STATUS_COLOR } from '../../lib/animeData';

export default function CalendarUpcomingRow({ day, event, onSelect }) {
  return (
    <div onClick={() => onSelect({ day, ...event })} style={{
      display:'flex', alignItems:'center', gap:'clamp(12px,3vw,20px)', padding:`16px ${PAD}`,
      borderTop:'1px solid var(--hairline)', cursor:'pointer', transition:'background 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
      <span style={{ width:5, height:5, borderRadius:50, background:STATUS_COLOR[event.status], flexShrink:0 }}/>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-dim)', width:48, flexShrink:0 }}>JUN {day}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)' }}>{event.title}</div>
      </div>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:1, color:'var(--text-faint)', flexShrink:0 }}>{event.platform}</span>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:1, color:STATUS_COLOR[event.status], textTransform:'uppercase', flexShrink:0 }}>{event.status}</span>
    </div>
  );
}
