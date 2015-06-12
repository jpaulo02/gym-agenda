var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// Define routes
//require('./app/routes/devRoute')(app);



// App port for Dev
app.listen(8080, function(){
	console.log('Magic happens on 8080');
});

exports = module.exports = app;