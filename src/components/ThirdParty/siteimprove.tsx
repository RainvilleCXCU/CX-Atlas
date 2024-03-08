import React from 'react';
import Script from 'next/script';

export interface Props {
  enabled: Boolean;
  id: String;
}

function Siteimprove({
  enabled = false,
  id
}: Props): JSX.Element {

  return (
    <>
    {enabled && id ?
          <Script id="siteimprove-script" strategy="afterInteractive" src={`//siteimproveanalytics.com/js/siteanalyze_${id}.js`}>
            </Script> : <></>
      }
      </>
  );
}

export default Siteimprove;
