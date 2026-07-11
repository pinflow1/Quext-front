import { useState } from 'react';

const DECOS = [
  { key:'classic', label:'Classic' },
  { key:'neon',    label:'Neon' },
  { key:'minimal', label:'Minimal' },
];

export default function ShareCardButton({ anime, isPremium }) {
  const [sharing, setSharing] = useState(false);
  const [deco, setDeco] = useState('classic');

  const buildUrl = (d) => {
    const params = new URLSearchParams({
      title: anime.anime_title,
      image: anime.anime_image_url || '',
      genre: anime.tag || '',
      deco: d,
    });
    return `/api/share/card?${params.toString()}`;
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      const url = buildUrl(isPremium ? deco : 'classic');
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], 'quext-share.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files:[file] })) {
        await navigator.share({ files:[file], title: anime.anime_title, text: `Check out ${anime.anime_title} — tracked on Quext` });
      } else {
        window.open(url, '_blank');
      }
    } catch {
      // user likely cancelled the native share sheet — nothing to show
    } finally {
      setSharing(false);
    }
  };

  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
      {isPremium && (
        <select value={deco} onChange={e => setDeco(e.target.value)} style={{ background:'var(--surface)', border:'1px solid var(--hairline)', borderRadius:8, color:'var(--text-dim)', fontSize:10, fontFamily:"'IBM Plex Mono',monospace", padding:'4px 6px' }}>
          {DECOS.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
        </select>
      )}
      <button onClick={handleShare} disabled={sharing} className="btn-resume" style={{ border:'none', borderRadius:50, padding:'7px 14px', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:11, cursor: sharing ? 'not-allowed' : 'pointer', opacity: sharing ? 0.6 : 1 }}>
        {sharing ? '...' : 'Share'}
      </button>
    </div>
  );
          }
