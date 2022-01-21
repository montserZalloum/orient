
exports.getAdminProjectspage = function (req, res) {
   require('../models/projectspageModel').getAdminProjectspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('admin-projectspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'projects'
      });
   });
}