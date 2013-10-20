
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes');
	http = require('http'),
	path = require('path'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

io.sockets.on('connection', function (socket) {
	setInterval(function() {
		var message = {
			id: Math.floor(Math.random() * (1e6+1)),
			time: (new Date).toLocaleTimeString(),
			message: 'hello',
			error: Math.floor(Math.random() * (1e6+1)) % 3 == 0	//fictional error 
		}
		socket.emit('update', message);	
	}
	, (Math.floor(Math.random() * 11)) * 1000);
	
	socket.on('seen', function(data) {
		console.log(data + ' seen');
	});
});

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
