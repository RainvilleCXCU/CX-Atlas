import React from 'react';

export interface Props {
    align?,
    children?,
    classNames?
}

function Columns({
    align = '',
    children = <></>,
    classNames = ''
}: Props): JSX.Element {
    return (
        <div className={`wp-block-columns is-layout-flex${align === 'full' ? ' alignfull' : ''} ${classNames}`}>
            {children}
        </div>
    );
}

export default Columns;
