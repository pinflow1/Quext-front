import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PAD } from '../../lib/theme';
import { SOURCE_COLOR } from '../../lib/newsData';

// Separate from the release grid on purpose — that grid and its
// "Add to Google Calendar" modal are built around one anime
// release per day; news doesn't fit that shape (a day can have
// both, and syncing a headline to Google Calendar doesn't make
// sense the way syncing a release date does).
export default function CalendarNewsList({ month, year }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/news/feed')
      .then(r => r.json())
      .then(d => {
        const inMonth = (d.articles || []).filter(a => {
          const pub = new Date(a.publishedAt);
          return pub.getMonth() === month && pub.getFullYear() === year;
        });
        setArticles(inMonth);
      })
      .catch(() => {});
  }, [month, year]);

  if (articles.length === 0) return null;

  return (
    <>
      <div style={{ padding:`0 ${PAD} 16px` }}>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>News This Month</span>
      </div>
      <div style={{ paddingBottom:40 }}>
        {articles.map(a => (
          <Link key={a.link} href={{
            pathname: '/news/article',
            query: { title:a.title, image:a.image||'', summary:(a.summary||'').slice(0,150), source:a.source, sourceKey:a.sourceKey, publishedAt:a.publishedAt||'', link:a.link },
          }} style={{ display:'flex', alignItems:'center', gap:12, padding:`12px ${PAD}`, borderTop:'1px solid var(--hairline)', textDecoration:'none' }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, color:'var(--text-70)', width:24, flexShrink:0 }}>
              {new Date(a.publishedAt).getDate()}
            </span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, color:'var(--text)', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical' }}>
                {a.title}
              </div>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:1, textTransform:'uppercase', color: SOURCE_COLOR[a.sourceKey] || 'var(--text-dim)' }}>
                {a.source}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
