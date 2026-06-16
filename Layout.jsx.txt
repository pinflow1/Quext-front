import Nav from './Nav';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav />
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 80 }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
