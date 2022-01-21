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
   },
   limits: { fileSize: 10 * 1000 * 1000 }
})
const upload = multer({ storage: storage })


exports.getTest = function (req, res, params, callback) {
  var result = {
    json: null,
    html: "",
    delivered: 0,
  };

  try {
    config.clear();
    let student = {
      name: "Mike",
      age: 23,
      gender: "Male",
      department: "English",
      car: "Honda",
    };
    if (fs.existsSync(configsUrl + "/projects.json")) {
      var fileDate = config("projects");
      delete fileDate._merge;
      fileDate[Object.keys({ student })[0]] = student;
      fileDate = JSON.stringify(fileDate);
      console.log(fileDate);
      // fileDate = fileDate + student
      fs.writeFileSync(configsUrl + "/projects.json", fileDate);
    }

    return callback(result);
    // if (requesterErr) {
    //    console.error('getCitiesList requesterErr::'.red, requesterErr);
    //    result.delivered = end.seconds();
    //    return callback(result);
    // } else {
    //    res.render('partials/citiesFilter.ect', {
    //          conf: req.conf,
    //          t: req.conf.translate,
    //          data: requesterResp
    //    }, function (err, html) {
    //          if (err) {
    //             console.error(("Error Rendering (" + req.conf.reqUrl.underline + ") => citiesFilter.ect::").red, err);
    //          } else {
    //             result.html = html;
    //          }
    //          result.json = requesterResp;
    //          result.delivered = end.seconds();
    //          return callback(result);
    //    });
    // }
  } catch (exp) {
    console.error("getCitiesList exp::".red, exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }
};


exports.uploadImage = function(req,res) {
  try {
    upload.single(req.query.id)(req,res,function(uploadErr) {
      if (!uploadErr) {
        res.status(200).send({id:req.query.id,fileName: req.file.filename});
      } else {
        res.status(500).send('error')
      }
   });
  } catch (exp) {
    console.error("uploadImage exp::".red, exp);
    res.status(500).send('error')
  }
};
