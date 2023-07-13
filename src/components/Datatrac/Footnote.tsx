import React, { useContext, useEffect, useState } from 'react';
import Heading from 'components/Heading';
import { client } from 'client';
import { Store } from '../../context/store';
import DatatracValue from 'components/Datatrac/Value';
export interface Props {
    productName?: string;
    value?: string;
}

function DatatracFootnote({
    productName,
    value
}: Props): JSX.Element {
    const { useQuery } = client;
    const { datatracEnabled, datatracId } = useQuery().thirdPartySettings;
    const [state, setState] = useContext(Store);
    
    const showValue = datatracEnabled && datatracId && productName && state?.datatrac?.[productName]?.ThresholdType !== 'DoesNotOutPerform' && state?.datatrac?.[productName]?.ThresholdType !== 'OutpeformsBelowThresholds';
    
    return (
        <>
            { showValue &&
                <p className="datatrac-wrapper datatrac-wrapper__disclosure db-hide">
                    <small className="cx-comparison__disclosure">
                        <sup>*</sup><DatatracValue productName={productName} value="FootNoteText3" /> Accurate as of: <DatatracValue productName={productName} value="Verified_As_Of"/> . Source: <a href="https://datatrac.net/">Datatrac</a>
                    </small>
                </p>
            }
        </>
    );
}

export default DatatracFootnote;
