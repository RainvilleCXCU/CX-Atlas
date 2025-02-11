import category from './category';
import frontPage from './front-page';
import page from './page';
import single from './single';
import archive from './archive';
import preview from './page-ppp';
import postpreview from './post-ppp';
import location from './location';
import locationspreview from './location-ppp';

const templates = {
  category: category,
  'front-page': frontPage,
  page: page,
  single: single,
  archive: archive,
  home: archive,
  'page-branchppp': locationspreview,
  'page-ppp': preview,
  'page-postppp': postpreview,
  'index': location
};

export default templates;