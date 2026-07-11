import { useState, useRef } from 'react';
import { PAD } from '../../lib/theme';
import useProfileEdit from '../../lib/useProfileEdit';
import { BANNER_PRESETS } from '../../lib/profileData';

export default function EditProfileModal({ session, currentName, currentAvatar, currentBanner, onClose, onSaved }) {
  const [name, setName] = useState(currentName);
  const [banner, setBanner] = useState(currentBanner);
  const [preview, setPreview] = useState(currentAvatar);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const { uploadAvatar, saveProfile, saving, error } = useProfileEdit(session);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    let avatar_url = currentAvatar;
    if (file) {
      const uploaded = await uploadAvatar(file);
      if (uploaded) avatar_url = uploaded;
    }
    const ok = await saveProfile({ display_name: name.trim(), avatar_url, banner_style: banner });
    if (ok) { onSaved(); onClose(); }
  };

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)', zIndex:200, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--bg)', borderTop:'1px solid var(--hairline)', borderTopLeftRadius:24, borderTopRightRadius:24, width:'100%', maxWidth:560, padding:`28px ${PAD} 32px`, maxHeight:'85vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:18, color:'var(--text)' }}>Edit Profile</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-dim)', fontSize:22, cursor:'pointer' }}>×</button>
        </div>

        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <button onClick={() => fileRef.current?.click()} style={{ position:'relative', width:88, height:88, borderRadius:50, border:'none', padding:0, cursor:'pointer', background:'none' }}>
            {preview ? (
              <img src={preview} alt="" style={{ width:'100%', height:'100%', borderRadius:50, objectFit:'cover' }}/>
            ) : (
              <div style={{ width:'100%', height:'100%', borderRadius:50, background:'linear-gradient(135deg, var(--orange), #2e1c08)' }}/>
            )}
            <div style={{ position:'absolute', bottom:0, right:0, width:28, height:28, borderRadius:50, background:'var(--orange)', border:'3px solid var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display:'none' }}/>
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:10 }}>Display Name</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width:'100%', background:'var(--surface)', border:'1px solid var(--hairline)', borderRadius:12, padding:'12px 14px', color:'var(--text)', fontSize:14, fontFamily:'Inter,sans-serif', outline:'none' }}/>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:10 }}>Banner</div>
          <div style={{ display:'flex', gap:10 }}>
            {BANNER_PRESETS.map(b => (
              <button key={b.key} onClick={() => setBanner(b.key)} style={{
                width:52, height:52, borderRadius:12, border: banner===b.key ? '2px solid var(--orange)' : '2px solid transparent',
                background:`linear-gradient(135deg, ${b.from}, ${b.to})`, cursor:'pointer', padding:0,
              }}/>
            ))}
          </div>
        </div>

        {error && <div style={{ marginBottom:16, fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--red)' }}>{error}</div>}

        <button onClick={handleSave} disabled={saving} className="btn-resume" style={{ width:'100%', border:'none', borderRadius:50, padding:14, fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
