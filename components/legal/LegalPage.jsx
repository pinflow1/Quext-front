import Layout from '../Layout';
import { PAD } from '../../lib/theme';

export default function LegalPage({ title, updated, sections }) {
  return (
    <Layout>
      <div style={{ padding:`clamp(32px,8vw,56px) ${PAD} 60px`, maxWidth:680, margin:'0 auto' }}>
        <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:'clamp(26px,6vw,36px)', letterSpacing:'-0.02em', color:'var(--text)', margin:'0 0 8px' }}>
          {title}
        </h1>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:1, textTransform:'uppercase', color:'var(--text-dim)', marginBottom:36 }}>
          Last updated {updated}
        </div>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom:28 }}>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:18, color:'var(--text)', margin:'0 0 10px' }}>
              {s.heading}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} style={{ fontFamily:'Inter,sans-serif', fontSize:14, lineHeight:1.7, color:'var(--text-70)', margin:'0 0 12px' }}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
}
