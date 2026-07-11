import { PAD } from '../../lib/theme';

const TABS = ['Activity', 'Refer'];

export default function ProfileTabs({ tab, setTab }) {
  return (
    <div style={{ display:'flex', gap:22, padding:`0 ${PAD}`, marginBottom:32, borderBottom:'1px solid var(--hairline)' }}>
      {TABS.map(t => {
        const active = tab === t;
        return (
          <button key={t} onClick={() => setTab(t)} style={{
            background:'none', border:'none', cursor:'pointer',
            fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:700,
            color: active ? 'var(--orange)' : 'var(--text-dim)',
            padding:'0 0 14px', position:'relative',
          }}>
            {t}
            {active && <span style={{ position:'absolute', bottom:-1, left:0, right:0, height:2, background:'var(--orange)' }}/>}
          </button>
        );
      })}
    </div>
  );
}
