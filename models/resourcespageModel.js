var async = require('async');

exports.getAdminResourcespageContent = function(req,res,params,callback){
    async.parallel({
        adminResources: function(cb) {
            require('../controllers/resourcesController').getAdminResources(req,res,{},function(result){
                return cb(null, result);
            });
        },
    }, function(err, results) {
        if(err){
            console.error("getAdminResourcespageContent err:",err)
        }
        return callback(err,results);
    });
}