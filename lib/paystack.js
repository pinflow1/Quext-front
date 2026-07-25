// Thin wrapper around Paystack's REST API. No SDK needed — Paystack's
// API is plain REST with a bearer token, so raw fetch keeps this
// dependency-free.
const BASE_URL = 'https://api.paystack.co';

export async function paystackRequest(path, options = {}) {
  // Defends against common copy-paste mistakes: a stray "Bearer " prefix
  // or wrapping quote characters accidentally included in the stored
  // env var value, both of which would otherwise malform the header.
  let secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
  secretKey = secretKey.replace(/^Bearer\s+/i, '');
  secretKey = secretKey.replace(/^["']|["']$/g, '');

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
