// GET /api/share/card?title=...&image=...&genre=...&deco=classic
// Generates a shareable 1200x630 image card using Next.js's built-in
// edge image renderer (next/og) — no extra dependency needed.

import { ImageResponse } from 'next/og';

export const config = { runtime: 'edge' };

const DECO = {
  classic: { accent:'#FF7A00', bg:'#0A0A0A' },
  neon:    { accent:'#5EEBFF', bg:'#050510' },
  minimal: { accent:'#FFFFFF', bg:'#111111' },
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Untitled';
  const image = searchParams.get('image');
  const genre = searchParams.get('genre') || '';
  const deco = DECO[searchParams.get('deco')] || DECO.classic;

  return new ImageResponse(
    (
      <div style={{
        width:'100%', height:'100%', display:'flex', alignItems:'center',
        background:deco.bg, color:'#fff', fontFamily:'sans-serif', padding:60,
      }}>
        {image && (
          <img src={image} width={340} height={480} style={{ objectFit:'cover', borderRadius:16, border:`3px solid ${deco.accent}` }}/>
        )}
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:50 }}>
          <div style={{ fontSize:22, color:deco.accent, letterSpacing:4, textTransform:'uppercase', marginBottom:20 }}>Tracked on Quext</div>
          <div style={{ fontSize:52, fontWeight:800, lineHeight:1.1, marginBottom:20, maxWidth:500, display:'flex' }}>{title}</div>
          {genre && <div style={{ fontSize:24, color:'#aaa', display:'flex' }}>{genre}</div>}
        </div>
      </div>
    ),
    { width:1200, height:630 }
  );
                      }
