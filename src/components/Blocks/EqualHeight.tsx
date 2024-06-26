import { useEffect, useState, createElement } from 'react';
import { EqualHeightElement } from 'react-equal-height/clean';

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

    useEffect(() => {
        if(document) {
            setIsSSR(false);
        }
    }, []);
    
    const isDesktopOrLaptop = true;

    const element = createElement(tagName, { ...props, className: classNames }, children);
    return (
        <EqualHeightElement name={name} disable={!isDesktopOrLaptop && !isSSR}>{element}</EqualHeightElement>
    );
}

export default EqualHeightContainer;
