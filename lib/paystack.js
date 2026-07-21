// Thin wrapper around Paystack's REST API. No SDK needed — Paystack's
// API is plain REST with a bearer token, so raw fetch keeps this
// dependency-free.
const BASE_URL = 'https://api.paystack.co';

export async function paystackRequest(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
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
