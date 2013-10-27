'use strict';

requirejs.config({
	paths: {
		'jquery': [
			'//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
			'vendors/jquery-1.10.2.min'
		],
		'socket.io': [
			'/socket.io/socket.io',
			'vendors/socket.io'
		],
		'bootstrap': 'vendors/bootstrap.min',
		'pnotify': 'vendors/jquery.pnotify'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'pnotify': {
			deps: ['bootstrap']
		}
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
		var socket = function() {
			var host = location.origin.replace(/^http/, 'ws');
			var socket = io.connect(host);
			socket.on('update', function(data) {
				console.log('update', data);
				notify(data);
			});
			console.log('listening to ' + host);
			return socket;
		} ();

		var notify = function(data) {
			var notification = {
				title: data.time,
				text: data.id + ': ' + data.message,
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
			$('#btnFlow').on('click', toggleFlow);
			$.pnotify({
				title: 'Welcome to Sockify',
				text: 'A Socket.io + PNotify demo',
				type: 'info'
			});
		});
	}
);