'use strict';

var sending = true;

module.exports = function(io) {
	io.sockets.on('connection', function(socket) {	
		loop(socket);
	
		socket.on('seen', function(data) {
			console.log(data + ' seen');
		});

		socket.on('flow', function(data) {
			console.log('flow changed to %s', data);
			sending = !(data == 'stop'); 
		});
	});
	
	return this;
}

var loop = function(socket) {
	setTimeout(function() {
		var message = {
			id: random(1e6),
			time: (new Date).toLocaleTimeString(),
			message: ['hello world', 'this is', 'a random', 'meesage'][random(3)],
			error: random(1e6) % 3 == 0	//fictional error whenever the value divides by 3
		}
		if(sending) {
			socket.emit('update', message);
		}
		loop(socket);
	}
	, random(10) * 1000);
};

var random = function(n) {
	return Math.floor(Math.random() * (n + 1));
};