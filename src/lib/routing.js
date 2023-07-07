export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
  QSI?.API?.load();
  QSI?.API?.run();
}