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
          </Helmet>
			) : (
				<></>
			)}
		</>
	);
}

export default Personyze;
