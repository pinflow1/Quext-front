import { PAD } from '../../lib/theme';

export default function SettingsRow({ label, onClick, chevron = true }) {
  return (
    <div onClick={onClick} style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:`16px ${PAD}`, borderTop:'1px solid var(--hairline)', cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14, color:'var(--text)' }}>{label}</span>
      {chevron && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:16,height:16,color:'var(--text-faint)'}}>
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      )}
    </div>
  );
}
