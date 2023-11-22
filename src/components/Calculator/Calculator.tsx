import { addJSAsset } from "lib/enqueuedFiles";
import Script from "next/script.js";
import React, { useEffect, useRef, useState } from "react";
interface Props {
	calculatorName: string;
}

const Calculator = ({ calculatorName }: Props): JSX.Element => {
	const initialized = useRef(false)
	
	useEffect(() => {
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
		let KJEFile = [{
			id: 'KJECore',
			src: `/wp-content/themes/CXCU/vendors/calculators/KJE.js`,
			strategy: 'afterInteractive',
			onload: () => {
				jsFiles.map(file => {
					loadScript(file);
				})
			}
		}]
		let jsFiles = [{
				id: 'KJESiteCore',
				src: `/wp-content/themes/CXCU/vendors/calculators/KJESiteSpecific.js`,
				strategy: 'afterInteractive',
			},{
				id: `KJE${calculatorName}Params`,
				src: `/wp-content/themes/CXCU/vendors/calculators/${calculatorName}.js`,
				strategy: 'afterInteractive'
			},{
				id: `KJESite${calculatorName}Params`,
				src: `/wp-content/themes/CXCU/vendors/calculators/${calculatorName}Params.js`,
				strategy: 'afterInteractive',
				onload: () => {
					window.KJE.initFired ? window.KJE.initAfterLoad() : window.KJE.init();
				}
			}
		];
		console.log(initialized.current)
		if (initialized.current !== true) {
			initialized.current = true;
			KJEFile.map(file => {
				loadScript(file);
			})
			KJEFile = [];
		}
		return () => {
			console.log('Cleanup!');
			initialized.current = true;
			KJEFile = [];
		}
	}, [calculatorName])
	
	return (
		<div id={`dt-${calculatorName}`}>
			<div id="KJEAllContent"></div>
		</div>			
	);
};

export default Calculator;