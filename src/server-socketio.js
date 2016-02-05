'use strict';

module.exports = function startIO(server) {
	const mongoose = require('mongoose');
	const Room = require('./models/multiPlayerRooms');
	const io = require('socket.io')(server);
	let multiplayerIO = io.of('/multiplayer');
	let roomIO = io.of('/rooms');
	let multiplayerRooms = {};
	mongoose.Promise = Promise;
	function showAllRooms(model,socket) {
		model.find({}).then(function(rooms) {
			socket.emit('rooms', rooms);
			socket.broadcast.emit('rooms',rooms);
		})
		.catch(function (error) {
			socket.emit('roomError', 'Sorry the database is down');
		});
	};

	roomIO.on('connection', function(serverSocket) {
		console.log('user connected to rooms namespace');
		showAllRooms(Room, serverSocket);

		serverSocket.on('newRoom', function(data) {
			var newRoom = new Room(data);
			newRoom.save()
				.then(function(room){
					showAllRooms(Room, serverSocket);
				})
				.catch(function(error) {
					serverSocket.emit('roomError', 'Sorry that room has already been taken.');
				});
		});

		serverSocket.on('userJoined', function(data) {
			Room.findOne({name: data.name})
				.then(function(room,error) {
					room.usersInRoom++;
					return room;
				})
				.then(function(room) {
					if(room.usersInRoom === 2) {
						Room.remove({name: room.name}, function(error) {
							console.log(error);
							showAllRooms(Room, serverSocket);
						});
					} else {
						room.save();
						showAllRooms(Room, serverSocket);
					}
				})
				.catch(function(error) {
					socket.emit('roomError', 'Sorry the database is down');
				})
		});

		serverSocket.on('disconnect', function(){
			console.log('user disconnected from rooms');
		});
	});

	multiplayerIO.on('connection', function(serverSocket) {
		serverSocket.on('joinedRoom', function(data) {
			console.log('someone joined room', data.name);
			serverSocket.join(data.name);
		});
		serverSocket.on('move', function(data){
			serverSocket.broadcast.to(multiplayerRooms[data.roomName].name).emit('broad',data.keyCode);
		});
		serverSocket.on('disconnect', function() {
			console.log('user disconnected from multiplayer');
		});
	});
};
