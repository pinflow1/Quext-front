import { PAD } from '../../lib/theme';

export default function LogOutButton() {
  return (
    <div style={{ padding:`36px ${PAD} 0` }}>
      <button className="btn-danger" style={{
        width:'100%', border:'1.5px solid var(--red)', background:'transparent',
        borderRadius:50, padding:14, color:'var(--red)',
        fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor:'pointer',
      }}>Log Out</button>
    </div>
  );
}
