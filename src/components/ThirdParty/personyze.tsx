import Script from 'next/script';

export interface Props {
  enabled: Boolean;
  id: String;
  domains: String
}

function Personyze({
  enabled = false,
  id,
  domains
}: Props): JSX.Element {
	return (
		<>
			{enabled && id ? (
				<Script id="personyze" strategy="afterInteractive">
					{`
              window._S_T ||
              (function(d){
                var s = d.createElement('script'),
                  u = s.onload===undefined && s.onreadystatechange===undefined,
                  i = 0,
                  f = function() {window._S_T ? (_S_T.async=true) && _S_T.setup(${id}, "${domains} *.${domains}") : i++<120 && setTimeout(f, 600)},
                  h = d.getElementsByTagName('head');
                s.async = true;
                s.src = '\/\/counter.personyze.com\/stat-track-lib.js';
                s.onload = s.onreadystatechange = f;
                (h && h[0] || d.documentElement).appendChild(s);
                if (u) f();
              })(document);
            `}
				</Script>
			) : (
				<></>
			)}
		</>
	);
}

export default Personyze;
