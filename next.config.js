const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
    async rewrites () {
        return [
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
                source: '/about/branch-and-atm-locations/',
                destination: '/locations/',
            }
        ]
    },
    trailingSlash: true
});