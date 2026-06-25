import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from './Logo';
import { NAV_ITEMS } from './navConfig';

export default function Nav() {
  const router = useRouter();
  const active = NAV_ITEMS.find(n => router.pathname.startsWith(n.href))?.id;

  return (
    <aside className="desktop-only" style={{
      width:200, flexShrink:0, padding:'24px 14px', display:'flex', flexDirection:'column',
      position:'sticky', top:0, height:'100vh',
      background:'var(--glass-bg)', backdropFilter:'blur(20px) saturate(180%)',
      WebkitBackdropFilter:'blur(20px) saturate(180%)',
      borderRight:'1px solid var(--glass-border)',
    }}>
      <div style={{ padding:'6px 12px', marginBottom:28 }}>
        <Logo size={26} withWordmark/>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
        {NAV_ITEMS.map(({ id, label, href, icon }) => (
          <Link key={id} href={href} style={{ textDecoration:'none' }}>
            <div className="nav-pill" style={{
              display:'flex', alignItems:'center', gap:11, padding:'10px 14px', borderRadius:50,
              background: active===id ? 'var(--orange-tint)' : 'transparent',
              color: active===id ? 'var(--orange)' : 'var(--text-dim)',
              fontWeight: active===id ? 700 : 500, fontSize:13, cursor:'pointer',
              fontFamily:'Inter,sans-serif', transition:'all 0.2s',
            }}>{icon}{label}</div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
