import React from 'react';
import { client } from 'client';
import Script from 'next/script';

export interface Props {
}

function Siteimprove({
}: Props): JSX.Element {
  const { useQuery } = client;
  const { siteimproveId, siteimproveEnabled } = useQuery().thirdPartySettings;

  return (
    <>
    {siteimproveId && siteimproveEnabled ?
          <Script id="siteimprove-script" strategy="afterInteractive" src={`//siteimproveanalytics.com/js/siteanalyze_${siteimproveId}.js`}>
            </Script> : <></>
      }
      </>
  );
}

export default Siteimprove;
