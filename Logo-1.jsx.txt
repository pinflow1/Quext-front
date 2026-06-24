export default function Logo({ size = 28, withWordmark = false }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <img
        src="/images/logo.webp"
        alt="Quext"
        width={size}
        height={size}
        style={{ width:size, height:size, objectFit:'contain', flexShrink:0 }}
      />
      {withWordmark && (
        <span style={{
          fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:700,
          letterSpacing:'-0.02em', fontSize:20, color:'var(--text)',
        }}>QUEXT</span>
      )}
    </div>
  );
}
