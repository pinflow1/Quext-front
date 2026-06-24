import { useState } from 'react';
import SettingsHeader from './SettingsHeader';
import SettingsGroupLabel from './SettingsGroupLabel';
import SettingsRow from './SettingsRow';
import SettingsToggleRow from './SettingsToggleRow';
import AccountRow from './AccountRow';
import SupportRow from './SupportRow';
import LogOutButton from './LogOutButton';

export default function SettingsPage({ onBack, isGuest, onGuestGate }) {
  const [alerts, setAlerts] = useState(false);
  const [forceDark, setForceDark] = useState(false);

  const handleAlertsToggle = (next) => {
    if (isGuest) { onGuestGate('Episode alerts need an account'); return; }
    setAlerts(next);
  };

  const handleForceDark = (next) => {
    setForceDark(next);
    document.documentElement.classList.toggle('theme-dark', next);
  };

  return (
    <div style={{ paddingBottom:60 }}>
      <SettingsHeader onBack={onBack}/>

      <SettingsGroupLabel>Account</SettingsGroupLabel>
      <AccountRow isGuest={isGuest}/>

      <SettingsGroupLabel>Notifications</SettingsGroupLabel>
      <SettingsToggleRow label="Episode Alerts" checked={alerts} onChange={handleAlertsToggle}/>
      <SettingsRow label="General Settings" onClick={() => {}}/>

      <SettingsGroupLabel>Preferences</SettingsGroupLabel>
      <SettingsToggleRow label="Force Dark Mode" checked={forceDark} onChange={handleForceDark}/>
      <SettingsRow label="Language" onClick={() => {}}/>

      <SettingsGroupLabel>Support</SettingsGroupLabel>
      <SupportRow/>
      <SettingsRow label="FAQ" onClick={() => {}}/>
      <SettingsRow label="Terms of Service" onClick={() => {}}/>
      <SettingsRow label="Privacy Policy" onClick={() => {}}/>

      <LogOutButton/>
    </div>
  );
}
