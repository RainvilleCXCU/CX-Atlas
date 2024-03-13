export const getPageNum = urlObj => {
  const pageIndex = urlObj.indexOf('page');
  return pageIndex !== -1 && urlObj.length >= pageIndex ? parseInt(urlObj[pageIndex + 1]) : 1
}