
exports.getAdminpage = function (req, res) {
   require('../models/adminpageModel').getAdminpageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('adminpage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'admin'
      });
   });
}