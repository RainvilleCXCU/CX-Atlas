import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import Heading from 'components/Heading';
import { EqualHeight, EqualHeightElement } from 'react-equal-height/clean';
import { useMediaQuery } from 'react-responsive'

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

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 782px)'
      })
  const element = React.createElement(tagName, {...props, className: classNames}, children);
    return (
        <EqualHeightElement name={name}>{element}</EqualHeightElement>
    );
}

export default EqualHeightContainer;
