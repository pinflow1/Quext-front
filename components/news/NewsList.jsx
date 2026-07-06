import { PAD } from '../../lib/theme';
import NewsCard from './NewsCard';

export default function NewsList({ articles, loading }) {
  if (loading) {
    return (
      <div style={{ padding:`40px ${PAD}`, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>
        Loading news...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div style={{ padding:`40px ${PAD}`, fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)' }}>
        No articles found for this filter.
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:80 }}>
      {articles.map((a, i) => <NewsCard key={a.link + i} article={a}/>)}
    </div>
  );
}
