// require
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var ad = require('./controllers/ad');
var JSAlert = require("js-alert");

var landlordLogin = require('./controllers/landlordLogin');
var landlord = require('./controllers/landlord');
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var ctenant = require('./controllers/cTenant');
var cAdmin = require('./controllers/cAdmin');
var port = process.env.PORT || 800;
// configure
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));
app.use(expressValidator());
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// routes


app.get('/', function(req, res){
	res.redirect('/barivara.com');
});


app.use(landlordLogin);
app.use(landlord);
app.use(signup);
app.use(login);
app.use(ctenant);
app.use(ad);
app.use(cAdmin);

// server
app.listen(port, function(){
	console.log('Server started at ' + port + ' port....');
});