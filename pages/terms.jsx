import LegalPage from '../components/legal/LegalPage';

const sections = [
  { heading: 'Acceptance of Terms', body: [
    "By creating an account or using Quext, you agree to these Terms of Service. If you don't agree, please don't use the app.",
  ]},
  { heading: 'The Service', body: [
    "Quext is an anime journaling and discovery app, operated by an individual based in Nigeria. Core features (Discover, News, guest browsing) are free. A Premium subscription unlocks additional features, currently including custom accent/background themes and enhanced referral cards, billed via Paystack.",
  ]},
  { heading: 'Accounts & Eligibility', body: [
    "You must be at least 13 years old to use Quext. You're responsible for maintaining the security of your account and for all activity that happens under it. You agree to provide accurate information when creating your account.",
  ]},
  { heading: 'Subscriptions & Payments', body: [
    "Premium is billed on a recurring monthly basis through Paystack, at the price displayed at checkout at the time of purchase. Your subscription renews automatically each billing period until cancelled.",
    "You can cancel anytime; cancellation stops future billing but doesn't retroactively refund the current billing period unless required by applicable law.",
    "We may change Premium's price or included features going forward; we'll make reasonable efforts to notify active subscribers of material changes before they take effect.",
  ]},
  { heading: 'Your Content', body: [
    "Journal entries, notes, and any images you upload remain yours. By posting content to Quext, you grant us a limited license to store, display, and process that content solely for the purpose of operating the app for you (for example, showing your journal back to you, or generating a referral share card you explicitly choose to create).",
    "We do not sell or share your journal content with third parties, and we do not use it to train AI models.",
    "You're responsible for what you post. Don't upload content that's illegal, infringes someone else's rights, or that you don't have permission to share.",
  ]},
  { heading: 'Acceptable Use', body: [
    "Don't use Quext to violate any law, harass others, attempt to access accounts that aren't yours, interfere with the app's normal operation, or scrape/reproduce the app's content or code without permission.",
  ]},
  { heading: 'Third-Party Content & Links', body: [
    "Quext displays anime information sourced from MyAnimeList (via the Jikan API) and news aggregated from public RSS feeds (Crunchyroll, MyAnimeList, Anime News Network), and links out to third-party streaming platforms. We don't control this third-party content and aren't responsible for its accuracy, availability, or the practices of the sites you're linked to.",
  ]},
  { heading: 'Intellectual Property', body: [
    "The Quext name, design, and original code are owned by us. Anime titles, artwork, and related media referenced in the app belong to their respective copyright holders — Quext doesn't claim ownership over them and uses them for informational/discovery purposes.",
  ]},
  { heading: 'Disclaimers & Limitation of Liability', body: [
    "Quext is provided \"as is,\" without warranties of any kind. We don't guarantee the app will be uninterrupted, error-free, or that streaming availability information shown is always accurate (platforms change their catalogs without notice).",
    "To the fullest extent permitted by law, Quext and its operator aren't liable for indirect, incidental, or consequential damages arising from your use of the app.",
  ]},
  { heading: 'Termination', body: [
    "You can stop using Quext and delete your account at any time. We may suspend or terminate accounts that violate these Terms, including abusive behavior or attempts to circumvent Premium gating.",
  ]},
  { heading: 'Changes to These Terms', body: [
    "We may update these Terms as the app evolves. We'll update the \"Last updated\" date when we do; continuing to use Quext after a change means you accept the updated Terms.",
  ]},
  { heading: 'Governing Law', body: [
    "These Terms are governed by the laws of Nigeria, without regard to conflict-of-law principles.",
  ]},
  { heading: 'Contact Us', body: [
    "Questions about these Terms? Reach us at edgepro63@gmail.com.",
  ]},
];

export default function Terms() {
  return <LegalPage title="Terms of Service" updated="August 2026" sections={sections}/>;
}
