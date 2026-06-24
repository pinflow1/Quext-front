import SectionHeader from '../ui/SectionHeader';
import RankedListRow from './RankedListRow';
import { TOP_RATED } from '../../lib/animeData';

export default function RankedList() {
  return (
    <div>
      <SectionHeader eyebrow="The Chart" title="Top Rated This Season"/>
      <div>
        {TOP_RATED.map((a,i) => <RankedListRow key={a.rank} a={a} isFirst={i===0}/>)}
      </div>
    </div>
  );
}
