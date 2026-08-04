// GET /api/anime/search?q=frieren&limit=10
// Used by: Discover search bar, Journal add entry anime picker

import { jikanFetch } from '../../../lib/jikanFetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, limit = 10 } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }

  try {
    const params = new URLSearchParams({
      q: q.trim(),
      limit: Math.min(Number(limit), 25),
      order_by: 'score',
      sort: 'desc',
      sfw: 'true',
    });

    const response = await jikanFetch(`https://api.jikan.moe/v4/anime?${params}`);
    const data = await response.json();

    const results = data.data.map(a => ({
      mal_id:    a.mal_id,
      title:     a.title,
      score:     a.score,
      episodes:  a.episodes,
      status:    a.status,
      genres:    a.genres.map(g => g.name),
      image_url: a.images?.jpg?.large_image_url || a.images?.jpg?.image_url,
      aired:     a.aired?.from || null,
    }));

    // Cache search results for 10 minutes
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');
    return res.status(200).json({ results, total: results.length });

  } catch (err) {
    console.error('search error:', err.message);
    return res.status(500).json({ error: 'Search failed' });
  }
        }
