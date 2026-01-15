import { gql } from '@apollo/client';

export const AlertFragment = gql`
  fragment AlertsFragment on CXAlert {
        active
        type
        displayPages
        databaseId
        ctaButtonText
        ctaButtonUrl
        name
        message
        startDate
        endDate
	  }
`;