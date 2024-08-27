import { useEffect, useRef, useState } from "react";

interface CXCalcProps {
    children;
}

const DynamicRateTable = ({ children = <></>}: CXCalcProps): JSX.Element => {
    const initialized = useRef(false);
    const [calcsLoaded, setCalcsLoaded] = useState([]);

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
    		setCalcsLoaded([...calcsLoaded, id]);
    		console.log(calcsLoaded);
    		externalScript.src = src;
    	}
    	let CXCalcFile = [{
    		id: 'DynamicRateTable',
    		src: `/cxlib/calculators/0.0.1/scripts.js`,
    		strategy: 'afterInteractive',
    		onload: () => {
                console.log(window.CXCalc);
                window.CXCalc ? window.CXCalc?.DynamicTableUI?.init() : null
    		}
    	}];
    	console.log('initialized current:', initialized.current)
    	if (!initialized.current) {
    		initialized.current = true;
    		CXCalcFile.map(file => {
    			loadScript(file);
    		})
    		CXCalcFile = [];
    	}
        if(window.CXCalc) {
            window.CXCalc ? window.CXCalc?.DynamicTableUI?.init() : null
        }

    	return () => {
    		console.log('Cleanup!');
    		initialized.current = true;
    		CXCalcFile = [];
    	}
    }, [])

    return (
       <>{children}</>
    );

};

export default DynamicRateTable;
