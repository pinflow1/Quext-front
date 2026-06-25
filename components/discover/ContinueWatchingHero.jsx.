import { PAD } from '../../lib/theme';

export default function ContinueWatchingHero({ anime, onWatchClick }) {
  const pct = Math.round((anime.ep / anime.total) * 100);
  return (
    <div style={{ position:'relative', height:'min(72vh, 560px)', minHeight:420, overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(120deg, ${anime.palette[0]} 0%, ${anime.palette[1]} 55%, ${anime.palette[2]}33 100%)` }}/>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 75% 30%, ${anime.palette[2]}22 0%, transparent 60%)` }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--bg) 0%, transparent 45%)' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, var(--hero-fade) 0%, transparent 55%)' }}/>

      <div style={{ position:'absolute', left:0, bottom:0, right:0, padding:`0 ${PAD} 40px` }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--orange)', marginBottom:14, textTransform:'uppercase' }}>
          Continue Watching — Ep {anime.ep} of {anime.total}
        </div>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:'clamp(2.2rem,7vw,4.2rem)', letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 14px', lineHeight:0.98, maxWidth:680 }}>
          {anime.title}
        </h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'var(--text-65)', maxWidth:440, lineHeight:1.6, marginBottom:26 }}>
          {anime.note}
        </p>

        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, flexWrap:'wrap' }}>
          <button onClick={() => onWatchClick(anime.title, 'Crunchyroll')} className="btn-resume" style={{
            border:'none', borderRadius:50, padding:'13px 26px',
            fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor:'pointer',
            display:'flex', alignItems:'center', gap:8,
          }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Resume Episode {anime.ep + 1}
          </button>
        </div>

        <div style={{ maxWidth:440 }}>
          <div style={{ height:2, background:'var(--track)' }}>
            <div style={{ height:'100%', width:`${pct}%`, background:'var(--orange)' }}/>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--text-dim)' }}>
            <span>{pct}% COMPLETE</span>
            <span>{anime.total - anime.ep} EPISODES LEFT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
