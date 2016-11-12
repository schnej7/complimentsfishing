var express = require('express')
var app = express()

var moment = require('moment');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms

app.set('views', './views')
app.set('view engine', 'jade')

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

require('./app/routes.js')(app); // load our routes and pass in our app

var server = app.listen(3040, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
