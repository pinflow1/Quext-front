// Jikan is a free, community-run unofficial MAL API — reliable most of
// the time, but prone to occasional 504s under load. This wraps fetch
// with one retry + a short backoff before giving up, since a single
// transient timeout shouldn't take down a whole page section.
export async function jikanFetch(url, options = {}, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json', ...options.headers },
        ...options,
      });
      if (res.ok) return res;
      // 4xx errors (like 404 — anime doesn't exist) are permanent,
      // retrying won't help. Only 5xx/network issues are worth retrying.
      if (res.status < 500 || attempt === retries) {
        throw new Error(`Jikan responded with ${res.status}`);
      }
    } catch (err) {
      if (attempt === retries) throw err;
    }
    await new Promise(r => setTimeout(r, 600));
  }
}
