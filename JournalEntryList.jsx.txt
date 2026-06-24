import { PAD } from '../../lib/theme';
import JournalEntryRow from './JournalEntryRow';
import { JOURNAL_ANIME } from '../../lib/journalData';

export default function JournalEntryList({ grouped, isEmpty }) {
  const animeById = id => JOURNAL_ANIME.find(a => a.id === id);

  if (isEmpty) {
    return (
      <div style={{ padding:`60px ${PAD}`, textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)' }}>
        No entries yet. Start your journey.
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:80 }}>
      {Object.entries(grouped).map(([month, list]) => (
        <div key={month}>
          <div style={{ padding:`0 ${PAD} 4px` }}>
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-faint)', textTransform:'uppercase' }}>{month}</span>
          </div>
          {list.map(e => <JournalEntryRow key={e.id} entry={e} anime={animeById(e.animeId)}/>)}
        </div>
      ))}
    </div>
  );
}
