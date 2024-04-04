import Script from 'next/script';
import { useEffect, useState } from 'react';

export interface Props {
  enabled: Boolean;
  id: String;
}

function Siteimprove({
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
          <Script id="siteimprove-script" strategy="lazyOnload" src={`//siteimproveanalytics.com/js/siteanalyze_${id}.js`}>
            </Script> : <></>
      }
      </>
  );
}

export default Siteimprove;
