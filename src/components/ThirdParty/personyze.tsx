import React from "react";
import { client } from "client";
import Script from "next/script";

export interface Props {}

function Personyze({}: Props): JSX.Element {
	const { useQuery } = client;
	const { personyzeId, personyzeEnabled, personyzeDomains } =
		useQuery().thirdPartySettings;

	return (
		<>
			{personyzeEnabled && personyzeId ? (
				<Script id="personyze" strategy="afterInteractive">
					{`
              window._S_T ||
              (function(d){
                var s = d.createElement('script'),
                  u = s.onload===undefined && s.onreadystatechange===undefined,
                  i = 0,
                  f = function() {window._S_T ? (_S_T.async=true) && _S_T.setup(${personyzeId}, "${personyzeDomains} *.${personyzeDomains}") : i++<120 && setTimeout(f, 600)},
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
