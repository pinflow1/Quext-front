import { PAD } from '../../lib/theme';
import { PROFILE_USER } from '../../lib/profileData';

export default function AccountRow({ isGuest }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, padding:`16px ${PAD}`, borderTop:'1px solid var(--hairline)' }}>
      <div style={{ width:40, height:40, borderRadius:50, background:'linear-gradient(135deg, var(--orange), #2e1c08)', flexShrink:0 }}/>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)' }}>{isGuest ? 'Guest' : PROFILE_USER.name}</div>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-dim)' }}>{isGuest ? 'Not signed in' : PROFILE_USER.handle}</div>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:16,height:16,color:'var(--text-faint)'}}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  );
}
