import { useState, useEffect, useRef } from 'react';
import { PAD } from '../../lib/theme';

export default function DiscoverSearch({ onAddJournal }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounce = useRef(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setLoading(true);
      fetch(`/api/anime/search?q=${encodeURIComponent(query)}`)
        .then(r => r.json())
        .then(d => setResults(d.results || []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 400);
  }, [query]);

  return (
    <div style={{ padding:`24px ${PAD} 0` }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, background:'var(--surface)', border:'1px solid var(--hairline)', borderRadius:14, padding:'12px 16px', marginBottom: results.length ? 12 : 0 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:16, height:16, color:'var(--text-dim)', flexShrink:0 }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search any anime..." style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'var(--text)', fontSize:14, fontFamily:'Inter,sans-serif' }}/>
        {loading && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--text-faint)' }}>...</span>}
        {query && <button onClick={() => { setQuery(''); setResults([]); }} style={{ background:'none', border:'none', color:'var(--text-dim)', cursor:'pointer', fontSize:16, padding:0 }}>×</button>}
      </div>

      {results.length > 0 && (
        <div style={{ border:'1px solid var(--hairline)', borderRadius:14, overflow:'hidden', marginBottom:24 }}>
          {results.map((a, i) => (
            <div key={a.mal_id} style={{ display:'flex', gap:12, alignItems:'center', padding:'12px 16px', borderTop: i===0 ? 'none' : '1px solid var(--hairline)', cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              {a.image_url && <img src={a.image_url} alt={a.title} style={{ width:36, height:50, objectFit:'cover', flexShrink:0, borderRadius:4 }}/>}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.title}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:'var(--text-dim)' }}>{a.genres?.slice(0,2).join(' · ')} {a.score ? `· ★ ${a.score}` : ''}</div>
              </div>
              <button onClick={() => onAddJournal(a)} style={{ background:'var(--orange-tint)', border:'1.5px solid var(--orange)', color:'var(--orange)', borderRadius:50, padding:'5px 12px', fontSize:11, fontWeight:700, cursor:'pointer', flexShrink:0 }}>+ Add</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
