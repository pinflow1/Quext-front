// GET /api/anime/seasonal
// Returns current season anime from Jikan API
// Used by: Discover page (hero, trending, new season alert rows)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://api.jikan.moe/v4/seasons/now?limit=24',
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`Jikan responded with ${response.status}`);
    }

    const data = await response.json();

    // Shape the data to match what our components expect
    const anime = data.data.map(a => ({
      mal_id:    a.mal_id,
      title:     a.title,
      synopsis:  a.synopsis,
      score:     a.score,
      episodes:  a.episodes,
      status:    a.status,
      airing:    a.airing,
      genres:    a.genres.map(g => g.name),
      image_url: a.images?.jpg?.large_image_url || a.images?.jpg?.image_url,
      trailer:   a.trailer?.url || null,
      aired:     a.aired?.from || null,
    }));

    // Cache for 1 hour — Jikan rate limits at 60 req/min, 3 req/sec
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
    return res.status(200).json({ anime, total: anime.length });

  } catch (err) {
    console.error('seasonal error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch seasonal anime' });
  }
}
