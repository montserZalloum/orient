var async = require('async');

exports.getAdminpageContent = function(req,res,params,callback){
    async.parallel({
        test: function(cb) {
            require('../controllers/adminController').getTest(req,res,{},function(result){
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