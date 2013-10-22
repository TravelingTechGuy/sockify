
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
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var random = function(n) {
	return Math.floor(Math.random() * (n + 1));
};

io.sockets.on('connection', function (socket) {
	var sending = true;
	(function repeated() {
		setTimeout(function() {
			var message = {
				id: random(1e6),
				time: (new Date).toLocaleTimeString(),
				message: 'hello',
				error: random(1e6) % 3 == 0	//fictional error whenever the value divides by 3
			}
			if(sending) {
				socket.emit('update', message);
			}
			repeated();
		}
		, random(10) * 1000);
	}());
	
	socket.on('seen', function(data) {
		console.log(data + ' seen');
	});

	socket.on('flow', function(data) {
		console.log('flow changed to %s', data);
		sending = !(data == 'stop'); 
	});
});

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
