export const files = {
    css: [
        {
            id: 'font',
            src: `https://cloud.typography.com/6914618/${process.env.CLOUD_FONT || '7711232'}/css/fonts.css`,
        },
        {
            id: 'genesis-blocks-style',
            src: '/wp-content/plugins/genesis-page-builder/vendor/genesis/blocks/dist/style-blocks.build.css'
        },
        {
            id: 'block-style',
            src: '/wp-includes/css/dist/block-library/style.min.css',
        },
        {
            id: 'tablepress-style',
            src: '/wp-content/plugins/tablepress/css/build/default.css',
        },
        {
            id: 'parent-theme',
            src: '/wp-content/themes/genesis-block-theme/style.css',
        },
        {
            id: 'cisco-chat',
            src: '/wp-content/themes/CXCU/vendors/cisco-chat/styles.css',
        },
        {
            id: 'child-theme',
            src: '/wp-content/themes/CXCU/style.css',
        },
        {
            id: 'styleguide',
            src: `/wp-content/themes/CXCU/assets/${process.env.styleguideVersion || '0.6.35'}/cxcuatlas.css`
        }
    ],
    js: [
        {
            id: 'cisco-chat',
            src: '/wp-content/themes/CXCU/vendors/cisco-chat/scripts.js',
        }
    ]
}