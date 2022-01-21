var async = require('async');

exports.getAdminProductspageContent = function(req,res,params,callback){
    async.parallel({
        adminProductsList: function(cb) {
            require('../controllers/productsController').getAdminProductsList(req,res,{},function(result){
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