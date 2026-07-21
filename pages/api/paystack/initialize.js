// POST /api/paystack/initialize
// Starts a subscription checkout for the signed-in user and returns
// the Paystack-hosted checkout URL to redirect them to.

import { createClient } from '@supabase/supabase-js';
import { paystackRequest } from '../../../lib/paystack';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid session' });

  try {
    const data = await paystackRequest('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        plan: process.env.PAYSTACK_PLAN_CODE,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?upgraded=true`,
        metadata: { user_id: user.id },
      }),
    });

    return res.status(200).json({ authorization_url: data.authorization_url });
  } catch (err) {
    console.error('paystack initialize error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
