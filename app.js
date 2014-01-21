
/**
 * Module dependencies.
 */
'use strict';

var routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var notify = require('./models/notify')(io);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
