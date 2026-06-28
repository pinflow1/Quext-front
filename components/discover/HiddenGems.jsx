import { useState, useEffect } from 'react';
import SectionHeader from '../ui/SectionHeader';
import HiddenGemBlock from './HiddenGemBlock';
import { HIDDEN_GEMS } from '../../lib/animeData';

export default function HiddenGems() {
  const [gems, setGems] = useState([]);

  useEffect(() => {
    fetch('/api/anime/gems')
      .then(r => r.json())
      .then(d => { if (d.gems?.length) setGems(d.gems); })
      .catch(() => {}); // silently fall back to static
  }, []);

  const data = gems.length ? gems : HIDDEN_GEMS;

  return (
    <div>
      <SectionHeader eyebrow="Notes From The Team" title="Hidden Gems"/>
      {data.map((g, i) => (
        <HiddenGemBlock
          key={g.title}
          g={g}
          index={i}
          isLast={i === data.length - 1}
        />
      ))}
    </div>
  );
}
