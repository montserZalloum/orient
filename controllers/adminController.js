var fs = require("fs");
var path = require("path");
var configsUrl = path.normalize(__dirname + "/../configs");
var config = require("konphyg")(configsUrl);
const multer = require('multer');
var nodemailer = require('nodemailer');
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

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'zmontsaer@gmail.com',
//     'pass': 'Az0120188'
//   }
// })

// var mailOptions = {
//   from: 'zmontsaer@gmail.com',
//   to : 'montaser.zalloum@arabiaweather.com',
//   subject: 'Someone sent you an message',
//   text: 'Hello World!'
// }

// transporter.sendMail(mailOptions,function(err,info){
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Email sent: ' + info.response)
//   }
// })