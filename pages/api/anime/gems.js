// GET /api/anime/gems
// Returns hidden gems — high score, low popularity, not mainstream
// Used by: Discover page Hidden Gems section

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // High score (8–9), low popularity rank (>500 = less known), completed only
    const params = new URLSearchParams({
      order_by: 'score',
      sort: 'desc',
      min_score: '8',
      status: 'complete',
      sfw: 'true',
      limit: '6',
    });

    const response = await fetch(
      `https://api.jikan.moe/v4/anime?${params}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`Jikan responded with ${response.status}`);

    const data = await response.json();

    // Filter to genuinely less popular titles (popularity rank > 500)
    const gems = data.data
      .filter(a => a.popularity > 500 && a.synopsis)
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

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    return res.status(200).json({ gems });

  } catch (err) {
    console.error('gems error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch hidden gems' });
  }
}
