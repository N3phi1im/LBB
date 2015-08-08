
// Declare Dependencies

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('6fc41969a626d0aa90d7a610f9e55dfb');

// Models for Passport

require('./models/user');
require('./config/passport');

// Connect to the DB

mongoose.connect('mongodb://localhost/BeerApp');

// Routing

var userRoute = require('./routes/userRoute');
var beerRoute = require('./routes/beerRoute');

var app = express();
var port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

app.use('/api/Users', userRoute);
app.use('/api/Beer', beerRoute);

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
