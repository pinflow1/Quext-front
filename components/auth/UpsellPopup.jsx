export default function UpsellPopup({ onUpgrade, onClose }) {
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'var(--bg)', border:'1px solid var(--hairline)', borderRadius:18,
        width:'100%', maxWidth:320, padding:24, textAlign:'center',
      }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--cyan)', textTransform:'uppercase', marginBottom:10 }}>Quext Premium</div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.01em', fontSize:18, color:'var(--text)', marginBottom:8 }}>Enjoying Quext?</div>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)', lineHeight:1.6, margin:'0 0 20px' }}>
          Go Premium to remove sponsored picks and unlock custom themes — just $2.99/mo.
        </p>
        <button onClick={onUpgrade} className="btn-resume" style={{
          width:'100%', border:'none', borderRadius:50, padding:12,
          fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:13, cursor:'pointer', marginBottom:10,
        }}>Go Premium</button>
        <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-faint)', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:12, cursor:'pointer' }}>Maybe later</button>
      </div>
    </div>
  );
}
