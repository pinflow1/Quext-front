import { PAD } from '../../lib/theme';
import CalendarUpcomingRow from './CalendarUpcomingRow';
import { CALENDAR_EVENTS } from '../../lib/calendarData';

export default function CalendarUpcomingList({ onSelect }) {
  return (
    <>
      <div style={{ padding:`0 ${PAD} 16px` }}>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>Upcoming This Month</span>
      </div>
      <div style={{ paddingBottom:80 }}>
        {Object.entries(CALENDAR_EVENTS).map(([day, event]) => (
          <CalendarUpcomingRow key={day} day={day} event={event} onSelect={onSelect}/>
        ))}
      </div>
    </>
  );
}
