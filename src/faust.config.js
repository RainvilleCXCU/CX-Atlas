import { config as coreConfig } from '@faustjs/core';
import { withFaust } from '@faustjs/next';

if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  console.error(
    'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env.local file?',
  );
}

/**
 * @type {import("@faustjs/core").Config}
 */
const faustConfig = coreConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});

module.exports = withFaust();