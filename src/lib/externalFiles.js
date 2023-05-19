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
            id: 'child-theme',
            src: '/wp-content/themes/CXCU/style.css',
        },
        {
            id: 'styleguide',
            src: `/wp-content/themes/CXCU/assets/${process.env.styleguideVersion || '0.6.30'}/cxcuatlas.css`
        }
    ]
}