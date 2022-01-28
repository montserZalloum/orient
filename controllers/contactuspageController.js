exports.getContactUspage = function (req, res) {
   require('../models/contactuspageModel').getContactUspageContent(req, res, {}, function (mdlErr, mdlResp) {
      return res.render('contactuspage.ect', {
         conf: req.conf,
         modules: mdlResp,
         pageName: 'contactus'
      });
   });
}