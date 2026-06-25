import { useRouter } from 'next/router';
import Link from 'next/link';
import { NAV_ITEMS } from './navConfig';

export default function BottomNav() {
  const router = useRouter();
  const active = NAV_ITEMS.find(n => router.pathname.startsWith(n.href))?.id;

  return (
    <div className="mobile-only" style={{
      position:'fixed', bottom:16, left:'50%', transform:'translateX(-50%)',
      background:'var(--glass-bg)',
      backdropFilter:'blur(20px) saturate(180%)', WebkitBackdropFilter:'blur(20px) saturate(180%)',
      border:'1px solid var(--glass-border)',
      borderRadius:50, padding:'8px 10px', display:'flex', gap:4,
      boxShadow:'0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
      zIndex:50, maxWidth:'calc(100vw - 24px)',
    }}>
      {NAV_ITEMS.map(({ id, label, href, icon }) => {
        const isActive = active === id;
        return (
          <Link key={id} href={href} style={{ textDecoration:'none' }}>
            <div className="nav-pill" style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              gap: isActive ? 7 : 0, padding: isActive ? '9px 16px' : '9px 12px',
              borderRadius:50,
              background: isActive ? 'var(--glass-active)' : 'transparent',
              color: isActive ? 'var(--text)' : 'var(--text-dim)',
              cursor:'pointer', transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              overflow:'hidden', whiteSpace:'nowrap',
            }}>
              <span style={{ flexShrink:0, display:'flex' }}>{icon}</span>
              <span style={{
                fontSize:13, fontWeight:700, fontFamily:'Inter,sans-serif',
                maxWidth: isActive ? 80 : 0, opacity: isActive ? 1 : 0, overflow:'hidden',
                transition:'max-width 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
              }}>{label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
