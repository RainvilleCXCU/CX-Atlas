import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export interface Props {
    children?,
    condition?,
    comparison?,
    comparisonKey?,
    comparisonValue?,
    isDefault?
}

function Conditional({
    children = <></>,
    condition = '',
    comparison = '',
    comparisonKey = '',
    comparisonValue = '',
    isDefault = false
}: Props): JSX.Element {
    const [isSSR, setIsSSR] = useState(true);
    const [cookies, setCookie ] = useCookies([comparisonKey]);
    const [displayContent, setDisplayContent] = useState(false);

    useEffect(() => {
        if(condition === 'cookie') {
            if(cookies?.[comparisonKey]) {
                if(comparison == 'exists') {
                    setDisplayContent(true);
                }
                if(comparison == 'null') {
                    setDisplayContent(false);
                }
            } else {
                if(comparison == 'exists') {
                    setDisplayContent(false);
                }
                if(comparison == 'null') {
                    setDisplayContent(true);
                }
            }
        }
        setIsSSR(false);
    }, [condition]);

    return (
        <>  
            { displayContent &&
                <>{children}</>
                || (isSSR && isDefault ) &&
                <>{children} </>
            }
        </>
        
    );
}

export default Conditional;
