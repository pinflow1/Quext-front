import { PAD } from '../../lib/theme';
import { getBannerGradient } from '../../lib/profileData';

export default function ProfileBanner({ onOpenSettings, onEditAvatar, avatarUrl, bannerStyle, streak, isGuest }) {
  return (
    <div style={{ position:'relative', marginBottom:60 }}>
      <button
        onClick={onEditAvatar}
        disabled={isGuest}
        style={{ height:150, position:'relative', overflow:'hidden', background:getBannerGradient(bannerStyle), width:'100%', border:'none', padding:0, cursor: isGuest ? 'default' : 'pointer' }}
      >
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 75% 20%, var(--orange-tint) 0%, transparent 60%)' }}/>
        {!isGuest && (
          <div style={{
            position:'absolute', bottom:10, right:16, display:'flex', alignItems:'center', gap:5,
            background:'var(--glass-bg)', backdropFilter:'blur(12px)', border:'1px solid var(--glass-border)',
            borderRadius:50, padding:'5px 11px',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:0.5, color:'var(--text)', textTransform:'uppercase' }}>Edit</span>
          </div>
        )}
      </button>

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

      {!isGuest && streak > 0 && (
        <div style={{
          position:'absolute', top:16, left:16, background:'var(--glass-bg)',
          backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', border:'1px solid var(--glass-border)',
          borderRadius:50, padding:'6px 14px', display:'flex', alignItems:'center', gap:6,
        }}>
          <span style={{ width:6, height:6, borderRadius:50, background:'var(--orange)' }}/>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:600, color:'var(--text)' }}>{streak}-DAY STREAK</span>
        </div>
      )}

      <button onClick={onEditAvatar} disabled={isGuest} style={{ position:'absolute', left:PAD, bottom:-44, width:88, height:88, borderRadius:50, padding:4, background:'var(--bg)', border:'none', cursor: isGuest ? 'default' : 'pointer' }}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="" style={{ width:'100%', height:'100%', borderRadius:50, objectFit:'cover', border:'2px solid var(--orange-tint)' }}/>
        ) : (
          <div style={{ width:'100%', height:'100%', borderRadius:50, background:'linear-gradient(135deg, var(--orange), #2e1c08)', border:'2px solid var(--orange-tint)', position:'relative' }}>
            {!isGuest && (
              <div style={{ position:'absolute', bottom:-2, right:-2, width:24, height:24, borderRadius:50, background:'var(--orange)', border:'3px solid var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
            )}
          </div>
        )}
      </button>
    </div>
  );
}
