var express = require('express');
var path = require('path');
var configsUrl = path.normalize(__dirname + '/configs');
var config = require('konphyg')(configsUrl);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var program = require('commander');
var app = express();

program
	.version('0.1.0')
	.option('-p, --port [number]', 'Port to run server on')
    .option('-l, --logger')
    .option('-r, --debug-requests')
    .option('-c, --no-cache', 'Remove Cache')
	.parse(process.argv);

if (!program.port) {
	console.log("Please provide a port number");
	process.exit(1);
}

//ect
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);
//serve static assets
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));

app.listen(program.port);
console.log('Listening on port '+program.port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

if(program.logger){
    app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    req.conf = {};
    req.conf.strings = config('strings');
    req.conf.translate = function (str, lang) {
        if (!lang) {
            //                console.log('!lang');
            lang = req.conf.lang;
        }
        lang = lang.toLowerCase();
        return req.conf.strings[str] && req.conf.strings[str][lang] ? req.conf.strings[str][lang].trim() : str;
    };
    req.conf.assetsVersion = '?v=' + config('services').assetsVersion || '';
    req.conf.assets = process.env.ASSETS || '/assets';
    next();
});

app.use('/', require('./routes/routes.js'));

module.exports = app;
