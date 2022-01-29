exports.getAdminContactUspage = function (req, res) {
   require('../models/contactuspageModel').getAdminContactUspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('admin-contactuspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'contactus'
      });
   });
}
exports.getContactUspage = function (req, res) {
   if (req.params.lang == 'ar') {
      req.conf.dir = 'rtl';
      req.conf.lang = 'ar';
   } else {
         req.conf.dir = 'ltr';
         req.conf.lang = 'en';
   }
   require('../models/contactuspageModel').getContactUspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('contactuspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         lang: req.params.lang || 'en',
         t: req.conf.translate,
         pageName: 'contactus'
      });
   });
}