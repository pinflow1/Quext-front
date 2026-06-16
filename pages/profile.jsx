import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

const C = { bg:"#080808", surface:"#0f0f0f", border:"#1c1c1c", orange:"#F5A020", white:"#ffffff", muted:"rgba(255,255,255,0.38)" };

export default function Profile() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Layout>
      <div style={{ padding:'28px 20px 60px' }}>
        <h1 style={{ fontSize:26, fontWeight:800, color:C.white, letterSpacing:-1, marginBottom:28 }}>Profile</h1>

        {/* Avatar */}
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
          <div style={{ width:64, height:64, borderRadius:50, background:'linear-gradient(135deg,rgba(245,160,32,0.3),rgba(232,118,42,0.1))', border:'2px solid rgba(245,160,32,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>🎌</div>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.white, marginBottom:4 }}>Anime Fan</div>
            <div style={{ fontSize:12, color:C.muted }}>Member since 2024</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:32 }}>
          {[{l:"Watching",v:4},{l:"Completed",v:5},{l:"Entries",v:4}].map(s => (
            <div key={s.l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:16, textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:800, color:C.orange, letterSpacing:-1 }}>{s.v}</div>
              <div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:1, marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {['Notifications', 'Connected Calendars', 'Appearance', 'About'].map(item => (
            <div key={item} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'16px 18px', cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor='rgba(245,160,32,0.2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor=C.border}>
              <span style={{ fontSize:13, fontWeight:600, color:C.white }}>{item}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:16,height:16,color:C.muted}}><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          ))}

          {/* Sign out */}
          <button onClick={handleSignOut} style={{ background:'transparent', color:'rgba(255,80,60,0.8)', border:'1px solid rgba(255,80,60,0.2)', borderRadius:14, padding:'16px 18px', fontSize:13, fontWeight:700, cursor:'pointer', textAlign:'left', marginTop:8, fontFamily:'inherit' }}>
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
}
