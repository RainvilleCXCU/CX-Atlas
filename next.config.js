const { withFaust } = require('@faustjs/next');
const { NextFetchEvent } = require('next/server');
const { fetchWordPressRedirects } = require('./src/utils/redirects');

/**
 * @type {import('next').NextConfig}
 **/

let nextConfig = {
    async redirects() {
        const wpRedirects = await fetchWordPressRedirects();
        return[
            {
                source: '/apply:type/:path*',
                destination: '/open-an-account/',
                missing: [{
                    type: 'query',
                    key: 'account'
                }],
                permanent: false
            },
            ...wpRedirects
        ]
    },
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/mdr/:path*/',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/mdr/:path*/`,
                },
                {
                    source: '/mdr/:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/mdr/:path*`,
                },
                {
                    source: '/graphql/:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql/:path*`,
                },
                {
                    source: '/wp-includes/:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-includes/:path*`,
                },
                {
                    source: '/wp-login.php:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-login.php:path*`,
                },
                {
                    source: '/wp-admin/:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/:path*`,
                },
                {
                    source: '/wp-json/:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/:path*`,
                },
                {
                    source: '/wp-content/:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/:path*`,
                },
                {
                    source: '/apply-:type/:path*',
                    destination: '/bridge/:type/',
                },
            ],
            afterFiles: [
                {
                    source: '/about/media-center/:linkLibCatId/page/:linkLibCatPage*',
                    destination: `/about/media-center/`,
                },
                {
                    source: '/about/media-center/:linkLibCatId*',
                    destination: `/about/media-center/`,
                },
                {
                    source: '/about/branch-and-atm-locations/:path*',
                    destination: '/locations',
                }
            ],
        }
    },
    trailingSlash: true
};
module.exports = withFaust(nextConfig);