// Custom hook — handles fetching, creating, and deleting journal entries.
// Field translation lives in lib/journalMapper.js, shared with useProfile.
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { toUiEntry } from './journalMapper';
import { event as gaEvent } from './gtag';

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
        gaEvent('journal_entry_saved', { anime_title: anime_title || 'unknown' });
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
