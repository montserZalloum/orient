var async = require('async');

exports.getHomepageContent = function(req,res,params,callback){
    async.parallel({
        // branchesList: function(cb) {
        //     require('../models/branchesModel').getBranchesList(req,res,{},function(result){
        //         return cb(null, result);
        //     });
        // },
    }, function(err, results) {
        if(err){
            console.error("getHomepageContent err:",err)
        }
        return callback(err,results);
    });
}