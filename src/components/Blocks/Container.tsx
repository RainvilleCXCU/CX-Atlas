import { EqualHeight } from 'react-equal-height/clean';

export interface Props {
    align?,
    children?
    classNames?
    style?
}

function Container({
    align = '',
    style = {},
    children = <></>,
    classNames
}: Props): JSX.Element {    
  return (
    <div className={`wp-block-genesis-blocks-gb-container${ align === 'full' ? ' alignfull' : ''} gb-block-container ${classNames}`} style={style}>
        <EqualHeight timeout={0} animationSpeed={0}>{children}</EqualHeight>
    </div>
  );
}

export default Container;
