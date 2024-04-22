export const files = {
    css: [
        {
            id: 'font',
            src: `https://cloud.typography.com/6914618/${process.env.CLOUD_FONT || '7711232'}/css/fonts.css`
        },
        {
            id: 'styleguide',
            src: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/themes/CXCU/assets/${process.env.styleguideVersion || '0.6.35'}/cxcuatlas.css`
        }        
    ],
    js: [
    ]
}