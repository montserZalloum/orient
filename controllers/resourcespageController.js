
exports.getAdminResourcespage = function (req, res) {
   require('../models/resourcespageModel').getAdminResourcespageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('admin-resourcespage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'resources'
      });
   });
}