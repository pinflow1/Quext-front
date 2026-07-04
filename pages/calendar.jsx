import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/ui/PageHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import CalendarUpcomingList from '../components/calendar/CalendarUpcomingList';
import CalendarEventModal from '../components/calendar/CalendarEventModal';
import SyncButton from '../components/calendar/SyncButton';
import { buildCellsForMonth } from '../lib/calendarData';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';

const MONTH_NAMES = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export default function Calendar() {
  const [selected, setSelected] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const { isGuest, handleGuestGate } = useApp();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const monthLabel = MONTH_NAMES[month];

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setSession(session));
    fetch('/api/anime/upcoming')
      .then(r => r.json())
      .then(d => setEvents(d.events || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Build day → event map for this month only
  const eventsByDay = events
    .filter(e => e.month === month && e.year === year)
    .reduce((acc, e) => { acc[e.day] = e; return acc; }, {});

  const cells = buildCellsForMonth(year, month);

  const handleSync = async () => {
    if (isGuest) { handleGuestGate('Calendar sync needs an account'); return; }
    if (!session?.provider_token) {
      setSyncResult({ error: 'Google account not connected. Sign in with Google to sync.' });
      return;
    }

    const dayEntries = Object.entries(eventsByDay);
    if (dayEntries.length === 0) return;

    setSyncing(true);
    setSyncResult(null);

    let succeeded = 0;
    let failed = 0;

    for (const [day, event] of dayEntries) {
      try {
        const res = await fetch('/api/calendar/push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: event.title, day: Number(day), month, year,
            providerToken: session.provider_token,
          }),
        });
        res.ok ? succeeded++ : failed++;
      } catch {
        failed++;
      }
    }

    setSyncing(false);
    setSyncResult(
      failed === 0
        ? { success: true, message: `Synced ${succeeded} release${succeeded !== 1 ? 's' : ''} to Google Calendar` }
        : { error: `Synced ${succeeded}, failed ${failed}. Try again for the rest.` }
    );
  };

  const handleAddToCalendar = async (event) => {
    if (isGuest) { handleGuestGate('Calendar sync needs an account'); return; }
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/calendar/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: event.title, day: event.day, month, year,
          providerToken: session?.provider_token,
        }),
      });
      const data = await res.json();
      setSyncResult(res.ok ? { success: true } : { error: data.error });
    } catch (e) {
      setSyncResult({ error: e.message });
    } finally {
      setSyncing(false);
    }
  };

  const syncBtn = <SyncButton onClick={handleSync} syncing={syncing}/>;

  return (
    <Layout>
      <PageHeader eyebrow="Signature — What's Coming" title="Calendar" meta={`${monthLabel} ${year} · ${Object.keys(eventsByDay).length} RELEASES THIS MONTH`} action={syncBtn}/>
      {syncResult && !selected && (
        <div style={{
          margin:'0 32px 20px', padding:'12px 16px', borderRadius:10,
          background: syncResult.success ? 'rgba(94,235,255,0.08)' : 'rgba(255,77,77,0.08)',
          border: `1px solid ${syncResult.success ? 'var(--cyan)' : 'var(--red)'}`,
          fontFamily:'Inter,sans-serif', fontSize:12,
          color: syncResult.success ? 'var(--cyan)' : 'var(--red)',
        }}>
          {syncResult.success ? syncResult.message : syncResult.error}
        </div>
      )}
      {loading ? (
        <div style={{ padding:'40px 32px', fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-dim)' }}>Loading releases...</div>
      ) : (
        <>
          <CalendarGrid cells={cells} events={eventsByDay} today={today} onSelectDay={(d) => { setSelected(d); setSyncResult(null); }}/>
          <CalendarUpcomingList events={eventsByDay} monthLabel={monthLabel} onSelect={(d) => { setSelected(d); setSyncResult(null); }}/>
        </>
      )}
      <CalendarEventModal event={selected} monthLabel={monthLabel} syncing={syncing} syncResult={syncResult} onClose={() => setSelected(null)} onAddToCalendar={handleAddToCalendar}/>
    </Layout>
  );
            }
