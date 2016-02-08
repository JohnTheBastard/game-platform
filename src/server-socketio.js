'use strict';

module.exports = function startIO(server) {
	const mongoose = require('mongoose');
	const Room = require('./models/multiplayerRooms');
	const Game = require('./models/multiplayerGame');
	const io = require('socket.io')(server);
	let multiplayerIO = io.of('/multiplayer');
	let roomIO = io.of('/rooms');
	let messageIO = io.of('/message');

	mongoose.Promise = Promise;

	function showAllRooms(model,socket) {
		model.find({}).then(function(rooms) {
			socket.emit('rooms', rooms);
			socket.broadcast.emit('rooms',rooms);
		})
		.catch(function (error) {
			socket.emit('roomError', 'Sorry the database is down');
		});
	}

	roomIO.on('connection', function(serverSocket) {
		showAllRooms(Room, serverSocket);
		serverSocket.on('newRoom', function(data) {
			var newRoom = new Room(data);
			newRoom.save()
				.then(function(room){
					showAllRooms(Room, serverSocket);
				})
				.catch(function(error) {
					console.log(error);
					serverSocket.emit('roomError', 'Sorry either that room as been taken or the criteria to create a room was not met.');
				});
		});

		serverSocket.on('userJoined', function(data) {
			Room.findOne({name: data.name})
				.then(function(room) {
					if(room.usersInRoom !== 2) {
						room.usersInRoom++;
					}
					return room;
				})
				.then(function(room) {
						room.save();
						showAllRooms(Room, serverSocket);
				})
				.catch(function(error) {
					socket.emit('roomError', 'Sorry the database is down');
				});
		});

		serverSocket.on('disconnect', function(){
			console.log('user disconnected from rooms');
		});

	});

	multiplayerIO.on('connection', function(serverSocket) {
		let moves = [];
		let currentMove = 0;
		serverSocket.on('joinedRoom', function(data) {
			serverSocket.join(data);
			Room.findOne({name: data})
				.then(function(room) {
					if(room.firstPlayer === 'player') {
						room.firstPlayer = serverSocket.id;
					} else if(room.secondPlayer === 'player') {
						room.secondPlayer = serverSocket.id;
					}
					return room;
				})
				.then(function(room) {
					if(room.usersInRoom === 2) {
						serverSocket.to(room.name).emit('startGame', room.name);
					}
						room.save();
				})
				.catch(function(error) {
					console.log(error);
				});
		});

		serverSocket.on('otherUserCanStart', function(data){
			serverSocket.broadcast.to(data).emit('startGame', 'you may now start');
		});

		serverSocket.on('move', function(data) {
			serverSocket.broadcast.to(data.roomName).emit('broad',data);
		});


		serverSocket.on('disconnect', function() {
			Room.findOne( { $or:[ {'firstPlayer':serverSocket.id}, {'secondPlayer':serverSocket.id} ]})
				.then(function(room) {
						serverSocket.broadcast.to(room.name).emit('userLeft', 'Sorry it seems you have lost connection with the user. Please Wait');
						return room;
					})
				.then(function(room) {
					room.remove().then(function(room) {console.log('room removed')});
				})
				.catch(function(error){
					console.log(error);
				});
			});
		});

	messageIO.on('connection', function(serverSocket) {
		serverSocket.on('joinedMessage', function(data){
			console.log('joining', data)
			serverSocket.join(data);
		});
		serverSocket.on('messageSent', function(data) {
			data.html = '<li class="player2Message listMessage"> Player 2: '+data.value+'</li>';
			serverSocket.broadcast.to(data.roomName).emit('player2Message',data);
		})
	});
};
