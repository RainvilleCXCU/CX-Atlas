import Script from 'next/script';

export interface Props {
  enabled: Boolean;
  id: String;
}

/**
 * Google Tag Manager, injected via next/script rather than react-helmet.
 *
 * react-helmet writes straight into <head>, which competes with next/head's
 * positional bookkeeping (it reclaims SSR tags by walking back exactly
 * `next-head-count` siblings) and left duplicated meta tags behind on client
 * navigation. next/script injects outside that region and, because it keys off
 * the script `id`, will not re-execute when layout.tsx remounts on every route
 * change — helmet re-ran the snippet each time.
 *
 * The vendor snippet itself is unchanged.
 */
function GTM({
  enabled = false, id
}: Props): JSX.Element {
  if (!enabled || !id) return <></>;

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-${id}');
      `}
    </Script>
  );
}

export default GTM;
