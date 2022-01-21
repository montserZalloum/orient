
exports.getAdminProductspage = function (req, res) {
   require('../models/productspageModel').getAdminProductspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('admin-productspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'products'
      });
   });
}