import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { openWatchLink } from '../lib/streamingLinks';
import { event as gaEvent } from '../lib/gtag';
import usePremium from '../lib/usePremium';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [reminder, setReminder] = useState(null);
  const [watchClicks, setWatchClicks] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);

  const { isPremium, refresh: refreshPremium, startCheckout, checkoutError, startingCheckout } = usePremium(session);

  // Check the REAL Supabase session on mount — this fixes the loop where
  // OAuth redirects back but isGuest reset to true, re-triggering the popup.
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

  // Auto-show login prompt once, only after we've confirmed there's no real session
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

  // Every Watch Now button routes through here. Opens the real deep
  // link to the show's page on its streaming platform. Non-premium
  // clicks also count toward the upsell popup.
  const handleWatchClick = async (malId, title) => {
    gaEvent('watch_click', { anime_title: title || 'unknown' });
    if (!isPremium) {
      const next = watchClicks + 1;
      setWatchClicks(next);
      if (next % 5 === 0) setShowUpsell(true);
    }
    if (malId) await openWatchLink(malId);
  };

  // Redirects to Paystack's hosted checkout. isPremium flips to true
  // automatically once the webhook confirms payment. The popup stays
  // open on failure so checkoutError is actually visible — closing it
  // immediately used to hide errors before anyone could see them.
  const handleUpgrade = async () => {
    gaEvent('premium_checkout_started');
    await startCheckout();
  };

  return (
    <AppContext.Provider value={{
      isGuest, isPremium, refreshPremium,
      showLoginPrompt, setShowLoginPrompt,
      reminder, setReminder,
      showUpsell, setShowUpsell,
      checkoutError, startingCheckout,
      handleSignIn, handleGuestGate, handleWatchClick, handleUpgrade,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
