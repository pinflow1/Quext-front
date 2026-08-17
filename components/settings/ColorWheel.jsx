import { useRef, useCallback } from 'react';

const RING_SIZE = 220;
const RADIUS = RING_SIZE / 2;
const SQUARE_SIZE = 130;

// Hue ring is a full disc (conic-gradient rainbow); the sat/value
// square sits centered on top, covering the middle, so only the
// outer band ever acts as "the ring." Pointer capture on both
// keeps a drag smooth even if the finger strays off-element.
export default function ColorWheel({ hue, sat, val, onChange }) {
  return (
    <HueRing hue={hue} onHueChange={(h) => onChange({ h, s: sat, v: val })}>
      <SatValueSquare hue={hue} sat={sat} val={val} onChange={(s, v) => onChange({ h: hue, s, v })}/>
    </HueRing>
  );
}

function HueRing({ hue, onHueChange, children }) {
  const ref = useRef(null);

  const update = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const angle = Math.atan2(e.clientY - rect.top - RADIUS, e.clientX - rect.left - RADIUS) * (180 / Math.PI);
    onHueChange((angle + 360) % 360);
  }, [onHueChange]);

  const dotX = RADIUS + (RADIUS - 12) * Math.cos((hue * Math.PI) / 180);
  const dotY = RADIUS + (RADIUS - 12) * Math.sin((hue * Math.PI) / 180);

  return (
    <div
      ref={ref}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); update(e); }}
      onPointerMove={(e) => e.buttons === 1 && update(e)}
      style={{
        position: 'relative', width: RING_SIZE, height: RING_SIZE, borderRadius: '50%',
        background: 'conic-gradient(from 90deg, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))',
        touchAction: 'none', cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'absolute', left: dotX - 8, top: dotY - 8, width: 16, height: 16, borderRadius: '50%',
        background: `hsl(${hue},100%,50%)`, border: '2px solid #fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.3)', pointerEvents: 'none',
      }}/>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>{children}</div>
    </div>
  );
}

function SatValueSquare({ hue, sat, val, onChange }) {
  const ref = useRef(null);

  const update = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), SQUARE_SIZE);
    const y = Math.min(Math.max(e.clientY - rect.top, 0), SQUARE_SIZE);
    onChange((x / SQUARE_SIZE) * 100, 100 - (y / SQUARE_SIZE) * 100);
  }, [onChange]);

  const dotX = (sat / 100) * SQUARE_SIZE;
  const dotY = (1 - val / 100) * SQUARE_SIZE;

  return (
    <div
      ref={ref}
      onPointerDown={(e) => { e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); update(e); }}
      onPointerMove={(e) => { e.stopPropagation(); if (e.buttons === 1) update(e); }}
      style={{
        position: 'relative', width: SQUARE_SIZE, height: SQUARE_SIZE, borderRadius: 12,
        backgroundImage: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue},100%,50%))`,
        touchAction: 'none', cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'absolute', left: dotX - 7, top: dotY - 7, width: 14, height: 14, borderRadius: '50%',
        border: '2px solid #fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.4)', pointerEvents: 'none',
      }}/>
    </div>
  );
}
