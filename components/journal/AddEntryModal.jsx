import { useState } from 'react';
import { PAD } from '../../lib/theme';
import { JOURNAL_ANIME } from '../../lib/journalData';

export default function AddEntryModal({ onClose, onSave }) {
  const [selected, setSelected] = useState(JOURNAL_ANIME[0]);
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!note.trim()) return;
    onSave(selected, note.trim());
  };

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'var(--bg)', borderTop:'1px solid var(--hairline)', borderTopLeftRadius:24, borderTopRightRadius:24,
        width:'100%', maxWidth:560, padding:`28px ${PAD} 32px`,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.01em', fontSize:18, color:'var(--text)' }}>New Entry</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-dim)', fontSize:22, cursor:'pointer', lineHeight:1 }}>×</button>
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:12 }}>Which anime</div>
          <div style={{ display:'flex', gap:8, overflowX:'auto' }} className="no-scrollbar">
            {JOURNAL_ANIME.map(a => (
              <button key={a.id} onClick={() => setSelected(a)} className="nav-pill" style={{
                flexShrink:0, padding:'7px 16px', borderRadius:50,
                border:`1.5px solid ${selected.id===a.id ? 'var(--orange)' : 'var(--hairline)'}`,
                background: selected.id===a.id ? 'var(--orange-tint)' : 'transparent',
                color: selected.id===a.id ? 'var(--orange)' : 'var(--text-dim)',
                fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:11, cursor:'pointer', whiteSpace:'nowrap',
              }}>{a.title.split(':')[0]}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:12 }}>Your thoughts</div>
          <textarea
            value={note} onChange={e => setNote(e.target.value)}
            placeholder="What stood out? Any moments that hit different?" rows={4}
            style={{
              width:'100%', background:'transparent', border:'none', borderBottom:'1px solid var(--hairline)',
              padding:'0 0 12px', color:'var(--text)', fontSize:14, fontFamily:'Inter,sans-serif',
              outline:'none', resize:'none', lineHeight:1.7,
            }}
          />
        </div>

        <button onClick={handleSave} className="btn-resume" style={{
          width:'100%', border:'none', borderRadius:50, padding:14,
          fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor:'pointer',
        }}>Save Entry</button>
      </div>
    </div>
  );
}
