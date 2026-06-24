import { PAD } from '../../lib/theme';
import { CALENDAR_DAYS, CALENDAR_TODAY, CALENDAR_EVENTS } from '../../lib/calendarData';
import { STATUS_COLOR } from '../../lib/animeData';

export default function CalendarGrid({ cells, onSelectDay }) {
  return (
    <div style={{ padding:`0 ${PAD}`, marginBottom:40 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:4 }}>
        {CALENDAR_DAYS.map(d => (
          <div key={d} style={{ textAlign:'center', fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:1, color:'var(--text-faint)', padding:'0 0 10px', fontWeight:600 }}>{d}</div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', borderTop:'1px solid var(--hairline)', borderLeft:'1px solid var(--hairline)' }}>
        {cells.map((day, i) => {
          const event = day && CALENDAR_EVENTS[day];
          const isToday = day === CALENDAR_TODAY;
          return (
            <div key={i} onClick={() => event && onSelectDay({ day, ...event })} style={{
              aspectRatio:'1', borderRight:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:5, cursor: event ? 'pointer' : 'default', position:'relative',
              background: isToday ? 'var(--orange-tint)' : 'transparent',
            }}>
              {day && (
                <>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'clamp(11px,3vw,13px)', fontWeight: isToday ? 700 : 500, color: isToday ? 'var(--orange)' : 'var(--text-70)' }}>{day}</span>
                  {event && <span style={{ width:5, height:5, borderRadius:50, background:STATUS_COLOR[event.status] }}/>}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
