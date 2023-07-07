import React, { useEffect, useState } from 'react';
import Heading from 'components/Heading';
import { client } from 'client';

export interface Props {
    datatracID: string;
    productName: string;
    compareType?: string;
    marketId?: string;
}

function Datatrac({
    datatracID,
    productName,
    marketId = '16933',
    compareType,
}: Props): JSX.Element {
    const { useQuery } = client;
    const { datatracEnabled, datatracId } = useQuery().thirdPartySettings;

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (datatracId) {
            fetch(`https://api.datatrac.net/api/Thresholds.json?MarketID=${marketId}&ProductClass=${datatracID}&ApiKey=${datatracId}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data[0])
                    setLoading(false)
                })
        }
    }, [datatracId]);

    const compareSymbol = () => {
        let sign = '';
        switch (compareType) {
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

    return (
        <>
        { datatracEnabled && datatracId && 
            <div className="datatrac-wrapper db-hide" data-datatrac-product={datatracID} data-datatrac-value={compareType}>
                <Heading level='h2'>Earn {data?.[compareType]}{compareSymbol()} More By Choosing Connexus<sup className="comparison-superscript">*</sup></Heading>

                <div className="cx-comparison">
                    <div className="cx-comparison__card cx-comparison__card--vs">
                        <div className="cx-comparison__card-header cx-comparison__card-header--green">
                            <h2 className="cx-comparison__card-heading">Our Rates</h2>
                        </div>
                        <div className="cx-comparison__card-body">
                            <span className="cx-comparison__prefix">As High As</span>
                            <span className="cx-comparison__rate">{data?.Rate}%</span>
                            <span className="cx-comparison__suffix">APY for {productName}</span>
                        </div>
                    </div>
                    <div className="cx-comparison__card cx-comparison__card--equals">
                        <div className="cx-comparison__card-header">
                            <h2 className="cx-comparison__card-heading">National Average</h2>
                        </div>
                        <div className="cx-comparison__card-body">
                            <span className="cx-comparison__prefix">&nbsp;</span>
                            <span className="cx-comparison__rate">{data?.Average_Market_Rate.toFixed(2)}%</span>
                            <span className="cx-comparison__suffix">APY for {productName}</span>
                        </div>
                    </div>
                    <div className="cx-comparison__card">
                        <div className="cx-comparison__card-header cx-comparison__card-header--blue">
                            <h2 className="cx-comparison__card-heading">Big Earnings</h2>
                        </div>
                        <div className="cx-comparison__card-body">
                            <span className="cx-comparison__prefix">You Can Earn</span>
                            <span className="cx-comparison__rate">{data?.[compareType]}{compareSymbol()}<sup>*</sup></span>
                            <span className="cx-comparison__suffix">More With Connexus</span>
                        </div>
                    </div>
                </div>
            </div> 
        }
        </>
    );
}

export default Datatrac;
