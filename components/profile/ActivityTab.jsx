import { PAD } from '../../lib/theme';
import JournalEntryRow from '../journal/JournalEntryRow';

export default function ActivityTab({ entries, onGoToJournal }) {
  const recent = entries.slice(0, 3);

  return (
    <div>
      {recent.length === 0 && (
        <div style={{ padding:`40px ${PAD}`, fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)', textAlign:'center' }}>
          No entries yet — start journaling from the Journal tab.
        </div>
      )}

      {recent.map(e => <JournalEntryRow key={e.id} entry={e}/>)}

      {entries.length > 3 && (
        <div style={{ padding:`18px ${PAD}`, borderTop:'1px solid var(--hairline)' }}>
          <button onClick={onGoToJournal} style={{ background:'none', border:'none', color:'var(--orange)', cursor:'pointer', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13 }}>
            View all {entries.length} entries →
          </button>
        </div>
      )}
    </div>
  );
}
