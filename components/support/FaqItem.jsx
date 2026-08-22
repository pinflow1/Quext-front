import { useState } from 'react';
import { PAD } from '../../lib/theme';

export default function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom:'1px solid var(--hairline)' }}>
      <button onClick={() => setOpen(!open)} style={{
        width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
        gap:12, padding:`18px ${PAD}`, background:'none', border:'none', cursor:'pointer', textAlign:'left',
      }}>
        <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:15, color:'var(--text)' }}>
          {question}
        </span>
        <span style={{
          fontFamily:"'IBM Plex Mono',monospace", fontSize:16, color:'var(--orange)', flexShrink:0,
          transform: open ? 'rotate(45deg)' : 'none', transition:'transform 0.15s ease',
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, lineHeight:1.7, color:'var(--text-70)', margin:'0 0 18px', padding:`0 ${PAD}` }}>
          {answer}
        </p>
      )}
    </div>
  );
}
