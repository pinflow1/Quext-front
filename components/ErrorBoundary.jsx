import { Component } from 'react';

// React only supports error boundaries via class components — no hook
// equivalent exists yet. This catches render-time crashes anywhere in
// the page tree so one broken component can't blank the whole app.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Quext crashed:', error, info);
  }

  componentDidUpdate(prevProps) {
    // Auto-recover when the user navigates to a different page —
    // otherwise a crash on one tab would permanently blank every
    // other tab until a hard refresh.
    if (this.state.hasError && prevProps.routeKey !== this.props.routeKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', padding:32, textAlign:'center',
        }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, letterSpacing:2, color:'var(--orange)', textTransform:'uppercase', marginBottom:14 }}>
            Something Broke
          </div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:22, color:'var(--text)', marginBottom:12, maxWidth:320 }}>
            This page hit a snag
          </div>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'var(--text-dim)', maxWidth:320, lineHeight:1.6, marginBottom:28 }}>
            Nothing else is affected — try reloading, or head back to Discover.
          </p>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => window.location.reload()} className="btn-resume" style={{ border:'none', borderRadius:50, padding:'12px 22px', fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:13, cursor:'pointer' }}>
              Reload
            </button>
            <a href="/discover" style={{ textDecoration:'none' }}>
              <div style={{ border:'1.5px solid var(--hairline)', borderRadius:50, padding:'12px 22px', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, color:'var(--text)' }}>
                Go to Discover
              </div>
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
