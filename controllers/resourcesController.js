var fs = require("fs");
var path = require("path");
var configsUrl = path.normalize(__dirname + "/../configs");
var config = require("konphyg")(configsUrl);

exports.getAdminResources = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/resources.json")) {
      var fileDate = config("resources");
      delete fileDate._merge;
      

      res.render('partials/admin/resources.ect', {
        conf: req.conf,
        data: fileDate,
      }, function (err, html) {
        if (err) {
            console.error(("Error Rendering ("+req.conf.reqUrl+") => partials/admin/resources.ect::"), err);
            return callback(result);
        } else {
            try {
                result.html = html;
            } catch (exp) {
                console.warn(("Failed Minifying partials/admin/resources.ect::"), exp);
                result.html = html;
            }
            return callback(result);
        }
      });


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getAdminResources exp::", exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }
};

exports.saveData = function(req,res){

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/resources.json")) {
      var fileDate = config("resources");
      delete fileDate._merge;

      fileDate['banner-text-en'] = req.body['banner-text-en']
      fileDate['banner-text-ar'] = req.body['banner-text-ar']
      
      fileDate['our-projects-text-en'] = req.body['our-projects-text-en']
      fileDate['our-projects-text-ar'] = req.body['our-projects-text-ar']
      
      fileDate['footer-text-en'] = req.body['footer-text-en']
      fileDate['footer-text-ar'] = req.body['footer-text-ar']
      
      fileDate['address-en'] = req.body['address-en']
      fileDate['address-ar'] = req.body['address-ar']

      fileDate['mobile'] = req.body['mobile']
      fileDate['email'] = req.body['email']
      fileDate['facebook'] = req.body['facebook']
      fileDate['instagram'] = req.body['instagram']
      fileDate['linkedin'] = req.body['linkedin']
      
      fileDate = JSON.stringify(fileDate);
      fs.writeFileSync(configsUrl + "/resources.json", fileDate);

      return res.status(200).send('ok');
    } else {
      return res.status(500).send('error');
    }
  } catch (exp) {
    console.log(exp);
    return res.status(500).send('error');
  }

}


exports.getResources = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/resources.json")) {
      var fileDate = config("resources");
      delete fileDate._merge;
      

      return callback(fileDate);


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getResources exp::", exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }
};