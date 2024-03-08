import { gql } from '@apollo/client';
import GTM from './gtm';
import HotJar from './hotjar';
import Personyze from './personyze';
import Spectrum from './spectrum';
import Siteimprove from './siteimprove';
import Qualtrics from './qualtrics';

export { GTM, HotJar, Personyze, Spectrum, Siteimprove, Qualtrics };

export const ThirdPartySettingsFragment = gql`
  fragment ThirdPartySettingsFragment on ThirdPartySettings {
    datatracEnabled
    datatracId
    gtmEnabled
    gtmId
    hotjarEnabled
    hotjarId
    personyzeDomains
    personyzeEnabled
    personyzeId
    qualtricsEnabled
    qualtricsId
    salesforceEnabled
    salesforceId
    siteimproveEnabled
    siteimproveId
    spectrumEnabled
    spectrumId
    thirdPartySettings
    wpengineAccountId
    wpengineEnvId
    wpengineToken
  }
`;