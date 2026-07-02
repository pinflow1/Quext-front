import { useEffect } from 'react';
import '../styles/globals.css';
import { AppProvider } from '../context/AppContext';
import LoginPromptModal from '../components/auth/LoginPromptModal';
import ReminderToast from '../components/auth/ReminderToast';
import UpsellPopup from '../components/auth/UpsellPopup';
import { useApp } from '../context/AppContext';

function Modals() {
  const { showLoginPrompt, setShowLoginPrompt, reminder, setReminder, showUpsell, setShowUpsell, handleSignIn, handleUpgrade } = useApp();
  return (
    <>
      {showLoginPrompt && (
        <LoginPromptModal
          onClose={() => setShowLoginPrompt(false)}
          onSignIn={handleSignIn}
        />
      )}
      {reminder && (
        <ReminderToast
          message={reminder}
          onClose={() => setReminder(null)}
          onSignIn={() => { setReminder(null); setShowLoginPrompt(true); }}
        />
      )}
      {showUpsell && (
        <UpsellPopup
          onClose={() => setShowUpsell(false)}
          onUpgrade={handleUpgrade}
        />
      )}
    </>
  );
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const saved = localStorage.getItem('quext-force-dark') === 'true';
    if (saved) document.documentElement.classList.add('theme-dark');
  }, []);

  return (
    <AppProvider>
      <Component {...pageProps}/>
      <Modals/>
    </AppProvider>
  );
}
