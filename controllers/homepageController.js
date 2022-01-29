
exports.getHomepage = function (req, res) {
   if (req.params.lang == 'ar') {
      req.conf.dir = 'rtl';
      req.conf.lang = 'ar';
   } else {
         req.conf.dir = 'ltr';
         req.conf.lang = 'en';
   }
   if (!req.conf.lang) {
         req.conf.lang = 'en'
   }
   require('../models/homepageModel').getHomepageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('homepage.ect', {
         conf: req.conf,
         modules: mdlResp,
         lang: req.params.lang || 'en',
         t: req.conf.translate,
         pageName: 'home'
      });
   });
}