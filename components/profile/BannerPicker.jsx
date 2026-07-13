import { useRef } from 'react';
import { BANNER_PRESETS, getBannerGradient } from '../../lib/profileData';

export default function BannerPicker({ bannerStyle, setBannerStyle, bannerPreview, onFileChange }) {
  const fileRef = useRef(null);

  return (
    <div style={{ marginBottom:24 }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:10 }}>Banner</div>

      <button onClick={() => fileRef.current?.click()} style={{
        width:'100%', height:80, borderRadius:14, border:'none', padding:0, marginBottom:12, cursor:'pointer',
        position:'relative', overflow:'hidden',
        background: bannerPreview ? `url(${bannerPreview}) center/cover` : getBannerGradient(bannerStyle),
      }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.25)', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <span style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:700, color:'#fff' }}>Upload Photo</span>
        </div>
      </button>
      <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display:'none' }}/>

      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:1.5, color:'var(--text-faint)', textTransform:'uppercase', marginBottom:8 }}>Or pick a color</div>
      <div style={{ display:'flex', gap:10 }}>
        {BANNER_PRESETS.map(b => (
          <button key={b.key} onClick={() => setBannerStyle(b.key)} style={{
            width:44, height:44, borderRadius:10,
            border: !bannerPreview && bannerStyle===b.key ? '2px solid var(--orange)' : '2px solid transparent',
            background:`linear-gradient(135deg, ${b.from}, ${b.to})`, cursor:'pointer', padding:0,
          }}/>
        ))}
      </div>
    </div>
  );
}
