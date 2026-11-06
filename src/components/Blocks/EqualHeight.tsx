import { useEffect, useState, createElement, useContext } from 'react';
import { EqualHeightContext, EqualHeightElement } from 'react-equal-height/clean';

export interface Props {
    name?,
    tagName?,
    props?,
    children?,
    classNames?,
    styles?
}

function EqualHeightContainer({
    name = '',
    tagName = 'div',
    props = '',
    classNames = '',
    children = <></>,
    styles = {}
}: Props): React.JSX.Element {

    const [isSSR, setIsSSR] = useState(true);
    const { forceUpdate } = useContext(EqualHeightContext);

    useEffect(() => {
        if(document) {
            setIsSSR(false);
            setTimeout(() => {
                forceUpdate()
            },10);
        }
    }, []);
    
    const isDesktopOrLaptop = true;

    const element = createElement(tagName, { ...props, className: classNames, style: styles }, children);
    return (
        <>
        { !isSSR &&
            <EqualHeightElement name={name} disable={!isDesktopOrLaptop && !isSSR}>{element}</EqualHeightElement>
        }
        </>
    );
}

export default EqualHeightContainer;
