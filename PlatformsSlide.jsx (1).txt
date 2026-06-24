import Dots from './Dots';

function AppIcon({ bg, children }) {
  return (
    <div style={{ width:52, height:52, borderRadius:14, background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 6px 20px rgba(0,0,0,0.4)', color:'#fff', fontWeight:800, fontFamily:'Inter,sans-serif' }}>
      {children}
    </div>
  );
}

export default function PlatformsSlide({ onNext }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 }}>
        <div style={{ display:'flex', gap:10 }}>
          <AppIcon bg="linear-gradient(145deg,#f47521,#e05c00)"><span style={{ fontSize:10 }}>CR</span></AppIcon>
          <AppIcon bg="linear-gradient(145deg,#2e51a2,#1a3a7a)"><span style={{ fontSize:13 }}>MAL</span></AppIcon>
          <AppIcon bg="linear-gradient(145deg,#e50914,#b0060f)"><span style={{ fontSize:18, fontStyle:'italic' }}>N</span></AppIcon>
        </div>
        <div style={{ background:'#1d1d1d', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:'12px 14px', width:'100%', boxShadow:'0 10px 30px rgba(0,0,0,0.4)' }}>
          <p style={{ fontSize:14, fontWeight:500, color:'rgba(255,255,255,0.85)', margin:'0 0 10px', fontFamily:'Inter,sans-serif' }}>Frieren S2 is now on Crunchyroll</p>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:99, padding:'4px 9px 4px 6px', fontSize:11, color:'rgba(255,255,255,0.55)', fontFamily:'Inter,sans-serif' }}>
              <div style={{ width:5, height:5, borderRadius:99, background:'rgba(255,255,255,0.3)' }}/>Available now
            </div>
            <div style={{ marginLeft:'auto', width:28, height:28, borderRadius:99, background:'rgba(255,122,0,0.15)', border:'1px solid rgba(255,122,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><polygon points="3 1 10 6 3 11" fill="#FF7A00"/></svg>
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <AppIcon bg="linear-gradient(145deg,#410099,#2d006b)"><span style={{ fontSize:10 }}>FUNI</span></AppIcon>
          <AppIcon bg="linear-gradient(145deg,#00b4d8,#0077a8)"><span style={{ fontSize:9 }}>HIDIVE</span></AppIcon>
          <AppIcon bg="linear-gradient(145deg,#1c1c1e,#111)"><span style={{ fontSize:10 }}>AppleTV</span></AppIcon>
        </div>
        <div style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:99, padding:'7px 18px', fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.6)', fontFamily:'Inter,sans-serif', marginTop:4 }}>10+ streaming platforms</div>
      </div>
      <div style={{ paddingTop:24 }}>
        <p style={{ fontSize:28, fontWeight:800, color:'#fff', letterSpacing:'-0.02em', lineHeight:1.15, margin:'0 0 10px', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Every platform,<br/>one place.</p>
        <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', lineHeight:1.65, margin:'0 0 28px', fontFamily:'Inter,sans-serif' }}>Crunchyroll, Netflix, HiDive and more — always shown so you always know where to watch.</p>
        <Dots active={1} total={2}/>
        <button onClick={onNext} style={{ width:'100%', height:54, background:'#fff', color:'#000', border:'none', borderRadius:99, fontSize:16, fontWeight:700, cursor:'pointer', marginTop:24, fontFamily:'Inter,sans-serif' }}>Get Started</button>
      </div>
    </div>
  );
}
