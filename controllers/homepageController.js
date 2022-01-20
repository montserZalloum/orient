
exports.getHomepage = function (req, res) {
   require('../models/homepageModel').getHomepageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('homepage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'home'
      });
   });
}