import { useRouter } from 'next/router';
import { PAD } from '../../lib/theme';
import { supabase } from '../../lib/supabase';

export default function LogOutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div style={{ padding:`36px ${PAD} 0` }}>
      <button onClick={handleLogOut} className="btn-danger" style={{
        width:'100%', border:'1.5px solid var(--red)', background:'transparent',
        borderRadius:50, padding:14, color:'var(--red)',
        fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:14, cursor:'pointer',
      }}>Log Out</button>
    </div>
  );
}
