import LegalPage from '../components/legal/LegalPage';

const sections = [
  { heading: 'Overview', body: [
    "This policy explains what information Quext (\"we\", \"us\") collects when you use the app, why we collect it, and what control you have over it. Quext is operated by an individual based in Nigeria, not a registered company.",
  ]},
  { heading: 'Information We Collect', body: [
    "Account information: your email address, and if you sign in with Google, your name and profile photo as provided by Google.",
    "Content you create: journal entries (including notes and episode progress you enter), your display name, and any avatar or banner image you upload.",
    "Usage data: general app usage and events (such as sign-ins, watch-link clicks, and journal entries saved) collected via Google Analytics, used in aggregate to understand how the app is used.",
    "Payment status: if you subscribe to Premium, Paystack processes your payment directly — we never see or store your card details. We store only your subscription status and Paystack's reference codes for your account.",
    "Calendar access: only if you choose to sign in with Google and enable Calendar Sync, we request permission to add events to your Google Calendar. We do not read your existing calendar.",
  ]},
  { heading: 'How We Use Your Information', body: [
    "To provide the core features of the app: your account, your journal, and (if enabled) calendar sync and premium features.",
    "To understand usage patterns and improve the app, using aggregated analytics rather than reviewing individual activity.",
    "To communicate with you about your account or subscription when necessary (for example, a payment failure).",
  ]},
  { heading: 'Third-Party Services We Use', body: [
    "Supabase — hosts our database, handles authentication, and stores uploaded images.",
    "Google — powers Google Sign-In and, if you enable it, Calendar Sync.",
    "Paystack — processes Premium subscription payments.",
    "Google Analytics — collects aggregated, anonymized usage data.",
    "Vercel — hosts the application itself.",
    "Jikan (MyAnimeList's public API) — supplies anime information shown throughout the app. We send search queries to Jikan (for example, when you search for a title); we do not send Jikan any of your personal account information.",
    "Each of these providers has its own privacy policy governing how they handle data on our behalf.",
  ]},
  { heading: 'External Links', body: [
    "News articles and \"watch\" buttons link out to third-party sites (including Crunchyroll, Netflix, Hulu, HIDIVE, MyAnimeList, and Anime News Network). Once you leave Quext, that site's own privacy policy applies — we have no control over and no visibility into what happens on those platforms.",
  ]},
  { heading: 'Your Choices & Rights', body: [
    "You can edit or delete your journal entries and profile information at any time from within the app.",
    "You can request a full export or deletion of your account and associated data by contacting us at edgepro63@gmail.com. We will fulfill deletion requests within a reasonable timeframe, except where we're required to retain certain records (for example, payment history) for legal or accounting purposes.",
    "You can disconnect Google Calendar access at any time via your Google Account permissions.",
  ]},
  { heading: "Children's Privacy", body: [
    "Quext is not directed at children under 13, and we do not knowingly collect personal information from anyone under that age. If you believe a child has provided us with personal information, contact us at edgepro63@gmail.com and we will delete it.",
  ]},
  { heading: 'Data Security', body: [
    "We rely on Supabase's and Vercel's infrastructure-level security, and industry-standard practices (such as encrypted connections) to protect your data. No system is perfectly secure, and we can't guarantee absolute security of information transmitted to us.",
  ]},
  { heading: 'Changes to This Policy', body: [
    "We may update this policy as the app changes. We'll update the \"Last updated\" date above when we do. Continued use of Quext after a change means you accept the updated policy.",
  ]},
  { heading: 'Contact Us', body: [
    "Questions about this policy or your data? Reach us at edgepro63@gmail.com.",
  ]},
];

export default function Privacy() {
  return <LegalPage title="Privacy Policy" updated="August 2026" sections={sections}/>;
}
