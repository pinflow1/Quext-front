import { PAD } from '../../lib/theme';
import JournalEntryRow from '../journal/JournalEntryRow';
import { JOURNAL_ENTRIES, JOURNAL_ANIME } from '../../lib/journalData';

export default function ActivityTab({ onGoToJournal }) {
  const animeById = id => JOURNAL_ANIME.find(a => a.id === id);
  return (
    <div>
      {JOURNAL_ENTRIES.slice(0,3).map(e => (
        <JournalEntryRow key={e.id} entry={e} anime={animeById(e.animeId)}/>
      ))}
      <div style={{ padding:`18px ${PAD}`, borderTop:'1px solid var(--hairline)' }}>
        <button onClick={onGoToJournal} style={{ background:'none', border:'none', color:'var(--orange)', cursor:'pointer', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13 }}>
          View full journal →
        </button>
      </div>
    </div>
  );
}
