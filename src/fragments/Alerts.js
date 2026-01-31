import { gql } from '@apollo/client';

export const AlertFragment = gql`
  fragment AlertsFragment on CXAlert {
        active
        type
        darkMode
        iconPosition
        heading
        displayPages
        doNotDisplayPages
        databaseId
        name
        message
        startDate
        endDate
        disableDismiss
        noIcon
        ctas {
          ctaButtonText
          ctaButtonUrl
        }
	  }
`;