import gql from 'graphql-tag';

export const ApplyStartFragment = gql`
  fragment ApplyStartFragment on WidgetSettings {
    applyStart(account: $account, minor: $minor)
  }
`;
export const ApplyNowFragment = gql`
  fragment ApplyNowFragment on WidgetSettings {
    applyNow(account: $account, minor: $minor)
  }
`;
export const ApplyNowMinorFragment = gql`
  fragment ApplyNowMinorFragment on WidgetSettings {
    applyNowMinor(account: $account, minor: $minor)
  }
`;
export const ApplyNowMemberFragment = gql`
  fragment ApplyNowMemberFragment on WidgetSettings {
    applyNowMember(account: $account, minor: $minor)
  }
`;

