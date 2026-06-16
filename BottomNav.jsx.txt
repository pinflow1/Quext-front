import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV = [
  {
    id: 'discover', label: 'Discover', href: '/discover',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  },
  {
    id: 'journal', label: 'Journal', href: '/journal',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  },
  {
    id: 'calendar', label: 'Calendar', href: '/calendar',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  },
  {
    id: 'profile', label: 'Profile', href: '/profile',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  },
];

export default function BottomNav() {
  const router = useRouter();
  const active = NAV.find(n => router.pathname.startsWith(n.href))?.id;

  return (
    <div style={{
      position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(18,18,18,0.85)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 50, padding: '8px 10px',
      display: 'flex', gap: 4,
      boxShadow: '0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
      zIndex: 50,
    }}>
      {NAV.map(({ id, label, href, icon }) => {
        const isActive = active === id;
        return (
          <Link key={id} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: isActive ? 7 : 0,
              padding: isActive ? '9px 18px' : '9px 14px',
              borderRadius: 50,
              background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              overflow: 'hidden', whiteSpace: 'nowrap',
            }}>
              <span style={{ flexShrink: 0, display: 'flex' }}>{icon}</span>
              <span style={{
                fontSize: 13, fontWeight: 700,
                maxWidth: isActive ? 80 : 0,
                opacity: isActive ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-width 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
              }}>{label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
