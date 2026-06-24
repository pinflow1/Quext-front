import { PAD } from '../../lib/theme';
import { BADGE_ICON } from './badgeIcons';
import { BADGES } from '../../lib/profileData';

export default function BadgesTab() {
  return (
    <div style={{ padding:`0 ${PAD}` }}>
      {BADGES.map((b,i) => (
        <div key={b.title} style={{
          display:'flex', alignItems:'center', gap:16, padding:'16px 0',
          borderTop: i===0 ? '1px solid var(--hairline)' : 'none', borderBottom:'1px solid var(--hairline)',
          opacity: b.earned ? 1 : 0.45,
        }}>
          <div style={{ width:36, height:36, borderRadius:8, border:`1.5px solid ${b.earned ? 'var(--orange)' : 'var(--text-faint)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, position:'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={b.earned ? 'var(--orange)' : 'var(--text-faint)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
              {BADGE_ICON[b.icon]}
            </svg>
            {!b.earned && (
              <div style={{ position:'absolute', bottom:-4, right:-4, width:16, height:16, borderRadius:50, background:'var(--bg)', border:'1px solid var(--hairline)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2" style={{width:9,height:9}}>
                  <rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 018 0v3"/>
                </svg>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, color:'var(--text)', marginBottom:2 }}>{b.title}</div>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'var(--text-dim)' }}>{b.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
