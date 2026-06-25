import { PAD } from '../../lib/theme';
import SectionHeader from '../ui/SectionHeader';
import { TIMELINE, STATUS_COLOR } from '../../lib/animeData';

export default function ReleaseTimeline() {
  return (
    <div>
      <SectionHeader eyebrow="Signature — What's Coming" title="Release Timeline"/>
      <div style={{ padding:`20px ${PAD} 50px`, overflowX:'auto' }} className="no-scrollbar">
        <div style={{ position:'relative', minWidth:640, height:140 }}>
          <div style={{ position:'absolute', top:60, left:0, right:0, height:1, background:'var(--hairline)' }}/>
          {TIMELINE.map((ev, i) => {
            const left = `${(i / (TIMELINE.length - 1)) * 96}%`;
            const up = i % 2 === 0;
            const color = STATUS_COLOR[ev.status];
            const label = (
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:12, color:'var(--text)', whiteSpace:'nowrap' }}>{ev.title}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color }}>{ev.status.toUpperCase()}</div>
              </div>
            );
            return (
              <div key={ev.title} style={{ position:'absolute', left, top:0, bottom:0, display:'flex', flexDirection:'column', alignItems:'center' }}>
                {up ? <div style={{ marginBottom:8 }}>{label}</div> : <div style={{ height:50 }}/>}
                <div style={{
                  width:11, height:11, borderRadius:50, background:color, border:'2px solid var(--bg)',
                  boxShadow:`0 0 0 1px ${color}`, marginTop: up ? 0 : 'auto', marginBottom: up ? 'auto' : 0,
                }}/>
                {!up && <div style={{ marginTop:8 }}>{label}</div>}
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:'var(--text-faint)', marginTop:6 }}>{ev.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
