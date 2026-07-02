import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProfileBanner from '../components/profile/ProfileBanner';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ActivityTab from '../components/profile/ActivityTab';
import StatsTab from '../components/profile/StatsTab';
import BadgesTab from '../components/profile/BadgesTab';
import SettingsPage from '../components/settings/SettingsPage';
import useProfile from '../lib/useProfile';
import { useApp } from '../context/AppContext';
import { JOURNAL_ENTRIES } from '../lib/journalData';
import { BADGES as STATIC_BADGES } from '../lib/profileData';

export default function Profile() {
  const router = useRouter();
  const [view, setView] = useState('profile');
  const [tab, setTab] = useState('Activity');
  const { isGuest, handleGuestGate, setShowLoginPrompt } = useApp();
  const { name, avatarUrl, joined, entries, trackedShows, streak, badges, loading } = useProfile();

  // Guests see static seed data everywhere on this page
  const displayEntries = isGuest ? JOURNAL_ENTRIES : entries;
  const displayBadges  = isGuest ? STATIC_BADGES   : badges;
  const displayShows   = isGuest ? new Set(JOURNAL_ENTRIES.map(e => e.animeId)).size : trackedShows;

  if (view === 'settings') {
    return (
      <Layout>
        <SettingsPage onBack={() => setView('profile')} isGuest={isGuest} onGuestGate={handleGuestGate}/>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProfileBanner onOpenSettings={() => setView('settings')} avatarUrl={avatarUrl} streak={streak} isGuest={isGuest}/>
      <ProfileHeader
        isGuest={isGuest}
        onOpenLogin={() => setShowLoginPrompt(true)}
        name={name}
        joined={joined}
        entryCount={displayEntries.length}
        trackedShows={displayShows}
      />
      <ProfileTabs tab={tab} setTab={setTab}/>
      {tab === 'Activity' && <ActivityTab entries={displayEntries} onGoToJournal={() => router.push('/journal')}/>}
      {tab === 'Stats' && <StatsTab entries={displayEntries} trackedShows={displayShows} isLive={!isGuest}/>}
      {tab === 'Badges' && <BadgesTab badges={displayBadges}/>}
    </Layout>
  );
}
