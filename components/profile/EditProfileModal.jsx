import { useState, useRef } from 'react';
import { PAD } from '../../lib/theme';
import useProfileEdit from '../../lib/useProfileEdit';
import BannerPicker from './BannerPicker';

export default function EditProfileModal({ session, currentName, currentAvatar, currentBanner, currentBannerUrl, onClose, onSaved }) {
  const [name, setName] = useState(currentName);
  const [bannerStyle, setBannerStyle] = useState(currentBanner);
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar);
  const [bannerPreview, setBannerPreview] = useState(currentBannerUrl);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerTouched, setBannerTouched] = useState(false);
  const avatarFileRef = useRef(null);
  const { uploadAvatar, uploadBanner, saveProfile, saving, error } = useProfileEdit(session);

  const handleAvatarChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

  const handleBannerChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBannerFile(f);
    setBannerPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    let avatar_url = currentAvatar;
    if (avatarFile) {
      const uploaded = await uploadAvatar(avatarFile);
      if (uploaded) avatar_url = uploaded;
    }
    let banner_url = currentBannerUrl;
    if (bannerFile) {
      const uploaded = await uploadBanner(bannerFile);
      if (uploaded) banner_url = uploaded;
    } else if (bannerTouched) {
      banner_url = null; // user picked a preset color, overriding any saved photo
    }
    const ok = await saveProfile({ display_name: name.trim(), avatar_url, banner_style: bannerStyle, banner_url });
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
          <button onClick={() => avatarFileRef.current?.click()} style={{ position:'relative', width:88, height:88, borderRadius:50, border:'none', padding:0, cursor:'pointer', background:'none' }}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="" style={{ width:'100%', height:'100%', borderRadius:50, objectFit:'cover' }}/>
            ) : (
              <div style={{ width:'100%', height:'100%', borderRadius:50, background:'linear-gradient(135deg, var(--orange), #2e1c08)' }}/>
            )}
            <div style={{ position:'absolute', bottom:0, right:0, width:28, height:28, borderRadius:50, background:'var(--orange)', border:'3px solid var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </button>
          <input ref={avatarFileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display:'none' }}/>
        </div>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase', marginBottom:10 }}>Display Name</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ width:'100%', background:'var(--surface)', border:'1px solid var(--hairline)', borderRadius:12, padding:'12px 14px', color:'var(--text)', fontSize:14, fontFamily:'Inter,sans-serif', outline:'none' }}/>
        </div>

        <BannerPicker bannerStyle={bannerStyle} setBannerStyle={(s) => { setBannerStyle(s); setBannerPreview(null); setBannerFile(null); setBannerTouched(true); }} bannerPreview={bannerPreview} onFileChange={handleBannerChange}/>

        {error && <div style={{ marginBottom:16, fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--red)' }}>{error}</div>}

        <button onClick={handleSave} disabled={saving} className="btn-resume" style={{ width:'100%', border:'none', borderRadius:50, padding:14, fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
