// Thin wrapper around Paystack's REST API. No SDK needed — Paystack's
// API is plain REST with a bearer token, so raw fetch keeps this
// dependency-free.
const BASE_URL = 'https://api.paystack.co';

export async function paystackRequest(path, options = {}) {
  // .trim() strips accidental leading/trailing whitespace or a stray
  // newline — a very common issue when copying long keys on mobile,
  // and enough on its own to make Paystack reject an otherwise-correct key.
  const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();

  // Safe diagnostic — logs presence/length only, never the actual key,
  // so we can tell from Vercel logs whether the env var even reached
  // this function without exposing anything sensitive.
  console.log(`paystack key check: present=${!!secretKey}, length=${secretKey.length}, prefix=${secretKey.slice(0, 7)}`);

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || `Paystack request to ${path} failed`);
  }
  return data.data;
}
