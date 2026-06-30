// POST /api/calendar/push
// Creates a Google Calendar event using the user's Google OAuth token
// (Supabase stores this as provider_token when user signs in with Google)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, day, month, year, providerToken } = req.body;

  if (!title || !day || month === undefined || !year) {
    return res.status(400).json({ error: 'title, day, month, year are required' });
  }

  if (!providerToken) {
    return res.status(400).json({ error: 'Google account not connected. Sign in with Google to sync.' });
  }

  try {
    // All-day event, format: YYYY-MM-DD
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const nextDay = new Date(Date.UTC(year, month, day + 1)).toISOString().slice(0,10);

    const event = {
      summary: `${title} — New Episode`,
      description: 'Added via Quext',
      start: { date: dateStr },
      end:   { date: nextDay },
    };

    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${providerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Google Calendar responded with ${response.status}`);
    }

    const created = await response.json();
    return res.status(200).json({ success: true, eventId: created.id, htmlLink: created.htmlLink });

  } catch (err) {
    console.error('calendar push error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
