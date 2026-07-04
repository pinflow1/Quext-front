// Custom hook — handles fetching, creating, and deleting journal entries.
// Translates between the real DB columns (entry_text, episode_number)
// and the simpler names (note, episode) the UI components use everywhere.
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

// DB row -> UI shape
const toUiEntry = (row) => ({
  ...row,
  note: row.entry_text,
  episode: row.episode_number,
});

export default function useJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  }, []);

  useEffect(() => {
    if (!session) { setLoading(false); return; }
    fetchEntries();
  }, [session]);

  const authHeader = () => ({
    Authorization: `Bearer ${session?.access_token}`,
    'Content-Type': 'application/json',
  });

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/journal', { headers: authHeader() });
      const data = await res.json();
      if (data.entries) setEntries(data.entries.map(toUiEntry));
    } catch (e) {
      console.error('fetch journal error', e);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async ({ anime_mal_id, anime_title, anime_image_url, note, tag, episode }) => {
    if (!session) return null;
    setSaveError(null);
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
          anime_mal_id, anime_title, anime_image_url,
          entry_text: note,        // translate to real column name
          tag,
          episode_number: episode, // translate to real column name
        }),
      });
      const data = await res.json();
      if (!res.ok) { setSaveError(data.error || `Error ${res.status}`); return null; }
      if (data.entry) {
        const uiEntry = toUiEntry(data.entry);
        setEntries(prev => [uiEntry, ...prev]);
        return uiEntry;
      }
      return null;
    } catch (e) {
      setSaveError(e.message);
      return null;
    }
  };

  const deleteEntry = async (id) => {
    if (!session) return;
    try {
      await fetch(`/api/journal/${id}`, { method: 'DELETE', headers: authHeader() });
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (e) {
      console.error('delete entry error', e);
    }
  };

  return { entries, loading, session, saveError, addEntry, deleteEntry };
}
