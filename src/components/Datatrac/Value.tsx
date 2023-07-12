import React, { useContext } from 'react';
import { Store } from '../../context/store';
import { parseHtml } from 'lib/parser';

export interface Props {
  productName?: string;
  value?: string;
}

function DatatracValue({
    productName,
    value
}: Props): JSX.Element {
    const [state, setState] = useContext(Store);

    let datatracValue = state?.datatrac?.[value];

    const compareSymbol = () => {
        let sign = '';
        switch (value) {
            case 'Outperform':
                sign = '%';
                break;
            case 'OutperformTimesNumber':
                sign = 'x';
                break;
            default:
                break;
        }
        return sign;
    }

    const formatValue = (property, value) => {
        if(value) {
            switch (property) {
            case 'Rate':
                value = parseFloat(value).toFixed(Math.max(3, (value.toString().split('.')[1] || []).length));
                break;
            case 'Average_Market_Rate':
                value = parseFloat(value).toFixed(3);
                break;
            case 'MarketName':
                if (value === 'National') {
                    value = 'National Average';
                }
                break;
            case 'LifetimeSavings':
                value = parseFloat(value).toLocaleString('en');
                break;
            case 'OutperformTimesNumber':
                value = --value;
                break;
            case 'ProductName':
                if (value === 'Home Equity - LOC') {
                    value = 'HELOC';
                }
                else if (value.indexOf('CD') >= 0) {
                    value = value.replace ('CD','Certificate');
                }
                break;
            case 'Verified_As_Of':
                value = new Date(value);
                value = value.toLocaleString('en-US', { dateStyle: 'short' });
                break;
            case 'FootNoteText3':
                value = value.replace(/^(\S+\s\S+)/,'Calculated based on');
                value = value.replace('certificate of deposit (CD)','share certificate');
                value = value.replace('interest checking', 'interest checking account');
                value = parseHtml(value);
                break;
            }
        }
        return value;
        
    }
  return (
    <span data-datatrac-product={productName} data-datatrac-value={value}>{formatValue(value, datatracValue)}{compareSymbol()}</span>
  );
}

export default DatatracValue;
