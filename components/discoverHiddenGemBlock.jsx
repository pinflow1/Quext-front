import { PAD } from '../../lib/theme';

export default function HiddenGemBlock({ g, index, isLast }) {
  return (
    <div className="editorial-row" style={{
      display:'flex', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
      borderTop:'1px solid var(--hairline)',
      borderBottom: isLast ? '1px solid var(--hairline)' : 'none',
    }}>
      <div className="editorial-image" style={{
        flex:'0 0 38%', aspectRatio:'4/3',
        background:`linear-gradient(150deg,${g.palette[0]},${g.palette[1]})`,
      }}/>
      <div style={{ flex:1, padding:PAD, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--cyan)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>
          {g.genre} · {g.eps} EPS
        </div>
        <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.015em', fontSize:'clamp(20px,5vw,24px)', color:'var(--text)', margin:'0 0 14px' }}>{g.title}</h3>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, lineHeight:1.7, color:'var(--text-60)', maxWidth:460, margin:'0 0 14px' }}>{g.note}</p>
        <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:600, color:'var(--text-dim)', fontStyle:'italic' }}>{g.byline}</span>
      </div>
    </div>
  );
}
