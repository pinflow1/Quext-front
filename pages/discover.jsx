import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ContinueWatchingHero from '../components/discover/ContinueWatchingHero';
import RankedList from '../components/discover/RankedList';
import SponsoredRow from '../components/discover/SponsoredRow';
import HiddenGems from '../components/discover/HiddenGems';
import EpisodeHeatmap from '../components/discover/EpisodeHeatmap';
import ReleaseTimeline from '../components/discover/ReleaseTimeline';
import TrendingChart from '../components/discover/TrendingChart';
import DiscoverSearch from '../components/discover/DiscoverSearch';
import { useApp } from '../context/AppContext';

export default function Discover() {
  const { isPremium, handleWatchClick } = useApp();
  const [seasonal, setSeasonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/anime/seasonal')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setSeasonal(data.anime);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Derive hero, top rated, and trending from real data
  const hero = seasonal[0] || null;
  const topRated = seasonal
    .filter(a => a.score)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const trending = seasonal.slice(0, 4);
  const newSeasons = seasonal.filter(a => a.airing).slice(0, 5);

  return (
    <Layout>
      <DiscoverSearch onAddJournal={() => {}}/>
      {loading && (
        <div style={{ padding:'40px 32px', fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>
          Loading seasonal anime...
        </div>
      )}
      {error && (
        <div style={{ padding:'40px 32px', fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--red)' }}>
          {error} — showing cached data
        </div>
      )}
      {hero && <ContinueWatchingHero anime={hero} onWatchClick={handleWatchClick} isLive/>}
      <RankedList items={topRated} isLive/>
      {!isPremium && <SponsoredRow onWatchClick={handleWatchClick}/>}
      <HiddenGems/>
      <EpisodeHeatmap/>
      <ReleaseTimeline items={newSeasons} isLive/>
      <TrendingChart items={trending} isLive/>
    </Layout>
  );
}
