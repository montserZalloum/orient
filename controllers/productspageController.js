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
   if (req.params.lang == 'ar') {
      req.conf.dir = 'rtl';
      req.conf.lang = 'ar';
   } else {
         req.conf.dir = 'ltr';
         req.conf.lang = 'en';
   }
   require('../models/productspageModel').getProductspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('productspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         lang: req.params.lang || 'en',
         t: req.conf.translate,
         pageName: 'products'
      });
   });
}

exports.getProductpage = function (req, res) {
   if (req.params.lang == 'ar') {
      req.conf.dir = 'rtl';
      req.conf.lang = 'ar';
   } else {
         req.conf.dir = 'ltr';
         req.conf.lang = 'en';
   }
   require('../models/productspageModel').getProductpageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('productpage.ect', {
         conf: req.conf,
         modules: mdlResp,
         lang: req.params.lang || 'en',
         t: req.conf.translate,
         pageName: 'product'
      });
   });
}