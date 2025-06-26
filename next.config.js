
const path = require("path");
const { withFaust, getWpHostname } = require("@faustwp/core");
const { fetchWordPressRedirects } = require("./src/utils/redirects");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 **/

let nextConfig = {
  // reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      },
      {
        source: '/mdr:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      }
    ];
  },
  async redirects() {
    const wpRedirects = await fetchWordPressRedirects({ type: "url" });
    return [
      {
        source: "/apply:type/:path*",
        destination: "/open-an-account/",
        missing: [
          {
            type: "query",
            key: "account",
          },
        ],
        permanent: false,
      },
      {
        source: '/mobileapp:path*',
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '(.*Android.*|.*android.*)',
          },
        ],
        permanent: false,
        destination: 'https://play.google.com/store/apps/details?id=com.alkamitech.connexus',
      },
      {
        source: '/mobileapp:path*',
        has: [
          {
            type: 'header',
            key: 'user-agent',
            // This regex matches common iOS user agents (iPhone, iPad, iPod)
            value: '(.*iPhone.*|.*iPad.*|.*iPod.*)',
          },
        ],
        permanent: false,
        destination: 'https://apple.co/3qSq3u6',
      },
      {
        source: '/mobileapp:path*',
        permanent: false,
        destination: '/services/digital-banking',
      },
      // {
      //   source: "/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/:path*`,
      //   has: [
      //     {
      //       type: "query",
      //       key: "preview",
      //     },
      //     {
      //       type: "query",
      //       key: "page_id",
      //     },
      //   ],
      //   missing: [
      //     {
      //       type: "query",
      //       key: "_ppp",
      //     },
      //   ],
      //   permanent: false,
      // },
      // {
      //   source: "/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/:path*`,
      //   has: [
      //     {
      //       type: "query",
      //       key: "preview",
      //     },
      //     {
      //       type: "query",
      //       key: "page_id",
      //     },
      //   ],
      //   permanent: false,
      // },
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/:path*`,
        has: [
          {
            type: "query",
            key: "mark_current_revision",
          },
        ],
        permanent: false,
      },
      ...(process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT && process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT == 'true' ? wpRedirects : []),
    ];
  },
  async rewrites() {
    const wpRewrites = await fetchWordPressRedirects({ type: "pass" });
    return {
      beforeFiles: [

        ...(process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT && process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT == 'true' ? wpRewrites : []),
        // {
        //   source: "/:path*",
        //   destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/:path*`,
        //   has: [
        //     {
        //       type: "query",
        //       key: "preview",
        //     },
        //     {
        //       type: "query",
        //       key: "page_id",
        //     },
        //     {
        //       type: "query",
        //       key: "_ppp",
        //     },
        //   ],
        //   permanent: false,
        // },
        {
          source: "/css/:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/mdr/css/:path*`,
          has: [
            {
              type: "header",
              key: "Referer",
              value: ".*/mdr.*" // Only apply this rewrite for requests originating from MDR pages
            }
          ]
        },
        {
          source: "/mdr/create:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/mdr/create/:path*/`,
        },
        {
          source: "/mdr:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/mdr/:path*/`,
        },
        {
          source: "/graphql/:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql/:path*`,
        },
        {
          source: "/wp-includes/:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-includes/:path*`,
        },
        {
          source: "/wp-login.php:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-login.php:path*`,
        },
        {
          source: "/wp-admin/:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/:path*`,
        },
        {
          source: "/wp-json/:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/:path*`,
        },
        {
          source: "/wp-content/:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/:path*`,
        },
        {
          source: "/cxlib/:path*",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/cxlib/:path*`,
        },
        {
          source: "/apply-:type/:path*",
          destination: "/bridge/:type/",
        },
        {
          source: "/meet/:path*",
          destination: "/meet/?productType=:path*",
        },
        // {
        //     source: '/about/media-center/:catId{/}?',
        //     destination: '/about/media-center/?catId=:catId',
        // },
        {
          source: "/about/media-center/:catId/page/:page?",
          destination: "/about/media-center/:catId/?page=:page",
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
          source: "/about/branch-and-atm-locations/find-location/:location?",
          destination: "/about/branch-and-atm-locations/?location=:location",
        },
        {
          source: "/search/page/:page?",
          destination: "/search/?page=:page",
          has: [
            {
              type: "query",
              key: "s",
            },
          ],
        },
        {
          source: "/preview/:path*",
          destination: "/dynamic/ppp/:path*",
          has: [
                {
                  type: "query",
                  key: "preview",
                },
                {
                  type: "query",
                  key: "page_id",
                }
              ],
        },
        {
          source: "/preview/:path*",
          destination: "/dynamic/postppp/:path*",
          has: [
                {
                  type: "query",
                  key: "preview",
                },
                {
                  type: "query",
                  key: "p",
                }
              ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/:path*",
          has: [
            {
              type: "query",
              key: "prso-lg",
            },
          ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/:path*",
          has: [
            {
              type: "query",
              key: "prso-img",
            },
          ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/:path*",
          has: [
            {
              type: "query",
              key: "prso-cta-lm",
            },
          ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/:path*",
          has: [
            {
              type: "query",
              key: "dyn-content",
            },
          ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/:path*",
          has: [
            {
              type: "query",
              key: "goal",
            },
          ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/ppp/:path*",
          has: [
                {
                  type: "query",
                  key: "preview",
                },
                {
                  type: "query",
                  key: "page_id",
                },
                {
                  type: "query",
                  key: "_ppp",
                },
              ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/postppp/:path*",
          has: [
                {
                  type: "query",
                  key: "preview",
                },
                {
                  type: "query",
                  key: "p",
                },
                {
                  type: "query",
                  key: "_ppp",
                },
              ],
              missing: [
                {
                  type: "query",
                  key: "post_type",
                  value: "wpsl_stores",
                }
              ]
        },
        {
          source: "/:path*",
          destination: "/dynamic/branchppp/:path*",
          has: [
                {
                  type: "query",
                  key: "preview",
                },
                {
                  type: "query",
                  key: "p",
                },
                {
                  type: "query",
                  key: "_ppp",
                },
                {
                  type: "query",
                  key: "post_type",
                  value: "wpsl_stores",
                },
              ],
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
      ],
    };
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" && process.env.REMOVE_CONSOLE !== 'false',
  },
  swcMinify: true,
  experimental: {
    // webVitalsAttribution:  process.env.NODE_ENV !== "production" ? ["CLS", "LCP", "FCP"] : [],
    scrollRestoration: true,
    optimizePackageImports: [
      "@apollo/client",
      "@faustwp/cli",
      "@faustwp/core",
      "dateformat",
      "mobile-device-detect",
      "preact",
      "preact-render-to-string",
      "react-cookie",
      "react-equal-height",
    ],
  },

  sassOptions: {
    outputStyle: "compressed",
  },
  webpack: (config, { dev, isServer }) => {
    // if (!dev && !isServer && !process.env.DEBUG_RENDERS) {
      Object.assign(config.resolve.alias, {
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    // }
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
    
      return {
        ...entries,
        'styles': {
          import: './src/scss/main.scss',
          dependOn: undefined,
          filename: 'styles'
        },
      };
    };

    
    config.plugins.push(
        new MiniCssExtractPlugin({
          filename: `static/css/styles.css`,
          chunkFilename: "static/css/styles.css",
        }),)
    config.resolve.extensions.push('.scss');
    config.resolve.extensions.push('.css');
    console.log(JSON.stringify(config.entry))
    config.module.rules.push(
        {
            test: /\.(scss|css)$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        esModule: false,
                        sourceMap: true,
                    },
                },
                {
                    loader: "sass-loader",
                    options: {
                        sassOptions: (loaderContext) => {            
                            return {
                                outputStyle: 'compressed',
                            };
                          },
                        sourceMap:
                            process.env.NODE_ENV !== "production"
                                ? true
                                : false
                    },
                },
            ],
        },);
    return config;
  },
};
module.exports = withFaust(withBundleAnalyzer(nextConfig));
