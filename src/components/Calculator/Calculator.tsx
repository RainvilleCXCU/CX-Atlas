import React, { useEffect } from "react";
interface Props {
	calculatorName: string;
}

const Calculator = ({ calculatorName }: Props): JSX.Element => {
	useEffect(() => {
		import("./Dinkytown/Core/KJE.js").then(({ KJE }) => {
			window.KJE = Object(KJE);
			let bForceWidth;
			let curtop;
			import(`./Dinkytown/Site/KJESiteSpecific.js`).then(() => {
				import(`./Dinkytown/Core/${calculatorName}.js`).then(() => {
					import(`./Dinkytown/Site/${calculatorName}Params.js`).then(() => {
						KJE.init();
					});
				});
			});
		});
	}, [calculatorName]);

	return (
		<div id={`dt-${calculatorName}`}>
			<div id="KJEAllContent"></div>
		</div>
	);
};

export default Calculator;
