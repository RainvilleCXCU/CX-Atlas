import { gql } from '@apollo/client';

export const HeaderSettingsFragment = gql`
  fragment HeaderSettingsFragment on HeaderSettings {
    headerUtilities
    headerUtilitiesMobile
    headerButtons
    headerButtonsMobile
  }
`;
