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

  const planCode = process.env.PAYSTACK_PLAN_CODE;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Diagnostic — plan codes aren't secret (Paystack shows them in
  // shareable payment page URLs), so logging the full value is safe
  // and lets us confirm it matches exactly what's in the dashboard.
  console.log(`paystack config check: plan=${planCode || '(missing)'}, siteUrl=${siteUrl || '(missing)'}`);

  if (!planCode) {
    return res.status(500).json({ error: 'PAYSTACK_PLAN_CODE is not set in environment variables' });
  }
  if (!siteUrl) {
    return res.status(500).json({ error: 'NEXT_PUBLIC_SITE_URL is not set in environment variables' });
  }

  try {
    // Fetch the plan's real amount directly from Paystack rather than
    // hardcoding it — guarantees this always matches whatever the
    // dashboard says, with no separate value to keep in sync manually.
    const plan = await paystackRequest(`/plan/${planCode}`);
    console.log(`paystack plan amount check: ${plan.amount} kobo (₦${plan.amount / 100})`);

    const data = await paystackRequest('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        amount: plan.amount,
        plan: planCode,
        callback_url: `${siteUrl}/profile?upgraded=true`,
        metadata: { user_id: user.id },
      }),
    });

    return res.status(200).json({ authorization_url: data.authorization_url });
  } catch (err) {
    console.error('paystack initialize error:', err.message);
    return res.status(500).json({ error: err.message });
  }
    }
    
