import React from 'react';
import { client } from 'client';
import Script from 'next/script';

export interface Props {
}

function HotJar({
}: Props): JSX.Element {
  const { useQuery } = client;
  const { hotjarId, hotjarEnabled } = useQuery().thirdPartySettings;

  return (
    <>
    {hotjarEnabled && hotjarId ?
    
        <Script id="hotjar-script" strategy="afterInteractive">
            {`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:5};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
            `}
          </Script> : <></>
      }
      </>
  );
}

export default HotJar;
