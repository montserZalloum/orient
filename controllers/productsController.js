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

exports.getProductsList = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/products.json")) {
      var fileDate = config("products");
      delete fileDate._merge;
      
      return callback(fileDate);


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
          "name-en": req.body['name-en'],
          "name-ar": req.body['name-ar'],
          "image": req.body.image,
          "description-en": req.body['description-en'],
          "description-ar": req.body['description-ar'],
          "full-description-en": req.body['full-description-en'],
          "full-description-ar": req.body['full-description-ar'],
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
        "name-en": req.body['name-en'],
        "name-ar": req.body['name-ar'],
        "image": req.body['edit-image'],
        "description-en": req.body['description-en'],
        "description-ar": req.body['description-ar'],
        "full-description-en": req.body['full-description-en'],
        "full-description-ar": req.body['full-description-ar'],
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

exports.getProduct = function (req, res, params, callback) {
  var result = {
    json: null,
    html: ""
  };

  try {
    config.clear();
    if (fs.existsSync(configsUrl + "/products.json")) {
      var fileDate = config("products");
      delete fileDate._merge;
      
      var obj = fileDate[req.params.product]
      res.render('partials/product.ect', {
        conf: req.conf,
        data: obj,
      }, function (err, html) {
        if (err) {
            console.error(("Error Rendering ("+req.conf.reqUrl+") => partials/product.ect::"), err);
            return callback(result);
        } else {
            try {
                result.html = html;
            } catch (exp) {
                console.warn(("Failed Minifying partials/product.ect::"), exp);
                result.html = html;
            }
            return callback(result);
        }
      });


    } else {
      return callback(result);
    }

  } catch (exp) {
    console.error("getProduct exp::", exp);
    return callback(result);
  }
};