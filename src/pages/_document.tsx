import Document, { Html, Head, Main, NextScript } from 'next/document';

class CXDoc extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='stylesheet' id='genesis-block-parent-theme-style-css' href='https://cxcu.wpengine.com/wp-content/themes/genesis-block-theme/style.css' media='all' />
          <link rel='stylesheet' id='genesis-block-parent-theme-style-css' href='https://cxcu.wpengine.com/wp-content/plugins/genesis-page-builder/lib/genesis-blocks/dist/blocks.style.build.css' media='all' />
          <link rel='stylesheet' id='genesis-block-parent-theme-style-css' href='https://cxcu.wpengine.com/wp-includes/css/dist/block-library/style.min.css' media='all' />
          <link
            rel="stylesheet"
            href="https://cxcudev.wpengine.com/wp-content/themes/CXCU/assets/0.6.2/cxcu.css"
            type="text/css"
            media="all"
          />

        </Head>
        <body className="home page-template page-template-templates page-template-full-width page-template-templatesfull-width-php page page-id-75 wp-custom-logo wp-embed-responsive group-blog featured-image-wide">
          <Main />
          <NextScript />
          <script async src="https://cxcudev.wpengine.com/wp-content/themes/CXCU/assets/0.6.2/cxcu.js" type="text/javascript"></script>
        </body>
      </Html>
    );
  }
}

export default CXDoc;
