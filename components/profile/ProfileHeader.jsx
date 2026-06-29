import { PAD } from '../../lib/theme';
import { PROFILE_USER } from '../../lib/profileData';
import useJournal from '../../lib/useJournal';
import { JOURNAL_ENTRIES, JOURNAL_ANIME } from '../../lib/journalData';

export default function ProfileHeader({ isGuest, onOpenLogin }) {
  const { entries: liveEntries, session } = useJournal();
  const isLive = !!session;
  const entries = isLive ? liveEntries : JOURNAL_ENTRIES;
  const trackedShows = new Set(entries.map(e => e.anime_mal_id || e.animeId)).size;

  return (
    <div style={{ padding:`0 ${PAD} 28px` }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.01em', fontSize:22, color:'var(--text)' }}>
          {isGuest ? 'Guest' : PROFILE_USER.name}
        </span>
        {!isGuest && (
          <svg viewBox="0 0 24 24" fill="var(--orange)" style={{width:16,height:16}}>
            <circle cx="12" cy="12" r="10"/>
            <polyline points="8 12 11 15 16 9" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:1, color:'var(--text-dim)' }}>
        {entries.length} ENTRIES LOGGED · {trackedShows} SHOWS TRACKED
      </div>

      {isGuest && (
        <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:16, padding:'12px 16px', border:'1px solid var(--hairline)', borderRadius:12 }}>
          <span style={{ width:6, height:6, borderRadius:50, background:'var(--cyan)', flexShrink:0 }}/>
          <span style={{ flex:1, fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--text-dim)' }}>Browsing as guest — entries save on this device only.</span>
          <button onClick={onOpenLogin} style={{ background:'none', border:'none', color:'var(--orange)', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:12, cursor:'pointer', flexShrink:0 }}>Sign In</button>
        </div>
      )}
    </div>
  );
}
