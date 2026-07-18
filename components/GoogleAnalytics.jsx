import Script from 'next/script';
import { GA_ID } from '../lib/gtag';

// Loads gtag.js and initializes GA4. Renders nothing if no GA_ID is
// set, so the app works fine locally/before analytics is configured.
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}/>
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}
