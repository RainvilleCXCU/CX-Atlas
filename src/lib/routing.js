export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
  if(QSI) {
    QSI.API?.unload();
    QSI.API?.load();
    QSI.API?.run();
  }
}

export const getPageUri = uri => {
  return `/${uri.join('/')}/`
}