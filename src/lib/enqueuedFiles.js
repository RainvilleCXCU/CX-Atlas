import Script from 'next/script';

export const addCSSAsset = asset => {
  if (asset.src !== null && asset.src !== undefined) {
    return (<link rel="stylesheet" href={asset.src.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, '')} key={asset.id} id={asset.id} />)
  }
}
export const addJSAsset = asset => {
  if (asset.src !== null && asset.src !== undefined) {
    return (<Script src={asset.src.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, '')} key={asset.id} />);
  }
}