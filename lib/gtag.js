// Google Analytics 4 helpers for Next.js Pages Router.
// GA_ID comes from an env var so it's never hardcoded into the repo —
// set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel once you have a GA4 property.
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Fires on every route change — GA's default pageview only tracks the
// first full page load, client-side navigation needs this manually.
export function pageview(url) {
  if (!GA_ID || typeof window.gtag !== 'function') return;
  window.gtag('config', GA_ID, { page_path: url });
}

// For tracking specific actions (sign in, watch click, journal save, etc)
// beyond simple pageviews — the useful signal for understanding real usage.
export function event(name, params = {}) {
  if (!GA_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
