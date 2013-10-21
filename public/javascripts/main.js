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
				notify(data);
			});
			console.log('listening to ' + host);
		}());

		var notify = function(data) {
			var notification = {
				title: data.time,
				text: data.message + ' ' + data.id,
				type: (data.error) ? 'error' : 'success'
			};
			$.pnotify(notification);
		};

		$(function() {
			$.pnotify({
				title: 'Welcome to Sockify',
				text: 'A Socket.io + PNotify demo',
				type: 'info'
			});
		});
	}
);