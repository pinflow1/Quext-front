export default function JournalFAB({ onClick }) {
  return (
    <button onClick={onClick} className="btn-resume" style={{
      position:'fixed', bottom:'clamp(80px,12vh,96px)', right:24,
      border:'none', borderRadius:50, padding:'14px 22px',
      fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:13, cursor:'pointer',
      display:'flex', alignItems:'center', gap:8, zIndex:40,
      boxShadow:'0 12px 32px rgba(0,0,0,0.4)',
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:15, height:15 }}>
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      New Entry
    </button>
  );
}
