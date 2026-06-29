// Custom hook — handles fetching, creating, and deleting journal entries
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function useJournal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
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
      if (data.entries) setEntries(data.entries);
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
        body: JSON.stringify({ anime_mal_id, anime_title, anime_image_url, note, tag, episode }),
      });
      const data = await res.json();
      if (!res.ok) { setSaveError(data.error || `Error ${res.status}`); return null; }
      if (data.entry) setEntries(prev => [data.entry, ...prev]);
      return data.entry || null;
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
