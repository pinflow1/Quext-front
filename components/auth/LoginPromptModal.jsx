import { useState } from 'react';
import { PAD } from '../../lib/theme';
import { supabase } from '../../lib/supabase';

export default function LoginPromptModal({ onClose, onSignIn }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/discover` },
    });
  };

  const handleEmail = async () => {
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/discover` },
    });
    setLoading(false);
    if (!error) setSent(true);
  };

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)', zIndex:300, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'var(--bg)', borderTop:'1px solid var(--hairline)',
        borderTopLeftRadius:24, borderTopRightRadius:24,
        width:'100%', maxWidth:560, padding:`28px ${PAD} 32px`,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
          <img src="/images/logo.webp" alt="Quext" width={28} height={28} style={{ objectFit:'contain' }}/>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.02em', fontSize:18, color:'var(--text)' }}>Quext</span>
        </div>
        <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.015em', fontSize:22, color:'var(--text)', margin:'0 0 8px' }}>Don't lose your progress</h2>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-65)', lineHeight:1.6, margin:'0 0 24px' }}>
          Sign in to sync your journal, get episode alerts, and add seasons to your calendar.
        </p>

        {sent ? (
          <div style={{ background:'rgba(80,200,120,0.08)', border:'1px solid rgba(80,200,120,0.2)', borderRadius:14, padding:20, textAlign:'center' }}>
            <div style={{ fontSize:24, marginBottom:10 }}>✉️</div>
            <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, color:'var(--text)', marginBottom:6 }}>Check your inbox</div>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--text-dim)' }}>We sent a link to {email}</div>
          </div>
        ) : (
          <>
            <button onClick={handleGoogle} style={{ width:'100%', background:'#FFFFFF', color:'#111', border:'none', borderRadius:14, padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'center', gap:10, fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, cursor:'pointer', marginBottom:14 }}>
              <svg viewBox="0 0 24 24" style={{width:18,height:18,flexShrink:0}}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              <div style={{ flex:1, height:1, background:'var(--hairline)' }}/>
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'var(--text-faint)', fontWeight:600 }}>or</span>
              <div style={{ flex:1, height:1, background:'var(--hairline)' }}/>
            </div>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email address" onKeyDown={e => e.key==='Enter' && handleEmail()} style={{ display:'block', width:'100%', background:'var(--surface)', border:'1px solid var(--hairline)', borderRadius:14, padding:'14px 16px', color:'var(--text)', fontSize:14, outline:'none', marginBottom:10 }}/>
            <div style={{ display:'flex', alignItems:'flex-start', gap:7, marginBottom:14 }}>
              <span style={{ width:4, height:4, borderRadius:50, background:'var(--cyan)', flexShrink:0, marginTop:5 }}/>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'var(--text-faint)', lineHeight:1.5, margin:0 }}>
                Email sign-in won't support Google Calendar sync — use Google above if you want season alerts added directly to your calendar.
              </p>
            </div>
            <button onClick={handleEmail} disabled={loading} className="btn-resume" style={{ width:'100%', border:'none', borderRadius:14, padding:14, fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor:loading?'not-allowed':'pointer', marginBottom:18, opacity:loading?0.7:1 }}>
              {loading ? 'Sending...' : 'Continue with email'}
            </button>
          </>
        )}

        <button onClick={onClose} style={{ display:'block', width:'100%', background:'none', border:'none', color:'var(--text-dim)', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:13, cursor:'pointer', padding:6, textAlign:'center' }}>
          Skip for now
        </button>
      </div>
    </div>
  );
      }
          
