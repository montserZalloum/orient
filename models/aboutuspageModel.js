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

exports.getAboutUspageContent = function(req,res,params,callback){
    async.parallel({
        resources: function(cb) {
            require('../controllers/resourcesController').getResources(req,res,{},function(result){
                return cb(null, result);
            });
        },
        footer: function(cb) {
            require('../controllers/resourcesController').getFooter(req,res,{},function(result){
                return cb(null, result);
            });
        },
    }, function(err, results) {
        if(err){
            console.error("getAboutUspageContent err:",err)
        }
        return callback(err,results);
    });
}