import gql from 'graphql-tag';

export const SEOFragment = gql`
  fragment SEOFragment on Page {
    canonical
    cornerstone
    focuskw
    fullHead
    metaDesc
    metaKeywords
    metaRobotsNofollow
    metaRobotsNoindex
    opengraphAuthor
    opengraphDescription
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphSiteName
    opengraphTitle
    opengraphType
    opengraphUrl
    readingTime
    title
    twitterDescription
    twitterTitle
  }
`;

