var fs = require("fs");
var path = require("path");
var configsUrl = path.normalize(__dirname + "/../configs");
var config = require("konphyg")(configsUrl);

exports.sendMessage = function(req,res){
  console.log('askdlkalsdklaskldklaskldalskdlk');
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

