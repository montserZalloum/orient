
exports.getAdminAboutUspage = function (req, res) {
   require('../models/aboutuspageModel').getAdminAboutUspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('admin-aboutuspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'aboutus'
      });
   });
}

exports.getAboutUspage = function (req, res) {
   if (req.params.lang == 'ar') {
      req.conf.dir = 'rtl';
      req.conf.lang = 'ar';
   } else {
         req.conf.dir = 'ltr';
         req.conf.lang = 'en';
   }
   require('../models/aboutuspageModel').getAboutUspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('aboutuspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         lang: req.params.lang || 'en',
         t: req.conf.translate,
         pageName: 'aboutus'
      });
   });
}