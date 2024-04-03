import { gql } from '@apollo/client';

export const AlertFragment = gql`
  fragment AlertsFragment on CXAlert {
        displayPages
        databaseId
        ctaButtonText
        ctaButtonUrl
        name
        message
	  }
`;