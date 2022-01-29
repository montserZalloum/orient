var async = require('async');

exports.getAdminContactUspageContent = function(req,res,params,callback){
    async.parallel({
        contactUsList: function(cb) {
            require('../controllers/contactusController').getAdminContactUsList(req,res,{},function(result){
                return cb(null, result);
            });
        },
    }, function(err, results) {
        if(err){
            console.error("getAdminContactUspageContent err:",err)
        }
        return callback(err,results);
    });
}
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