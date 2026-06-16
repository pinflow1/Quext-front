import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV = [
  {
    id: 'discover', label: 'Discover', href: '/discover',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  },
  {
    id: 'list', label: 'My List', href: '/list',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  },
  {
    id: 'alerts', label: 'Alerts', href: '/alerts',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
  },
  {
    id: 'profile', label: 'Profile', href: '/profile',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  },
];

export default function Nav({ alertCount = 2 }) {
  const router = useRouter();
  const active = NAV.find(n => router.pathname.startsWith(n.href))?.id;

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="sidebar" style={{
        width: 210, flexShrink: 0,
        borderRight: '1px solid var(--border)',
        padding: '24px 14px',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        background: 'var(--bg)'
      }}>
        {/* Logo */}
        <div style={{ padding: '6px 12px', marginBottom: 28 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--white)', letterSpacing: -0.5 }}>Quext</span>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
          borderRadius: 50, padding: '8px 14px', marginBottom: 20
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:14,height:14,color:'var(--muted)',flexShrink:0}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Search anime...</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          {NAV.map(({ id, label, href, icon }) => (
            <Link key={id} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 14px', borderRadius: 50,
                background: active === id ? 'rgba(245,160,32,0.1)' : 'transparent',
                color: active === id ? 'var(--orange)' : 'var(--muted)',
                fontWeight: active === id ? 700 : 500,
                fontSize: 13, transition: 'all 0.2s', cursor: 'pointer'
              }}>
                {icon}{label}
                {id === 'alerts' && alertCount > 0 && (
                  <span style={{
                    marginLeft: 'auto', background: 'rgba(245,160,32,0.15)',
                    color: 'var(--orange)', fontSize: 10, fontWeight: 700,
                    padding: '1px 7px', borderRadius: 50
                  }}>{alertCount}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div style={{
        position: 'fixed', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border)', borderRadius: 50,
        padding: '6px', display: 'flex', gap: 2,
        boxShadow: '0 8px 32px rgba(0,0,0,0.8)', zIndex: 50
      }}>
        {NAV.map(({ id, label, href, icon }) => (
          <Link key={id} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '7px 13px', borderRadius: 50,
              background: active === id ? 'rgba(245,160,32,0.1)' : 'transparent',
              color: active === id ? 'var(--orange)' : 'var(--muted)',
              minWidth: 50, position: 'relative', transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              {icon}
              <span style={{ fontSize: 9, fontWeight: 700 }}>{label}</span>
              {id === 'alerts' && alertCount > 0 && (
                <span style={{
                  position: 'absolute', top: 5, right: 9,
                  width: 5, height: 5, background: 'var(--orange)', borderRadius: 50
                }}/>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
