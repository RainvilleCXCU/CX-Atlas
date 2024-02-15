export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
  try {
    if(QSI) {
      QSI.API?.unload();
      QSI.API?.load();
      QSI.API?.run();
    }
  } catch {
    
  }
}

export const getPageUri = uri => {
  return `/${uri.join('/')}/`
}