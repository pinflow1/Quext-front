import SectionHeader from '../ui/SectionHeader';
import RankedListRow from './RankedListRow';
import { TOP_RATED } from '../../lib/animeData';

// items: live Jikan anime array OR undefined (falls back to static)
export default function RankedList({ items, isLive }) {
  const data = isLive && items?.length
    ? items.map((a, i) => ({
        rank:    i + 1,
        title:   a.title,
        score:   a.score || '—',
        eps:     a.episodes || '?',
        palette: ['#0d0d0d', '#1a1a1a'], // neutral dark — no palette from Jikan
        image_url: a.image_url,
      }))
    : TOP_RATED;

  return (
    <div>
      <SectionHeader eyebrow="The Chart" title="Top Rated This Season"/>
      <div>
        {data.map((a, i) => <RankedListRow key={a.rank} a={a} isFirst={i===0}/>)}
      </div>
    </div>
  );
}
