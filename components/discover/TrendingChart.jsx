import SectionHeader from '../ui/SectionHeader';
import TrendingRow from './TrendingRow';
import { TRENDING } from '../../lib/animeData';

export default function TrendingChart({ items, isLive }) {
  const data = isLive && items?.length
    ? items.map((a, i) => ({
        rank:   i + 1,
        change: i < 2 ? 'up' : i === 2 ? 'down' : 'same', // placeholder until we store prev rank
        title:  a.title,
        blurb:  a.genres?.slice(0,2).join(' · ') || '',
        score:  a.score ? Math.round(a.score * 10) : 50,
      }))
    : TRENDING;

  return (
    <div>
      <SectionHeader eyebrow="Right Now" title="Trending"/>
      <div style={{ paddingBottom:60 }}>
        {data.map((t,i) => <TrendingRow key={t.rank} t={t} isFirst={i===0}/>)}
      </div>
    </div>
  );
}
