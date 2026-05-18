const en = require('../locales/en.json');
const zh = require('../locales/zh.json');

const locales = {
    en: en,
    zh: zh
};

module.exports = (req, res, next) => {
    const lang = req.query.lang || req.session.lang || 'en';
    
    req.session.lang = lang;
    
    res.locals.lang = lang;
    res.locals.t = locales[lang] || locales.en;
    
    next();
};
