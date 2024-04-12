import Document, { Html, Head, Main, NextScript } from "next/document";
import { files } from "../lib/externalFiles";
import { addCSSAsset, addJSAsset } from "lib/enqueuedFiles";
import { GTM } from "components/ThirdParty";
import Script from "next/script";

class CXDoc extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href='https://www.googletagmanager.com' rel='preconnect' />
          <link href='https://cloud.typography.com' rel='preconnect' />
          <link
            rel="preload"
            href={`https://cloud.typography.com/6914618/${
              process.env.NEXT_PUBLIC_CLOUD_FONTS || "7711232"
            }/css/fonts.css`}
            as="style"
          />
          {files.css.map((sheet) => {
            return addCSSAsset(sheet);
          })}
          {process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== "" ? (
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
            </Script>
          ) : <></>}

          {process.env.NEXT_PUBLIC_PERSONYZE_ID && process.env.NEXT_PUBLIC_PERSONYZE_ID !== "" ? (
            <Script
              id="personyze"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window._S_T ||
              (function(d){
                var s = d.createElement('script'),
                  u = s.onload===undefined && s.onreadystatechange===undefined,
                  i = 0,
                  f = function() {window._S_T ? (_S_T.async=true) && _S_T.setup(${process.env.NEXT_PUBLIC_PERSONYZE_ID}, "${process.env.NEXT_PUBLIC_PERSONYZE_DOMAINS} *.${process.env.NEXT_PUBLIC_PERSONYZE_DOMAINS}") : i++<120 && setTimeout(f, 600)},
                  h = d.getElementsByTagName('head');
                s.async = true;
                s.src = '\/\/counter.personyze.com\/stat-track-lib.js';
                s.onload = s.onreadystatechange = f;
                (h && h[0] || d.documentElement).appendChild(s);
                if (u) f();
              })(document);
            `,
              }}
            />
          ) : <></>}
        </Head>
        <body className="">
          <Main />
          <NextScript />
          {files.js.map((sheet) => {
            console.log(`Script: ${sheet}`);
            return addJSAsset(sheet);
          })}
        </body>
      </Html>
    );
  }
}

export default CXDoc;
