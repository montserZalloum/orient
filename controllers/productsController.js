var fs = require("fs");
var path = require("path");
var configsUrl = path.normalize(__dirname + "/../configs");
var config = require("konphyg")(configsUrl);


exports.getAdminProductsList = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/products.json")) {
      var fileDate = config("products");
      delete fileDate._merge;
      
      console.log(fileDate);
      res.render('partials/admin/products.ect', {
        conf: req.conf,
        data: fileDate,
      }, function (err, html) {
        if (err) {
            console.error(("Error Rendering ("+req.conf.reqUrl+") => partials/admin/products.ect::"), err);
            return callback(result);
        } else {
            try {
                result.html = html;
            } catch (exp) {
                console.warn(("Failed Minifying partials/admin/products.ect::"), exp);
                result.html = html;
            }
            return callback(result);
        }
      });


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getAdminProductsList exp::", exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }
};

exports.saveData = function(req,res){

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/products.json")) {
      var fileDate = config("products");
      delete fileDate._merge;

      var id = req.body.id;
      var obj = {
          [id] : {
          "name": req.body.name,
          "name-ar": req.body['name-ar'],
          "image": req.body.image,
          "description": req.body['description'],
          "description-ar": req.body['description-ar'],
          "exportable": req.body.exportable
        }
      }
      var formatedData = obj[id]
      

      fileDate[Object.keys(obj)[0]] = formatedData;
      fileDate = JSON.stringify(fileDate);

      fs.writeFileSync(configsUrl + "/products.json", fileDate);
      

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
    if (fs.existsSync(configsUrl + "/products.json")) {
      var fileDate = config("products");
      delete fileDate._merge;

      var id = req.body.id;
      
      fileDate[id] = {
        "name": req.body.name,
        "name-ar": req.body['name-ar'],
        "image": req.body['edit-image'],
        "description": req.body.description,
        "description-ar": req.body['description-ar'],
        "exportable": req.body.exportable
      }

      fileDate = JSON.stringify(fileDate);

      fs.writeFileSync(configsUrl + "/products.json", fileDate);
      

      return res.status(200).send('ok');
    } else {
      return res.status(500).send('error');
    }
  } catch (exp) {
    console.log(exp);
    return res.status(500).send('error');
  }

}


exports.removeProduct = function(req,res){

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/products.json")) {
      var fileDate = config("products");
      delete fileDate._merge;
      console.log(req.body);
      delete fileDate[req.body.id];
      fileDate = JSON.stringify(fileDate);

      fs.writeFileSync(configsUrl + "/products.json", fileDate);
      

      return res.status(200).send('ok');
    } else {
      return res.status(500).send('error');
    }
  } catch (exp) {
    console.log(exp);
    return res.status(500).send('error');
  }

}