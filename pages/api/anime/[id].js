// GET /api/anime/[id]
// Returns full detail for a single anime by MAL ID
// Used by: Calendar event modal, journal entry detail

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid MAL ID required' });
  }

  try {
    const [animeRes, episodesRes] = await Promise.all([
      fetch(`https://api.jikan.moe/v4/anime/${id}/full`, { headers: { 'Accept': 'application/json' } }),
      fetch(`https://api.jikan.moe/v4/anime/${id}/episodes?page=1`, { headers: { 'Accept': 'application/json' } }),
    ]);

    if (!animeRes.ok) {
      if (animeRes.status === 404) return res.status(404).json({ error: 'Anime not found' });
      throw new Error(`Jikan responded with ${animeRes.status}`);
    }

    const animeData = await animeRes.json();
    const a = animeData.data;

    const episodesData = episodesRes.ok ? await episodesRes.json() : { data: [] };

    const anime = {
      mal_id:      a.mal_id,
      title:       a.title,
      title_en:    a.title_english,
      synopsis:    a.synopsis,
      score:       a.score,
      rank:        a.rank,
      popularity:  a.popularity,
      episodes:    a.episodes,
      status:      a.status,
      airing:      a.airing,
      genres:      a.genres.map(g => g.name),
      studios:     a.studios.map(s => s.name),
      image_url:   a.images?.jpg?.large_image_url || a.images?.jpg?.image_url,
      trailer:     a.trailer?.url || null,
      aired_from:  a.aired?.from || null,
      aired_to:    a.aired?.to || null,
      streaming:   a.streaming || [],
      episodes_list: episodesData.data?.slice(0, 12) || [],
    };

    // Cache individual anime for 6 hours
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=3600');
    return res.status(200).json({ anime });

  } catch (err) {
    console.error(`anime/${id} error:`, err.message);
    return res.status(500).json({ error: 'Failed to fetch anime details' });
  }
}
