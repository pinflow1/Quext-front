import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

// ── IMAGE VARS — swap with your own ──
const CARD_IMG_1 = '/images/onboard1.jpg';
const CARD_IMG_2 = '/images/onboard2.jpg';

function Dots({ active, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 6, borderRadius: 99,
          background: i === active ? '#fff' : 'rgba(255,255,255,0.2)',
          width: i === active ? 20 : 6,
          transition: 'all 0.35s ease',
        }} />
      ))}
    </div>
  );
}

function AppIcon({ bg, children }) {
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 14,
      background: bg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
      boxShadow: '0 6px 20px rgba(0,0,0,0.4)', overflow: 'hidden',
      color: '#fff', fontWeight: 800,
    }}>
      {children}
    </div>
  );
}

// ── SLIDE 1: SPLASH ──
function Splash() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 64, height: 64, borderRadius: 20,
        background: '#0f0f0f', border: '1px solid rgba(245,160,32,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18
      }}>
        <svg viewBox="0 0 32 32" style={{ width: 30, height: 30 }}>
          <circle cx="16" cy="16" r="6" fill="none" stroke="#F5A020" strokeWidth="2" />
          <path d="M16 3 A13 13 0 0 1 29 16" fill="none" stroke="#F5A020" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 29 A13 13 0 0 1 3 16" fill="none" stroke="#F5A020" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="3" r="2" fill="#F5A020" />
          <circle cx="29" cy="16" r="2" fill="#F5A020" />
          <circle cx="16" cy="29" r="2" fill="#F5A020" />
          <circle cx="3" cy="16" r="2" fill="#F5A020" />
        </svg>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -1 }}>Quext</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>Your anime, always up to date</div>
    </div>
  );
}

// ── SLIDE 2: DISCOVER ──
function DiscoverSlide({ onNext }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Card stack */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 300, height: 320 }}>
          {/* Back cards edge effects */}
          <div style={{ position: 'absolute', height: 220, width: 260, bottom: 10, right: -80, transform: 'rotate(80deg)', transformOrigin: 'bottom center', background: '#303030', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, zIndex: 0 }} />
          <div style={{ position: 'absolute', height: 220, width: 260, top: 10, right: -80, transform: 'rotate(80deg)', transformOrigin: 'top center', background: '#303030', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, zIndex: 0 }} />
          <div style={{ position: 'absolute', height: 220, width: 260, bottom: 10, left: -80, transform: 'rotate(-80deg)', transformOrigin: 'bottom center', background: '#303030', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, zIndex: 0 }} />
          {/* c3 back — image */}
          <div style={{
            position: 'absolute', width: 280, height: 200, top: 28, left: '50%',
            transform: 'translateX(-50%) rotate(-8deg)',
            backgroundImage: `url('${CARD_IMG_1}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, zIndex: 1, overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
          </div>
          {/* c2 middle — image */}
          <div style={{
            position: 'absolute', width: 280, height: 210, top: 16, left: '50%',
            transform: 'translateX(-50%) rotate(5deg)',
            backgroundImage: `url('${CARD_IMG_2}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, zIndex: 2, overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
          </div>
          {/* c1 front — chat UI */}
          <div style={{
            position: 'absolute', width: 280, height: 228, top: 0, left: '50%',
            transform: 'translateX(-50%)',
            background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, boxShadow: '0 24px 48px rgba(0,0,0,0.55)', overflow: 'hidden', zIndex: 3
          }}>
            <div style={{ padding: '18px 18px 0' }}>
              <div style={{ background: '#2b2b2b', borderRadius: '14px 14px 14px 4px', padding: '13px 15px', fontSize: 14, color: 'rgba(255,255,255,0.88)', lineHeight: 1.45 }}>
                Find me something dark and psychological like Death Note
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 16px 16px' }}>
              <div style={{ width: 30, height: 30, borderRadius: 99, border: '1.5px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>+</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, padding: '5px 10px 5px 7px', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ width: 6, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.3)' }} />
                Auto ›
              </div>
              <div style={{ marginLeft: 'auto', width: 32, height: 32, borderRadius: 99, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M7 12V2M7 2L3 6M7 2l4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy + nav */}
      <div style={{ paddingTop: 24 }}>
        <p style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -0.9, lineHeight: 1.15, margin: '0 0 10px' }}>
          Discover anime<br />without the noise
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: '0 0 28px' }}>
          Track what you watch, get instant alerts when new seasons drop, and discover hidden gems matched to your taste.
        </p>
        <Dots active={0} total={2} />
        <button onClick={onNext} style={{
          width: '100%', height: 54, background: '#fff', color: '#000',
          border: 'none', borderRadius: 99, fontSize: 16, fontWeight: 700,
          cursor: 'pointer', marginTop: 24
        }}>Continue</button>
      </div>
    </div>
  );
}

// ── SLIDE 3: PLATFORMS ──
function PlatformsSlide({ onNext }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', gap: 10 }}>
          <AppIcon bg="linear-gradient(145deg,#f47521,#e05c00)">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="11" stroke="white" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="5" fill="white" opacity="0.9" />
              <circle cx="23" cy="9" r="3.5" fill="white" />
            </svg>
          </AppIcon>
          <AppIcon bg="linear-gradient(145deg,#2e51a2,#1a3a7a)">
            <span style={{ fontSize: 13, letterSpacing: -1 }}>MAL</span>
          </AppIcon>
          <AppIcon bg="linear-gradient(145deg,#e50914,#b0060f)">
            <span style={{ fontSize: 18, fontWeight: 900, fontStyle: 'italic' }}>N</span>
          </AppIcon>
        </div>

        {/* Command card */}
        <div style={{
          background: '#1d1d1d', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: '12px 14px', width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
        }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: '0 0 10px' }}>
            Frieren S2 is now on Crunchyroll
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, padding: '4px 9px 4px 6px', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>
              <div style={{ width: 5, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.3)' }} />
              Available now
            </div>
            <div style={{ marginLeft: 'auto', width: 28, height: 28, borderRadius: 99, background: 'rgba(245,160,32,0.15)', border: '1px solid rgba(245,160,32,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                <polygon points="3 1 10 6 3 11" fill="#F5A020" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', gap: 10 }}>
          <AppIcon bg="linear-gradient(145deg,#410099,#2d006b)">
            <span style={{ fontSize: 10 }}>FUNI</span>
          </AppIcon>
          <AppIcon bg="linear-gradient(145deg,#00b4d8,#0077a8)">
            <span style={{ fontSize: 9, fontWeight: 900 }}>HIDIVE</span>
          </AppIcon>
          <AppIcon bg="linear-gradient(145deg,#1c1c1e,#111)">
            <svg width="20" height="20" viewBox="0 0 24 28" fill="white">
              <path d="M20.15 14.56c-.03-3.27 2.67-4.85 2.79-4.93-1.52-2.22-3.88-2.53-4.72-2.57-2-.2-3.93 1.18-4.95 1.18-1.02 0-2.58-1.16-4.25-1.13-2.17.03-4.19 1.27-5.31 3.2-2.28 3.95-.58 9.77 1.62 12.97 1.08 1.56 2.36 3.3 4.04 3.24 1.63-.07 2.24-1.05 4.21-1.05 1.97 0 2.54 1.05 4.26 1.01 1.75-.03 2.86-1.57 3.93-3.14.25-.36.47-.74.65-1.13-3.52-1.35-3.27-6.65-3.27-7.65z" />
              <path d="M16.8 4.82c.9-1.09 1.5-2.6 1.33-4.11-1.29.05-2.85.86-3.77 1.94-.83.96-1.56 2.5-1.36 3.97 1.44.11 2.9-.73 3.8-1.8z" />
            </svg>
          </AppIcon>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 99, padding: '7px 18px', fontSize: 12, fontWeight: 600,
          color: 'rgba(255,255,255,0.6)', marginTop: 4
        }}>10+ streaming platforms</div>
      </div>

      {/* Copy + nav */}
      <div style={{ paddingTop: 24 }}>
        <p style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -0.9, lineHeight: 1.15, margin: '0 0 10px' }}>
          Every platform,<br />one place.
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: '0 0 28px' }}>
          Crunchyroll, Netflix, HiDive and more — always shown with every anime so you always know where to watch.
        </p>
        <Dots active={1} total={2} />
        <button onClick={onNext} style={{
          width: '100%', height: 54, background: '#fff', color: '#000',
          border: 'none', borderRadius: 99, fontSize: 16, fontWeight: 700,
          cursor: 'pointer', marginTop: 24
        }}>Get Started</button>
      </div>
    </div>
  );
}

// ── SLIDE 4: SIGN IN ──
function SignInSlide() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/discover` }
    });
  };

  const handleEmail = async () => {
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/discover` }
    });
    setLoading(false);
    if (!error) setSent(true);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: '#0f0f0f', border: '1px solid rgba(245,160,32,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg viewBox="0 0 32 32" style={{ width: 20, height: 20 }}>
            <circle cx="16" cy="16" r="6" fill="none" stroke="#F5A020" strokeWidth="2" />
            <path d="M16 3 A13 13 0 0 1 29 16" fill="none" stroke="#F5A020" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 29 A13 13 0 0 1 3 16" fill="none" stroke="#F5A020" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="3" r="2" fill="#F5A020" />
            <circle cx="29" cy="16" r="2" fill="#F5A020" />
            <circle cx="16" cy="29" r="2" fill="#F5A020" />
            <circle cx="3" cy="16" r="2" fill="#F5A020" />
          </svg>
        </div>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>Quext</span>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: -0.8 }}>Get started</h2>
        <p style={{ margin: '0 0 32px', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Create your account to start tracking.
        </p>

        {sent ? (
          <div style={{
            background: 'rgba(80,200,120,0.08)', border: '1px solid rgba(80,200,120,0.2)',
            borderRadius: 14, padding: '20px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>✉️</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Check your inbox</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>We sent a link to {email}</div>
          </div>
        ) : (
          <>
            {/* Google */}
            <button onClick={handleGoogle} style={{
              width: '100%', background: '#fff', color: '#111',
              border: 'none', borderRadius: 14, padding: '15px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontWeight: 700, fontSize: 14, cursor: 'pointer', marginBottom: 14
            }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, flexShrink: 0 }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 1, background: '#1c1c1c' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#1c1c1c' }} />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleEmail()}
              style={{
                display: 'block', width: '100%',
                background: '#0f0f0f', border: '1px solid #1c1c1c',
                borderRadius: 14, padding: '15px 16px',
                color: '#fff', fontSize: 14, outline: 'none', marginBottom: 12
              }}
            />
            <button onClick={handleEmail} disabled={loading} style={{
              width: '100%', background: '#fff', color: '#F5A020',
              border: '1.5px solid #F5A020',
              borderRadius: 14, padding: '15px 20px',
              fontWeight: 800, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? 'Sending...' : 'Continue with email'}
            </button>
          </>
        )}
      </div>

      <p style={{ margin: '20px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.18)', textAlign: 'center', lineHeight: 1.7 }}>
        By continuing you agree to our Terms of Service<br />and Privacy Policy
      </p>
    </div>
  );
}

// ── MAIN ──
const SLIDES = [
  { Component: Splash, auto: true, showSkip: false },
  { Component: DiscoverSlide, auto: false, showSkip: true },
  { Component: PlatformsSlide, auto: false, showSkip: true },
  { Component: SignInSlide, auto: false, showSkip: false },
];

export default function Onboarding() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/discover');
    });
  }, []);

  // Auto advance splash
  useEffect(() => {
    if (SLIDES[idx].auto) {
      const t = setTimeout(() => setIdx(1), 1800);
      return () => clearTimeout(t);
    }
  }, [idx]);

  const next = () => idx < SLIDES.length - 1 && setIdx(idx + 1);
  const skip = () => setIdx(SLIDES.length - 1);
  const { Component, showSkip } = SLIDES[idx];

  return (
    <div style={{
      background: '#000', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        width: '100%', maxWidth: 400, minHeight: '85vh',
        display: 'flex', flexDirection: 'column',
        padding: '20px 24px 32px',
      }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, minHeight: 24 }}>
          {idx > 1 && (
            <button onClick={() => setIdx(idx - 1)} style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,0.4)', fontSize: 20,
              cursor: 'pointer', lineHeight: 1
            }}>←</button>
          )}
          <div />
          {showSkip && (
            <button onClick={skip} style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,0.35)', fontSize: 14,
              fontWeight: 600, cursor: 'pointer'
            }}>Skip</button>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Component onNext={next} />
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.22) !important; }
        button:active { opacity: 0.85; }
      `}</style>
    </div>
  );
}
