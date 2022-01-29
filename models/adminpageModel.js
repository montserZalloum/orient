var async = require('async');

exports.getAdminpageContent = function(req,res,params,callback){
    async.parallel({
        
    }, function(err, results) {
        if(err){
            console.error("getAdminpageContent err:",err)
        }
        return callback(err,results);
    });
}