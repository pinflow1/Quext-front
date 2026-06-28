// GET /api/anime/schedule
// Returns currently airing anime mapped to their broadcast day
// Used by: Discover page Episode Heatmap (temporary until Supabase watchlist is live)

const DAY_MAP = {
  mondays: 0, tuesdays: 1, wednesdays: 2, thursdays: 3,
  fridays: 4, saturdays: 5, sundays: 6,
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://api.jikan.moe/v4/schedules?limit=25&sfw=true',
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`Jikan responded with ${response.status}`);

    const data = await response.json();

    // Sort by score descending, take top 8 for the heatmap rows
    const shows = data.data
      .filter(a => a.score && a.broadcast?.day)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 8)
      .map(a => {
        const dayKey = a.broadcast.day?.toLowerCase();
        const dayIndex = DAY_MAP[dayKey] ?? null;
        return {
          mal_id:    a.mal_id,
          title:     a.title,
          score:     a.score,
          day:       dayKey,
          dayIndex,  // 0=Mon … 6=Sun, null if unknown
          intensity: Math.min((a.score - 6) / 3, 1), // 6.0→0.0, 9.0→1.0
          image_url: a.images?.jpg?.image_url,
        };
      })
      .filter(a => a.dayIndex !== null);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');
    return res.status(200).json({ shows });

  } catch (err) {
    console.error('schedule error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch schedule' });
  }
      }
          
