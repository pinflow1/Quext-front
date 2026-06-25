import { PAD } from '../../lib/theme';

const ARROW = {
  up:   { sym:'▲', col:'var(--cyan)' },
  down: { sym:'▼', col:'var(--red)' },
  same: { sym:'–', col:'var(--text-faint)' },
};

export default function TrendingRow({ t, isFirst }) {
  const a = ARROW[t.change];
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'clamp(8px,3vw,18px)', padding:`16px ${PAD}`,
      borderTop: isFirst ? '1px solid var(--hairline)' : 'none', borderBottom:'1px solid var(--hairline)',
    }}>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color:'var(--text-dim)', width:18, flexShrink:0 }}>{t.rank}</span>
      <span style={{ color:a.col, fontSize:11, width:14, flexShrink:0 }}>{a.sym}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.title}</div>
        <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'var(--text-dim)', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.blurb}</div>
      </div>
      <div style={{ width:'clamp(50px,14vw,90px)', flexShrink:0 }}>
        <div style={{ height:3, background:'var(--track-2)' }}>
          <div style={{ height:'100%', width:`${t.score}%`, background:'var(--orange)' }}/>
        </div>
      </div>
    </div>
  );
}
