import { gql } from '@apollo/client';

export const NavigationMenuItemFragment = gql`
fragment NavigationMenuItemFragment on MenuItem {
  databaseId
  uri
  label
  parentDatabaseId
  childItems {
      nodes{
          databaseId
          uri
          label
          parentDatabaseId
          childItems {
              nodes{
                  databaseId
                  uri
                  label
                  parentDatabaseId
              }
          }
      }
  }
}
`
;