import { useState } from 'react';
import Layout from '../components/Layout';

const ANIME = [
  { id:1,  title:"Frieren: Beyond Journey's End", genre:"Fantasy · Adventure",   cur:14, palette:["#0d1a0a","#1a3010","#4a8030"] },
  { id:2,  title:"Vinland Saga",                  genre:"Historical · Action",    cur:24, palette:["#0a0d1a","#101830","#304080"] },
  { id:3,  title:"Dungeon Meshi",                 genre:"Fantasy · Comedy",       cur:8,  palette:["#1a0d00","#302010","#806030"] },
  { id:4,  title:"Demon Slayer",                  genre:"Action · Supernatural",  cur:44, palette:["#1a0505","#300a0a","#802020"] },
  { id:5,  title:"Mushishi",                      genre:"Mystery · Supernatural", cur:3,  palette:["#051a0d","#0a3018","#208040"] },
  { id:6,  title:"Houseki no Kuni",               genre:"Sci-Fi · Drama",         cur:12, palette:["#05050d","#0a0a30","#2020a0"] },
  { id:7,  title:"Planetes",                      genre:"Sci-Fi · Slice of Life", cur:10, palette:["#0d0d05","#1a1a08","#504820"] },
  { id:8,  title:"Serial Experiments Lain",       genre:"Sci-Fi · Psychological", cur:5,  palette:["#050508","#0a0a18","#303060"] },
];

const INITIAL_ENTRIES = [
  { id:1, animeId:1, title:"Frieren: Beyond Journey's End", note:"The way grief is portrayed through an elf's perspective is unlike anything I've seen. Episode 14 hit different.", date:"Jun 14, 2026", ep:"Ep 14", tag:"Fantasy" },
  { id:2, animeId:3, title:"Dungeon Meshi", note:"Chilchuck is carrying this show comedically but the world building underneath is surprisingly deep.", date:"Jun 12, 2026", ep:"Ep 8", tag:"Comedy" },
  { id:3, animeId:5, title:"Mushishi", note:"This is what I watch when I want to feel like I'm floating. No other show has this atmosphere.", date:"Jun 10, 2026", ep:"Ep 3", tag:"Mystery" },
  { id:4, animeId:7, title:"Planetes", note:"Tanabe is annoying at first but you slowly realise she's the emotional core of the whole story.", date:"Jun 8, 2026", ep:"Ep 10", tag:"Sci-Fi" },
];

const C = { bg:"#080808", surface:"#0f0f0f", border:"#1c1c1c", orange:"#F5A020", white:"#ffffff", muted:"rgba(255,255,255,0.38)" };

export default function Journal() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All tags');
  const [adding, setAdding] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(ANIME[0]);
  const [note, setNote] = useState('');

  const tags = ['All tags', ...new Set(entries.map(e => e.tag))];
  const filtered = entries.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.note.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All tags' || e.tag === activeTag;
    return matchSearch && matchTag;
  });

  const saveEntry = () => {
    if (!note.trim()) return;
    setEntries(prev => [{
      id: Date.now(), animeId: selectedAnime.id,
      title: selectedAnime.title, note: note.trim(),
      date: new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }),
      ep: `Ep ${selectedAnime.cur}`, tag: selectedAnime.genre.split(' · ')[0]
    }, ...prev]);
    setNote('');
    setAdding(false);
  };

  return (
    <Layout>
      <div style={{ padding:'28px 0 60px' }}>
        {/* Header */}
        <div style={{ padding:'0 20px', marginBottom:20 }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:C.white, letterSpacing:-1, marginBottom:16 }}>My Journal</h1>

          {/* Search */}
          <div style={{ display:'flex', alignItems:'center', gap:10, background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'11px 16px', marginBottom:14 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:15,height:15,color:C.muted,flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search entries..." style={{ flex:1, background:'transparent', border:'none', outline:'none', color:C.white, fontSize:13, fontFamily:'inherit' }}/>
          </div>

          {/* Tags */}
          <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none' }} className="no-scrollbar">
            {tags.map(t => (
              <button key={t} onClick={() => setActiveTag(t)} style={{
                flexShrink:0, padding:'5px 14px', borderRadius:50,
                border:`1.5px solid ${activeTag===t ? C.orange : C.border}`,
                background: activeTag===t ? C.white : 'transparent',
                color: activeTag===t ? C.orange : C.muted,
                fontWeight:700, fontSize:11, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap'
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Entries */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'0 20px' }}>
          {filtered.map(e => {
            const anime = ANIME.find(a => a.id === e.animeId);
            return (
              <div key={e.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:16, cursor:'pointer', transition:'border-color 0.2s' }}
                onMouseEnter={el => el.currentTarget.style.borderColor='rgba(245,160,32,0.25)'}
                onMouseLeave={el => el.currentTarget.style.borderColor=C.border}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                  <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background: anime ? `linear-gradient(135deg,${anime.palette[0]},${anime.palette[1]})` : '#1a1a1a' }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white, marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.title}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{e.date} · {e.ep}</div>
                  </div>
                  <span style={{ fontSize:9, fontWeight:700, padding:'3px 9px', borderRadius:50, background:'rgba(245,160,32,0.08)', color:C.orange, border:'1px solid rgba(245,160,32,0.2)', whiteSpace:'nowrap' }}>{e.tag}</span>
                </div>
                <p style={{ fontSize:12, color:'rgba(255,255,255,0.55)', lineHeight:1.6, margin:0 }}>{e.note}</p>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'40px 0', color:C.muted, fontSize:13 }}>No entries yet. Add your first one!</div>
          )}
        </div>

        {/* FAB */}
        <button onClick={() => setAdding(true)} style={{
          position:'fixed', bottom:90, right:24,
          background:C.white, color:C.orange, border:`1.5px solid ${C.orange}`,
          borderRadius:50, padding:'14px 22px',
          fontWeight:800, fontSize:14, cursor:'pointer',
          boxShadow:'0 8px 24px rgba(0,0,0,0.5)',
          display:'flex', alignItems:'center', gap:8, zIndex:40
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:16,height:16}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Entry
        </button>

        {/* Add entry modal */}
        {adding && (
          <div onClick={() => setAdding(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(16px)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center', padding:'0 0 20px' }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#111', border:`1px solid ${C.border}`, borderRadius:24, width:'100%', maxWidth:520, padding:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <div style={{ fontSize:15, fontWeight:700, color:C.white }}>New Journal Entry</div>
                <button onClick={() => setAdding(false)} style={{ background:'transparent', border:'none', color:C.muted, fontSize:20, cursor:'pointer' }}>×</button>
              </div>

              {/* Anime picker */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:C.muted, textTransform:'uppercase', marginBottom:10 }}>Anime</div>
                <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none', paddingBottom:4 }} className="no-scrollbar">
                  {ANIME.map(a => (
                    <button key={a.id} onClick={() => setSelectedAnime(a)} style={{
                      flexShrink:0, padding:'6px 14px', borderRadius:50,
                      border:`1.5px solid ${selectedAnime?.id===a.id ? C.orange : C.border}`,
                      background: selectedAnime?.id===a.id ? C.white : 'transparent',
                      color: selectedAnime?.id===a.id ? C.orange : C.muted,
                      fontWeight:700, fontSize:11, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap'
                    }}>{a.title.split(':')[0]}</button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:C.muted, textTransform:'uppercase', marginBottom:10 }}>Your thoughts</div>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="What stood out? Any moments that hit different?" rows={4}
                  style={{ width:'100%', background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:14, color:C.white, fontSize:13, fontFamily:'inherit', outline:'none', resize:'none', lineHeight:1.6 }}/>
              </div>

              <button onClick={saveEntry} style={{ width:'100%', background:C.white, color:C.orange, border:`1.5px solid ${C.orange}`, borderRadius:50, padding:14, fontWeight:800, fontSize:14, cursor:'pointer' }}>
                Save Entry
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.22)!important;}`}</style>
    </Layout>
  );
}
