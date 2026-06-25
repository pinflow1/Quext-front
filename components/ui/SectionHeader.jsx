import { PAD } from '../../lib/theme';

export default function SectionHeader({ eyebrow, title }) {
  return (
    <div style={{ padding:`clamp(36px,8vw,56px) ${PAD} 24px` }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
        <span style={{ width:14, height:2, background:'var(--orange)', display:'inline-block', flexShrink:0 }}/>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:'clamp(22px,5vw,30px)', letterSpacing:'-0.015em', color:'var(--text)', margin:0 }}>{title}</h2>
    </div>
  );
}
