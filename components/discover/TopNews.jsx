import { useState, useEffect } from 'react';
import Link from 'next/link';
import SectionHeader from '../ui/SectionHeader';
import NewsCard from '../news/NewsCard';

export default function TopNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/news/feed')
      .then(r => r.json())
      .then(d => setArticles((d.articles || []).slice(0, 4)))
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  return (
    <div>
      <SectionHeader eyebrow="Today In Anime" title="Top News"/>
      {articles.map(a => <NewsCard key={a.link} article={a}/>)}
      <Link href="/news" style={{
        display:'block', textAlign:'center', padding:'16px 0',
        borderTop:'1px solid var(--hairline)', textDecoration:'none',
        fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:1.5,
        textTransform:'uppercase', color:'var(--orange)',
      }}>
        More News →
      </Link>
    </div>
  );
}
