import { useState } from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/ui/PageHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import CalendarUpcomingList from '../components/calendar/CalendarUpcomingList';
import CalendarEventModal from '../components/calendar/CalendarEventModal';
import SyncButton from '../components/calendar/SyncButton';
import { buildCalendarCells, CALENDAR_EVENTS } from '../lib/calendarData';
import { useApp } from '../context/AppContext';

export default function Calendar() {
  const [selected, setSelected] = useState(null);
  const { isGuest, handleGuestGate } = useApp();
  const cells = buildCalendarCells(30, 6);
  const eventCount = Object.keys(CALENDAR_EVENTS).length;

  const handleSync = () => {
    if (isGuest) { handleGuestGate('Calendar sync needs an account'); return; }
  };

  const handleAddToCalendar = (event) => {
    const title = encodeURIComponent(event.title);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}`, '_blank');
  };

  const syncBtn = <SyncButton onClick={handleSync}/>;

  return (
    <Layout>
      <PageHeader
        eyebrow="Signature — What's Coming"
        title="Calendar"
        meta={`JUNE 2026 · ${eventCount} RELEASES THIS MONTH`}
        action={syncBtn}
      />
      <CalendarGrid cells={cells} onSelectDay={setSelected}/>
      <CalendarUpcomingList onSelect={setSelected}/>
      <CalendarEventModal event={selected} onClose={() => setSelected(null)} onAddToCalendar={handleAddToCalendar}/>
    </Layout>
  );
}
