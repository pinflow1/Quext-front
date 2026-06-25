import { PAD } from '../../lib/theme';
import Toggle from './Toggle';

export default function SettingsToggleRow({ label, checked, onChange }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:`16px ${PAD}`, borderTop:'1px solid var(--hairline)' }}>
      <span style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14, color:'var(--text)' }}>{label}</span>
      <Toggle checked={checked} onChange={onChange}/>
    </div>
  );
}
