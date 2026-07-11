// Handles uploading a new avatar to Supabase Storage and saving
// profile customization fields (name, avatar, banner) to the DB.
import { useState } from 'react';
import { supabase } from './supabase';

export default function useProfileEdit(session) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const uploadAvatar = async (file) => {
    if (!session) return null;
    const ext = file.name.split('.').pop();
    const path = `${session.user.id}/avatar.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) { setError(upErr.message); return null; }
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return `${data.publicUrl}?t=${Date.now()}`; // cache-bust so the new photo shows immediately
  };

  const saveProfile = async ({ display_name, avatar_url, banner_style }) => {
    if (!session) return false;
    setSaving(true);
    setError(null);
    const { error: saveErr } = await supabase
      .from('profiles')
      .upsert({ id: session.user.id, display_name, avatar_url, banner_style, updated_at: new Date().toISOString() });
    setSaving(false);
    if (saveErr) { setError(saveErr.message); return false; }
    return true;
  };

  return { uploadAvatar, saveProfile, saving, error };
}
