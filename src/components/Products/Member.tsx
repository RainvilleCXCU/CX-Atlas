import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { parseHtml } from "lib/parser";
import Loading from "components/common/loading";
import { trackMember } from "utils/tracking";

/**
 * Membership fork shown at the start of an application flow: existing members
 * are sent to online banking, everyone else to the account-opening form.
 *
 * Choosing the existing-member path calls trackMember(), which sets the
 * `ismember` cookie read by components/Device/SmartAppBanner and
 * components/Header/MobileNav — the same behaviour the `track-member` class
 * gives WordPress-authored links in lib/parser.js.
 *
 * If widgetSettings.mantlMemberScreen has admin-authored content in WordPress,
 * that's rendered via parseHtml (the same WP-block-to-component pipeline
 * layout.tsx uses for bodyTop) in place of the template below, so content
 * editors can override this screen without a deploy. With no widget content
 * (empty field, still loading, or query error) it falls back to the
 * hardcoded template.
 *
 * Callers that already have this field server-side (bridge/[...type].tsx
 * fetches it in getServerSideProps) should pass it as `widgetHtml` — that
 * skips the client-side query entirely, so the decision is already made by
 * first paint instead of resolving after a loading flash.
 */

export interface MemberOptionProps {
  heading?: string;
  description?: string;
  cta?: string;
  href?: string;
}

export interface MemberProps {
  id?: string;
  heading?: string;
  subheading?: string;
  existing?: MemberOptionProps;
  isNew?: MemberOptionProps;
  disclosure?: string;
  widgetHtml?: string;
  account?: string;
  productCode?: string;
}

const defaultExisting: MemberOptionProps = {
  heading: "I'm an existing member",
  description: "Open an account and become a member of Connexus.",
  cta: "Continue to Login",
  href: "https://connexus-credit-union-ss.uat.mantl.com/login",
};

const defaultNew: MemberOptionProps = {
  heading: "I'm new here",
  description: "Open an account and become a member of Connexus.",
  cta: "Open an Account",
  href: "https://connexus-credit-union-ss.uat.mantl.com/products",
};

const MANTL_MEMBER_SCREEN_QUERY = gql`
  query MantlMemberScreen($account: String, $productCode: String) {
    widgetSettings {
      mantlMemberScreen(account: $account, productCode: $productCode)
    }
  }
`;

function Member({
  id = "member-choice",
  heading = "Are you a member of Connexus Credit Union?",
  subheading = "Choose an option below to get started.",
  existing,
  isNew,
  disclosure = "Federally insured by NCUA",
  widgetHtml: widgetHtmlProp,
  account,
  productCode,
}: MemberProps): JSX.Element {
  const hasWidgetHtmlProp = widgetHtmlProp !== undefined;
  const { data, loading } = useQuery(MANTL_MEMBER_SCREEN_QUERY, {
    variables: { account, productCode },
    skip: hasWidgetHtmlProp,
  });
  const isDeciding = !hasWidgetHtmlProp && loading;

  // Nothing else renders until we know whether WordPress has content to
  // show — otherwise the hardcoded template flashes before the widget swaps
  // in. Loading's embedded mode renders inline here (e.g. inside the
  // Modal content this sits in) rather than as the fixed full-page overlay,
  // which would render behind the modal's own stacking context.
  if (isDeciding) {
    return <Loading embedded show />;
  }

  const widgetHtml = hasWidgetHtmlProp ? widgetHtmlProp : data?.widgetSettings?.mantlMemberScreen;

  if (widgetHtml) {
    console.log("Rendering WordPress-authored member screen content:", widgetHtml);
    console.log("Product code:", productCode);
    return <>{parseHtml(widgetHtml)}</>;
  }

  const existingOption = { ...defaultExisting, ...existing };
  const newOption = { ...defaultNew, ...isNew };

  return (
    <section className="member-choice" id={id}>
      <span className="member-choice__badge" aria-hidden="true">
        <GroupIcon />
      </span>

      <h2 className="member-choice__heading">{heading}</h2>
      {subheading && <p className="member-choice__subheading">{subheading}</p>}

      <div className="member-choice__options">
        <div className="member-choice__option member-choice__option--existing">
          <span className="member-choice__option-icon" aria-hidden="true">
            <MemberIcon />
          </span>
          <h3 className="member-choice__option-heading">{existingOption.heading}</h3>
          <p className="member-choice__option-description">{existingOption.description}</p>
          <MemberLink
            href={existingOption.href}
            className="cx-button cx-button--compact cx-button--color-positive member-choice__cta member-choice__cta--existing"
            onClick={trackMember}
          >
            {existingOption.cta}
          </MemberLink>
        </div>

        <div className="member-choice__option member-choice__option--new">
          <span className="member-choice__option-icon" aria-hidden="true">
            <NewMemberIcon />
          </span>
          <h3 className="member-choice__option-heading">{newOption.heading}</h3>
          <p className="member-choice__option-description">{newOption.description}</p>
          <MemberLink
            href={newOption.href}
            className="cx-button cx-button--compact member-choice__cta member-choice__cta--new"
          >
            {newOption.cta}
          </MemberLink>
        </div>
      </div>

      {disclosure && (
        <p className="member-choice__disclosure">
          <ShieldIcon />
          {disclosure}
        </p>
      )}
    </section>
  );
}

/**
 * Internal paths route through next/link; absolute URLs (online banking lives on
 * a separate host) render as a plain anchor so Next doesn't try to prefetch them.
 */
function MemberLink({
  href = "",
  className,
  onClick,
  children,
}: {
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
}): JSX.Element {
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} className={className} onClick={onClick} rel="noopener">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

// Icons inherit their colour from the surrounding rule via currentColor.
function GroupIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" focusable="false">
      <circle cx="12" cy="7.5" r="2.6" fill="currentColor" />
      <circle cx="5.6" cy="9.4" r="2.1" fill="currentColor" />
      <circle cx="18.4" cy="9.4" r="2.1" fill="currentColor" />
      <path
        d="M12 11.6c-2.7 0-4.9 1.7-4.9 3.9v1.3h9.8v-1.3c0-2.2-2.2-3.9-4.9-3.9Z"
        fill="currentColor"
      />
      <path
        d="M5.6 13c-1.9 0-3.4 1.2-3.4 2.7v1.1h3.1v-1.3c0-.9.3-1.7.9-2.4a4.6 4.6 0 0 0-.6-.1Zm12.8 0c-.2 0-.4 0-.6.1.6.7.9 1.5.9 2.4v1.3h3.1v-1.1c0-1.5-1.5-2.7-3.4-2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MemberIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" focusable="false">
      <circle cx="11" cy="7" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 19.5v-.8c0-2.7 2.9-4.9 6.5-4.9 1 0 2 .2 2.8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m15.2 16.8 1.7 1.7 3-3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NewMemberIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" focusable="false">
      <circle cx="10.5" cy="7.5" r="3.6" fill="currentColor" />
      <path
        d="M10.5 12.8c-3.7 0-6.7 2.2-6.7 5v1.4h13.4v-1.4c0-2.8-3-5-6.7-5Z"
        fill="currentColor"
      />
      <circle cx="18.6" cy="5.4" r="2.9" fill="currentColor" />
      <path
        d="M18.6 3.9v3M17.1 5.4h3"
        stroke="#fff"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M12 2.8 4.8 5.6v5.7c0 4.3 3 8.3 7.2 9.9 4.2-1.6 7.2-5.6 7.2-9.9V5.6L12 2.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m8.9 11.9 2.1 2.1 4.1-4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Member;
