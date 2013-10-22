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
		var socket;
		(function() {
			var host = location.origin.replace(/^http/, 'ws');
			socket = io.connect(host);
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

		var toggleFlow = function() {
			if($(this).hasClass('btn-danger')) {
				$(this).removeClass('btn-danger').addClass('btn-success').text('Start Flow');
				socket.emit('flow', 'stop');
			}
			else {
				$(this).removeClass('btn-success').addClass('btn-danger').text('Stop Flow');
				socket.emit('flow', 'start');
			}
		};

		$(function() {
			$.pnotify({
				title: 'Welcome to Sockify',
				text: 'A Socket.io + PNotify demo',
				type: 'info'
			});

			$('#btnFlow').on('click', toggleFlow);
		});
	}
);