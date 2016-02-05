'use strict';
module.exports = function startIO(server) {

	const io = require('socket.io')(server);

	let peopleID = {};
	let rooms = [];
	let roomName = {};
	let multiplayerIO = io.of('/multiplayer');
	let roomIO = io.of('/rooms');
	let multiplayerRooms = {};

	multiplayerIO.on('connection', function(serverSocket) {
		serverSocket.on('joinedRoom', function(data) {
			console.log('someone joined room', data.name);
			if (multiplayerRooms[data.name]) {
				serverSocket.join(multiplayerRooms[data.name].name);
			} else {
				multiplayerRooms[data.name] = data;
			}
			serverSocket.join(multiplayerRooms[data.name].name);
			multiplayerRooms[data.name].users++;
		});

		serverSocket.on('move', function(data){
			serverSocket.broadcast.to(multiplayerRooms[data.roomName].name).emit('broad',data.keyCode);
		});
		serverSocket.on('disconnect', function(){
			console.log(serverSocket.adapter.rooms);
			//roomName[data.name] = null;
			console.log('user disconnected from multiplayer');
		});
	});

	roomIO.on('connection', function(serverSocket) {
		console.log('user connected to rooms namespace');
		serverSocket.emit('rooms', rooms);

		serverSocket.on('newRoom', function(data) {
			if(!roomName[data.name]) {
				roomName[data.name] = data;
				rooms.push(data);
				serverSocket.emit('rooms', rooms);
				serverSocket.broadcast.emit('rooms',rooms);
			} else {
				serverSocket.emit('existingRoom');
			}
		});

		serverSocket.on('userJoined', function(data){
			roomName[data.name].users++;
			if(roomName[data.name].users === 2) {
				rooms = rooms.filter(function(object){
				if(object.name !== data.name) {
					return object;
				}
			});

			serverSocket.emit('rooms',rooms);
			serverSocket.broadcast.emit('rooms',rooms);
			}
		});

		serverSocket.on('disconnect', function(){
			console.log('user disconnected from rooms');
		});
	});
};
