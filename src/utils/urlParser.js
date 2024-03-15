export const getPageNum = urlObj => {
  const pageIndex = urlObj.indexOf('page');
  return pageIndex !== -1 && urlObj.length >= pageIndex ? parseInt(urlObj[pageIndex + 1]) : 1
}

export const getLinkLibraryCatId = urlObj => {
  const pageIndex = urlObj.indexOf('media-library');
  return pageIndex !== -1 && urlObj.length >= pageIndex ? parseInt(urlObj[pageIndex + 1]) : 1
}

export const getDynamicQueryVal = ({urlObj, key}) => {
  const index = urlObj.indexOf(key);
  return index !== -1 && urlObj.length >= index ? urlObj[index+1] : '';
}