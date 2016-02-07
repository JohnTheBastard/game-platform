'use strict';

module.exports = function startIO(server) {
	const mongoose = require('mongoose');
	const Room = require('./models/multiPlayerRooms');
	const Game = require('./models/multiPlayerGame');
	const io = require('socket.io')(server);
	let multiplayerIO = io.of('/multiplayer');
	let roomIO = io.of('/rooms');

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
				})
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
						var game = new Game();
						game.roomName = room.name;
						game.startingLevel = 0;
						game.moves = [13];
						game.movesCompleted = 0;
						game.currentMove = 1;
						game.playerName = serverSocket.id;
						game.numberOfLevelsToWin = room.numberOfLevelsToWin;
						game.save().then(function(game){ console.log('first',game)});
					} else if(room.secondPlayer === 'player') {
						room.secondPlayer = serverSocket.id;
						var game = new Game();
						game.roomName = room.name;
						game.startingLevel = 0;
						game.moves = [13];
						game.movesCompleted = 0;
						game.currentMove = 1;
						game.playerName = serverSocket.id;
						game.numberOfLevelsToWin = room.numberOfLevelsToWin;
						game.save().then(function(game){ console.log('second',game)});
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
				})
		});

		serverSocket.on('otherUserCanStart', function(data){
			serverSocket.broadcast.to(data).emit('startGame', 'you may now start');
		});

		serverSocket.on('move', function(data) {
			var moveData = data;
			Game.findOne({playerName: serverSocket.id})
				.then(function(game){
					game.moves.push(moveData.keyCode);
					game.currentMove = game.moves.length;
					game.save()
						.then(function(game){
							var gameData = {};
							gameData.movesCompleted = game.movesCompleted;
							gameData.moves = game.moves;
							gameData.currentMove = game.currentMove;
							serverSocket.broadcast.to(moveData.roomName).emit('broad',gameData);
							serverSocket.broadcast.to(serverSocket.id).emit('local',moveData.keyCode);
						});
				})
				.catch(function(error){
					console.log(error);
				})
		});

		serverSocket.on('movesCompleted', function(data){
			Room.findOne( { $or:[ {'firstPlayer':serverSocket.id}, {'secondPlayer':serverSocket.id} ]})
				.then(function(room){
					if(room.firstPlayer === serverSocket.id) {
						Game.findOne({'playerName': room.secondPlayer })
							.then(function(game) {
								game.movesCompleted = data;
								game.save();
							})
					} else if (room.secondPlayer === serverSocket.id) {
						Game.findOne({'playerName': room.firstPlayer })
							.then(function(game) {
								game.movesCompleted = data;
								game.save();
							})
					}
				})
				.catch(function(error){
					console.log(error);
				});
		})

		serverSocket.on('disconnect', function() {
			Room.findOne( { $or:[ {'firstPlayer':serverSocket.id}, {'secondPlayer':serverSocket.id} ]})
				.then(function(room) {
					if(room.usersInRoom === 2) {
						room.usersInRoom--;
						if(room.firstPlayer === serverSocket.id) {
							room.firstPlayer = 'player';
						} else if (room.secondPlayer === serverSocket.id) {
							room.secondPlayer = 'player';
						}
						serverSocket.broadcast.to(room.name).emit('userLeft', 'Sorry it seems you have lost connection with the user. Please Wait');
						room.save();
					} else if (room.usersInRoom < 2) {
						Room.findOneAndRemove({name: room.name})
							.then(function(room){
								console.log('everyone left');
							})
							.catch(function(error){
								console.log(error);
							})
					}
				})
				.catch(function(error){
					console.log(error);
				});

		});

	});
};
