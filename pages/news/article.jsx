import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import AboutAnime from '../../components/news/AboutAnime';
import ShareArticleButton from '../../components/news/ShareArticleButton';
import AddToCalendarButton from '../../components/news/AddToCalendarButton';
import ImageLightbox from '../../components/ui/ImageLightbox';
import { PAD } from '../../lib/theme';
import { SOURCE_COLOR, timeAgo } from '../../lib/newsData';

export default function NewsArticle() {
  const router = useRouter();
  const { title, image, summary, source, sourceKey, publishedAt, link } = router.query;
  const [related, setRelated] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [topAnime, setTopAnime] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!title) return;
    fetch(`/api/anime/search?q=${encodeURIComponent(title)}&limit=8`)
      .then(r => r.json())
      .then(d => {
        const results = d.results || [];
        setRelated(results);
        setLoadingRelated(false);
        if (results[0]) {
          fetch(`/api/anime/${results[0].mal_id}`)
            .then(r => r.json())
            .then(d2 => setTopAnime(d2.anime || null))
            .catch(() => {});
        }
      })
      .catch(() => setLoadingRelated(false));
  }, [title]);

  if (!router.isReady || !title) return null;
  const color = SOURCE_COLOR[sourceKey] || 'var(--text-dim)';

  return (
    <Layout>
      {image && (
        <img src={image} alt="" onClick={() => setLightboxOpen(true)} style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', cursor:'zoom-in' }}/>
      )}

      <div style={{ padding:`24px ${PAD}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:1.5, textTransform:'uppercase', color }}>{source}</span>
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--text-faint)' }}>· {timeAgo(publishedAt)}</span>
        </div>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, letterSpacing:'-0.02em', fontSize:'clamp(24px,6vw,34px)', color:'var(--text)', lineHeight:1.25, margin:'0 0 18px' }}>
          {title}
        </h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'var(--text-70)', lineHeight:1.6, margin:'0 0 24px' }}>
          {summary}
        </p>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:14 }}>
          <a href={link} target="_blank" rel="noopener noreferrer" style={{
            display:'inline-block', padding:'12px 20px', borderRadius:50,
            background:'#fff', border:'1px solid var(--orange)', color:'var(--orange)',
            fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, textDecoration:'none',
          }}>
            Read Full Story on {source}
          </a>
          <ShareArticleButton title={title}/>
        </div>
        <AddToCalendarButton title={title}/>
      </div>

      <AboutAnime anime={topAnime}/>

      {(loadingRelated || related.length > 0) && (
        <div style={{ padding:'8px 0 32px' }}>
          <div style={{ padding:`0 ${PAD}`, marginBottom:14, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, textTransform:'uppercase', color:'var(--text-dim)' }}>
            Related Anime
          </div>
          <div className="no-scrollbar" style={{ display:'flex', gap:14, overflowX:'auto', padding:`0 ${PAD}` }}>
            {loadingRelated
              ? Array.from({ length:4 }).map((_, i) => (
                  <div key={i} style={{ width:110, aspectRatio:'46/64', flexShrink:0, borderRadius:8, background:'var(--surface)' }}/>
                ))
              : related.map(a => (
                  <div key={a.mal_id} style={{ width:110, flexShrink:0 }}>
                    {a.image_url ? (
                      <img src={a.image_url} alt={a.title} style={{ width:110, aspectRatio:'46/64', objectFit:'cover', borderRadius:8, marginBottom:8 }}/>
                    ) : (
                      <div style={{ width:110, aspectRatio:'46/64', borderRadius:8, marginBottom:8, background:'var(--surface)', border:'1px solid var(--hairline)' }}/>
                    )}
                    <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:12, color:'var(--text)', lineHeight:1.3, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                      {a.title}
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      )}

      {lightboxOpen && <ImageLightbox src={image} onClose={() => setLightboxOpen(false)}/>}
    </Layout>
  );
}
