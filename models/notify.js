'use strict';

//socket sending status
var sending = true;

//generate random integer between 1 and n
var random = function(n) {
	return Math.floor(Math.random() * (n + 1));
};

//generate random message
var randomMessage = function() {
	var messages = ['hello world', 'this is', 'a random', 'message'];
	return messages[random(1000) % messages.length];
};

//message loop
var loop = function(socket) {
	setTimeout(function() {
		var message = {
			id: random(1e6),
			time: (new Date).toLocaleTimeString(),
			message: randomMessage(),
			error: random(1e6) % 3 === 0	//fictional error whenever the value divides by 3
		};
		if(sending) {
			socket.emit('notify', message);
		}
		loop(socket);
	}, random(10) * 1000);
};

//set socket listening
exports.listen = function(io) {
	io.sockets.on('connection', function(socket) {
		loop(socket);
	
		socket.on('acknowledged', function(data) {
			console.log(data + ' acknowledged');
		});

		socket.on('flow', function(data) {
			console.log('flow changed to %s', data);
			sending = (data !== 'stop');
		});
	});
	
	return this;
};
