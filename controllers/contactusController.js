var fs = require("fs");
var path = require("path");
var configsUrl = path.normalize(__dirname + "/../configs");
var config = require("konphyg")(configsUrl);

exports.getAdminContactUsList = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/contactus.json")) {
      var fileDate = config("contactus");
      delete fileDate._merge;
      
      res.render('partials/admin/contactus.ect', {
        conf: req.conf,
        data: fileDate,
      }, function (err, html) {
        if (err) {
            console.error(("Error Rendering ("+req.conf.reqUrl+") => partials/admin/contactus.ect::"), err);
            return callback(result);
        } else {
            try {
                result.html = html;
            } catch (exp) {
                console.warn(("Failed Minifying partials/admin/contactus.ect::"), exp);
                result.html = html;
            }
            return callback(result);
        }
      });


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getAdminContactUsList exp::", exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }
};


exports.sendMessage = function(req,res){
  
  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/contactus.json")) {
      var fileDate = config("contactus");
      delete fileDate._merge;

      var id = Math.random().toString(36).slice(2);
      var obj = {
          [id] : {
          "name": req.body.name,
          "email": req.body.email,
          "message": req.body.message,
        }
      }
      var formatedData = obj[id]

      fileDate[Object.keys(obj)[0]] = formatedData;
      fileDate = JSON.stringify(fileDate);

      
      fs.writeFileSync(configsUrl + "/contactus.json", fileDate);
      
      return res.status(200).send('ok');
      
    } else {
      return res.status(500).send('error');
    }
  } catch (exp) {
    console.log(exp);
    return res.status(500).send('error');
  }

}