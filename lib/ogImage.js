// Fetches an article's og:image meta tag as a fallback thumbnail —
// same thing link previews use. Only reads the <head> chunk so it
// stays fast even on heavier pages.
export async function fetchOgImage(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; QuextBot/1.0)' },
    });
    clearTimeout(timeout);

    const reader = res.body.getReader();
    let html = '';
    while (html.length < 40000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += Buffer.from(value).toString('utf-8');
      if (html.includes('</head>')) break;
    }
    reader.cancel();

    const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return match?.[1] || null;
  } catch {
    return null;
  }
}
