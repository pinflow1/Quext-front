import { PAD } from '../../lib/theme';

// Handles both real Supabase entries (anime_title, anime_image_url)
// and static seed entries (animeId lookup via anime prop)
export default function JournalEntryRow({ entry, anime, onDelete }) {
  const title    = entry.anime_title    || anime?.title || '—';
  const imageUrl = entry.anime_image_url || null;
  const tag      = entry.tag            || anime?.tag   || '';
  const date     = entry.date           || new Date(entry.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });

  return (
    <div style={{ display:'flex', gap:'clamp(12px,3vw,24px)', padding:`18px ${PAD}`, borderTop:'1px solid var(--hairline)', transition:'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background='var(--surface-hover)'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}>

      {/* Date */}
      <div style={{ width:'clamp(48px,12vw,64px)', flexShrink:0, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:'var(--text-faint)', paddingTop:3 }}>
        {date}
      </div>

      {/* Dot or thumbnail */}
      {imageUrl
        ? <img src={imageUrl} alt={title} style={{ width:24, height:34, objectFit:'cover', flexShrink:0, borderRadius:4, marginTop:2 }}/>
        : <div style={{ width:8, height:8, borderRadius:50, flexShrink:0, marginTop:6, background: anime ? `linear-gradient(135deg,${anime.palette[0]},${anime.palette[1]})` : 'var(--orange)', border:'1px solid var(--hairline)' }}/>
      }

      {/* Content */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:8, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color:'var(--text)' }}>{title}</span>
          {tag && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:1, color:'var(--cyan)', textTransform:'uppercase' }}>{tag}</span>}
        </div>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, lineHeight:1.7, color:'var(--text-60)', margin:0, maxWidth:560 }}>{entry.note}</p>
      </div>

      {/* Delete */}
      {onDelete && (
        <button onClick={() => onDelete(entry.id)} style={{ background:'none', border:'none', color:'var(--text-faint)', cursor:'pointer', fontSize:16, flexShrink:0, padding:'0 0 0 8px', lineHeight:1 }}
          onMouseEnter={e => e.currentTarget.style.color='var(--red)'}
          onMouseLeave={e => e.currentTarget.style.color='var(--text-faint)'}>×</button>
      )}
    </div>
  );
          }
