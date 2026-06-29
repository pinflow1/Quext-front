import { PAD } from '../../lib/theme';
import JournalEntryRow from './JournalEntryRow';

export default function JournalEntryList({ grouped, isEmpty, isLive, onDelete }) {
  if (isEmpty) {
    return (
      <div style={{ padding:`60px ${PAD}`, textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)' }}>
        {isLive ? 'No journal entries yet. Start writing.' : 'No entries found.'}
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
          {list.map(e => (
            <JournalEntryRow
              key={e.id}
              entry={e}
              anime={null}
              onDelete={onDelete}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
