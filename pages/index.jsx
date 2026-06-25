import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import Splash from '../components/onboarding/Splash';
import DiscoverSlide from '../components/onboarding/DiscoverSlide';
import PlatformsSlide from '../components/onboarding/PlatformsSlide';

const SLIDES = [
  { Component: Splash,         auto: true,  showSkip: false },
  { Component: DiscoverSlide,  auto: false, showSkip: true  },
  { Component: PlatformsSlide, auto: false, showSkip: false },
];

export default function Onboarding() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/discover');
    });
  }, []);

  useEffect(() => {
    if (SLIDES[idx].auto) {
      const t = setTimeout(() => setIdx(1), 1800);
      return () => clearTimeout(t);
    }
  }, [idx]);

  const next = () => idx < SLIDES.length - 1 ? setIdx(idx + 1) : router.push('/discover');
  const skip = () => router.push('/discover');
  const { Component, showSkip } = SLIDES[idx];

  return (
    <div style={{ background:'#000', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20, overflow:'hidden' }}>
      <div style={{ width:'100%', maxWidth:400, minHeight:'85vh', display:'flex', flexDirection:'column', padding:'20px 24px 32px', overflow:'hidden' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, minHeight:24 }}>
          {idx > 1 && (
            <button onClick={() => setIdx(idx - 1)} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.4)', fontSize:20, cursor:'pointer', lineHeight:1 }}>←</button>
          )}
          <div/>
          {showSkip && (
            <button onClick={skip} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,0.35)', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>Skip</button>
          )}
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <Component onNext={next}/>
        </div>
      </div>
    </div>
  );
}
