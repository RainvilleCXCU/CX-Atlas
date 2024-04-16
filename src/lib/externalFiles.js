export const files = {
    css: [
        {
            id: 'font',
            src: `https://cloud.typography.com/6914618/${process.env.CLOUD_FONT || '7711232'}/css/fonts.css`,
        },
        {
            id: 'genesis-blocks-style',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/plugins/genesis-page-builder/vendor/genesis/blocks/dist/style-blocks.build.css`
        },
        {
            id: 'block-style',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-includes/css/dist/block-library/style.min.css`,
        },
        {
            id: 'tablepress-style',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/plugins/tablepress/css/build/default.css`,
        },
        {
            id: 'parent-theme',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/themes/genesis-block-theme/style.css`,
        },
        {
            id: 'cisco-chat',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/themes/CXCU/vendors/cisco-chat/styles.css`,
        },
        {
            id: 'child-theme',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/themes/CXCU/style.css`,
        },
        {
            id: 'locator',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/plugins/wp-store-locator/css/styles.min.css`
        },
        {
            id: 'styleguide',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/themes/CXCU/assets/${process.env.styleguideVersion || '0.6.35'}/cxcuatlas.css`
        },        
    ],
    js: [
    ]
}