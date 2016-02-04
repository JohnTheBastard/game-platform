'use strict';
module.exports = function startIO(server) {

	const io = require('socket.io')(server);

	let peopleID = {};
	let rooms = [];
	let roomName = {};
	let multiplayerIO = io.of('/multiplayer');
	let roomIO = io.of('/rooms');
	
	multiplayerIO.on('connection', function(serverSocket) {
		console.log('someone connected on multiplayer');
		serverSocket.on('move', function(data){
			serverSocket.broadcast.emit('broad',data);
		});
		serverSocket.on('disconnect', function(){
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
			roomName[data.name] = null;
			serverSocket.emit('rooms',rooms);
			serverSocket.broadcast.emit('rooms',rooms);
			}
		});
		
		serverSocket.on('disconnect', function(){
			console.log('user disconnected from rooms');
		});
	});
};
