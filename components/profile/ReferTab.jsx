import { PAD } from '../../lib/theme';
import ShareCardButton from './ShareCardButton';

export default function ReferTab({ entries, isPremium }) {
  const unique = [];
  const seen = new Set();
  entries.forEach(e => {
    if (!seen.has(e.anime_mal_id)) { seen.add(e.anime_mal_id); unique.push(e); }
  });

  if (unique.length === 0) {
    return (
      <div style={{ padding:`40px ${PAD}`, fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)', textAlign:'center' }}>
        Track an anime in your Journal to start sharing.
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:60 }}>
      {unique.map((e, i) => (
        <div key={e.anime_mal_id} style={{ display:'flex', alignItems:'center', gap:14, padding:`14px ${PAD}`, borderTop: i===0 ? '1px solid var(--hairline)' : 'none', borderBottom:'1px solid var(--hairline)' }}>
          {e.anime_image_url && <img src={e.anime_image_url} alt="" style={{ width:40, height:56, objectFit:'cover', borderRadius:6, flexShrink:0 }}/>}
          <div style={{ flex:1, minWidth:0, fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.anime_title}</div>
          <ShareCardButton anime={e} isPremium={isPremium}/>
        </div>
      ))}
    </div>
  );
}
