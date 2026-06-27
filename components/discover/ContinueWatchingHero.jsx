import { PAD } from '../../lib/theme';
import { NOW_PLAYING } from '../../lib/animeData';

// anime prop: static shape (palette array) OR live Jikan shape (image_url, genres array)
export default function ContinueWatchingHero({ anime: propAnime, onWatchClick, isLive }) {
  const anime = isLive ? null : (propAnime || NOW_PLAYING);
  const live = isLive ? propAnime : null;

  const title    = isLive ? live?.title    : anime.title;
  const note     = isLive ? live?.synopsis?.slice(0, 120) + '...' : anime.note;
  const ep       = isLive ? 1              : anime.ep;
  const total    = isLive ? live?.episodes || '?' : anime.total;
  const pct      = isLive ? 0             : Math.round((anime.ep / anime.total) * 100);
  const imgUrl   = isLive ? live?.image_url : null;
  const palette  = isLive ? null           : anime.palette;

  const bgStyle = imgUrl
    ? { backgroundImage:`url(${imgUrl})`, backgroundSize:'cover', backgroundPosition:'center' }
    : { background:`linear-gradient(120deg, ${palette[0]} 0%, ${palette[1]} 55%, ${palette[2]}33 100%)` };

  return (
    <div style={{ position:'relative', height:'min(72vh, 560px)', minHeight:420, overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, ...bgStyle }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--bg) 0%, transparent 45%)' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, var(--hero-fade) 0%, transparent 55%)' }}/>

      <div style={{ position:'absolute', left:0, bottom:0, right:0, padding:`0 ${PAD} 40px` }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--orange)', marginBottom:14, textTransform:'uppercase' }}>
          {isLive ? 'Now Airing' : `Continue Watching — Ep ${ep} of ${total}`}
        </div>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:'clamp(2.2rem,7vw,4.2rem)', letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 14px', lineHeight:0.98, maxWidth:680 }}>
          {title}
        </h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'var(--text-65)', maxWidth:440, lineHeight:1.6, marginBottom:26 }}>
          {note}
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, flexWrap:'wrap' }}>
          <button onClick={() => onWatchClick(title, 'Crunchyroll')} className="btn-resume" style={{ border:'none', borderRadius:50, padding:'13px 26px', fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
            {isLive ? 'Watch Now' : `Resume Episode ${ep + 1}`}
          </button>
        </div>
        {!isLive && (
          <div style={{ maxWidth:440 }}>
            <div style={{ height:2, background:'var(--track)' }}>
              <div style={{ height:'100%', width:`${pct}%`, background:'var(--orange)' }}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--text-dim)' }}>
              <span>{pct}% COMPLETE</span><span>{total - ep} EPISODES LEFT</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
