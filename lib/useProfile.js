// Custom hook — real user identity + profile customization + activity,
// pulled from Supabase (auth session + profiles + journal_entries).
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { toUiEntry } from './journalMapper';

export default function useProfile() {
  const [session, setSession] = useState(null);
  const [entries, setEntries] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  }, []);

  useEffect(() => {
    if (!session) { setLoading(false); return; }
    Promise.all([
      supabase.from('journal_entries').select('*').eq('user_id', session.user.id).order('created_at', { ascending:false }),
      supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle(),
    ]).then(([entriesRes, profileRes]) => {
      setEntries((entriesRes.data || []).map(toUiEntry));
      setProfile(profileRes.data || null);
      setLoading(false);
    });
  }, [session]);

  const refresh = () => {
    if (!session) return;
    supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle()
      .then(({ data }) => setProfile(data || null));
  };

  const user = session?.user;
  const name = profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anime Fan';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  const bannerStyle = profile?.banner_style || 'sunset';
  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month:'long', year:'numeric' })
    : null;

  const trackedShows = new Set(entries.map(e => e.anime_mal_id)).size;

  const calcStreak = () => {
    if (!entries.length) return 0;
    const days = new Set(entries.map(e => new Date(e.created_at).toDateString()));
    let streak = 0;
    let cursor = new Date();
    while (days.has(cursor.toDateString())) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  };

  return {
    session, user, name, avatarUrl, bannerStyle, joined,
    entries, trackedShows, streak: calcStreak(), loading, refresh,
  };
}
