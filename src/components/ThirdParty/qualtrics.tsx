import Script from 'next/script';
import { useEffect, useState } from 'react';


export interface Props {
  enabled: Boolean;
  id: String;
}

function Qualtrics({
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
          <Script id="qualtrics-script" strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html:`
                (function(){var g=function(e,h,f,g){
                  this.get=function(a){for(var a=a+"=",c=document.cookie.split(";"),b=0,e=c.length;b<e;b++){for(var d=c[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return null};
                  this.set=function(a,c){var b="",b=new Date;b.setTime(b.getTime()+6048E5);b="; expires="+b.toGMTString();document.cookie=a+"="+c+b+"; path=/; "};
                  this.check=function(){var a=this.get(f);if(a)a=a.split(":");else if(100!=e)"v"==h&&(e=Math.random()>=e/100?0:100),a=[h,e,0],this.set(f,a.join(":"));else return!0;var c=a[1];if(100==c)return!0;switch(a[0]){case "v":return!1;case "r":return c=a[2]%Math.floor(100/c),a[2]++,this.set(f,a.join(":")),!c}return!0};
                  this.go=function(){if(this.check()){var a=document.createElement("script");a.type="text/javascript";a.src=g;document.body&&document.body.appendChild(a)}};
                  this.start=function(){var t=this;"complete"!==document.readyState?window.addEventListener?window.addEventListener("load",function(){t.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){t.go()}):t.go()};};
                  try{(new g(100,"r","QSI_S_ZN_${id}","https://zn${id}-connexuscu.siteintercept.qualtrics.com/SIE/?Q_ZID=ZN_${id}")).start()}catch(i){}})();
              `}} />
            <div id={`ZN_${id}`}></div>
            </> : <></>            
      }
      </>
  );
}

export default Qualtrics;
