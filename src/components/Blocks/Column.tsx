import React from 'react';

export interface Props {
    children?,
    classNames?
}

function Column({
    children = <></>,
    classNames = ''
}: Props): JSX.Element {
    return (
        <div className={`wp-block-column is-layout-flow ${classNames}`}>
            {children}
        </div>
    );
}

export default Column;
