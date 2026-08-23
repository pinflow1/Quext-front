import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../context/AppContext';

export default function AddToCalendarButton({ title }) {
  const { isGuest, handleGuestGate } = useApp();
  const [session, setSession] = useState(null);
  const [picking, setPicking] = useState(false);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setSession(session));
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);

  const handleOpen = () => {
    if (isGuest) { handleGuestGate('Adding to Calendar needs an account'); return; }
    if (!session?.provider_token) { setStatus('Google account not connected. Sign in with Google to sync.'); return; }
    setPicking(true);
    setStatus(null);
  };

  const handleConfirm = async () => {
    if (!date) return;
    const [year, month, day] = date.split('-').map(Number);
    setStatus('saving');
    try {
      const res = await fetch('/api/calendar/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, day, month: month - 1, year,
          providerToken: session.provider_token,
          summary: title,
          description: 'Added from Quext News',
        }),
      });
      const data = await res.json();
      setStatus(res.ok ? 'success' : (data.error || 'error'));
    } catch (e) {
      setStatus(e.message);
    }
  };

  if (!picking) {
    return (
      <button onClick={handleOpen} style={{
        border:'1px solid var(--hairline)', borderRadius:50, padding:'12px 20px',
        background:'transparent', color:'var(--text)',
        fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer',
      }}>
        Add to Calendar
      </button>
    );
  }

  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
      <input type="date" min={todayStr} value={date} onChange={e => setDate(e.target.value)} style={{
        padding:'10px 12px', borderRadius:8, border:'1px solid var(--hairline)',
        background:'var(--surface)', color:'var(--text)', fontFamily:'Inter,sans-serif', fontSize:13,
      }}/>
      <button onClick={handleConfirm} disabled={!date || status==='saving'} className="btn-resume" style={{
        border:'none', borderRadius:50, padding:'10px 18px',
        fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, cursor: date ? 'pointer' : 'not-allowed',
      }}>
        {status === 'saving' ? 'Adding...' : 'Confirm'}
      </button>
      {status === 'success' && <span style={{ fontSize:12, color:'var(--cyan)' }}>Added ✓</span>}
      {status && !['saving','success'].includes(status) && <span style={{ fontSize:12, color:'var(--red)' }}>{status}</span>}
    </div>
  );
        }
