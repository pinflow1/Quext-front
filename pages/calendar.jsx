import { useState } from 'react';
import Layout from '../components/Layout';

const C = { bg:"#080808", surface:"#0f0f0f", border:"#1c1c1c", orange:"#F5A020", white:"#ffffff", muted:"rgba(255,255,255,0.38)" };

const EVENTS = {
  3:  { title:"Frieren S2",   platform:"CR",  color:"#F47521" },
  8:  { title:"Vinland S3",   platform:"NET", color:"#E50914" },
  14: { title:"Mob S4",       platform:"CR",  color:"#F47521" },
  19: { title:"Abyss S3",     platform:"HD",  color:"#00AEEF" },
  25: { title:"Lain OVA",     platform:"NET", color:"#E50914" },
  28: { title:"Dungeon S2",   platform:"NET", color:"#E50914" },
};

export default function Calendar() {
  const [selected, setSelected] = useState(null);
  const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
  const offset = 6;
  const totalDays = 30;
  const today = 15;

  const cells = [];
  for(let i=0;i<offset;i++) cells.push(null);
  for(let d=1;d<=totalDays;d++) cells.push(d);
  while(cells.length%7!==0) cells.push(null);

  const handleGoogleCalendar = async (event) => {
    const title = encodeURIComponent(event.title);
    const date = `20260601`; // placeholder
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}`;
    window.open(url, '_blank');
  };

  return (
    <Layout>
      <div style={{ padding:'28px 20px 60px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:C.white, letterSpacing:-1 }}>Calendar</h1>
          <button style={{ background:C.white, color:C.orange, border:`1.5px solid ${C.orange}`, borderRadius:50, padding:'8px 16px', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Sync Calendar
          </button>
        </div>

        <div style={{ fontSize:13, fontWeight:700, color:C.muted, marginBottom:16, letterSpacing:1, textTransform:'uppercase' }}>June 2026</div>

        {/* Day headers */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, marginBottom:4 }}>
          {days.map(d => (
            <div key={d} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:C.muted, padding:'6px 0', letterSpacing:0.5 }}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
          {cells.map((day, i) => {
            const event = day && EVENTS[day];
            const isToday = day === today;
            return (
              <div key={i} onClick={() => event && setSelected(event)} style={{
                aspectRatio:'1', borderRadius:12,
                background: day ? (isToday ? 'rgba(255,255,255,0.1)' : C.surface) : 'transparent',
                border: day ? `1px solid ${isToday ? 'rgba(255,255,255,0.2)' : C.border}` : 'none',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                position:'relative', cursor: event ? 'pointer' : 'default',
                transition:'border-color 0.2s', overflow:'hidden'
              }}
              onMouseEnter={e => event && (e.currentTarget.style.borderColor='rgba(245,160,32,0.3)')}
              onMouseLeave={e => event && (e.currentTarget.style.borderColor=isToday?'rgba(255,255,255,0.2)':C.border)}>
                {day && (
                  <>
                    <span style={{ fontSize:13, fontWeight:isToday?800:500, color:isToday?C.white:'rgba(255,255,255,0.6)' }}>{day}</span>
                    {event && <div style={{ position:'absolute', top:5, right:5, width:7, height:7, borderRadius:50, background:event.color, boxShadow:`0 0 6px ${event.color}` }}/>}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Upcoming */}
        <div style={{ marginTop:28 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.white, marginBottom:14 }}>Upcoming this month</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {Object.entries(EVENTS).map(([day, ev]) => (
              <div key={day} style={{ display:'flex', gap:14, alignItems:'center', background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:'14px 16px' }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${ev.color}18`, border:`1px solid ${ev.color}44`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:9, fontWeight:900, color:ev.color }}>{ev.platform}</span>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.white, marginBottom:2 }}>{ev.title}</div>
                  <div style={{ fontSize:11, color:C.muted }}>June {day}, 2026</div>
                </div>
                <button onClick={() => handleGoogleCalendar(ev)} style={{ background:C.white, color:C.orange, border:`1.5px solid ${C.orange}`, borderRadius:50, padding:'5px 12px', fontSize:10, fontWeight:700, cursor:'pointer' }}>
                  + Calendar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Event modal */}
        {selected && (
          <div onClick={() => setSelected(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(12px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#111', border:`1px solid ${C.border}`, borderRadius:20, padding:28, maxWidth:360, width:'100%' }}>
              <div style={{ fontSize:16, fontWeight:800, color:C.white, marginBottom:6 }}>{selected.title}</div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:20 }}>New season dropping soon</div>
              <button onClick={() => handleGoogleCalendar(selected)} style={{ width:'100%', background:C.white, color:C.orange, border:`1.5px solid ${C.orange}`, borderRadius:50, padding:13, fontWeight:800, fontSize:13, cursor:'pointer' }}>
                Add to Google Calendar
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
