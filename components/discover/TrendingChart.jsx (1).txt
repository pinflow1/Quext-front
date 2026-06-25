import SectionHeader from '../ui/SectionHeader';
import TrendingRow from './TrendingRow';
import { TRENDING } from '../../lib/animeData';

export default function TrendingChart() {
  return (
    <div>
      <SectionHeader eyebrow="Right Now" title="Trending"/>
      <div style={{ paddingBottom:60 }}>
        {TRENDING.map((t,i) => <TrendingRow key={t.rank} t={t} isFirst={i===0}/>)}
      </div>
    </div>
  );
}
