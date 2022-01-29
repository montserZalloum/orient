var fs = require("fs");
var path = require("path");
var configsUrl = path.normalize(__dirname + "/../configs");
var config = require("konphyg")(configsUrl);


exports.getAdminProjectsList = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/projects.json")) {
      var fileDate = config("projects");
      delete fileDate._merge;
      
      res.render('partials/admin/projects.ect', {
        conf: req.conf,
        data: fileDate,
      }, function (err, html) {
        if (err) {
            console.error(("Error Rendering ("+req.conf.reqUrl+") => partials/admin/projects.ect::"), err);
            return callback(result);
        } else {
            try {
                result.html = html;
            } catch (exp) {
                console.warn(("Failed Minifying partials/admin/projects.ect::"), exp);
                result.html = html;
            }
            return callback(result);
        }
      });


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getAdminProjectsList exp::", exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }
};

exports.getProjectsList = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/projects.json")) {
      var fileDate = config("projects");
      delete fileDate._merge;
      
      return callback(fileDate);


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getProjectsList exp::", exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }

};

exports.saveData = function(req,res){

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/projects.json")) {
      var fileDate = config("projects");
      delete fileDate._merge;

      var id = req.body.id;
      var obj = {
          [id] : {
          "name-en": req.body['name-en'],
          "name-ar": req.body['name-ar'],
          "image": req.body.image,
          "location-en": req.body['location-en'],
          "location-ar": req.body['location-ar'],
          "exportable": req.body.exportable
        }
      }
      var formatedData = obj[id]

      fileDate[Object.keys(obj)[0]] = formatedData;
      fileDate = JSON.stringify(fileDate);

      fs.writeFileSync(configsUrl + "/projects.json", fileDate);
      

      return res.status(200).send('ok');
    } else {
      return res.status(500).send('error');
    }
  } catch (exp) {
    console.log(exp);
    return res.status(500).send('error');
  }

}



exports.editData = function(req,res){

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/projects.json")) {
      var fileDate = config("projects");
      delete fileDate._merge;

      var id = req.body.id;
      
      fileDate[id] = {
        "name-en": req.body['name-en'],
        "name-ar": req.body['name-ar'],
        "image": req.body['edit-image'],
        "location-en": req.body['location-en'],
        "location-ar": req.body['location-ar'],
        "exportable": req.body.exportable
      }
      
      fileDate = JSON.stringify(fileDate);

      fs.writeFileSync(configsUrl + "/projects.json", fileDate);
      

      return res.status(200).send('ok');
    } else {
      return res.status(500).send('error');
    }
  } catch (exp) {
    console.log(exp);
    return res.status(500).send('error');
  }

}


exports.removeProject = function(req,res){

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/projects.json")) {
      var fileDate = config("projects");
      delete fileDate._merge;
      delete fileDate[req.body.id];
      fileDate = JSON.stringify(fileDate);

      fs.writeFileSync(configsUrl + "/projects.json", fileDate);
      

      return res.status(200).send('ok');
    } else {
      return res.status(500).send('error');
    }
  } catch (exp) {
    console.log(exp);
    return res.status(500).send('error');
  }

}