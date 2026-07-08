import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/ui/PageHeader';
import PlatformFilter from '../components/news/PlatformFilter';
import NewsList from '../components/news/NewsList';
import { PAD } from '../lib/theme';

const FILTER_TO_KEY = { Crunchyroll:'crunchyroll', MyAnimeList:'mal', ANN:'ann' };

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedSources, setFailedSources] = useState([]);
  const [active, setActive] = useState('All');

  useEffect(() => {
    fetch('/api/news/feed')
      .then(r => r.json())
      .then(d => {
        setArticles(d.articles || []);
        setFailedSources(d.failedSources || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'All'
    ? articles
    : articles.filter(a => a.sourceKey === FILTER_TO_KEY[active]);

  return (
    <Layout>
      <PageHeader eyebrow="Straight From The Source" title="News" meta={`${articles.length} STORIES · UPDATED HOURLY`}/>
      {failedSources.length > 0 && (
        <div style={{ margin:`0 ${PAD} 16px`, padding:'10px 14px', border:'1px solid var(--hairline)', borderRadius:10, fontFamily:'Inter,sans-serif', fontSize:11, color:'var(--text-faint)', lineHeight:1.6 }}>
          {failedSources.map(f => <div key={f.name}>Couldn't reach {f.name}{f.reason ? `: ${f.reason}` : ''}</div>)}
        </div>
      )}
      <PlatformFilter active={active} setActive={setActive}/>
      <NewsList articles={filtered} loading={loading}/>
    </Layout>
  );
}
