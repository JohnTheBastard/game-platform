/* * * * * * * * * * * * * * * *
 * BOXER GAME                  *
 * Created by  John Hearn      *
 *             Max Jacobson    *
 *             Doug Popadince  *
 * CF201       Fall 2015       *
 * * * * * * * * * * * * * * * */

const mobile = false;
let cellWidth;
if(mobile) cellWidth = 16;
else       cellWidth = 32;

let listenToKeystrokes = true;

const crateURL = "../img/boulder.png";
const crateOnDotURL = "../img/boulderondot.png";
const wallURL = "../img/dirt.png";
const floorURL = "../img/dirt2.png";
const dotsURL  = "../img/dirtDot.png";
const spriteURL = "../img/Sprite.gif";

const pad = (num, size) => {
	let s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
};

const removeClass = () => {
	$('#hiddenlist').removeClass('hide');
	$('#gameboyIMG').removeClass('hide');
};


const welcomeBack = () => {
	let name = JSON.parse( localStorage.getItem( "Name" ) );
	var welcome = ('<p class="welcome"> Welcome back, ' + name + '. To continue ' +
					'playing from your last game, click the Gameboy or the "Play" tab above. ' +
					'If you would like to start over, please clear your web data. </p>');
	$('.initialParagraphs').remove();
	$('#user').replaceWith(welcome);
};

function User() {
	this.currentLevel = 0;
	this.levelScores = { easy: [ ], hard: [ ] };
	this.difficulty = "easy";

	this.saveData = function() {
		// localStorage.setItem("Name", JSON.stringify( this.name ) );
		localStorage.setItem("Level", JSON.stringify( this.currentLevel ) );
		localStorage.setItem("Scores", JSON.stringify( this.levelScores ) );
		localStorage.setItem("Difficulty", JSON.stringify(this.difficulty ) );
		localStorage.setItem("Initialized", JSON.stringify( 'true' ) );
	};

	this.loadData = function() {
		this.name = JSON.parse( localStorage.getItem( "Name" ) );
		this.currentLevel = JSON.parse( localStorage.getItem( "Level" ) );
		this.levelScores = JSON.parse( localStorage.getItem( "Scores" ) );
		this.difficulty = JSON.parse( localStorage.getItem( "Difficulty" ) );
	};


    this.init = function() {
		// My attempt to use Boolean() to cast our localStorage string
		// was returning true regardless of the value so I wrote my own.
		function castToBool(stringToCast) {
		    if( stringToCast === "true" ) {
				return true;
		    } else if( stringToCast === "false" ) {
				return false;
		    } else {
				console.log("You're attempt to cast " + castToBool + " to a boolean failed." );
		    }
		}

		this.isInitialized = castToBool( JSON.parse(localStorage.getItem("Initialized") ) );
		//console.log(localStorage.getItem("Initialized"));
		//console.log(this.isInitialized);


		if ( !this.isInitialized ) {
		    console.log("false = " + this.isInitialized + " I'm not initialized.");
		    for( let ii=0; ii < oldLevelData.easy.length; ii++ ) {
				this.levelScores.easy[ii] = 0;
		    }
		    for( let ii=0; ii < oldLevelData.hard.length; ii++ ) {
				this.levelScores.hard[ii] = 0;
		    }
		    this.saveData();
		} else {
		    //console.log( "true = " + this.isInitialized + " I'm already initialized.");
		    removeClass();
		    this.loadData();
		    welcomeBack();
		}
    };
}

function Coord(tileType, tileURL) {
    this.$div = $( '<div></div>' );
    this.$img = $( '<img></img>' );
    this.tile = tileType;
    this.$img.attr( 'src', tileURL );
    this.$div.append( this.$img );
    this.hasCrate = false;

    this.isADot = function() {
		if ( this.tile === "dot" ) {
		    return true;
		} else {
		    return false;
		}
    };
}

function Crate( xy ) {
    this.x = xy[0] * cellWidth;
    this.y = xy[1] * cellWidth;
    this.onDot = false;
    this.$crateImg = $('<img></img>').attr('src', crateURL );
}

function Sprite( xy ) {
    this.x = xy[0] * cellWidth;
    this.y = xy[1] * cellWidth;
    this.$img = $('<img></img>').attr('src', spriteURL );
    this.stepCount = 0;
}

function GameBoard() {
    this.winCondition = false;
    this.coordinates = [];
    this.crates = [];

    this.$canvasJQ = $('<canvas></canvas>');
    this.canvas = this.$canvasJQ[0];
    this.context = this.canvas.getContext("2d");

    this.$elementJQ = $('<section></section>').attr( 'id', "container" );
    this.$elementJQ.addClass('container-class');
    this.element = this.$elementJQ[0];
    this.element.style.position = "absolute";

    /* * * * * * * * * * * * * * * *
     * * * * Member Methods  * * * *
     * * * * * * * * * * * * * * * */
    this.clearTheBoard = function() {
		for ( let ii = 0; ii < this.coordinates.length; ii++ ) {
		    console.log("clearing board");
		    delete this.coordinates[ii];
		}
		this.coordinates = [];
		for ( let ii = 0; ii < this.crates.length; ii++ ) {
		    delete this.crates[ii];
		}
		this.crates = [];
		delete this.sprite;
		this.$elementJQ.empty();
		this.winCondition = false;
    };


    // Chrome needs me to access parameter arrays this way.
    this.updateCell = function( xy, tileType, tileURL, crateStatus) {
		this.coordinates[ xy[0] ][ xy[1] ].tile = tileType;
		this.coordinates[ xy[0] ][ xy[1] ].$img.attr( 'src', tileURL );
		this.coordinates[ xy[0] ][ xy[1] ].hasCrate = crateStatus;
    };

    this.init = function( levelData ) {
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

		for ( let ii = 0; ii < this.boardData.dimension; ii++ ) {
		    for ( let jj = 0; jj < this.boardData.dimension; jj++ ) {
			this.coordinates.push( [ ] );
			this.coordinates[jj].push( new Coord( "wall", wallURL ) );
			this.$elementJQ.append( this.coordinates[jj][ii].$div );
		    }
		}

		// update floor tiles
		for ( let ii = 0; ii < this.boardData.floor.length; ii++ ) {
		    this.updateCell(this.boardData.floor[ii], "floor", floorURL, false );
		}
		// update dot tiles
		for ( let ii = 0; ii < this.boardData.dots.length; ii++ ) {
		    this.updateCell(this.boardData.dots[ii], "dot", dotsURL, false );
		}

		// make our crates
		for ( let ii = 0; ii < this.boardData.crate.length; ii++ ) {
		    this.crates.push( new Crate( this.boardData.crate[ii] ) );
		    this.crates[ii].onDot =
			this.coordinates[ this.boardData.crate[ii][0] ][ this.boardData.crate[ii][1] ].isADot();
		    this.coordinates[ this.boardData.crate[ii][0] ][ this.boardData.crate[ii][1] ].hasCrate = true;
		    if ( this.crates[ii].onDot) {
				this.crates[ii].$crateImg.attr('src', crateOnDotURL );
		    }

		}

		// make a sprite
		this.sprite = new Sprite( this.boardData.start );

		this.draw();
    };

    this.findCrate = function( xy ) {
		for ( let ii = 0; ii < this.crates.length; ii++ ) {
		    if ( xy[0] === this.crates[ii].x && xy[1] === this.crates[ii].y ) {
			return ii;
		    }
		}
		console.log("Error: crate not found.");
    };

    this.checkWinCondition = function() {
		var onDotCounter = 0;
		for ( let ii = 0; ii < this.crates.length; ii++ ) {
		    if ( this.crates[ii].onDot ) {
				onDotCounter++;
		    }
		}
		if ( onDotCounter === this.crates.length ) {
		    return true;
		} else {
		    return false;
		}
    };

    this.updateCrateStatus = function(crateIndex, oldPosition, newPosition) {
		this.coordinates[ oldPosition[0] ][ oldPosition[1] ].hasCrate = false;
		this.coordinates[ newPosition[0] ][ newPosition[1] ].hasCrate = true;

		if ( this.coordinates[ newPosition[0] ][ newPosition[1] ].isADot() ){
			this.crates[crateIndex].onDot = true;
			this.crates[crateIndex].$crateImg.attr('src', crateOnDotURL );
		} else {
			this.crates[crateIndex].onDot = false;
			this.crates[crateIndex].$crateImg.attr('src', crateURL );
		}

		this.winCondition = this.checkWinCondition();
    };

    // draw our sprite and crates to the canvas
    this.draw = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height );
		for ( let ii = 0; ii < this.crates.length; ii++ ) {
			this.context.drawImage( this.crates[ii].$crateImg[0], this.crates[ii].x, this.crates[ii].y );
		}
		this.context.drawImage(this.sprite.$img[0], this.sprite.x, this.sprite.y );
    };

    this.move = function(deltaXY, withCrate) {
		listenToKeystrokes = false;
		var x = this.sprite.x;
		var y = this.sprite.y;
		var self = this;
		var draw = this.draw.bind(this);
		var counter = 0;
		var frames = cellWidth;

		if ( withCrate ) {

		    var crateIndex = self.findCrate([ x + deltaXY[0]*cellWidth ,  y + deltaXY[1]*cellWidth ]);
		    var xCrate = self.crates[crateIndex].x;
		    var yCrate = self.crates[crateIndex].y;
		}

		function drawFrame(fraction) {
		    // This looks weird, but we'll be sure that the sprite ends in
		    // a valid location when setTimeout calls drawFrame(1)
		    self.sprite.x = x + ( cellWidth * deltaXY[0] * fraction );
		    self.sprite.y = y + ( cellWidth * deltaXY[1] * fraction );
		    if ( withCrate ) {
			self.crates[crateIndex].x = xCrate + ( cellWidth * deltaXY[0] * fraction );
			self.crates[crateIndex].y = yCrate + ( cellWidth * deltaXY[1] * fraction );
		    }
		    requestAnimationFrame(draw);
		}

		var interval = setInterval(function(){
			counter++;
			drawFrame(counter/frames);
		}, 256 / cellWidth );

		setTimeout(function(){
			clearInterval(interval);
			drawFrame(1);
		    if ( withCrate ) {
				self.updateCrateStatus(crateIndex, [xCrate/cellWidth, yCrate/cellWidth ],
					[ xCrate/cellWidth + deltaXY[0],  yCrate/cellWidth + deltaXY[1] ] );
			}
			self.sprite.stepCount++;
			listenToKeystrokes = true;
		}, 256);
    };

    this.tryToMove = function( xy, deltaXY ) {
		var x = xy[0];
		var y = xy[1];
		var dx = deltaXY[0];
		var dy = deltaXY[1];

		var nextLocation = this.coordinates[ x + dx ][ y + dy ];
		var twoAway;

		// Make sure two spaces away is on the board
		if ( ( 0 <= x + 2*dx && x + 2*dx < this.boardData.dimension ) &&
			 ( 0 <= y + 2*dy && y + 2*dy < this.boardData.dimension ) ) {
			twoAway = this.coordinates[ x + 2*dx ][ y + 2*dy ];
			twoAway.exists = true;
		} else {
			// Two spaces away would be off the board
			twoAway = {};
			twoAway.exists = false;
		}

		if ( nextLocation.tile === "wall" ) {
			return;
		} else if ( nextLocation.hasCrate ) {
			if ( twoAway.exists && !twoAway.hasCrate && twoAway.tile !== "wall" ) {
				// move with crate
				this.move(deltaXY, true);
		    }
		    return;
		} else if ( ( nextLocation.tile === "floor" ) ||
					( nextLocation.tile === "dot") ) {
			this.move(deltaXY, false);
			return;
		} else {
			console.log("error");
		}
    };
}

class GameInstance {
    constructor(anchor, level) {
        this.$anchor = anchor;
        this.user = new User();
        this.game = new GameBoard();
        this.$anchor.empty();
        this.user.init();
        this.game.init( levelData[this.user.difficulty][this.user.currentLevel] );
        this.$anchor.append( this.game.$elementJQ );
        this.$anchor.append( this.game.$canvasJQ );
        $('#game').css( { 'width': this.game.boardDimensionInPixels - 10,
                         'height': this.game.boardDimensionInPixels - 25 } );
        $('#container').css( 'width', this.game.boardDimensionInPixels );
        this.processInputHandler = this.processInput.bind(this);
        this.scaleGameBoardHandler = this.scaleGameBoard.bind(this);    
        this.scaleGameBoard();
        this.eventListeners();
        console.log("this:", this);
    }
        
    addCurrentStatus() {
        $('#difficulty').empty();
        $('#currentLevel').empty();
        $('#stepCount').empty();
        $('#startTxt').empty();
        $('#difficulty').append('Difficulty: ' + this.user.difficulty)
        $('#currentLevel').append('Level: ' + this.user.currentLevel)
        $('#stepCount').append('Steps: ' + this.game.sprite.stepCount)
	}
	
	processInput(key) {
		let keyvalue = key.keyCode;
		 console.log("this, in processInput():", this);
		let xy = [ (this.game.sprite.x / cellWidth), (this.game.sprite.y / cellWidth) ];
		let deltaXY;

		// Keep key input from scrolling
		key.preventDefault();

		if ( this.game.winCondition ) {
			this.onDone({"goo":"gob"});            //TODO: do something useful
			//this.advanceTheUser();
			//this.initializeGameBoard();
		} else if ( listenToKeystrokes ) {
			if (keyvalue === 37) {
				console.log("left");
				deltaXY = [ -1, 0 ];
				this.game.tryToMove( xy, deltaXY );
		    } else if (keyvalue === 38) {
				console.log("up");
				deltaXY = [ 0, -1 ];
				this.game.tryToMove( xy, deltaXY );
		    } else if (keyvalue === 39) {
				console.log("right");
				deltaXY = [ 1, 0 ];
				this.game.tryToMove( xy, deltaXY );
		    } else if (keyvalue === 40) {
				console.log("down");
				deltaXY = [ 0, 1 ];
				this.game.tryToMove( xy, deltaXY );
		    }
		    
		    if (keyvalue === 13) {
				this.game.draw();
		    } else if (keyvalue === 32) {
				$('#gameplay').empty();
		    }
		    this.addCurrentStatus();
		}
	}
	
	scaleGameBoard() {
		const buffer = ( $('header').height() + $('footer').height() ) * 2;
		const frameHeight = $(window).height() - buffer;
		const frameWidth = $(window).width();
		const frameSize = Math.min( frameHeight, frameWidth );
		let scale;

		if ( this.game.boardDimensionInPixels < frameSize ) {
			scale =  1;
		} else {
			scale = ( frameSize / this.game.boardDimensionInPixels ).toFixed(2);
			this.$anchor.parent().css( 'transform', 'scale( ' + scale + ', ' + scale + ')');
		}
	}
	
	eventListeners() {
		window.addEventListener("keydown", this.processInputHandler, false);
		window.addEventListener("resize",  this.scaleGameBoardHandler, false );
	}
    
    destroy() {
        window.removeEventListener("keydown", this.processInputHandler, false);
		window.removeEventListener("resize",  this.scaleGameBoardHandler, false );
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
    
}


function createBoxxer(anchor) {
	var my = {};
	my.$anchor = anchor;
	my.user = new User();
	my.game = new GameBoard( );

	my.initializeGameBoard = function() {
		my.$anchor.empty();
		my.user.init();
		my.game.init( levelData[my.user.difficulty][my.user.currentLevel] );
		my.$anchor.append( my.game.$elementJQ );
		my.$anchor.append( my.game.$canvasJQ );
		$('#game').css( { 'width': my.game.boardDimensionInPixels - 10,
				  'height': my.game.boardDimensionInPixels - 25 } );
		$('#container').css( 'width', my.game.boardDimensionInPixels );
	};

    //calling this without windowOnload fixed render onload error.
    my.initializeGameBoard();

	my.advanceTheUser = function () {
        let winMessage = '<p id ="winner"> Congrats!!!! You beat level ' + (my.user.currentLevel + 1)  +
            ' in ' + my.game.sprite.stepCount + ' steps. Press any key to move on to the next level. </p>';
        $('#gameplay').empty();
        $('#gameplay').append(winMessage);
        
        console.log( "break: advanceTheUser " );
        if ( my.user.levelScores[my.user.difficulty][my.user.currentLevel] > my.game.sprite.stepCount
             && 0 < my.user.levelScores[my.user.difficulty][my.user.currentLevel] ) {
            my.user.levelScores[my.user.difficulty][my.user.currentLevel ] = my.game.sprite.stepCount;
        }
        if( my.user.currentLevel < ( levelData[my.user.difficulty].length - 1 ) ) {
            my.user.levelScores[my.user.difficulty][my.user.currentLevel ] = my.game.sprite.stepCount;
            my.user.currentLevel++;
        } else if( my.user.difficulty === "easy"
        	       && my.user.currentLevel === levelData[my.user.difficulty].length -1) {
            my.user.difficulty = "hard";
            my.user.currentLevel = 0;
        } else if( my.user.difficulty === "hard"
                   && my.user.currentLevel === levelData[my.user.difficulty].length - 1 ) {
            console.log("CONGRATULATIONS: You beat all the levels!" );
        } else {
            console.log("Error: level index out of bounds");
        }
    
        my.user.saveData();
	};

	function addCurrentStatus() {
        $('#difficulty').empty();
        $('#currentLevel').empty();
        $('#stepCount').empty();
        $('#startTxt').empty();
        $('#difficulty').append('Difficulty: ' + my.user.difficulty)
        $('#currentLevel').append('Level: ' + my.user.currentLevel)
        $('#stepCount').append('Steps: ' + my.game.sprite.stepCount)
	}

	my.processInput = function(key) {
		let keyvalue = key.keyCode;
		let xy = [ (my.game.sprite.x / cellWidth), (my.game.sprite.y / cellWidth) ];
		let deltaXY;

		// Keep key input from scrolling
		key.preventDefault();

		if ( my.game.winCondition ) {
			my.onDone({"goo":"gob"});            //TODO: return something useful
			my.advanceTheUser();
			my.initializeGameBoard();
		} else if ( listenToKeystrokes ) {
			if (keyvalue === 37) {
				console.log("left");
				deltaXY = [ -1, 0 ];
				my.game.tryToMove( xy, deltaXY );
		    } else if (keyvalue === 38) {
				console.log("up");
				deltaXY = [ 0, -1 ];
				my.game.tryToMove( xy, deltaXY );
		    } else if (keyvalue === 39) {
				console.log("right");
				deltaXY = [ 1, 0 ];
				my.game.tryToMove( xy, deltaXY );
		    } else if (keyvalue === 40) {
				console.log("down");
				deltaXY = [ 0, 1 ];
				my.game.tryToMove( xy, deltaXY );
		    }

		    if (keyvalue === 13) {
				my.game.draw();
		    } else if (keyvalue === 32) {
				$('#gameplay').empty();
		    }
		    addCurrentStatus();
		}

	};

	my.scaleGameBoard = function() {
		var buffer = ( $('header').height() + $('footer').height() ) * 2;
		var frameHeight = $(window).height() - buffer;
		var frameWidth = $(window).width();
		var frameSize = Math.min( frameHeight, frameWidth );
		var scale;

		if ( my.game.boardDimensionInPixels < frameSize ) {
			scale =  1;
		} else {
			scale = ( frameSize / my.game.boardDimensionInPixels ).toFixed(2);
			my.$anchor.parent().css( 'transform', 'scale( ' + scale + ', ' + scale + ')');
		}
	};

	my.scaleGameBoard();

	my.eventListeners= function() {
		window.addEventListener("keydown", my.processInput, false);
		window.addEventListener("resize",  my.scaleGameBoard, false );
	};
	my.eventListeners();

	return my;
}
