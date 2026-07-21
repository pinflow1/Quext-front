// POST /api/paystack/webhook
// Paystack calls this whenever a payment succeeds, a subscription
// renews, or a subscription is cancelled — this is what keeps
// is_premium accurate in the database, not just a one-time checkout.

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const config = { api: { bodyParser: false } };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = await readRawBody(req);

  // Verify this request genuinely came from Paystack, not a spoofed call
  const signature = req.headers['x-paystack-signature'];
  const expected = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex');
  if (signature !== expected) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(rawBody);

  if (event.event === 'charge.success') {
    const userId = event.data.metadata?.user_id;
    if (userId) {
      await supabase.from('profiles').update({
        is_premium: true,
        paystack_customer_code: event.data.customer?.customer_code || null,
      }).eq('id', userId);
    }
  }

  if (event.event === 'subscription.disable' || event.event === 'subscription.not_renew') {
    const code = event.data.subscription_code;
    if (code) {
      await supabase.from('profiles').update({ is_premium: false }).eq('paystack_subscription_code', code);
    }
  }

  if (event.event === 'subscription.create') {
    const customerCode = event.data.customer?.customer_code;
    if (customerCode) {
      await supabase.from('profiles').update({
        paystack_subscription_code: event.data.subscription_code,
      }).eq('paystack_customer_code', customerCode);
    }
  }

  return res.status(200).json({ received: true });
}
