import { useState } from 'react';
import { PAD } from '../../lib/theme';
import { STATUS_COLOR } from '../../lib/animeData';

export default function CalendarEventModal({ event, onClose, onAddToCalendar, monthLabel, syncing, syncResult }) {
  if (!event) return null;
  const color = STATUS_COLOR[event.status];

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'var(--bg)', borderTop:'1px solid var(--hairline)', borderTopLeftRadius:24, borderTopRightRadius:24,
        width:'100%', maxWidth:560, padding:`28px ${PAD} 32px`,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color, textTransform:'uppercase', marginBottom:8 }}>{event.status} · {event.platform}</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.01em', fontSize:20, color:'var(--text)' }}>{event.title}</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-dim)', fontSize:22, cursor:'pointer', lineHeight:1 }}>×</button>
        </div>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-dim)', marginBottom:24 }}>{monthLabel} {event.day}, 2026</div>

        {syncResult?.error && (
          <div style={{ marginBottom:14, padding:'10px 14px', background:'rgba(255,77,77,0.08)', border:'1px solid var(--red)', borderRadius:10, fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--red)' }}>{syncResult.error}</div>
        )}
        {syncResult?.success && (
          <div style={{ marginBottom:14, padding:'10px 14px', background:'rgba(94,235,255,0.08)', border:'1px solid var(--cyan)', borderRadius:10, fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--cyan)' }}>Added to Google Calendar ✓</div>
        )}

        <button onClick={() => onAddToCalendar(event)} disabled={syncing} className="btn-resume" style={{
          width:'100%', border:'none', borderRadius:50, padding:14,
          fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor: syncing ? 'not-allowed' : 'pointer', opacity: syncing ? 0.6 : 1,
        }}>{syncing ? 'Adding...' : 'Add to Google Calendar'}</button>
      </div>
    </div>
  );
}
