import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isGuest, setIsGuest] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [reminder, setReminder] = useState(null);
  const [watchClicks, setWatchClicks] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);

  // Auto-show login prompt once after landing
  useEffect(() => {
    const t = setTimeout(() => setShowLoginPrompt(true), 900);
    return () => clearTimeout(t);
  }, []);

  const handleSignIn = () => {
    setIsGuest(false);
    setShowLoginPrompt(false);
    setReminder(null);
  };

  const handleGuestGate = (message) => setReminder(message);

  // All watch/affiliate CTA clicks route through here.
  // Every 5th click triggers the premium upsell for non-premium users.
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
