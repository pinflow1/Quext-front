// Picks the best real streaming link from Jikan's `streaming` array,
// which contains actual deep URLs to each platform's page for that
// specific show (not just their homepage). Crunchyroll is prioritized
// since that's our affiliate partner once approved.
const PLATFORM_PRIORITY = ['Crunchyroll', 'Netflix', 'Hulu', 'HIDIVE', 'Disney Plus', 'Funimation'];

export function pickBestLink(streaming = []) {
  if (!streaming.length) return null;
  for (const name of PLATFORM_PRIORITY) {
    const match = streaming.find(s => s.name === name);
    if (match) return match;
  }
  return streaming[0]; // fall back to whatever's first if none match our priority list
}

// Fetches full anime detail (needed for streaming links, which the
// lighter seasonal list endpoint doesn't include) and opens the best
// available watch link in a new tab. Falls back to the anime's MAL
// page if no streaming platform data exists.
export async function openWatchLink(malId) {
  try {
    const res = await fetch(`/api/anime/${malId}`);
    const data = await res.json();
    const link = pickBestLink(data.anime?.streaming);
    window.open(link?.url || `https://myanimelist.net/anime/${malId}`, '_blank');
    return link?.name || null;
  } catch {
    window.open(`https://myanimelist.net/anime/${malId}`, '_blank');
    return null;
  }
}
