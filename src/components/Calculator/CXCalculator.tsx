import { client } from "client";
import React, { useEffect, useRef, useState } from "react";

interface CXCalcProps {
    children;
}

const CXCalc = ({ children = <></>}: CXCalcProps): JSX.Element => {

    useEffect(() => {
        if(window.CXCalc) {
            window.CXCalc ? window.CXCalc?.CertificateCompoundInputUI?.init() : null
        }

    	return () => {
    		console.log('Cleanup!');
    	}
    }, [])

    return (
       <>{children}</>
    );

};

export default CXCalc;
