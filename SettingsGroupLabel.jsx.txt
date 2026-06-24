import { PAD } from '../../lib/theme';

export default function SettingsGroupLabel({ children }) {
  return (
    <div style={{ padding:`28px ${PAD} 0` }}>
      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:2, color:'var(--text-dim)', textTransform:'uppercase' }}>{children}</span>
    </div>
  );
}
