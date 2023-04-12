export const files = {
    css: [
        {
            id: 'font',
            src: `https://cloud.typography.com/6914618/${process.env.CLOUD_FONT || '7711232'}/css/fonts.css`,
        },
        {
            id: 'genesis-blocks',
            src: '/wp-content/plugins/genesis-page-builder/lib/genesis-blocks/dist/style-blocks.build.css'
        },
        {
            id: 'genesis-blocks-front-end',
            src: '/wp-content/plugins/genesis-page-builder/build/frontend.styles.build.css'
        },
        {
            id: 'block-style',
            src: '/wp-includes/css/dist/block-library/style.min.css',
        },
        {
            id: 'block-theme',
            src: '/wp-includes/css/dist/block-library/theme.min.css',
        },
        {
            id: 'classic-theme',
            src: '/wp-includes/css/classic-themes.min.css',
        },
        {
            id: 'parent-theme',
            src: '/wp-content/themes/genesis-block-theme/style.css',
        },
        {
            id: 'child-theme',
            src: '/wp-content/themes/CXCU/style.css',
        },
        {
            id: 'styleguide',
            src: `/wp-content/themes/CXCU/assets/${process.env.styleguideVersion || '0.6.23'}/cxcu.css`
        }
    ]
}