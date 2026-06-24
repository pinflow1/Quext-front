export default function SyncButton({ onClick }) {
  return (
    <button onClick={onClick} className="btn-resume" style={{
      border:'none', borderRadius:50, padding:'10px 20px',
      fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:12, cursor:'pointer',
      display:'flex', alignItems:'center', gap:7, flexShrink:0,
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}>
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      Sync Calendar
    </button>
  );
}
