var async = require('async');

exports.getAdminAboutUspageContent = function(req,res,params,callback){
    async.parallel({
        adminAboutus: function(cb) {
            require('../controllers/aboutusController').getAdminAboutus(req,res,{},function(result){
                return cb(null, result);
            });
        },
    }, function(err, results) {
        if(err){
            console.error("getAdminpageContent err:",err)
        }
        return callback(err,results);
    });
}