import { PAD } from '../../lib/theme';
import CalendarUpcomingRow from './CalendarUpcomingRow';

// events: { [day]: { title, status, platform } }
export default function CalendarUpcomingList({ events, onSelect, monthLabel }) {
  const entries = Object.entries(events);

  return (
    <>
      <div style={{ padding:`0 ${PAD} 16px` }}>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>Upcoming This Month</span>
      </div>
      <div style={{ paddingBottom:80 }}>
        {entries.length === 0 && (
          <div style={{ padding:`30px ${PAD}`, fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)' }}>No confirmed releases this month yet.</div>
        )}
        {entries.map(([day, event]) => (
          <CalendarUpcomingRow key={day} day={day} event={event} monthLabel={monthLabel} onSelect={onSelect}/>
        ))}
      </div>
    </>
  );
}
