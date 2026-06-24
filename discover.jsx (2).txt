import Layout from '../components/Layout';
import ContinueWatchingHero from '../components/discover/ContinueWatchingHero';
import RankedList from '../components/discover/RankedList';
import SponsoredRow from '../components/discover/SponsoredRow';
import HiddenGems from '../components/discover/HiddenGems';
import EpisodeHeatmap from '../components/discover/EpisodeHeatmap';
import ReleaseTimeline from '../components/discover/ReleaseTimeline';
import TrendingChart from '../components/discover/TrendingChart';
import { useApp } from '../context/AppContext';
import { NOW_PLAYING } from '../lib/animeData';

export default function Discover() {
  const { isPremium, handleWatchClick } = useApp();

  return (
    <Layout>
      <ContinueWatchingHero anime={NOW_PLAYING} onWatchClick={handleWatchClick}/>
      <RankedList/>
      {!isPremium && <SponsoredRow onWatchClick={handleWatchClick}/>}
      <HiddenGems/>
      <EpisodeHeatmap/>
      <ReleaseTimeline/>
      <TrendingChart/>
    </Layout>
  );
}
