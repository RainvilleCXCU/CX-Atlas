import Script from 'next/script';

export interface Props {
  enabled: Boolean;
  id: String;
}

/**
 * The Trade Desk tracking pixel, injected via next/script rather than a
 * useEffect + document.head.appendChild, for the same reason as gtm.tsx:
 * manual head manipulation competes with next/head's SSR bookkeeping and
 * leaves duplicated tags behind on client navigation.
 */
function Q1Tracking({
  enabled = false,
  id
}: Props): JSX.Element {
  if (!enabled || !id) return <></>;

  return (
    <Script
      id="ttd-tracking"
      src="https://js.adsrvr.org/up_loader.1.1.0.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window.ttd_dom_ready === 'function') {
          window.ttd_dom_ready(() => {
            if (typeof window.TTDUniversalPixelApi === 'function') {
              const universalPixelApi = new window.TTDUniversalPixelApi();
              universalPixelApi.init('q6hyd89', ['7it3dt0'], 'https://insight.adsrvr.org/track/up');
            }
          });
        }
      }}
      onError={() => {
        console.error('Failed to load TTD script');
      }}
    />
  );
}

export default Q1Tracking;
