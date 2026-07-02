import { useEffect, useState } from 'react';
import { PAD } from '../../lib/theme';
import { supabase } from '../../lib/supabase';

export default function AccountRow({ isGuest }) {
  const [email, setEmail] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (isGuest) return;
    supabase.auth.getSession().then(({ data:{ session } }) => {
      setEmail(session?.user?.email || null);
      setAvatarUrl(session?.user?.user_metadata?.avatar_url || null);
    });
  }, [isGuest]);

  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, padding:`16px ${PAD}`, borderTop:'1px solid var(--hairline)' }}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="" style={{ width:40, height:40, borderRadius:50, objectFit:'cover', flexShrink:0 }}/>
      ) : (
        <div style={{ width:40, height:40, borderRadius:50, background:'linear-gradient(135deg, var(--orange), #2e1c08)', flexShrink:0 }}/>
      )}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)' }}>{isGuest ? 'Guest' : (email?.split('@')[0] || 'Signed in')}</div>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-dim)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{isGuest ? 'Not signed in' : email}</div>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:16,height:16,color:'var(--text-faint)'}}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  );
}
