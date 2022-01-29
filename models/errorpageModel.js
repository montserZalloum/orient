var async = require('async');
var path = require('path');
var configsUrl = path.normalize(__dirname + '/../configs');
var config = require('konphyg')(configsUrl);
var colors = require('colors');

exports.get404PageContent = function (req, res, callback) {
	async.parallel({
		footer: function(cb) {
            require('../controllers/resourcesController').getFooter(req,res,{},function(result){
                return cb(null, result);
            });
        },
	}, function (err, results) {
		if (err) {
			console.error("get404PageContent err:", err)
		}
		return callback(err, results);
	});
}