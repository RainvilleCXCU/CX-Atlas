import Script from 'next/script';
import { useEffect, useState } from 'react';

export interface Props {
  enabled: Boolean;
  id: String;
}

function Spectrum({
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
    
        <Script id="spectrum-script" strategy="lazyOnload" src={`//tag.brandcdn.com/autoscript/${id}/Connexus_Credit_Union.js`}></Script> : <></>
      }
      </>
  );
}

export default Spectrum;
