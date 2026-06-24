import { PAD } from '../../lib/theme';
import { JOURNAL_ANIME } from '../../lib/journalData';

export default function ProfileBanner({ onOpenSettings }) {
  return (
    <div style={{ position:'relative', marginBottom:60 }}>
      <div style={{
        height:150, position:'relative', overflow:'hidden',
        background:`linear-gradient(120deg, ${JOURNAL_ANIME[0].palette[0]} 0%, ${JOURNAL_ANIME[1].palette[1]} 60%, var(--orange-tint) 100%)`,
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 75% 20%, var(--orange-tint) 0%, transparent 60%)' }}/>
      </div>

      <button onClick={onOpenSettings} style={{
        position:'absolute', top:16, right:16, width:36, height:36, borderRadius:50,
        background:'var(--glass-bg)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
        border:'1px solid var(--glass-border)', display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', color:'var(--text)',
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:16,height:16}}>
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      </button>

      <div style={{
        position:'absolute', top:16, left:16, background:'var(--glass-bg)',
        backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', border:'1px solid var(--glass-border)',
        borderRadius:50, padding:'6px 14px', display:'flex', alignItems:'center', gap:6,
      }}>
        <span style={{ width:6, height:6, borderRadius:50, background:'var(--orange)' }}/>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, color:'var(--text)' }}>7-DAY STREAK</span>
      </div>

      <div style={{ position:'absolute', left:PAD, bottom:-44, width:88, height:88, borderRadius:50, padding:4, background:'var(--bg)' }}>
        <div style={{ width:'100%', height:'100%', borderRadius:50, background:'linear-gradient(135deg, var(--orange), #2e1c08)', border:'2px solid var(--orange-tint)', position:'relative' }}>
          <div style={{ position:'absolute', bottom:-2, right:-2, width:24, height:24, borderRadius:50, background:'var(--orange)', border:'3px solid var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
