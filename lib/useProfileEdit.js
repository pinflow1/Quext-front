// Handles uploading avatar/banner photos to Supabase Storage and
// saving profile customization fields to the DB.
import { useState } from 'react';
import { supabase } from './supabase';

async function uploadToStorage(session, file, filename) {
  const ext = file.name.split('.').pop();
  const path = `${session.user.id}/${filename}.${ext}`;
  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return `${data.publicUrl}?t=${Date.now()}`; // cache-bust so the new photo shows immediately
}

export default function useProfileEdit(session) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const uploadAvatar = async (file) => {
    if (!session) return null;
    try { return await uploadToStorage(session, file, 'avatar'); }
    catch (e) { setError(e.message); return null; }
  };

  const uploadBanner = async (file) => {
    if (!session) return null;
    try { return await uploadToStorage(session, file, 'banner'); }
    catch (e) { setError(e.message); return null; }
  };

  const saveProfile = async ({ display_name, avatar_url, banner_style, banner_url }) => {
    if (!session) return false;
    setSaving(true);
    setError(null);
    const { error: saveErr } = await supabase
      .from('profiles')
      .upsert({ id: session.user.id, display_name, avatar_url, banner_style, banner_url, updated_at: new Date().toISOString() });
    setSaving(false);
    if (saveErr) { setError(saveErr.message); return false; }
    return true;
  };

  return { uploadAvatar, uploadBanner, saveProfile, saving, error };
}
