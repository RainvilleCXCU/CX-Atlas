import gql from 'graphql-tag';

export const BlogInfoFragment = gql`
  fragment BlogInfoFragment on GeneralSettings {
    title
    description
    logo
  }
`;

