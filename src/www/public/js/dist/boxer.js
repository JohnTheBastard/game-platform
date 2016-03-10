/* * * * * * * * * * * * * *
 * PUSHES ROCKS GAME       *
 * Created by  John Hearn  *
 * CF401       March 2016  *
 * * * * * * * * * * * * * */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mobile = false;
var cellWidth = undefined;
if (mobile) cellWidth = 16;else cellWidth = 32;

var listenToKeystrokes = true;

var rockURL = "../img/boulder.png";
var rockOnDotURL = "../img/boulderondot.png";
var wallURL = "../img/dirt.png";
var floorURL = "../img/dirt2.png";
var dotsURL = "../img/dirtDot.png";
var spriteURL = "../img/Sprite.gif";

/*
const pad = (num, size) => {
	let s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
};


const removeClass = () => {
	$('#hiddenlist').removeClass('hide');
	$('#gameboyIMG').removeClass('hide');
};


// TODO: this doesn't belong to the game and probably doesn't need to exist at all.
const welcomeBack = () => {
	let name = JSON.parse( localStorage.getItem( "Name" ) );
	var welcome = ('<p class="welcome"> Welcome back, ' + name + '. To continue ' +
					'playing from your last game, click the Gameboy or the "Play" tab above. ' +
					'If you would like to start over, please clear your web data. </p>');
	$('.initialParagraphs').remove();
	$('#user').replaceWith(welcome);
};
*/

var Player = function Player() {
	//this.currentLevel = 0;
	//this.levelScores = { easy: [ ], hard: [ ] };
	//this.difficulty = "easy";

	_classCallCheck(this, Player);
};

function User() {
	this.currentLevel = 0;
	this.levelScores = { easy: [], hard: [] };
	this.difficulty = "easy";

	this.saveData = function () {
		// localStorage.setItem("Name", JSON.stringify( this.name ) );
		localStorage.setItem("Level", JSON.stringify(this.currentLevel));
		localStorage.setItem("Scores", JSON.stringify(this.levelScores));
		localStorage.setItem("Difficulty", JSON.stringify(this.difficulty));
		localStorage.setItem("Initialized", JSON.stringify('true'));
	};

	this.loadData = function () {
		this.name = JSON.parse(localStorage.getItem("Name"));
		this.currentLevel = JSON.parse(localStorage.getItem("Level"));
		this.levelScores = JSON.parse(localStorage.getItem("Scores"));
		this.difficulty = JSON.parse(localStorage.getItem("Difficulty"));
	};

	this.init = function () {
		// My attempt to use Boolean() to cast our localStorage string
		// was returning true regardless of the value so I wrote my own.
		function castToBool(stringToCast) {
			if (stringToCast === "true") {
				return true;
			} else if (stringToCast === "false") {
				return false;
			} else {
				console.log("Your attempt to cast " + castToBool + " to a boolean failed.");
			}
		}

		this.isInitialized = castToBool(JSON.parse(localStorage.getItem("Initialized")));

		if (!this.isInitialized) {
			console.log("false = " + this.isInitialized + " I'm not initialized.");
			for (var ii = 0; ii < oldLevelData.easy.length; ii++) {
				this.levelScores.easy[ii] = 0;
			}
			for (var ii = 0; ii < oldLevelData.hard.length; ii++) {
				this.levelScores.hard[ii] = 0;
			}
			this.saveData();
		} else {
			//console.log( "true = " + this.isInitialized + " I'm already initialized.");
			//removeClass();
			this.loadData();
			//welcomeBack();
		}
	};
}

var Coord = function () {
	function Coord(tileType, tileURL) {
		_classCallCheck(this, Coord);

		this.$div = $('<div></div>');
		this.$img = $('<img></img>');
		this.tile = tileType;
		this.$img.attr('src', tileURL);
		this.$div.append(this.$img);
		this.hasRock = false;
	}

	_createClass(Coord, [{
		key: "isADot",
		value: function isADot() {
			if (this.tile === "dot") return true;else return false;
		}
	}]);

	return Coord;
}();

var Rock = function Rock(xy) {
	_classCallCheck(this, Rock);

	this.x = xy[0] * cellWidth;
	this.y = xy[1] * cellWidth;
	this.onDot = false;
	this.$rockImg = $('<img></img>').attr('src', rockURL);
};

var Sprite = function Sprite(xy) {
	_classCallCheck(this, Sprite);

	this.x = xy[0] * cellWidth;
	this.y = xy[1] * cellWidth;
	this.$img = $('<img></img>').attr('src', spriteURL);
	this.stepCount = 0;
};

function GameBoard() {
	this.winCondition = false;
	this.coordinates = [];
	this.rocks = [];

	this.$canvasJQ = $('<canvas></canvas>');
	this.canvas = this.$canvasJQ[0];
	this.context = this.canvas.getContext("2d");

	this.$elementJQ = $('<section></section>').attr('id', "container");
	this.$elementJQ.addClass('container-class');
	this.element = this.$elementJQ[0];
	this.element.style.position = "absolute";

	/* * * * * * * * * * * * * * * *
  * * * * Member Methods  * * * *
  * * * * * * * * * * * * * * * */
	this.clearTheBoard = function () {
		for (var ii = 0; ii < this.coordinates.length; ii++) {
			console.log("clearing board");
			delete this.coordinates[ii];
		}
		this.coordinates = [];
		for (var ii = 0; ii < this.rocks.length; ii++) {
			delete this.rocks[ii];
		}
		this.rocks = [];
		delete this.sprite;
		this.$elementJQ.empty();
		this.winCondition = false;
	};

	// Chrome needs me to access parameter arrays this way.
	this.updateCell = function (xy, tileType, tileURL, rockStatus) {
		xy[0] = Number(xy[0]); //TODO: see if I actually need this
		xy[1] = Number(xy[1]);
		this.coordinates[xy[0]][xy[1]].tile = tileType;
		this.coordinates[xy[0]][xy[1]].$img.attr('src', tileURL);
		this.coordinates[xy[0]][xy[1]].hasRock = rockStatus;
	};

	this.init = function (levelData) {
		this.boardData = levelData;
		this.boardDimensionInPixels = this.boardData.dimension * cellWidth;
		this.canvas.width = this.boardDimensionInPixels;
		this.canvas.height = this.boardDimensionInPixels;
		this.canvas.style.position = "absolute";
		this.canvas.style.left = 0;
		this.canvas.style.top = 0;
		this.canvas.style.zIndex = "10";

		this.element.style.left = 0;
		this.element.style.top = 0;
		this.element.style.zIndex = "0";

		// This is where we will change CSS element width and height

		// Clear any existing data
		this.clearTheBoard();

		for (var ii = 0; ii < this.boardData.dimension; ii++) {
			for (var jj = 0; jj < this.boardData.dimension; jj++) {
				this.coordinates.push([]);
				this.coordinates[jj].push(new Coord("wall", wallURL));
				this.$elementJQ.append(this.coordinates[jj][ii].$div);
			}
		}

		// update floor tiles
		for (var ii = 0; ii < this.boardData.floor.length; ii++) {
			this.updateCell(this.boardData.floor[ii], "floor", floorURL, false);
		}
		// update dot tiles
		for (var ii = 0; ii < this.boardData.dots.length; ii++) {
			this.updateCell(this.boardData.dots[ii], "dot", dotsURL, false);
		}
		// make our rocks
		for (var ii = 0; ii < this.boardData.rocks.length; ii++) {
			this.rocks.push(new Rock(this.boardData.rocks[ii]));
			this.rocks[ii].onDot = this.coordinates[Number(this.boardData.rocks[ii][0])][Number(this.boardData.rocks[ii][1])].isADot();
			this.coordinates[Number(this.boardData.rocks[ii][0])][Number(this.boardData.rocks[ii][1])].hasRock = true;
			if (this.rocks[ii].onDot) this.rocks[ii].$rockImg.attr('src', rockOnDotURL);
		}
		// make a sprite
		this.sprite = new Sprite(this.boardData.start);
		this.draw();
	};

	this.findRock = function (xy) {
		for (var ii = 0; ii < this.rocks.length; ii++) {
			if (xy[0] === this.rocks[ii].x && xy[1] === this.rocks[ii].y) {
				return ii;
			}
		}
		console.log("Error: rock not found.");
	};

	this.checkWinCondition = function () {
		var onDotCounter = 0;
		for (var ii = 0; ii < this.rocks.length; ii++) {
			if (this.rocks[ii].onDot) {
				onDotCounter++;
			}
		}
		if (onDotCounter === this.rocks.length) {
			return true;
		} else {
			return false;
		}
	};

	this.updateRockStatus = function (rockIndex, oldPosition, newPosition) {
		this.coordinates[oldPosition[0]][oldPosition[1]].hasRock = false;
		this.coordinates[newPosition[0]][newPosition[1]].hasRock = true;

		if (this.coordinates[newPosition[0]][newPosition[1]].isADot()) {
			this.rocks[rockIndex].onDot = true;
			this.rocks[rockIndex].$rockImg.attr('src', rockOnDotURL);
		} else {
			this.rocks[rockIndex].onDot = false;
			this.rocks[rockIndex].$rockImg.attr('src', rockURL);
		}

		this.winCondition = this.checkWinCondition();
	};

	// draw our sprite and rocks to the canvas
	this.draw = function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (var ii = 0; ii < this.rocks.length; ii++) {
			this.context.drawImage(this.rocks[ii].$rockImg[0], this.rocks[ii].x, this.rocks[ii].y);
		}
		this.context.drawImage(this.sprite.$img[0], this.sprite.x, this.sprite.y);
	};

	this.move = function (deltaXY, withRock) {
		listenToKeystrokes = false;
		var x = this.sprite.x;
		var y = this.sprite.y;
		var self = this;
		var draw = this.draw.bind(this);
		var counter = 0;
		var frames = cellWidth;

		if (withRock) {

			var rockIndex = self.findRock([x + deltaXY[0] * cellWidth, y + deltaXY[1] * cellWidth]);
			var xRock = self.rocks[rockIndex].x;
			var yRock = self.rocks[rockIndex].y;
		}

		function drawFrame(fraction) {
			// This looks weird, but we'll be sure that the sprite ends in
			// a valid location when setTimeout calls drawFrame(1)
			self.sprite.x = x + cellWidth * deltaXY[0] * fraction;
			self.sprite.y = y + cellWidth * deltaXY[1] * fraction;
			if (withRock) {
				self.rocks[rockIndex].x = xRock + cellWidth * deltaXY[0] * fraction;
				self.rocks[rockIndex].y = yRock + cellWidth * deltaXY[1] * fraction;
			}
			requestAnimationFrame(draw);
		}

		var interval = setInterval(function () {
			counter++;
			drawFrame(counter / frames);
		}, 256 / cellWidth);

		setTimeout(function () {
			clearInterval(interval);
			drawFrame(1);
			if (withRock) {
				self.updateRockStatus(rockIndex, [xRock / cellWidth, yRock / cellWidth], [xRock / cellWidth + deltaXY[0], yRock / cellWidth + deltaXY[1]]);
			}
			self.sprite.stepCount++;
			listenToKeystrokes = true;
		}, 256);
	};

	this.tryToMove = function (xy, deltaXY) {
		var x = xy[0];
		var y = xy[1];
		var dx = deltaXY[0];
		var dy = deltaXY[1];

		var nextLocation = this.coordinates[x + dx][y + dy];
		var twoAway = {};

		// Make sure two spaces away is on the board
		if (0 <= x + 2 * dx && x + 2 * dx < this.boardData.dimension && 0 <= y + 2 * dy && y + 2 * dy < this.boardData.dimension) {
			twoAway = this.coordinates[x + 2 * dx][y + 2 * dy];
			twoAway.exists = true;
		} else {
			// Two spaces away would be off the board
			twoAway.exists = false;
		}

		if (nextLocation.tile === "wall") {
			return;
		} else if (nextLocation.hasRock) {
			if (twoAway.exists && !twoAway.hasRock && twoAway.tile !== "wall") {
				// move with rock
				this.move(deltaXY, true);
			}
			return;
		} else if (nextLocation.tile === "floor" || nextLocation.tile === "dot") {
			this.move(deltaXY, false);
			return;
		} else {
			console.log("error");
		}
	};
}

var GameInstance = function () {
	function GameInstance(anchor, level) {
		_classCallCheck(this, GameInstance);

		this.$anchor = anchor;
		//this.player = new Player( playerData );
		this.user = new User();
		this.game = new GameBoard();
		this.$anchor.empty();
		this.user.init();

		console.log("db/json:", level);
		console.log("js file:", levelData[this.user.difficulty][this.user.currentLevel]);

		//this.game.init( levelData[this.user.difficulty][this.user.currentLevel] );
		this.game.init(level);
		this.$anchor.append(this.game.$elementJQ);
		this.$anchor.append(this.game.$canvasJQ);
		$('#game').css({ 'width': this.game.boardDimensionInPixels - 10,
			'height': this.game.boardDimensionInPixels - 25 });
		$('#container').css('width', this.game.boardDimensionInPixels);
		this.processInputHandler = this.processInput.bind(this);
		this.scaleGameBoardHandler = this.scaleGameBoard.bind(this);
		this.scaleGameBoard();
		this.eventListeners();
	}

	// this (mostly) should be handled by the game-controller

	_createClass(GameInstance, [{
		key: "addCurrentStatus",
		value: function addCurrentStatus() {
			$('#difficulty').empty();
			$('#currentLevel').empty();
			$('#stepCount').empty();
			$('#startTxt').empty(); // does this even exist?
			$('#difficulty').append('Difficulty: ' + this.user.difficulty);
			$('#currentLevel').append('Level: ' + this.user.currentLevel);
			$('#stepCount').append('Steps: ' + this.game.sprite.stepCount); //this probably needs to live in-game
		}
	}, {
		key: "processInput",
		value: function processInput(key) {
			var keyvalue = key.keyCode;
			var xy = [this.game.sprite.x / cellWidth, this.game.sprite.y / cellWidth];

			// Keep key input from scrolling
			key.preventDefault();

			if (this.game.winCondition) {
				this.onDone({ "goo": "gob" }); //TODO: do something useful
				//this.advanceTheUser();
				//this.initializeGameBoard();
			} else if (listenToKeystrokes) {
					var deltaXY = [0, 0];
					if (keyvalue === 37) deltaXY = [-1, 0];else if (keyvalue === 38) deltaXY = [0, -1];else if (keyvalue === 39) deltaXY = [1, 0];else if (keyvalue === 40) deltaXY = [0, 1];

					this.game.tryToMove(xy, deltaXY);
					this.addCurrentStatus();
				}
		}
	}, {
		key: "scaleGameBoard",
		value: function scaleGameBoard() {
			var buffer = ($('header').height() + $('footer').height()) * 2;
			var frameHeight = $(window).height() - buffer;
			var frameWidth = $(window).width();
			var frameSize = Math.min(frameHeight, frameWidth);
			var scale = undefined;

			if (this.game.boardDimensionInPixels < frameSize) {
				scale = 1;
			} else {
				scale = (frameSize / this.game.boardDimensionInPixels).toFixed(2);
				this.$anchor.parent().css('transform', 'scale( ' + scale + ', ' + scale + ')');
			}
		}
	}, {
		key: "eventListeners",
		value: function eventListeners() {
			window.addEventListener("keydown", this.processInputHandler, false);
			window.addEventListener("resize", this.scaleGameBoardHandler, false);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			window.removeEventListener("keydown", this.processInputHandler, false);
			window.removeEventListener("resize", this.scaleGameBoardHandler, false);
		}

		/*  // I don't think I need this when the user is logged in
      advanceTheUser() {
          let winMessage = '<p id ="winner"> Congrats!!!! You beat level ' + (this.user.currentLevel + 1)  +
              ' in ' + this.game.sprite.stepCount + ' steps. Press any key to move on to the next level. </p>';
          $('#gameplay').empty();
          $('#gameplay').append(winMessage);
          
          console.log( "break: advanceTheUser " );
          if ( this.user.levelScores[this.user.difficulty][this.user.currentLevel] > this.game.sprite.stepCount
               && 0 < this.user.levelScores[this.user.difficulty][this.user.currentLevel] ) {
              this.user.levelScores[this.user.difficulty][this.user.currentLevel ] = this.game.sprite.stepCount;
          }
          if( this.user.currentLevel < ( levelData[this.user.difficulty].length - 1 ) ) {
              this.user.levelScores[this.user.difficulty][this.user.currentLevel ] = this.game.sprite.stepCount;
              this.user.currentLevel++;
          } else if( this.user.difficulty === "easy"
          	       && this.user.currentLevel === levelData[this.user.difficulty].length -1) {
              this.user.difficulty = "hard";
              this.user.currentLevel = 0;
          } else if( this.user.difficulty === "hard"
                     && this.user.currentLevel === levelData[this.user.difficulty].length - 1 ) {
              console.log("CONGRATULATIONS: You beat all the levels!" );
          } else {
              console.log("Error: level index out of bounds");
          }
      
          this.user.saveData();
  	};
  */

	}]);

	return GameInstance;
}();
//# sourceMappingURL=boxer.js.map
