// GET /api/news/feed
// Aggregates anime/manga news from public RSS feeds.
// Crunchyroll + MyAnimeList cover their own platforms directly;
// Anime News Network covers industry-wide announcements (Netflix,
// Hulu, HIDIVE, Disney+ etc), since those platforms don't publish
// their own anime news feeds.

import Parser from 'rss-parser';

// Crunchyroll blocks requests without a realistic browser User-Agent —
// without this header the fetch gets silently rejected.
const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.crunchyroll.com/news',
  },
});

const SOURCES = [
  { key: 'crunchyroll', name: 'Crunchyroll', url: 'https://www.crunchyroll.com/newsrss?lang=en' },
  { key: 'mal',         name: 'MyAnimeList', url: 'https://myanimelist.net/rss/news.xml' },
  { key: 'ann',         name: 'ANN',         url: 'https://www.animenewsnetwork.com/all/rss.xml' },
];

function extractImage(item) {
  if (item.enclosure?.url) return item.enclosure.url;
  const media = item['media:thumbnail'] || item['media:content'];
  if (media?.$?.url) return media.$.url;
  const match = item.content?.match(/<img[^>]+src="([^">]+)"/);
  return match?.[1] || null;
}

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results = await Promise.allSettled(
    SOURCES.map(async (src) => {
      const feed = await parser.parseURL(src.url);
      return feed.items.slice(0, 10).map((item) => ({
        title: item.title,
        summary: stripHtml(item.contentSnippet || item.content || '').slice(0, 160),
        link: item.link,
        image: extractImage(item),
        source: src.name,
        sourceKey: src.key,
        publishedAt: item.pubDate || item.isoDate || null,
      }));
    })
  );

  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`${SOURCES[i].name} feed failed:`, r.reason?.message);
  });

  const articles = results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .filter((a) => a.title && a.link)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const failedSources = SOURCES
    .map((s, i) => results[i].status === 'rejected' ? { name: s.name, reason: results[i].reason?.message } : null)
    .filter(Boolean);

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=600');
  return res.status(200).json({ articles, failedSources });
}
