import { PAD } from '../../lib/theme';

export default function PageHeader({ eyebrow, title, meta, action }) {
  return (
    <div style={{
      padding:`clamp(36px,8vw,56px) ${PAD} 28px`,
      display:'flex', justifyContent:'space-between', alignItems:'flex-end',
      gap:16, flexWrap:'wrap',
    }}>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <span style={{ width:14, height:2, background:'var(--orange)', display:'inline-block', flexShrink:0 }}/>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>{eyebrow}</span>
        </div>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.02em', fontSize:'clamp(28px,7vw,40px)', color:'var(--text)', margin:'0 0 14px' }}>{title}</h1>
        {meta && (
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:1, color:'var(--text-dim)' }}>{meta}</div>
        )}
      </div>
      {action}
    </div>
  );
}
