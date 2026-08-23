export default function ImageLightbox({ src, onClose }) {
  if (!src) return null;

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:200,
      display:'flex', alignItems:'center', justifyContent:'center', cursor:'zoom-out',
    }}>
      <img src={src} alt="" style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }}/>
    </div>
  );
}
