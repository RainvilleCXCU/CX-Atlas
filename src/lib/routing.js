import { createElement } from "react";

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

export const getQueryVariable = (variable, url) => {
  url = url || window.location;
  // if (typeof (url) == "string") {
  //     let temp = createElement('a',{href: url});
  //     url = temp;
  // }
  // console.log(url.search)
  var query = url.split('?')[1];
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0].toLowerCase() == variable.toLowerCase()) { return pair[1]; }
  }
  return (false);
}