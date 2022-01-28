exports.getAdminProductspage = function (req, res) {
   require('../models/productspageModel').getAdminProductspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('admin-productspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'products'
      });
   });
}

exports.getProductspage = function (req, res) {
   require('../models/productspageModel').getProductspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('productspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'products'
      });
   });
}

exports.getProductpage = function (req, res) {
   require('../models/productspageModel').getProductpageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('productpage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'product'
      });
   });
}