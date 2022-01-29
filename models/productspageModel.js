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
            console.error("getAdminProductspageContent err:",err)
        }
        return callback(err,results);
    });
}

exports.getProductspageContent = function(req,res,params,callback){
    async.parallel({
        products: function(cb) {
            require('../controllers/productsController').getProductsList(req,res,{},function(result){
                return cb(null, result);
            });
        },
        resources: function(cb) {
            require('../controllers/resourcesController').getResources(req,res,{},function(result){
                return cb(null, result);
            });
        }
    }, function(err, results) {
        if(err){
            console.error("getProductspageContent err:",err)
        }
        return callback(err,results);
    });
}

exports.getProductpageContent = function(req,res,params,callback){
    async.parallel({
        product: function(cb) {
            require('../controllers/productsController').getProduct(req,res,{},function(result){
                return cb(null, result);
            });
        },
        resources: function(cb) {
            require('../controllers/resourcesController').getResources(req,res,{},function(result){
                return cb(null, result);
            });
        }
    }, function(err, results) {
        if(err){
            console.error("getProductpageContent err:",err)
        }
        return callback(err,results);
    });
}