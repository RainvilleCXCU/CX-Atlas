import Script from 'next/script';

export interface Props {
  enabled: Boolean;
  id: String;
}

function Spectrum({
  enabled = false,
  id
}: Props): JSX.Element {

  return (
    <>
    {enabled && id ?
    
        <Script id="spectrum-script" strategy="afterInteractive" src={`//tag.brandcdn.com/autoscript/${id}/Connexus_Credit_Union.js`}></Script> : <></>
      }
      </>
  );
}

export default Spectrum;
