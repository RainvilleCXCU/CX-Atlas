
const path = require("path");
const { withFaust, getWpHostname } = require("@faustwp/core");
const { fetchWordPressRedirects } = require("./src/utils/redirects");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isProd = process.env.NODE_ENV === "production";
const cspReportUri = process.env.CSP_REPORT_URI || "";
const isTruthy = (v) => ["1", "true", "yes"].includes((v || "").toLowerCase());
const cspReportOnly = isTruthy(process.env.CSP_REPORT_ONLY);
let wpOrigin = [process.env.NEXT_PUBLIC_WORDPRESS_URL]
  ? [new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).origin]
  : [];
wpOrigin.push('https://*.connexuscu.org'); // Allowlist for WordPress-hosted assets (e.g. media) that may be on a different subdomain than the main site
const cspHeaderKey = cspReportOnly
  ? "Content-Security-Policy-Report-Only"
  : "Content-Security-Policy";

// Per-vendor CSP additions. Included by default; disable individually via env var
// (e.g. CSP_DISABLE_GTM=true). Each entry contributes only to the directives it needs.
const THIRD_PARTY_CSP = {
  CSP_DISABLE_GTM: {
    "script-src": [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
    ],
    "connect-src": [
      "https://www.google-analytics.com",
      "https://*.analytics.google.com",
      "https://*.googletagmanager.com",
      "https://stats.g.doubleclick.net",
    ],
    "img-src": [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://stats.g.doubleclick.net",
    ],
    "frame-src": ["https://td.doubleclick.net"],
  },
  CSP_DISABLE_QUALTRICS: {
    "script-src": [
      "https://*.qualtrics.com",
      "https://*.siteintercept.qualtrics.com",
    ],
    "connect-src": ["https://*.qualtrics.com"],
    "img-src": ["https://*.qualtrics.com"],
  },
  CSP_DISABLE_CLARITY: {
    "script-src": ["https://www.clarity.ms", "https://*.clarity.ms"],
    "connect-src": ["https://*.clarity.ms", "https://c.bing.com"],
    "img-src": ["https://*.clarity.ms", "https://c.bing.com"],
  },
  CSP_DISABLE_SITEIMPROVE: {
    "script-src": [
      "https://*.siteimproveanalytics.com",
      "https://*.siteimproveanalytics.io",
    ],
    "connect-src": [
      "https://*.siteimproveanalytics.com",
      "https://*.siteimproveanalytics.io",
    ],
    "img-src": [
      "https://*.siteimproveanalytics.com",
      "https://*.siteimproveanalytics.io",
    ],
  },
  CSP_DISABLE_SPECTRUM: {
    "script-src": [
      "https://tag.brandcdn.com",
      "https://*.brandcdn.com",
      "https://tag.simpli.fi",
      "https://*.simpli.fi",
    ],
    "connect-src": ["https://*.brandcdn.com", "https://*.simpli.fi"],
    "img-src": ["https://*.brandcdn.com", "https://*.simpli.fi"],
  },
  CSP_DISABLE_Q1: {
    "script-src": ["https://js.adsrvr.org"],
    "connect-src": ["https://insight.adsrvr.org", "https://js.adsrvr.org"],
    "img-src": [
      "https://insight.adsrvr.org",
      "https://*.adsrvr.org",
      "https://*.pro-market.net",
    ],
    "frame-src": ["https://insight.adsrvr.org", "https://*.adsrvr.org"],
  },
  CSP_DISABLE_VIDEO_EMBEDS: {
    "frame-src": [
      "https://player.vimeo.com",
      "https://www.youtube.com",
      "https://www.youtube-nocookie.com",
    ],
    "media-src": ["https://player.vimeo.com", "https://*.vimeocdn.com"],
    "img-src": ["https://i.vimeocdn.com", "https://i.ytimg.com"],
    "connect-src": ["https://player.vimeo.com"],
  },
  CSP_DISABLE_PERSONYZE: {
    "script-src": [
      "https://cdn.personyze.com",
      "https://counter.personyze.com",
      "https://*.personyze.com",
    ],
    "connect-src": ["https://counter.personyze.com", "https://*.personyze.com"],
    "img-src": ["https://*.personyze.com"],
  },
  CSP_DISABLE_GOOGLE_MAPS: {
    "script-src": ["https://maps.googleapis.com", "https://maps.gstatic.com"],
    "connect-src": ["https://maps.googleapis.com"],
    "img-src": [
      "https://maps.googleapis.com",
      "https://maps.gstatic.com",
      "https://*.googleapis.com",
      "https://*.gstatic.com",
      "https://*.ggpht.com",
      "https://*.google.com",
    ],
    "frame-src": ["https://www.google.com"],
    "style-src": ["https://fonts.googleapis.com"],
    "font-src": ["https://fonts.gstatic.com"],
  },
  CSP_DISABLE_NICE_CHAT: {
    "script-src": ["https://*.niceincontact.com"],
    "connect-src": ["https://*.niceincontact.com", "wss://*.niceincontact.com"],
    "img-src": ["https://*.niceincontact.com"],
    "frame-src": ["https://*.niceincontact.com"],
    "style-src": ["https://*.niceincontact.com"],
    "media-src": ["https://*.niceincontact.com"],
  },
  CSP_DISABLE_SALESFORCE: {
    "script-src": [
      "https://*.my.site.com",
      "https://*.lightning.force.com",
      "https://*.force.com",
      "https://*.salesforce.com",
    ],
    "connect-src": [
      "https://*.my.site.com",
      "https://*.lightning.force.com",
      "https://*.salesforce.com",
    ],
    "frame-src": ["https://*.my.site.com", "https://*.lightning.force.com"],
    "img-src": ["https://*.salesforce.com", "https://*.force.com"],
    "style-src": ["https://*.my.site.com", "https://*.lightning.force.com"],
    "font-src": ["https://*.my.site.com", "https://*.lightning.force.com"],
  },
};

function buildContentSecurityPolicy() {
  const directives = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    "connect-src": [
      "'self'",
      ...(wpOrigin ? wpOrigin : []),
      ...(isProd ? [] : ["ws:", "wss:", "http://localhost:*"]),
    ],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      // Allow any https image source. Third-party tags (e.g. Spectrum/Simpli.fi
      // cookie-sync) fire fire-and-forget tracking pixels at many ad-partner
      // domains via new Image(); enumerating them is unmaintainable, and images
      // can only signal via their URL, they can't read page data.
      "https:",
      ...(wpOrigin ? wpOrigin : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "font-src": ["'self'", "data:"],
    "frame-src": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  for (const [envKey, additions] of Object.entries(THIRD_PARTY_CSP)) {
    if (isTruthy(process.env[envKey])) continue;
    for (const [directive, sources] of Object.entries(additions)) {
      directives[directive] = [...(directives[directive] || []), ...sources];
    }
  }

  if (cspReportUri) directives["report-uri"] = [cspReportUri];

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${[...new Set(values)].join(" ")}`)
    .join("; ");
}

/**
 * @type {import('next').NextConfig}
 **/

let nextConfig = {
  reactStrictMode: false,
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
        source: '/(.*)',
        headers: [
          {
            key: cspHeaderKey,
            value: buildContentSecurityPolicy(),
          },
        ],
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
        {
          source: "/robots.txt",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/robots.txt`,
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
              key: "utm_campaign",
              value: "(fall|sticky|staticbold|staticcomp)"
            },
          ],
        },
        {
          source: "/:path*",
          destination: "/dynamic/:path*",
          has: [
            {
              type: "query",
              key: "template",
              value: "(cta_header|no_header|slim_header)"
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
        {
          source:"/:path*",
          destination:"/dynamic/:path*",
          has: [
            {
              type:"query",
              key:"referralsource",
              value:"fb-mopur-260430.*"
            }
          ],
          missing: [
            {
              type:"query",
              key:"preview"
            }
          ]
        },
        {
          source:"/:path*",
          destination:"/dynamic/:path*",
          has: [
            {
              type:"query",
              key:"referralsource",
              value:"fb-morefi-260430.*"
            }
          ],
          missing: [
            {
              type:"query",
              key:"preview"
            }
          ]
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
    if (!process.env.USE_REACT) {
      Object.assign(config.resolve.alias, {
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
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

    /** Chunking */
if (!isServer && !process.env.PREVENT_SPLIT_CHUNK) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          next: {
            test: /[\\/]node_modules[\\/](next)/,
            priority: -10,
            name: 'next',
            enforce: true,
          },
          // GraphQL and Apollo
          graphql: {
            test: /[\\/]node_modules[\\/](@apollo|graphql|@graphql-tools)[\\/]/,
            name: 'graphql',
            priority: 25,
            enforce: true,
          },
          // FaustWP specific
          faust: {
            test: /[\\/]node_modules[\\/]@faustwp[\\/]/,
            name: 'faust',
            priority: 25,
            enforce: true,
          },
        },
      };
    }

    return config;
  },
};
module.exports = withFaust(withBundleAnalyzer(nextConfig));
