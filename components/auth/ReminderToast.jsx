export default function ReminderToast({ message, onSignIn, onClose }) {
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'var(--bg)', border:'1px solid var(--hairline)', borderRadius:18,
        width:'100%', maxWidth:320, padding:24, textAlign:'center',
      }}>
        <div style={{ width:36, height:36, borderRadius:50, background:'var(--orange-tint)', border:'1px solid var(--orange)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.01em', fontSize:16, color:'var(--text)', marginBottom:8 }}>Sign in required</div>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)', lineHeight:1.5, margin:'0 0 20px' }}>{message}</p>
        <button onClick={onSignIn} className="btn-resume" style={{
          width:'100%', border:'none', borderRadius:50, padding:12,
          fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:13, cursor:'pointer', marginBottom:10,
        }}>Sign In</button>
        <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-faint)', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:12, cursor:'pointer' }}>Not now</button>
      </div>
    </div>
  );
}
