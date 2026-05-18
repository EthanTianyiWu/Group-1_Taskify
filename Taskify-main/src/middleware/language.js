const path = require('path');

const loadLocale = (lang) => {
  try {
    return require(path.join(__dirname, '../locales', `${lang}.json`));
  } catch (error) {
    return require(path.join(__dirname, '../locales', 'en.json'));
  }
};

const languageMiddleware = (req, res, next) => {
  let lang = req.query.lang || req.cookies?.lang || 'en';
  
  if (!['en', 'zh'].includes(lang)) {
    lang = 'en';
  }

  res.cookie('lang', lang, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.locals.lang = lang;
  res.locals.t = loadLocale(lang);
  
  next();
};

module.exports = languageMiddleware;
