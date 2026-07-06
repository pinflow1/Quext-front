import { PAD } from '../../lib/theme';
import { SOURCE_COLOR, timeAgo } from '../../lib/newsData';

export default function NewsCard({ article }) {
  const color = SOURCE_COLOR[article.sourceKey] || 'var(--text-dim)';

  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>
      <div style={{ display:'flex', gap:14, padding:`16px ${PAD}`, borderTop:'1px solid var(--hairline)', cursor:'pointer' }}
        onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
        onMouseLeave={e => e.currentTarget.style.background='transparent'}>

        {article.image ? (
          <img src={article.image} alt="" style={{ width:72, height:72, objectFit:'cover', borderRadius:8, flexShrink:0 }}/>
        ) : (
          <div style={{ width:72, height:72, borderRadius:8, flexShrink:0, background:'var(--surface)', border:'1px solid var(--hairline)' }}/>
        )}

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:1.5, textTransform:'uppercase', color }}>{article.source}</span>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:'var(--text-faint)' }}>· {timeAgo(article.publishedAt)}</span>
          </div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:14, color:'var(--text)', lineHeight:1.35, marginBottom:6, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
            {article.title}
          </div>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--text-dim)', lineHeight:1.5, margin:0, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
            {article.summary}
          </p>
        </div>
      </div>
    </a>
  );
                    }
          
