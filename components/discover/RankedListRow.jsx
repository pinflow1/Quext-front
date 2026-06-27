import { PAD } from '../../lib/theme';

export default function RankedListRow({ a, isFirst }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'clamp(10px,3vw,20px)',
      padding:`16px ${PAD}`, borderTop: isFirst ? '1px solid var(--hairline)' : 'none',
      borderBottom:'1px solid var(--hairline)', cursor:'pointer',
    }}
    onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
      <span style={{
        fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.02em',
        fontSize:'clamp(28px,7vw,42px)', lineHeight:1,
        color: a.rank===1 ? 'var(--orange)' : 'var(--rank-faint)',
        width:'clamp(38px,9vw,56px)', flexShrink:0,
        WebkitTextStroke: a.rank===1 ? 'none' : '1px var(--num-stroke)',
        WebkitTextFillColor: a.rank===1 ? 'var(--orange)' : 'transparent',
      }}>{String(a.rank).padStart(2,'0')}</span>

      {a.image_url ? (
        <img src={a.image_url} alt={a.title} style={{ width:'clamp(34px,8vw,46px)', aspectRatio:'46/64', flexShrink:0, objectFit:'cover' }}/>
      ) : (
        <div style={{ width:'clamp(34px,8vw,46px)', aspectRatio:'46/64', flexShrink:0, background:`linear-gradient(160deg,${a.palette[0]},${a.palette[1]})` }}/>
      )}

      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'clamp(13px,3vw,15px)', color:'var(--text)', marginBottom:4 }}>{a.title}</div>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-dim)' }}>{a.eps} EPISODES</div>
      </div>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'clamp(16px,4vw,20px)', fontWeight:600, color:'var(--orange)', flexShrink:0 }}>{a.score}</div>
    </div>
  );
}
