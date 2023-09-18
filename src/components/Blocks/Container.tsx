import React from 'react';
import Image from 'next/image';
import Heading from 'components/Heading';

export interface Props {
    align?,
    children?
    classNames?
}

function Container({
    align = '',
    children = <></>,
    classNames
}: Props): JSX.Element {
  return (
    <div className={`wp-block-genesis-blocks-gb-container${ align === 'full' ? ' alignfull' : ''} gb-block-container ${classNames}`}>
        <div className='gb-container-inside'>
            <div className='gb-container-content'>
                {children}
            </div>
        </div>
    </div>
  );
}

export default Container;
