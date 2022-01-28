
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
   require('../models/aboutuspageModel').getAboutUspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('aboutuspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'aboutus'
      });
   });
}