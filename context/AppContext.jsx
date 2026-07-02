import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isGuest, setIsGuest] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [reminder, setReminder] = useState(null);
  const [watchClicks, setWatchClicks] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);

  // Check the REAL Supabase session on mount — this fixes the loop where
  // OAuth redirects back but isGuest reset to true, re-triggering the popup.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsGuest(!session);
      setCheckingSession(false);
    });

    // Keep isGuest in sync if the session changes (sign in / sign out / token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsGuest(!session);
      if (session) setShowLoginPrompt(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Auto-show login prompt once, only after we've confirmed there's no real session
  useEffect(() => {
    if (checkingSession || !isGuest) return;
    const t = setTimeout(() => setShowLoginPrompt(true), 900);
    return () => clearTimeout(t);
  }, [checkingSession, isGuest]);

  const handleSignIn = () => {
    // isGuest flips to false via onAuthStateChange once Supabase confirms the session
    setShowLoginPrompt(false);
    setReminder(null);
  };

  const handleGuestGate = (message) => setReminder(message);

  const handleWatchClick = (title, platform) => {
    if (isPremium) return;
    const next = watchClicks + 1;
    setWatchClicks(next);
    if (next % 5 === 0) setShowUpsell(true);
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setShowUpsell(false);
  };

  return (
    <AppContext.Provider value={{
      isGuest, isPremium,
      showLoginPrompt, setShowLoginPrompt,
      reminder, setReminder,
      showUpsell, setShowUpsell,
      handleSignIn, handleGuestGate, handleWatchClick, handleUpgrade,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
