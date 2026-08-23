import { PAD } from '../../lib/theme';

// Real Jikan-sourced synopsis/genres for the anime a news story is
// about — legitimately licensed data, not pulled from the article.
export default function AboutAnime({ anime }) {
  if (!anime?.synopsis) return null;

  return (
    <div style={{ padding:`0 ${PAD} 32px` }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', color:'var(--text-dim)', marginBottom:12 }}>
        About {anime.title}
      </div>
      <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, lineHeight:1.7, color:'var(--text-60)', margin:'0 0 14px' }}>
        {anime.synopsis}
      </p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {anime.genres?.slice(0, 4).map(g => (
          <span key={g} style={{
            fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:0.5, textTransform:'uppercase',
            color:'var(--text-dim)', border:'1px solid var(--hairline)', borderRadius:4, padding:'4px 8px',
          }}>{g}</span>
        ))}
      </div>
    </div>
  );
}
