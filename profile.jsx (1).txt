import { useState } from 'react';
import Layout from '../components/Layout';
import ProfileBanner from '../components/profile/ProfileBanner';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ActivityTab from '../components/profile/ActivityTab';
import StatsTab from '../components/profile/StatsTab';
import BadgesTab from '../components/profile/BadgesTab';
import SettingsPage from '../components/settings/SettingsPage';
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [view, setView] = useState('profile');
  const [tab, setTab] = useState('Activity');
  const { isGuest, handleGuestGate, setShowLoginPrompt } = useApp();

  if (view === 'settings') {
    return (
      <Layout>
        <SettingsPage
          onBack={() => setView('profile')}
          isGuest={isGuest}
          onGuestGate={handleGuestGate}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <ProfileBanner onOpenSettings={() => setView('settings')}/>
      <ProfileHeader
        isGuest={isGuest}
        onOpenLogin={() => setShowLoginPrompt(true)}
      />
      <ProfileTabs tab={tab} setTab={setTab}/>
      {tab === 'Activity' && <ActivityTab onGoToJournal={() => router.push('/journal')}/>}
      {tab === 'Stats' && <StatsTab/>}
      {tab === 'Badges' && <BadgesTab/>}
    </Layout>
  );
}
