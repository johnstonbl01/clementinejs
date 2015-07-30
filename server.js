'use strict';

//Initialize Dependencies
var express = require('express'),
	db = require('mongoose'),
	bodyParser = require('body-parser'),
	config = require('./config/index');

var	app = express();

//Database connection
db.connect(config.mongo.uri);

//Initialize Middleware
app.use(bodyParser.json());

//View Engine Configuration
app.set('view engine', 'jade');
app.set('views', './app/views');

//Static directory shortcuts
app.use('/controllers', express.static(__dirname + '/app/controllers'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/directives', express.static(__dirname + '/app/directives'));

//Routes
require('./app/routes/index.js')(app);

//listen
app.listen(config.port, function (req, res) {
	console.log('Listening on port ' + config.port + '...');
});
