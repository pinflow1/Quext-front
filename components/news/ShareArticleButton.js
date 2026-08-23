import { useState } from 'react';

export default function ShareArticleButton({ title }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button onClick={handleShare} className="btn-resume" style={{
      border:'none', borderRadius:50, padding:'12px 20px',
      fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13, cursor:'pointer',
    }}>
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
    }
