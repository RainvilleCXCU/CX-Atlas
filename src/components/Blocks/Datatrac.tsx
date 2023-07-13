import React, { useContext, useEffect, useState } from 'react';
import Heading from 'components/Heading';
import { client } from 'client';
import { Store } from '../../context/store';
import DatatracValue from 'components/Datatrac/Value';
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
    const [state, setState] = useContext(Store);

    useEffect(() => {
        setLoading(true)
        if (datatracEnabled && datatracId && datatracID) {
            fetch(`https://api.datatrac.net/api/Thresholds.json?MarketID=${marketId}&Productclass=${datatracID}&ApiKey=${datatracId}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data[0])
                    setLoading(false);
                    setState({
                        ...state,
                        datatrac: {
                            [datatracID]:{
                                ...data[0]
                            }
                        }
                    })
                })
        }
    }, [datatracID, datatracId]);
    
    return (
        <>
            {datatracEnabled && datatracId && datatracID && data?.ThresholdType !== 'DoesNotOutPerform' && data?.ThresholdType !== 'OutpeformsBelowThresholds' &&
                <div className="datatrac-wrapper db-hide" data-datatrac-product={datatracID} data-datatrac-value={compareType}>
                    <Heading level='h2'>Earn <DatatracValue productName={datatracID} value={data?.[compareType]} /> More By Choosing Connexus<sup className="comparison-superscript">*</sup></Heading>
                    <div className="cx-comparison">
                        <div className="cx-comparison__card cx-comparison__card--vs">
                            <div className="cx-comparison__card-header cx-comparison__card-header--green">
                                <h2 className="cx-comparison__card-heading">Our Rates</h2>
                            </div>
                            <div className="cx-comparison__card-body">
                                <span className="cx-comparison__prefix">As High As</span>
                                <span className="cx-comparison__rate"><DatatracValue productName={datatracID} value="Rate" />%</span>
                                <span className="cx-comparison__suffix">APY for <DatatracValue productName={datatracID} value="ProductName" /></span>
                            </div>
                        </div>
                        <div className="cx-comparison__card cx-comparison__card--equals">
                            <div className="cx-comparison__card-header">
                                <h2 className="cx-comparison__card-heading"><DatatracValue productName={datatracID} value="MarketName" /></h2>
                            </div>
                            <div className="cx-comparison__card-body">
                                <span className="cx-comparison__prefix">&nbsp;</span>
                                <span className="cx-comparison__rate"><DatatracValue productName={datatracID} value="Average_Market_Rate" /></span>
                                <span className="cx-comparison__suffix">APY for <DatatracValue productName={datatracID} value="ProductName" /></span>
                            </div>
                        </div>
                        <div className="cx-comparison__card">
                            <div className="cx-comparison__card-header cx-comparison__card-header--blue">
                                <h2 className="cx-comparison__card-heading">Big Earnings</h2>
                            </div>
                            <div className="cx-comparison__card-body">
                                <span className="cx-comparison__prefix">You Can Earn</span>
                                <span className="cx-comparison__rate"><DatatracValue productName={datatracID} value={compareType} /><sup>*</sup></span>
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
