import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { openWatchLink } from '../lib/streamingLinks';
import { event as gaEvent } from '../lib/gtag';
import usePremium from '../lib/usePremium';
import { useAccentTheme } from '../lib/accentColor';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [reminder, setReminder] = useState(null);
  const [watchClicks, setWatchClicks] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  const { isPremium, refresh: refreshPremium, startCheckout, checkoutError, startingCheckout } = usePremium(session);
  const { accentTheme, previewAccent, commitAccent } = useAccentTheme(session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsGuest(!session);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsGuest(!session);
      if (session) setShowLoginPrompt(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (checkingSession || !isGuest) return;
    const t = setTimeout(() => setShowLoginPrompt(true), 900);
    return () => clearTimeout(t);
  }, [checkingSession, isGuest]);

  const handleSignIn = () => {
    gaEvent('sign_in');
    setShowLoginPrompt(false);
    setReminder(null);
  };

  const handleGuestGate = (message) => setReminder(message);

  const handleWatchClick = async (malId, title) => {
    gaEvent('watch_click', { anime_title: title || 'unknown' });
    if (!isPremium) {
      const next = watchClicks + 1;
      setWatchClicks(next);
      if (next % 5 === 0) setShowUpsell(true);
    }
    if (malId) await openWatchLink(malId);
  };

  const handleUpgrade = async () => {
    gaEvent('premium_checkout_started');
    await startCheckout();
  };

  return (
    <AppContext.Provider value={{
      isGuest, isPremium, refreshPremium,
      accentTheme, previewAccent, commitAccent,
      showLoginPrompt, setShowLoginPrompt,
      reminder, setReminder,
      showUpsell, setShowUpsell,
      showAccentPicker, setShowAccentPicker,
      checkoutError, startingCheckout,
      handleSignIn, handleGuestGate, handleWatchClick, handleUpgrade,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
