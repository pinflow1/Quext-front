import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProfileBanner from '../components/profile/ProfileBanner';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ActivityTab from '../components/profile/ActivityTab';
import ReferTab from '../components/profile/ReferTab';
import EditProfileModal from '../components/profile/EditProfileModal';
import SettingsPage from '../components/settings/SettingsPage';
import useProfile from '../lib/useProfile';
import { useApp } from '../context/AppContext';
import { JOURNAL_ENTRIES } from '../lib/journalData';

export default function Profile() {
  const router = useRouter();
  const [view, setView] = useState('profile');
  const [tab, setTab] = useState('Activity');
  const [editing, setEditing] = useState(false);
  const { isGuest, isPremium, handleGuestGate, setShowLoginPrompt } = useApp();
  const { session, name, avatarUrl, bannerStyle, joined, entries, trackedShows, streak, refresh } = useProfile();

  const displayEntries = isGuest ? JOURNAL_ENTRIES : entries;
  const displayShows = isGuest ? new Set(JOURNAL_ENTRIES.map(e => e.animeId)).size : trackedShows;

  if (view === 'settings') {
    return (
      <Layout>
        <SettingsPage onBack={() => setView('profile')} isGuest={isGuest} onGuestGate={handleGuestGate}/>
      </Layout>
    );
  }

  const handleAvatarTap = () => {
    if (isGuest) { handleGuestGate('Editing your profile needs an account'); return; }
    setEditing(true);
  };

  return (
    <Layout>
      <ProfileBanner
        onOpenSettings={() => setView('settings')}
        onEditAvatar={handleAvatarTap}
        avatarUrl={avatarUrl}
        bannerStyle={bannerStyle}
        streak={streak}
        isGuest={isGuest}
      />
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
      {tab === 'Refer' && <ReferTab entries={displayEntries} isPremium={isPremium}/>}

      {editing && (
        <EditProfileModal
          session={session}
          currentName={name}
          currentAvatar={avatarUrl}
          currentBanner={bannerStyle}
          onClose={() => setEditing(false)}
          onSaved={refresh}
        />
      )}
    </Layout>
  );
}
