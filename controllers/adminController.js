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
  var result = {
    json: null,
    html: "",
    delivered: 0,
  };

  try {


   // var storage = multer.diskStorage({
   //    destination: function (req, file, cb) {
   //       cb(null, 'uploads/')
   //    },
   //    filename: function (req, file, cb) {
   //       console.log(file.mimetype);
   //       cb(null, Date.now() + '.jpg') //Appending .jpg
   //    },
   //    limits: { fileSize: 10 * 1000 * 1000 }
   // })
   console.log(req.body);
   upload.single('file')(req,res,function(uploadErr) {
      console.log('sss');
      res.send('uploaded successfully');
   });
   // app.post('/upload', upload.single('photo'), (req, res) => {
   //    console.log('bbbb');
   //       if(req.file) {
   //          return res.send('uploaded successfully');
   //       }
   //       else throw 'error';
   // });
  } catch (exp) {
    console.error("uploadImage exp::".red, exp);
    //            require('./errorpageController.js').get500(req,res);
    return callback(result);
  }
};
