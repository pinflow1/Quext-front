import SectionHeader from '../ui/SectionHeader';
import HiddenGemBlock from './HiddenGemBlock';
import { HIDDEN_GEMS } from '../../lib/animeData';

export default function HiddenGems() {
  return (
    <div>
      <SectionHeader eyebrow="Notes From The Team" title="Hidden Gems"/>
      {HIDDEN_GEMS.map((g,i) => (
        <HiddenGemBlock key={g.title} g={g} index={i} isLast={i===HIDDEN_GEMS.length-1}/>
      ))}
    </div>
  );
}
