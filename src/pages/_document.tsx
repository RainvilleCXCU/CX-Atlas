import Document, { Html, Head, Main, NextScript } from 'next/document';
import { files } from '../lib/externalFiles';
import { addCSSAsset, addJSAsset } from 'lib/enqueuedFiles';

class CXDoc extends Document {
  render() {
    
    return (
      <Html>
        <Head>
        </Head>
          <link rel="preload" href={`https://cloud.typography.com/6914618/${process.env.NEXT_PUBLIC_CLOUD_FONTS || '7711232'}/css/fonts.css`} as="style" />
          {files.css.map((sheet) => {
              return addCSSAsset(sheet);
          })}
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
