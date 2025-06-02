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
  const [loadScriptTimer, setLoadScriptTimer] = useState(null);
  const [eventAdded, setEventAdded] = useState(false);

  const userInteractionEvents = [
    'click',
    'dblclick',
    'mouseover',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseenter',
    'keypress',
    'wheel'
  ];

  const triggerScriptLoader = e => {
    setLoaded(true);
  }
  useEffect(() => {
    if(loaded) {
      clearTimeout(loadScriptTimer);
			userInteractionEvents.forEach(event => {				
        window.removeEventListener(event, triggerScriptLoader);
			});
    }
  }, [loaded]);

  useEffect(() => {
    if(!eventAdded) {      
      setLoadScriptTimer(setTimeout(() => {
        setLoaded(true);
      }, 5000));
      userInteractionEvents.forEach(event => {
        window.addEventListener(event, triggerScriptLoader, {
            passive: true
          });
      });
      setEventAdded(true);
    }
  }, [eventAdded])

  return (
    <>
    {enabled && id && loaded ?
      <>
        <script src="https://js.adsrvr.org/up_loader.1.1.0.js" type="text/javascript"></script>

        <Script id="qualtrics-script" strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html:`
              ttd_dom_ready( function() {
                if (typeof TTDUniversalPixelApi === 'function') {
                    var universalPixelApi = new TTDUniversalPixelApi();
                    universalPixelApi.init("q6hyd89", ["7it3dt0"], "https://insight.adsrvr.org/track/up");
                }
            });
              `}} />
      </> : <></>
      }
      </>
  );
}

export default Q1Tracking;
