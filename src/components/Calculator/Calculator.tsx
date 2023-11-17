import { addJSAsset } from "lib/enqueuedFiles";
import Script from "next/script.js";
import React, { useEffect, useState } from "react";
interface Props {
	calculatorName: string;
}

const Calculator = ({ calculatorName }: Props): JSX.Element => {
    const [calcLoaded, setCalcLoaded] = useState(false);
	// useEffect(() => {
	// 	if(!window.KJE) {
	// 		import("./Dinkytown/Core/KJE.js").then(({ KJE }) => {
	// 			window.KJE = Object(KJE);
	// 			import(`./Dinkytown/Site/KJESiteSpecific.js`).then(() => {
	// 				import(`./Dinkytown/Core/${calculatorName}.js`).then(() => {
	// 					import(`./Dinkytown/Site/${calculatorName}Params.js`).then(() => {
	// 						KJE.init();
	// 					});
	// 				});
	// 			});
	// 		});
	// 	}
	// });
	const jsFiles = [
		{
			id: 'KJECore',
			src: `/wp-content/themes/CXCU/vendors/calculators/KJE.js`
		},{
			id: 'KJESiteCore',
			src: `/wp-content/themes/CXCU/vendors/calculators/KJESiteSpecific.js`
		},{
			id: `KJE${calculatorName}Params`,
			src: `/wp-content/themes/CXCU/vendors/calculators/${calculatorName}.js`
		},{
			id: `KJESite${calculatorName}Params`,
			src: `/wp-content/themes/CXCU/vendors/calculators/${calculatorName}Params.js`,
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
		externalScript.src = src;
	}
	useEffect(() => {
		if(window.KJE?.initFired !== true) {
			{jsFiles.map((file) => {
				loadScript(file);
			})}
			setCalcLoaded(true);
			// if(window.KJE?.init) {
			// 	window.KJE?.init();
			// }
		}
	}, [])

	return (
		<>				
			{
				calcLoaded &&
				<div id={`dt-${calculatorName}`}>
					<div id="KJEAllContent"></div>
				</div>
			}
			calcLoaded: {calcLoaded}
		</>
	);
};

export default Calculator;
