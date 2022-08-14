var path = require('path');
var configsUrl = path.normalize(__dirname + '/../configs');
var config = require('konphyg')(configsUrl);
var model = require('../models/errorpageModel.js');
var colors = require('colors');

exports.getUnderConstruction = function(req,res){
    if(req.params.lang == 'ar'){
        req.conf.dir = 'rtl';
        req.conf.lang = 'ar';
    }else if(req.params.lang){
        req.conf.dir = 'ltr';
        req.conf.lang = 'en';
    }
	model.get404PageContent(req,res,function(mdlError,mdlResponse){
		res.render('under-construction.ect', {
			conf: req.conf,
			t: req.conf.translate,
         lang:req.params.lang || 'en',
			pageName: 'errorpage',
			statusCode: '404',
			modules: mdlResponse
		}, function (err, html) {
			if (err) {
				console.error(("Error Rendering () => under-construction.ect::").red,err);
				return res.sendStatus(500);
			} else {
				try {
					return res.status(404).send(html);
				} catch (exp) {
					console.warn(("Failed Minifying under-construction.ect::").yellow, exp);
					return res.status(404).send(html);
				}
			}
		});
	});
}
exports.get404 = function(req,res){
    if(req.params.lang == 'ar'){
        req.conf.dir = 'rtl';
        req.conf.lang = 'ar';
    }else if(req.params.lang){
        req.conf.dir = 'ltr';
        req.conf.lang = 'en';
    }
	model.get404PageContent(req,res,function(mdlError,mdlResponse){
		res.render('errorpage.ect', {
			conf: req.conf,
			t: req.conf.translate,
         lang:req.params.lang || 'en',
			pageName: 'errorpage',
			statusCode: '404',
			modules: mdlResponse
		}, function (err, html) {
			if (err) {
				console.error(("Error Rendering () => errorpage.ect::").red,err);
				return res.sendStatus(500);
			} else {
				try {
					return res.status(404).send(html);
				} catch (exp) {
					console.warn(("Failed Minifying errorpage.ect::").yellow, exp);
					return res.status(404).send(html);
				}
			}
		});
	});
}

exports.get500 = function(req,res){
	
	res.render('errorpage.ect', {
		conf: req.conf,
		t: req.conf.translate,
        lang:req.params.lang || 'en',
		statusCode: '500',
		pageName: 'errorpage',
	}, function (err, html) {
		if (err) {
			console.error(("Error Rendering () => errorpage.ect::").red,err);
			return res.sendStatus(500);
		} else {
			try {
				return res.status(500).send(html);
			} catch (exp) {
				console.warn(("Failed Minifying errorpage.ect::").yellow, exp);
				return res.status(500).send(html);
			}
		}
	});
}