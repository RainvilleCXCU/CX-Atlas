import { useEffect, useState } from "react";
import { isOpen } from 'utils/hours';

export interface Props {
    id: string;
    locationId: string;
    children;
    classNames;
    code: string;
}

function MBHIPRO({ 
    id, 
    locationId,
    children = <></>,
    classNames = '',
    code
}: Props): JSX.Element {
    const [isHoursOpen, setIsHoursOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if(!isLoaded) {
            isOpen({locationId:locationId}).then(val => {
                if(val && code === 'mbhi_ifopen') {
                    setIsHoursOpen(val);
                }
                if(!val && code === 'mbhi_ifclosed') {
                    setIsHoursOpen(true);
                }
                setIsLoaded(true);
            });
        }
    }, [locationId])
    return (
        <>
            {isHoursOpen &&
                <div className={classNames}>{children}</div>
            }
            {/* {!isLoaded && code === 'mbhi_ifopen' &&
                <div className="hours-loading">Checking availablility...</div>
            } */}
        </>
    );
}

export default MBHIPRO;
