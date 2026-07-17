export default function Splash() {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:64, height:64, borderRadius:20, background:'#0f0f0f', border:'1px solid rgba(255,122,0,0.25)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
        <img src="/images/logo.png" alt="Quext" width={38} height={38} style={{ objectFit:'contain' }}/>
      </div>
      <div style={{ fontSize:28, fontWeight:800, color:'#fff', letterSpacing:-1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Quext</div>
      <div style={{ fontSize:13, color:'rgba(255,255,255,0.35)', marginTop:8, fontFamily:'Inter,sans-serif' }}>Your anime, always up to date</div>
    </div>
  );
}
