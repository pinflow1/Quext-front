import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SettingsHeader from './SettingsHeader';
import SettingsGroupLabel from './SettingsGroupLabel';
import SettingsRow from './SettingsRow';
import SettingsToggleRow from './SettingsToggleRow';
import AccountRow from './AccountRow';
import SupportRow from './SupportRow';
import LogOutButton from './LogOutButton';
import ThemeColorRow from './ThemeColorRow';
import { useApp } from '../../context/AppContext';
import { DEFAULT_BG } from '../../lib/useCustomTheme';

export default function SettingsPage({ onBack, isGuest, onGuestGate }) {
  const router = useRouter();
  const { bgTheme } = useApp();
  const [alerts, setAlerts] = useState(false);
  const [forceDark, setForceDark] = useState(false);
  const isDefaultBg = bgTheme === DEFAULT_BG;

  useEffect(() => {
    const saved = localStorage.getItem('quext-force-dark') === 'true';
    setForceDark(saved);
    document.documentElement.classList.toggle('theme-dark', saved);
  }, []);

  const handleAlertsToggle = (next) => {
    if (isGuest) { onGuestGate('Episode alerts need an account'); return; }
    setAlerts(next);
  };

  const handleForceDark = (next) => {
    setForceDark(next);
    document.documentElement.classList.toggle('theme-dark', next);
    localStorage.setItem('quext-force-dark', String(next));
  };

  return (
    <div style={{ paddingBottom:60 }}>
      <SettingsHeader onBack={onBack}/>

      <SettingsGroupLabel>Account</SettingsGroupLabel>
      <AccountRow isGuest={isGuest}/>

      <SettingsGroupLabel>Notifications</SettingsGroupLabel>
      <SettingsToggleRow label="Episode Alerts" checked={alerts} onChange={handleAlertsToggle}/>

      <SettingsGroupLabel>Preferences</SettingsGroupLabel>
      {isDefaultBg ? (
        <SettingsToggleRow label="Force Dark Mode" checked={forceDark} onChange={handleForceDark}/>
      ) : (
        <div style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text-dim)' }}>
          Force Dark Mode is off while a custom background is active
        </div>
      )}
      <ThemeColorRow label="Accent Color" target="accent"/>
      <ThemeColorRow label="Background Color" target="bg"/>

      <SettingsGroupLabel>Support</SettingsGroupLabel>
      <SupportRow/>
      <SettingsRow label="FAQ" onClick={() => router.push('/faq')}/>
      <SettingsRow label="Terms of Service" onClick={() => router.push('/terms')}/>
      <SettingsRow label="Privacy Policy" onClick={() => router.push('/privacy')}/>

      {!isGuest && <LogOutButton/>}
    </div>
  );
}
