// GET /api/anime/gems
// Returns hidden gems — high score, low popularity, not mainstream
// Used by: Discover page Hidden Gems section

import { jikanFetch } from '../../../lib/jikanFetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // /top/anime is one of Jikan's most-requested endpoints and stays
    // heavily cached on their end — much faster and more reliable than
    // the multi-filter /anime search we used before, which was timing
    // out under load. We do the "hidden gem" filtering ourselves instead.
    const response = await jikanFetch('https://api.jikan.moe/v4/top/anime?limit=25&sfw=true');
    const data = await response.json();

    // Filter to genuinely less popular titles (popularity rank > 200)
    const gems = data.data
      .filter(a => a.score >= 8 && a.popularity > 200 && a.status === 'Finished Airing' && a.synopsis)
      .slice(0, 4)
      .map(a => ({
        mal_id:    a.mal_id,
        title:     a.title,
        genre:     a.genres.map(g => g.name).slice(0, 2).join(' · '),
        episodes:  a.episodes || '?',
        score:     a.score,
        image_url: a.images?.jpg?.large_image_url || a.images?.jpg?.image_url,
        // Trim synopsis to a punchy 180 chars for the editorial note
        note:      a.synopsis?.slice(0, 180).trimEnd() + '...',
        byline:    '— curated by the Quext team',
      }));

    res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate=3600');
    return res.status(200).json({ gems });

  } catch (err) {
    console.error('gems error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch hidden gems' });
  }
}
