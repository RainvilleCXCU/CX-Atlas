import { useEffect, useRef, useState } from "react";

interface CXCalcProps {
    children;
}

const CXCalcResults = ({ children = <></>}: CXCalcProps): JSX.Element => {
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
    		id: 'CXCalculatorResults',
    		src: `/cxlib/calculators/${process.env.NEXT_PUBLIC_CALCULATOR_VERSION ? process.env.NEXT_PUBLIC_CALCULATOR_VERSION : '0.0.1'}/scripts.js${process.env.NEXT_PUBLIC_CACHE ? "?cache=" + process.env.NEXT_PUBLIC_CACHE : '' }`,
    		strategy: 'afterInteractive',
    		onload: () => {
                console.log('LOAD CALCULATOR RESULTS');
                console.log(window.CXCalc);
                window.CXCalc ? window.CXCalc?.CertificateCompoundResultUI?.init() : null
    		}
    	}];
    	console.log(initialized.current)
    	if (!initialized.current) {
    		initialized.current = true;
            // if(!window.CXCalc) {
                CXCalcFile.map(file => {
                    loadScript(file);
        		})
                CXCalcFile = [];
            // } else {
            //     window.CXCalc ? window.CXCalc?.CertificateCompoundResultsUI?.init() : null
            // }
    	}
        if(window?.CXCalc) {
            window?.CXCalc ? window.CXCalc?.CertificateCompoundResultUI?.init() : null
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

export default CXCalcResults;
