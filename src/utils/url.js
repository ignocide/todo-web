const urlReg = new RegExp('(:.+?((?=\\/)|$))', 'g');

export const urlBuilder = function (url, params = {}) {
  const matches = url.match(urlReg);
  if (matches) {
    for (const match of matches) {
      const key = match.replace(':', '');
      const value = params[key];
      if (value) {
        url = url.replace(match, value);
      }
    }
  }

  return url;
};
