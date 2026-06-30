// GET /api/anime/upcoming
// Returns anime premiering or with confirmed dates this/next month
// Used by: Calendar page grid + upcoming list

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Jikan seasons/upcoming gives next season's confirmed lineup
    const response = await fetch(
      'https://api.jikan.moe/v4/seasons/upcoming?limit=20&sfw=true',
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`Jikan responded with ${response.status}`);

    const data = await response.json();

    const events = data.data
      .filter(a => a.aired?.from) // only ones with a real date
      .map(a => {
        const date = new Date(a.aired.from);
        return {
          mal_id:    a.mal_id,
          title:     a.title,
          day:       date.getUTCDate(),
          month:     date.getUTCMonth(), // 0-indexed
          year:      date.getUTCFullYear(),
          status:    'confirmed', // upcoming season = confirmed, not yet airing
          platform:  a.streaming?.[0]?.name?.slice(0,3).toUpperCase() || 'TBA',
          image_url: a.images?.jpg?.image_url,
          genres:    a.genres.map(g => g.name),
        };
      });

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
    return res.status(200).json({ events });

  } catch (err) {
    console.error('upcoming error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch upcoming releases' });
  }
}
