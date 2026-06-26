import Dots from './Dots';

export default function DiscoverSlide({ onNext }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
      <div style={{ paddingTop:24 }}>
        <p style={{ fontSize:28, fontWeight:800, color:'#fff', letterSpacing:'-0.02em', lineHeight:1.15, margin:'0 0 10px', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          Discover anime<br/>without the noise
        </p>
        <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', lineHeight:1.65, margin:'0 0 28px', fontFamily:'Inter,sans-serif' }}>
          Track what you watch, get instant alerts when new seasons drop, and discover hidden gems matched to your taste.
        </p>
        <Dots active={0} total={2}/>
        <button onClick={onNext} style={{ width:'100%', height:54, background:'#fff', color:'#000', border:'none', borderRadius:99, fontSize:16, fontWeight:700, cursor:'pointer', marginTop:24, fontFamily:'Inter,sans-serif' }}>
          Continue
        </button>
      </div>
    </div>
  );
}
