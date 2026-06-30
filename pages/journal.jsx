import { useState } from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/ui/PageHeader';
import JournalSearch from '../components/journal/JournalSearch';
import JournalTagFilter from '../components/journal/JournalTagFilter';
import JournalEntryList from '../components/journal/JournalEntryList';
import JournalFAB from '../components/journal/JournalFAB';
import AddEntryModal from '../components/journal/AddEntryModal';
import useJournal from '../lib/useJournal';
import { JOURNAL_ENTRIES, JOURNAL_ANIME } from '../lib/journalData';

export default function Journal() {
  const { entries: liveEntries, loading, session, saveError, addEntry, deleteEntry } = useJournal();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [adding, setAdding] = useState(false);

  const isLive = !!session;

  // Normalize — ensures anime_title and tag are always present
  // whether entry is from Supabase (has anime_title) or static seed (has animeId)
  const normalize = e => ({
    ...e,
    anime_title:     e.anime_title || animeById(e.animeId)?.title || '—',
    tag:             e.tag         || animeById(e.animeId)?.tag   || '',
    anime_image_url: e.anime_image_url || null,
  });

  const rawEntries = (isLive ? liveEntries : JOURNAL_ENTRIES).map(normalize);

  const animeById = id => JOURNAL_ANIME.find(a => a.id === id);

  const filtered = rawEntries.filter(e => {
    const title = e.anime_title || animeById(e.animeId)?.title || '';
    const matchSearch = title.toLowerCase().includes(search.toLowerCase()) || e.note.toLowerCase().includes(search.toLowerCase());
    const tag = e.tag || animeById(e.animeId)?.tag || '';
    const matchTag = activeTag === 'All' || tag === activeTag;
    return matchSearch && matchTag;
  });

  const tags = ['All', ...new Set(rawEntries.map(e => e.tag || animeById(e.animeId)?.tag).filter(Boolean))];

  const grouped = filtered.reduce((acc, e) => {
    const month = e.month || new Date(e.created_at).toLocaleDateString('en-US', { month:'long', year:'numeric' });
    (acc[month] ||= []).push(e);
    return acc;
  }, {});

  const trackedShows = new Set(rawEntries.map(e => e.anime_mal_id || e.animeId)).size;

  const handleSave = async (payload) => {
    if (isLive) await addEntry(payload);
    setAdding(false);
  };

  return (
    <Layout>
      {loading && (
        <div style={{ padding:'60px 32px', fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>
          Loading...
        </div>
      )}
      {!loading && (
        <>
          <PageHeader eyebrow="Your Anime Journey" title="Journal" meta={`${rawEntries.length} ENTRIES · TRACKING ${trackedShows} SHOWS`}/>
          {saveError && (
            <div style={{ margin:'0 32px 16px', padding:'12px 16px', background:'rgba(255,77,77,0.08)', border:'1px solid var(--red)', borderRadius:10, fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--red)' }}>
              Save failed: {saveError}
            </div>
          )}
          <JournalSearch search={search} setSearch={setSearch}/>
          <JournalTagFilter tags={tags} activeTag={activeTag} setActiveTag={setActiveTag}/>
          <JournalEntryList grouped={grouped} isEmpty={filtered.length === 0} isLive={isLive} onDelete={isLive ? deleteEntry : null}/>
          <JournalFAB onClick={() => setAdding(true)}/>
          {adding && <AddEntryModal onClose={() => setAdding(false)} onSave={handleSave}/>}
        </>
      )}
    </Layout>
  );
}
