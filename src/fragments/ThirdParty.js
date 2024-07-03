import { gql } from '@apollo/client';

export const ThirdPartySettingsFragment = gql`
  fragment ThirdPartySettingsFragment on ThirdPartySettings {
    clarityEnabled
    clarityId
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