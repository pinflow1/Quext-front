// GET  /api/journal  — fetch all entries for logged-in user
// POST /api/journal  — create a new journal entry
// Column names here match the REAL journal_entries schema:
// entry_text (not note), episode_number (not episode), entry_date

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid session' });

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ entries: data });
  }

  if (req.method === 'POST') {
    const { anime_mal_id, anime_title, anime_image_url, entry_text, tag, episode_number } = req.body;

    if (!anime_mal_id || !anime_title || !entry_text) {
      return res.status(400).json({ error: 'anime_mal_id, anime_title and entry_text are required' });
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        anime_mal_id,
        anime_title,
        anime_image_url: anime_image_url || null,
        entry_text,
        tag: tag || null,
        episode_number: episode_number || null,
        entry_date: new Date().toISOString().slice(0, 10),
      })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ entry: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
