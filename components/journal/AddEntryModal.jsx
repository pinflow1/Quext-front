import { useState, useEffect, useRef } from 'react';
import { PAD } from '../../lib/theme';

export default function AddEntryModal({ onClose, onSave }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [episode, setEpisode] = useState('');
  const [searching, setSearching] = useState(false);
  const debounce = useRef(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setSearching(true);
      fetch(`/api/anime/search?q=${encodeURIComponent(query)}&limit=6`)
        .then(r => r.json())
        .then(d => setResults(d.results || []))
        .catch(() => setResults([]))
        .finally(() => setSearching(false));
    }, 400);
  }, [query]);

  const handleSave = () => {
    if (!selected || !note.trim()) return;
    onSave({
      anime_mal_id:    selected.mal_id,
      anime_title:     selected.title,
      anime_image_url: selected.image_url || null,
      note:            note.trim(),
      tag:             selected.genres?.[0] || null,
      episode:         episode ? Number(episode) : null,
    });
  };

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--bg)', borderTop:'1px solid var(--hairline)', borderTopLeftRadius:24, borderTopRightRadius:24, width:'100%', maxWidth:560, padding:`28px ${PAD} 32px` }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:18, color:'var(--text)' }}>New Entry</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-dim)', fontSize:22, cursor:'pointer' }}>×</button>
        </div>

        {/* Anime search */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:10 }}>Which anime</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--hairline)', borderRadius:12, padding:'10px 14px', marginBottom:8 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:14, height:14, color:'var(--text-dim)', flexShrink:0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search anime..." style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'var(--text)', fontSize:13, fontFamily:'Inter,sans-serif' }}/>
            {searching && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:'var(--text-faint)' }}>...</span>}
          </div>

          {selected && (
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:'var(--orange-tint)', border:'1px solid var(--orange)', borderRadius:10, marginBottom:8 }}>
              {selected.image_url && <img src={selected.image_url} style={{ width:28, height:38, objectFit:'cover', borderRadius:4, flexShrink:0 }} alt=""/>}
              <span style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:12, color:'var(--orange)', flex:1 }}>{selected.title}</span>
              <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', color:'var(--orange)', cursor:'pointer', fontSize:16 }}>×</button>
            </div>
          )}

          {results.length > 0 && !selected && (
            <div style={{ border:'1px solid var(--hairline)', borderRadius:12, overflow:'hidden', maxHeight:160, overflowY:'auto' }}>
              {results.map((a,i) => (
                <div key={a.mal_id} onClick={() => { setSelected(a); setQuery(''); setResults([]); }} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderTop: i===0?'none':'1px solid var(--hairline)', cursor:'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  {a.image_url && <img src={a.image_url} style={{ width:24, height:34, objectFit:'cover', borderRadius:3, flexShrink:0 }} alt=""/>}
                  <div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:12, color:'var(--text)' }}>{a.title}</div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:'var(--text-dim)' }}>{a.genres?.slice(0,2).join(' · ')}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Note + Episode */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:10 }}>Your thoughts</div>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="What stood out? Any moments that hit different?" rows={3}
            style={{ width:'100%', background:'transparent', border:'none', borderBottom:'1px solid var(--hairline)', padding:'0 0 12px', color:'var(--text)', fontSize:14, fontFamily:'Inter,sans-serif', outline:'none', resize:'none', lineHeight:1.7, marginBottom:14 }}/>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', flexShrink:0 }}>Episode</div>
            <input
              type="number" min="1" placeholder="e.g. 14"
              value={episode} onChange={e => setEpisode(e.target.value)}
              style={{ width:80, background:'transparent', border:'none', borderBottom:'1px solid var(--hairline)', padding:'4px 0', color:'var(--text)', fontSize:13, fontFamily:"'IBM Plex Mono',monospace", outline:'none', textAlign:'center' }}
            />
          </div>
        </div>

        <button onClick={handleSave} disabled={!selected || !note.trim()} className="btn-resume" style={{ width:'100%', border:'none', borderRadius:50, padding:14, fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor: selected && note.trim() ? 'pointer' : 'not-allowed', opacity: selected && note.trim() ? 1 : 0.5 }}>
          Save Entry
        </button>
      </div>
    </div>
  );
}
