// GET /api/news/feed
// Aggregates anime/manga news from public RSS feeds.
//
// Crunchyroll's own /newsrss endpoint has a documented history of
// silently breaking/moving (confirmed via GitHub issue tracking).
// Rather than depend on an endpoint that's proven unreliable, we pull
// Crunchyroll-tagged stories out of the stable ANN feed by matching
// "Crunchyroll" in the title/summary — labeled transparently as
// "Crunchyroll · via ANN" rather than pretending to be their own feed.
// We still attempt the direct feed as a bonus source if it's up.

import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
});

const SOURCES = [
  { key: 'crunchyroll', name: 'Crunchyroll', url: 'https://www.crunchyroll.com/newsrss?lang=en', optional: true },
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

  const failedSources = SOURCES
    .map((s, i) => results[i].status === 'rejected' ? { name: s.name, reason: results[i].reason?.message, optional: !!s.optional } : null)
    .filter(Boolean);

  let articles = results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .filter((a) => a.title && a.link);

  // Backfill Crunchyroll tab from ANN if the direct feed failed —
  // ANN covers Crunchyroll's catalog extensively since CR is the
  // dominant Western distributor.
  const crFailed = failedSources.some(f => f.name === 'Crunchyroll');
  if (crFailed) {
    const proxied = articles
      .filter(a => a.sourceKey === 'ann' && /crunchyroll/i.test(a.title + a.summary))
      .map(a => ({ ...a, sourceKey: 'crunchyroll', source: 'Crunchyroll · via ANN' }));
    articles = [...articles, ...proxied];
  }

  articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=600');
  return res.status(200).json({ articles, failedSources });
}
