var async = require('async');

exports.getHomepageContent = function(req,res,params,callback){
    async.parallel({
        resources: function(cb) {
            require('../controllers/resourcesController').getResources(req,res,{},function(result){
                return cb(null, result);
            });
        },
    }, function(err, results) {
        if(err){
            console.error("getHomepageContent err:",err)
        }
        return callback(err,results);
    });
}