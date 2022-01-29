var fs = require("fs");
var path = require("path");
var configsUrl = path.normalize(__dirname + "/../configs");
var config = require("konphyg")(configsUrl);
const multer = require('multer');
let storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads')
   },
   filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
   }
})
const upload = multer({ storage: storage })


exports.getAdminAboutus = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/resources.json")) {
      var fileDate = config("resources");
      delete fileDate._merge;
      

      res.render('partials/admin/aboutus.ect', {
        conf: req.conf,
        data: fileDate,
      }, function (err, html) {
        if (err) {
            console.error(("Error Rendering ("+req.conf.reqUrl+") => partials/admin/aboutus.ect::"), err);
            return callback(result);
        } else {
            try {
                result.html = html;
            } catch (exp) {
                console.warn(("Failed Minifying partials/admin/aboutus.ect::"), exp);
                result.html = html;
            }
            return callback(result);
        }
      });


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getAdminAboutus exp::", exp);
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


      fileDate['whoweare-en'] = req.body['whoweare-en']
      fileDate['ourgoals-en'] = req.body['ourgoals-en']
      fileDate['ourmission-en'] = req.body['ourmission-en']

      fileDate['whoweare-ar'] = req.body['whoweare-ar']
      fileDate['ourgoals-ar'] = req.body['ourgoals-ar']
      fileDate['ourmission-ar'] = req.body['ourmission-ar']
      
      fileDate['whoweare-image'] = req.body['whoweare-image']
      fileDate['ourgoals-image'] = req.body['ourgoals-image']
      fileDate['ourmission-image'] = req.body['ourmission-image']
      
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