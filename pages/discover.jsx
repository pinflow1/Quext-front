import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HeroCarousel from '../components/discover/HeroCarousel';
import RankedList from '../components/discover/RankedList';
import SponsoredRow from '../components/discover/SponsoredRow';
import HiddenGems from '../components/discover/HiddenGems';
import EpisodeHeatmap from '../components/discover/EpisodeHeatmap';
import ReleaseTimeline from '../components/discover/ReleaseTimeline';
import TrendingChart from '../components/discover/TrendingChart';
import DiscoverSearch from '../components/discover/DiscoverSearch';
import { useApp } from '../context/AppContext';
import { PAD } from '../lib/theme';

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

  const topRated = seasonal.filter(a => a.score).sort((a,b) => b.score - a.score).slice(0,5);
  const trending  = seasonal.slice(0, 4);
  const newSeasons = seasonal.filter(a => a.airing).slice(0, 5);

  // First 6 airing anime for the carousel hero
  const heroItems = seasonal.filter(a => a.airing && a.image_url).slice(0, 6);

  return (
    <Layout>
      <DiscoverSearch onAddJournal={() => {}}/>

      {loading && (
        <div style={{ padding:`32px ${PAD}`, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>
          Loading...
        </div>
      )}
      {error && (
        <div style={{ padding:`16px ${PAD}`, fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--red)' }}>
          {error} — showing fallback data
        </div>
      )}

      {heroItems.length > 0 && <HeroCarousel items={heroItems} onWatchClick={handleWatchClick}/>}

      <RankedList items={topRated} isLive={topRated.length > 0}/>
      {!isPremium && <SponsoredRow onWatchClick={handleWatchClick}/>}
      <HiddenGems/>
      <EpisodeHeatmap/>
      <ReleaseTimeline items={newSeasons} isLive={newSeasons.length > 0}/>
      <TrendingChart items={trending} isLive={trending.length > 0}/>
    </Layout>
  );
}
