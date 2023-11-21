import { addJSAsset } from "lib/enqueuedFiles";
import Script from "next/script.js";
import React, { useEffect, useState } from "react";
interface Props {
	calculatorName: string;
}

const Calculator = ({ calculatorName }: Props): JSX.Element => {
	const jsFiles = [{
			id: 'KJESiteCore',
			src: `/wp-content/themes/CXCU/vendors/calculators/KJESiteSpecific.js`,
			strategy: 'afterInteractive'
		},{
			id: `KJE${calculatorName}Params`,
			src: `/wp-content/themes/CXCU/vendors/calculators/${calculatorName}.js`,
			strategy: 'afterInteractive'
		},{
			id: `KJESite${calculatorName}Params`,
			src: `/wp-content/themes/CXCU/vendors/calculators/${calculatorName}Params.js`,
			strategy: 'afterInteractive',
			onload: () => {
				window.KJE.init();
			}
		}
    ];
	const loadScript = ({id, src, onload = null}) => {
		const externalScript = document.createElement("script");
		// externalScript.onerror = loadError;
		externalScript.id = id;
		externalScript.async = false;
		externalScript.type = "text/javascript";
		externalScript.onload = onload;
		// externalScript.setAttribute("crossorigin", "anonymous");
		document.body.appendChild(externalScript);
		console.log(`Load Script: ${src}`);
		externalScript.src = src;
	}

	return (
		<>				
			<div id={`dt-${calculatorName}`}>
				<div id="KJEAllContent"></div>
			</div>
			<Script src='/wp-content/themes/CXCU/vendors/calculators/KJE.js' id='KJECore' strategy="afterInteractive"
				onLoad={() => {
					jsFiles.map(file => {
						loadScript(file);
					})
				}
			}></Script>
			
		</>
	);
};

export default Calculator;
