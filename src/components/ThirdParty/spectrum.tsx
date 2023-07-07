import React from 'react';
import { client } from 'client';
import Script from 'next/script';

export interface Props {
}

function Spectrum({
}: Props): JSX.Element {
  const { useQuery } = client;
  const { spectrumId, spectrumEnabled } = useQuery().thirdPartySettings;

  return (
    <>
    {spectrumEnabled && spectrumId ?
    
        <Script id="spectrum-script" strategy="afterInteractive" src={`//tag.brandcdn.com/autoscript/${spectrumId}/Connexus_Credit_Union.js`}></Script> : <></>
      }
      </>
  );
}

export default Spectrum;
