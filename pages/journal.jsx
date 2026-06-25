import { useState } from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/ui/PageHeader';
import JournalSearch from '../components/journal/JournalSearch';
import JournalTagFilter from '../components/journal/JournalTagFilter';
import JournalEntryList from '../components/journal/JournalEntryList';
import JournalFAB from '../components/journal/JournalFAB';
import AddEntryModal from '../components/journal/AddEntryModal';
import { JOURNAL_ANIME, JOURNAL_ENTRIES } from '../lib/journalData';

export default function Journal() {
  const [entries, setEntries] = useState(JOURNAL_ENTRIES);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [adding, setAdding] = useState(false);

  const tags = ['All', ...new Set(JOURNAL_ANIME.map(a => a.tag))];
  const animeById = id => JOURNAL_ANIME.find(a => a.id === id);

  const filtered = entries.filter(e => {
    const anime = animeById(e.animeId);
    if (!anime) return false;
    const matchSearch = anime.title.toLowerCase().includes(search.toLowerCase()) || e.note.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || anime.tag === activeTag;
    return matchSearch && matchTag;
  });

  const grouped = filtered.reduce((acc, e) => {
    (acc[e.month] ||= []).push(e);
    return acc;
  }, {});

  const trackedShows = new Set(entries.map(e => e.animeId)).size;

  const saveEntry = (anime, note) => {
    setEntries(prev => [{ id:Date.now(), animeId:anime.id, month:'June 2026', date:'Today', note }, ...prev]);
    setAdding(false);
  };

  return (
    <Layout>
      <PageHeader eyebrow="Your Anime Journey" title="Journal" meta={`${entries.length} ENTRIES · TRACKING ${trackedShows} SHOWS`}/>
      <JournalSearch search={search} setSearch={setSearch}/>
      <JournalTagFilter tags={tags} activeTag={activeTag} setActiveTag={setActiveTag}/>
      <JournalEntryList grouped={grouped} isEmpty={filtered.length === 0}/>
      <JournalFAB onClick={() => setAdding(true)}/>
      {adding && <AddEntryModal onClose={() => setAdding(false)} onSave={saveEntry}/>}
    </Layout>
  );
}
