
  const addCSSAsset = asset => {
    if (asset.src !== null && asset.src !== undefined) {
      return (<link rel="stylesheet" href={(asset.src.includes('http') ? '' : process.env.NEXT_PUBLIC_WORDPRESS_URL) + asset.src} key={asset.id} id={asset.id} />)
    }
  }
  const addJSAsset = asset => {
    if (asset.src !== null && asset.src !== undefined) {
      return (<script type="text/javascript" src={(asset.src.includes('http') ? '' : process.env.NEXT_PUBLIC_WORDPRESS_URL) + asset.src} key={asset.id}></script>)
    }
  }

  module.exports = {
    addCSSAsset,
    addJSAsset
  }