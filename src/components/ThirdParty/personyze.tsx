import { Helmet } from 'react-helmet';
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
        <Helmet>
          {process.env.NEXT_PUBLIC_PERSONYZE_HIDE != 'true' ? 
            <script id="personyze">
              {`window._S_T ||
              (function(d){
                var s = d.createElement('script'),
                  u = s.onload===undefined && s.onreadystatechange===undefined,
                  i = 0,
                  f = function() {window._S_T ? (_S_T.async=true) && _S_T.setup(6276, "connexuscu.org *.connexuscu.org") : i++<120 && setTimeout(f, 600)},
                  h = d.getElementsByTagName('head');
                s.async = true;
                s.src = '\/\/counter.personyze.com\/stat-track-lib.js';
                s.onload = s.onreadystatechange = f;
                (h && h[0] || d.documentElement).appendChild(s);
                if (u) f();
              })(document);`}
              </script>
              :
            <script id="personyze">
              {`window._S_T ||
              (function(d, css){
                var c = d.createElement('style'),
                  s = d.createElement('script'),
                  u = s.onload===undefined && s.onreadystatechange===undefined,
                  r = function() {c.parentNode && h.removeChild(c)},
                  i = 0,
                  l = function(t) {t.reg_ondropcss(r); t.setup(6276, "connexuscu.org *.connexuscu.org")},
                  f = function() {window._S_T ? l(_S_T) : i++<120 && setTimeout(f, 600)},
                  H = d.getElementsByTagName('head'),
                  h = H && H[0] || d.documentElement;
                s.async = true;
                s.src = '//counter.personyze.com/stat-track-lib.js';
                s.onload = s.onreadystatechange = f;
                h.appendChild(c);
                h.appendChild(s);
                if (c.styleSheet) c.styleSheet.cssText = css;
                else c.appendChild(d.createTextNode(css));
                if (u) f();
                setTimeout(r, 2000);
              })(document, 'body {visibility:hidden}');
              `}
            </script>
            }
          </Helmet>
			) : (
				<></>
			)}
		</>
	);
}

export default Personyze;
