import { useEffect, useState, createElement, useContext } from 'react';
import { EqualHeightContext, EqualHeightElement } from 'react-equal-height/clean';

export interface Props {
    name?,
    tagName?,
    props?,
    children?,
    classNames?
}

function EqualHeightContainer({
    name = '',
    tagName = 'div',
    props = '',
    classNames = '',
    children = <></>
}: Props): JSX.Element {

    const [isSSR, setIsSSR] = useState(true);
    const { setForceUpdate } = useContext(EqualHeightContext);

    useEffect(() => {
        if(document) {
            setIsSSR(false);
            setTimeout(() => {
                setForceUpdate((value: boolean) => !value)
            },10);
        }
    }, []);
    
    const isDesktopOrLaptop = true;

    const element = createElement(tagName, { ...props, className: classNames }, children);
    return (
        <>
        { !isSSR &&
            <EqualHeightElement name={name} disable={!isDesktopOrLaptop && !isSSR}>{element}</EqualHeightElement>
        }
        </>
    );
}

export default EqualHeightContainer;
