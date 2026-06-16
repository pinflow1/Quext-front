import { useState } from 'react';
import Layout from '../components/Layout';

// ── FAKE DATA — replace with real API later ──
const ANIME = [
  { id:1,  title:"Frieren: Beyond Journey's End", genre:"Fantasy · Adventure",   ep:28, rating:9.4, status:"Watching",  cur:14, palette:["#0d1a0a","#1a3010","#4a8030"] },
  { id:2,  title:"Vinland Saga",                  genre:"Historical · Action",    ep:48, rating:9.1, status:"Paused",    cur:24, palette:["#0a0d1a","#101830","#304080"] },
  { id:3,  title:"Dungeon Meshi",                 genre:"Fantasy · Comedy",       ep:24, rating:9.2, status:"Watching",  cur:8,  palette:["#1a0d00","#302010","#806030"] },
  { id:4,  title:"Demon Slayer",                  genre:"Action · Supernatural",  ep:44, rating:8.7, status:"Completed", cur:44, palette:["#1a0505","#300a0a","#802020"] },
  { id:5,  title:"Mushishi",                      genre:"Mystery · Supernatural", ep:26, rating:9.0, status:"Watching",  cur:3,  palette:["#051a0d","#0a3018","#208040"] },
  { id:6,  title:"Houseki no Kuni",               genre:"Sci-Fi · Drama",         ep:12, rating:9.3, status:"Completed", cur:12, palette:["#05050d","#0a0a30","#2020a0"] },
  { id:7,  title:"Planetes",                      genre:"Sci-Fi · Slice of Life", ep:26, rating:8.8, status:"Watching",  cur:10, palette:["#0d0d05","#1a1a08","#504820"] },
  { id:8,  title:"Ping Pong the Animation",       genre:"Sports · Drama",         ep:11, rating:8.9, status:"Completed", cur:11, palette:["#0d0505","#201010","#603030"] },
  { id:9,  title:"Made in Abyss",                 genre:"Adventure · Fantasy",    ep:25, rating:9.1, status:"Paused",    cur:13, palette:["#05100d","#0a2018","#206050"] },
  { id:10, title:"Neon Genesis Evangelion",       genre:"Mecha · Psychological",  ep:26, rating:9.0, status:"Completed", cur:26, palette:["#0a0505","#181010","#502030"] },
  { id:11, title:"Serial Experiments Lain",       genre:"Sci-Fi · Psychological", ep:13, rating:8.7, status:"Watching",  cur:5,  palette:["#050508","#0a0a18","#303060"] },
  { id:12, title:"Mob Psycho 100",                genre:"Action · Supernatural",  ep:37, rating:9.1, status:"Completed", cur:37, palette:["#0d0a00","#201800","#604800"] },
];

const ROWS = [
  { label:"Continue Watching", anime: ANIME.filter(a=>a.status==="Watching"), progress:true },
  { label:"💎 Hidden Gems",    anime: [ANIME[4],ANIME[5],ANIME[6],ANIME[7],ANIME[8]], progress:false },
  { label:"Top Rated",         anime: [ANIME[0],ANIME[5],ANIME[1],ANIME[11],ANIME[8],ANIME[9]], progress:false },
  { label:"New Season Alert",  anime: [ANIME[1],ANIME[0],ANIME[2],ANIME[8]], progress:false },
];

const STREAM = { Crunchyroll:"#F47521", Netflix:"#E50914", HiDive:"#00AEEF" };
const GENRES = ["All","Action","Fantasy","Mystery","Sci-Fi","Drama","Sports"];

function Poster({ anime, width=130, showProgress=false, onClick }) {
  const h = Math.round(width * 1.48);
  const pct = Math.round((anime.cur / anime.ep) * 100);
  return (
    <div onClick={() => onClick(anime)} style={{
      width, height: h, borderRadius: 10, flexShrink: 0, cursor: 'pointer',
      position: 'relative', overflow: 'hidden',
      background: `linear-gradient(160deg, ${anime.palette[0]} 0%, ${anime.palette[1]} 50%, ${anime.palette[2]}44 100%)`,
      transition: 'transform 0.25s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
    onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 30% 20%, ${anime.palette[2]}33 0%, transparent 60%)`
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
        padding: '24px 10px 10px'
      }}>
        {showProgress && (
          <div style={{ height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 6 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#F5A020', borderRadius: 2 }} />
          </div>
        )}
        <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{anime.title}</div>
      </div>
      <div style={{
        position: 'absolute', top: 8, right: 8,
        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
        borderRadius: 6, padding: '3px 6px', fontSize: 10, fontWeight: 800, color: '#F5A020'
      }}>★ {anime.rating}</div>
    </div>
  );
}

function ContentRow({ label, anime, progress, onSelect }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 14, padding: '0 20px', letterSpacing: -0.3 }}>{label}</div>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 20px', scrollbarWidth: 'none' }}
        className="no-scrollbar">
        {anime.map(a => <Poster key={a.id} anime={a} showProgress={progress} onClick={onSelect} />)}
      </div>
    </div>
  );
}

function Hero({ anime, onSelect }) {
  return (
    <div style={{ position: 'relative', height: 460, marginBottom: 32, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${anime.palette[0]} 0%, ${anime.palette[1]} 40%, ${anime.palette[2]}55 100%)`
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 70% 30%, ${anime.palette[2]}44 0%, transparent 55%)`
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,8,8,0.95) 35%, rgba(8,8,8,0.3) 70%, rgba(8,8,8,0.1) 100%)'
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(to top, #080808 0%, transparent 100%)'
      }} />

      {/* Floating poster */}
      <div style={{ position: 'absolute', right: 48, top: '50%', transform: 'translateY(-50%)' }}>
        <Poster anime={anime} width={160} onClick={() => {}} />
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)', maxWidth: 340 }}>
        <div style={{
          display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: '#F5A020', marginBottom: 12,
          background: 'rgba(245,160,32,0.08)', border: '1px solid rgba(245,160,32,0.2)',
          borderRadius: 50, padding: '4px 12px'
        }}>✦ Editor's Pick</div>
        <h1 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: -1, lineHeight: 1.1 }}>
          {anime.title}
        </h1>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{anime.genre}</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F5A020' }}>★ {anime.rating}</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>{anime.ep} episodes</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onSelect(anime)} style={{
            background: '#fff', color: '#000', border: 'none',
            borderRadius: 50, padding: '11px 22px',
            fontWeight: 700, fontSize: 13, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6
          }}>▶ Watch Now</button>
          <button onClick={() => onSelect(anime)} style={{
            background: '#fff', color: '#F5A020',
            border: '1.5px solid #F5A020',
            borderRadius: 50, padding: '11px 20px',
            fontWeight: 700, fontSize: 13, cursor: 'pointer'
          }}>+ My List</button>
        </div>
      </div>
    </div>
  );
}

function Detail({ anime, onClose }) {
  if (!anime) return null;
  const pct = Math.round((anime.cur / anime.ep) * 100);
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(16px)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#111', border: '1px solid #1c1c1c',
        borderRadius: 24, width: '100%', maxWidth: 500, overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.8)'
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${anime.palette[0]}, ${anime.palette[1]})`,
          padding: '36px 32px 28px', position: 'relative'
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.08)', border: '1px solid #1c1c1c',
            borderRadius: 50, width: 32, height: 32, cursor: 'pointer', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
          }}>×</button>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#F5A020', textTransform: 'uppercase', marginBottom: 10 }}>{anime.genre}</div>
          <h2 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>{anime.title}</h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#F5A020' }}>★ {anime.rating}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{anime.ep} eps</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: anime.status==='Completed'?'#50c878':anime.status==='Watching'?'#F5A020':'var(--muted)' }}>{anime.status}</span>
          </div>
        </div>
        <div style={{ padding: '24px 32px 32px' }}>
          {anime.status === 'Watching' && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Progress</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#F5A020' }}>Ep {anime.cur} / {anime.ep}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: '#F5A020', borderRadius: 3 }} />
              </div>
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Where to watch</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {Object.entries(STREAM).slice(0, 2).map(([s, c]) => (
                <span key={s} style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 50, background: `${c}18`, color: c, border: `1px solid ${c}44` }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: 50, padding: '13px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>▶ Watch Now</button>
            <button style={{ background: '#fff', color: '#F5A020', border: '1.5px solid #F5A020', borderRadius: 50, padding: '13px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ List</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Discover() {
  const [genre, setGenre] = useState('All');
  const [selected, setSelected] = useState(null);

  return (
    <Layout>
      <div style={{ paddingBottom: 60 }}>
        <Hero anime={ANIME[0]} onSelect={setSelected} />

        {/* Genre filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px', marginBottom: 28, scrollbarWidth: 'none' }}
          className="no-scrollbar">
          {GENRES.map(g => (
            <button key={g} onClick={() => setGenre(g)} style={{
              flexShrink: 0, padding: '7px 16px', borderRadius: 50,
              border: `1.5px solid ${genre===g ? '#F5A020' : '#1c1c1c'}`,
              background: genre===g ? '#fff' : 'transparent',
              color: genre===g ? '#F5A020' : 'var(--muted)',
              fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s'
            }}>{g}</button>
          ))}
        </div>

        {ROWS.map(row => (
          <ContentRow key={row.label} label={row.label} anime={row.anime} progress={row.progress} onSelect={setSelected} />
        ))}

        {selected && <Detail anime={selected} onClose={() => setSelected(null)} />}
      </div>
    </Layout>
  );
}
