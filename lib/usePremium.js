// Real premium status, read from the DB — kept in sync by the
// Paystack webhook, not local state that resets on reload.
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function usePremium(session) {
  const [isPremium, setIsPremium] = useState(false);
  const [checking, setChecking] = useState(true);

  const refresh = () => {
    if (!session) { setIsPremium(false); setChecking(false); return; }
    supabase.from('profiles').select('is_premium').eq('id', session.user.id).maybeSingle()
      .then(({ data }) => { setIsPremium(!!data?.is_premium); setChecking(false); });
  };

  useEffect(refresh, [session]);

  // Start Paystack checkout — redirects the browser to Paystack's
  // hosted payment page. Premium flips on automatically once the
  // webhook fires after a successful charge.
  const startCheckout = async () => {
    if (!session) return;
    const res = await fetch('/api/paystack/initialize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.authorization_url) window.location.href = data.authorization_url;
  };

  return { isPremium, checking, refresh, startCheckout };
}
