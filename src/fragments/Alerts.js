import { gql } from '@apollo/client';

export const AlertFragment = gql`
  fragment AlertsFragment on CXAlert {
        active
        displayPages
        databaseId
        ctaButtonText
        ctaButtonUrl
        name
        message
	  }
`;