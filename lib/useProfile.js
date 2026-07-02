// Custom hook — real user identity + computed badge/streak state
// derived from the user's actual journal_entries in Supabase.
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function useProfile() {
  const [session, setSession] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  }, []);

  useEffect(() => {
    if (!session) { setLoading(false); return; }
    supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setEntries(data || []); setLoading(false); });
  }, [session]);

  const user = session?.user;
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anime Fan';
  const avatarUrl = user?.user_metadata?.avatar_url || null;
  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month:'long', year:'numeric' })
    : null;

  const trackedShows = new Set(entries.map(e => e.anime_mal_id)).size;

  // Streak — consecutive days with at least one entry, counting back from today
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
  const streak = calcStreak();

  const badges = [
    { title:'First Entry',       desc:'Logged your first journal entry',        icon:'book',  earned: entries.length >= 1 },
    { title:'7-Day Streak',      desc:'Journaled 7 days in a row',               icon:'flame', earned: streak >= 7 },
    { title:'Completionist',     desc:'Logged 10+ entries',                      icon:'check', earned: entries.length >= 10 },
    { title:'Hidden Gem Hunter', desc:'Tracked 5+ different shows',              icon:'star',  earned: trackedShows >= 5 },
    { title:'Top Supporter',     desc:"Awarded to Quext's most committed supporters", icon:'heart', earned:false },
  ];

  return { session, user, name, avatarUrl, joined, entries, trackedShows, streak, badges, loading };
            }
      
