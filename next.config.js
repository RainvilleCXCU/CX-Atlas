const { withFaust, getWpHostname } = require('@faustwp/core');
const { fetchWordPressRedirects } = require('./src/utils/redirects');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer({})

/**
 * @type {import('next').NextConfig}
 **/

let nextConfig = {
    // reactStrictMode: true,
    async redirects() {
        const wpRedirects = await fetchWordPressRedirects({type: 'url'});
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
            {
                source: '/:path*',
                destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/:path*`,
                has: [{
                    type: 'query',
                    key: 'preview'
                },{
                    type: 'query',
                    key: 'page_id'
                }],
                missing: [{
                    type: 'query',
                    key: '_ppp'
                }],
                permanent: false
            },
            {
                source: '/:path*',
                destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/:path*`,
                has: [{
                    type: 'query',
                    key: 'preview'
                },{
                    type: 'query',
                    key: 'page_id'
                }],
                permanent: false
            },
            {
                source: '/:path*',
                destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/:path*`,
                has: [{
                    type: 'query',
                    key: 'mark_current_revision'
                }],
                permanent: false
            },
            ...wpRedirects
        ]
    },
    async rewrites() {
        const wpRewrites = await fetchWordPressRedirects({type: 'pass'});
        return {
            beforeFiles: [
                ...wpRewrites,
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
                    source: '/cxlib/:path*',
                    destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/cxlib/:path*`,
                },
                {
                    source: '/apply-:type/:path*',
                    destination: '/bridge/:type/',
                },
                {
                    source: '/meet/:path*',
                    destination: '/meet/?productType=:path*',
                },
                // {
                //     source: '/about/media-center/:catId{/}?',
                //     destination: '/about/media-center/?catId=:catId',
                // },
                {
                    source: '/about/media-center/:catId/page/:page?',
                    destination: '/about/media-center/:catId/?page=:page',
                },
                // {
                //     source: '/blog/category/:categoryName{/}?',
                //     destination: '/blog/category/:categoryName/?categoryName=:categoryName',
                // },
                // {
                //     source: '/blog/category/:categoryName/page/:page{/}?',
                //     destination: '/blog/category/:categoryName/?categoryName=:categoryName&page=:page',
                // },
                // {
                //     source: '/blog/page/:page',
                //     destination: '/blog/?page=:page',
                // },
                {
                    source: '/about/branch-and-atm-locations/find-location/:location?',
                    destination: '/about/branch-and-atm-locations/?location=:location'
                },
                {
                    source: '/search/page/:page?',
                    destination: '/search/?page=:page',
                    has: [{
                        type: 'query',
                        key: 's'
                    }],
                },
                // {
                //     source: '/meet/loans:path*',
                //     destination: '/meet/?productFilters=auto-loans,home-equity-loans,home-loans,personal-loans,recreational-loans',
                // },
                // {
                //     source: '/about/branch-and-atm-locations/',
                //     destination: '/locations',
                // },
                // {
                //     source: '/pgp.txt',
                //     destination: '/wp-content/themes/Connexus/assets/txt/ConnexusFileTransfer_PGP.txt'
                // }
            ],
            afterFiles: [
                // {
                //     source: '/about/branch-and-atm-locations/find-location/:location*',
                //     destination: '/locations',
                // },
                // {
                //     source: '/location/:location*',
                //     destination: '/locations/location',
                // },
                // {
                //     source: '/about/media-center/:catId*/page/:pageNum*',
                //     destination: `/about/media-center`,
                // },
                // {
                //     source: '/about/media-center/:catId*',
                //     destination: `/about/media-center`,
                // }
            ]
        }
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    swcMinify: true,
    experimental: {
        webVitalsAttribution: ['CLS', 'LCP', 'FCP'],
        optimizePackageImports: [
            "@apollo/client",
            "@faustwp/cli",
            "@faustwp/core",
            "dateformat",
            "mobile-device-detect",
            "preact",
            "preact-render-to-string",
            "react-cookie",
            "react-equal-height"
        ]
    },
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
            "react/jsx-runtime.js": "preact/compat/jsx-runtime",
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
            });
        }
        return config;
    }
};
module.exports = withFaust(withBundleAnalyzer(nextConfig));