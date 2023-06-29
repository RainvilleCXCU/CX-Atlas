import Document, { Html, Head, Main, NextScript } from 'next/document';
import { files } from '../lib/externalFiles';
import { addCSSAsset } from 'lib/enqueuedFiles';

class CXDoc extends Document {
  render() {
    
    return (
      <Html>
        <Head>
        </Head>
          {files.css.map((sheet) => {
              return addCSSAsset(sheet);
          })}
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CXDoc;
