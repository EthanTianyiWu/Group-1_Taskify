const en = require('../locales/en.json');
const zh = require('../locales/zh.json');

const locales = {
    en: en,
    zh: zh
};

module.exports = (req, res, next) => {
    let lang = 'en';
    if (req.query.lang) {
        lang = req.query.lang;
    } else if (req.session && req.session.lang) {
        lang = req.session.lang;
    }
    
    if (req.session) {
        req.session.lang = lang;
    }
    
    res.locals.lang = lang;
    res.locals.t = locales[lang] || locales.en;
    
    next();
};
