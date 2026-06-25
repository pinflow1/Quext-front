import { PAD } from '../../lib/theme';

export default function SupportRow() {
  return (
    <div
      onClick={() => window.open('https://ko-fi.com', '_blank')}
      style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:`16px ${PAD}`, borderTop:'1px solid var(--hairline)', cursor:'pointer' }}
    >
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          <span style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14, color:'var(--text)' }}>Support Us</span>
        </div>
        <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'var(--text-dim)', marginLeft:22 }}>Top supporters earn an exclusive badge</div>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:16,height:16,color:'var(--text-faint)'}}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  );
}
