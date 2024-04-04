import Script from 'next/script';
import { useEffect, useState } from 'react';

export interface Props {
  enabled: Boolean;
  id: String;
}

function HotJar({
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
    
        <Script id="hotjar-script" strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html:`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${id},hjsv:5};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
            `}}/> : <></>
      }
      </>
  );
}

export default HotJar;
