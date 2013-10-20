'use strict';

requirejs.config({
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'pnotify': {
			deps: ['bootstrap']
		}
	},
	paths: {
		'jquery': [
			'//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
			'vendors/jquery-1.10.2.min'
		],
		'bootstrap': 'vendors/bootstrap.min',
		'socket.io': '/socket.io/socket.io',
		'pnotify': 'vendors/jquery.pnotify'
	}
});
require(
	[
		'jquery',
		'socket.io',
		'pnotify',
		'bootstrap'
	],
	function($, io) {
		(function() {
			var host = location.origin.replace(/^http/, 'ws');
			var socket = io.connect(host);
			socket.on('update', function(data) {
				console.log('update', data);
				var notification = {
					title: data.time,
					text: data.message + ' ' + data.id
				};
				if(data.error) {
					notification.type = 'error';
				}
				else {
					notification.type = 'info';
				}
				$.pnotify(notification);
			});
			console.log('listening to ' + host);
		}());

		$(function() {
			$.pnotify({
				title: 'Regular Notice',
				text: 'I\'m a notice',
				type: 'success'
			});
		});
	}
);