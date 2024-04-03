import Script from 'next/script';

export interface Props {
  enabled: Boolean;
  id: String;
}

function HotJar({
  enabled = false,
  id
}: Props): JSX.Element {

  return (
    <>
    {enabled && id ?
    
        <Script id="hotjar-script" strategy="lazyOnload">
            {`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${id},hjsv:5};
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
