import { gql } from '@apollo/client';

export const ApplyStartFragment = gql`
  fragment ApplyStartFragment on WidgetSettings {
    applyStart(account: $account, minor: $minor, productcode: $productcode, atLimit: $atLimit, member: $member)
  }
`;
export const ApplyNowFragment = gql`
  fragment ApplyNowFragment on WidgetSettings {
    applyNow(account: $account, minor: $minor, productcode: $productcode, atLimit: $atLimit, member: $member)
  }
`;
export const ApplyNowMinorFragment = gql`
  fragment ApplyNowMinorFragment on WidgetSettings {
    applyNowMinor(account: $account, minor: $minor, productcode: $productcode, atLimit: $atLimit, member: $member)
  }
`;
export const ApplyNowMemberFragment = gql`
  fragment ApplyNowMemberFragment on WidgetSettings {
    applyNowMember(account: $account, minor: $minor, productcode: $productcode, atLimit: $atLimit, member: $member)
  }
`;
export const ApplyNowMemberLimitFragment = gql`
  fragment ApplyNowMemberLimitFragment on WidgetSettings {
    applyNowMemberLimit(account: $account, minor: $minor, productcode: $productcode, atLimit: $atLimit, member: $member)
  }
`;

