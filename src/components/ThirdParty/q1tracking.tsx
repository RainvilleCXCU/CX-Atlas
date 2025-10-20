import Script from 'next/script';
import { useEffect, useState } from 'react';

export interface Props {
  enabled: Boolean;
  id: String;
}

function Q1Tracking({
  enabled = false,
  id
}: Props): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Load TTD script
    if(enabled && id) {
      const script = document.createElement('script');
      script.src = 'https://js.adsrvr.org/up_loader.1.1.0.js';
      script.async = true;
      
      script.onload = () => {
        // Script loaded, now safe to use ttd_dom_ready
        if (typeof window.ttd_dom_ready === 'function') {
          window.ttd_dom_ready(() => {
            if (typeof window.TTDUniversalPixelApi === 'function') {
              var universalPixelApi = new window.TTDUniversalPixelApi();
              universalPixelApi.init("q6hyd89", ["7it3dt0"], "https://insight.adsrvr.org/track/up");
            }
          });
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load TTD script');
      };
      
      document.head.appendChild(script);
      
      // Cleanup
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);
  return (
    <>
      </>
  );
}

export default Q1Tracking;
