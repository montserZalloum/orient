var async = require('async');

exports.getContactUspageContent = function(req,res,params,callback){
    async.parallel({
        resources: function(cb) {
            require('../controllers/resourcesController').getResources(req,res,{},function(result){
                return cb(null, result);
            });
        },
    }, function(err, results) {
        if(err){
            console.error("getContactUspageContent err:",err)
        }
        return callback(err,results);
    });
}