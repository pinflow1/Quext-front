import Layout from '../components/Layout';
import FaqItem from '../components/support/FaqItem';
import { PAD } from '../lib/theme';

const FAQS = [
  { q: "Do I need an account to use Quext?", a: "No — you can browse Discover and News as a guest. You'll need an account (Google or email) to save journal entries, sync your calendar, or go Premium." },
  { q: "How does the Journal work?", a: "Search for any anime, add an entry with the episode you're on and any notes you want to keep. Your streak counts consecutive days you've journaled, shown on your profile." },
  { q: "What does Premium include?", a: "Custom accent and background colors (pick any color, not just presets), extra deco options on your shareable referral card, and no sponsored row in Discover. More is planned." },
  { q: "How do I cancel Premium?", a: "Cancel anytime from Settings. You'll keep Premium access until the end of your current billing period — no partial refund for the remaining days, in line with our Terms of Service." },
  { q: "Does Calendar Sync need Google specifically?", a: "Yes. Calendar Sync writes events to your real Google Calendar, which requires signing in with Google. If you signed in with email instead, that feature isn't available — the app tells you this upfront." },
  { q: "Is my journal private?", a: "Yes. Your entries aren't shared with other users or used to train any AI model. See our Privacy Policy for the full details on what we collect and why." },
  { q: "Why don't some shows have a streaming link?", a: "We show real streaming platform links pulled from MyAnimeList's data, so if a title isn't currently listed as streaming anywhere we track, no link shows rather than sending you somewhere wrong." },
  { q: "Where does News come from?", a: "We aggregate public feeds from Crunchyroll, MyAnimeList, and Anime News Network. Tapping a story opens a full in-app breakdown before sending you to the original source." },
  { q: "How do I sign in — what's my password?", a: "Quext doesn't use passwords. Sign in with Google, or with an email magic link — a one-tap sign-in link sent to your inbox, no password to remember." },
];

export default function Faq() {
  return (
    <Layout>
      <div style={{ padding:`clamp(32px,8vw,56px) 0 60px` }}>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:'clamp(26px,6vw,36px)', letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 32px', padding:`0 ${PAD}` }}>
          FAQ
        </h1>
        {FAQS.map((f, i) => <FaqItem key={i} question={f.q} answer={f.a}/>)}
      </div>
    </Layout>
  );
}
