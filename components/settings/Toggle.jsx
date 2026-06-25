export default function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} style={{
      width:42, height:24, borderRadius:50, border:'none', cursor:'pointer',
      background: checked ? 'var(--orange)' : 'var(--track)', position:'relative',
      transition:'background 0.2s', flexShrink:0, padding:0,
    }}>
      <span style={{
        position:'absolute', top:2, left: checked ? 20 : 2,
        width:20, height:20, borderRadius:50, background:'#FFFFFF',
        transition:'left 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow:'0 1px 3px rgba(0,0,0,0.3)',
      }}/>
    </button>
  );
}
