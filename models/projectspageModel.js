var async = require('async');

exports.getAdminProjectspageContent = function(req,res,params,callback){
    async.parallel({
        adminProjectsList: function(cb) {
            require('../controllers/projectsController').getAdminProjectsList(req,res,{},function(result){
                return cb(null, result);
            });
        },
    }, function(err, results) {
        if(err){
            console.error("getAdminProjectspageContent err:",err)
        }
        return callback(err,results);
    });
}

exports.getProjectspageContent = function(req,res,params,callback){
    async.parallel({
        projects: function(cb) {
            require('../controllers/projectsController').getProjectsList(req,res,{},function(result){
                return cb(null, result);
            });
        },
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
            console.error("getProjectspageContent err:",err)
        }
        return callback(err,results);
    });
}