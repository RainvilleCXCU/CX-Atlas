import { client } from "client";
import { parseHtml } from "lib/parser";
import React, { useEffect, useRef, useState } from "react";
import DropdownMenu, {
    DropdownItemRadio,
    DropdownItemRadioGroup,
} from '@atlaskit/dropdown-menu';

interface CXCalcProps {
    children;
}

const CXCalcResults = ({ children = <></>}: CXCalcProps): JSX.Element => {

    useEffect(() => {
        if(window?.CXCalc) {
            window?.CXCalc ? window.CXCalc?.CertificateCompoundResultUI?.init() : null
        }

    	return () => {
    		console.log('Cleanup!');
    	}
    }, [])

    return (
       <>{children}</>
    );

};

export default CXCalcResults;
