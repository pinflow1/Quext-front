import { useState, useEffect, useRef, useCallback } from 'react';
import { PAD } from '../../lib/theme';

export default function HeroCarousel({ items, onWatchClick }) {
  const [active, setActive] = useState(0);
  const timer = useRef(null);
  const startX = useRef(null);

  const next = useCallback(() => setActive(i => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setActive(i => (i - 1 + items.length) % items.length), [items.length]);

  const resetTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(next, 15000);
  }, [next]);

  useEffect(() => {
    if (!items.length) return;
    resetTimer();
    return () => clearInterval(timer.current);
  }, [items.length, resetTimer]);

  const onTouchStart = e => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetTimer(); }
    startX.current = null;
  };

  if (!items.length) return null;
  const a = items[active];
  const bg = a.image_url
    ? { backgroundImage:`url(${a.image_url})`, backgroundSize:'cover', backgroundPosition:'center top' }
    : { background:'linear-gradient(120deg,#1a1006 0%,#2e1c08 55%,rgba(255,122,0,0.2) 100%)' };

  return (
    <div style={{ position:'relative', height:'min(72vh,560px)', minHeight:420, overflow:'hidden', userSelect:'none' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div style={{ position:'absolute', inset:0, ...bg, transition:'background 0.6s ease' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, var(--hero-fade) 0%, transparent 60%)' }}/>

      <div style={{ position:'absolute', left:0, bottom:0, right:0, padding:`0 ${PAD} 44px` }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--orange)', marginBottom:12, textTransform:'uppercase' }}>Now Airing</div>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:'clamp(1.8rem,6vw,3.6rem)', letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 10px', lineHeight:1.05, maxWidth:600 }}>{a.title}</h1>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-dim)', marginBottom:14, letterSpacing:1 }}>
          {a.genres?.slice(0,3).join(' · ')}
          {a.score && <span style={{ color:'var(--orange)', marginLeft:12 }}>★ {a.score}</span>}
        </div>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-65)', maxWidth:420, lineHeight:1.6, marginBottom:22, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{a.synopsis}</p>
        <button onClick={() => onWatchClick(a.title, 'Crunchyroll')} className="btn-resume" style={{ border:'none', borderRadius:50, padding:'12px 24px', fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{width:13,height:13}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Watch Now
        </button>
      </div>

      {/* Swipe dots */}
      <div style={{ position:'absolute', bottom:18, right:PAD, display:'flex', gap:5, alignItems:'center' }}>
        {items.map((_,i) => (
          <button key={i} onClick={() => { setActive(i); resetTimer(); }} style={{
            width: i===active ? 20 : 6, height:6, borderRadius:99, border:'none', padding:0, cursor:'pointer',
            background: i===active ? 'var(--orange)' : 'rgba(255,255,255,0.25)',
            transition:'all 0.3s ease',
          }}/>
        ))}
      </div>
    </div>
  );
}
