import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export interface Props {
    classNames?
    productData?
    submitText?
    selectText?
}

function ProductFinder({
    classNames,
    productData,
    submitText,
    selectText
}: Props): JSX.Element {
        
const products = JSON.parse(atob(productData));
const selectRef = useRef(null);
    const router = useRouter();
    const handleGo = () => {
        const selectedProduct = selectRef.current.value;
        router.push(selectedProduct);
    }

  return (
    <div className='cx-product-finder'>
        <div className="cx-product-finder__select-wrapper select-wrapper__underlined">
            <select ref={selectRef} className="cx-product-finder__select cx-h3">        
                { selectText &&
                    <option value="">{selectText}</option>
                }
                {products.map((product, index) => {
                    return (
                        <option key={`product-${index}`} value={product.productPageURL}>{product.displayName}</option>
                    )
                })}
            </select>
        </div>
        <div className="cx-product-finder__input-wrapper">
            <button className="cx-product-finder__submit cx-button cx-button--compact cx-button--color-positive" onClick={handleGo}>
                {submitText ? submitText : 'Go'}
            </button>
        </div>
    </div>
  );
}

export default ProductFinder;

