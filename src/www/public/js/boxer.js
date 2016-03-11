/* * * * * * * * * * * * * *
 * PUSHES ROCKS GAME       *
 * Created by  John Hearn  *
 * CF401       March 2016  *
 * * * * * * * * * * * * * */
 
'use strict';
const pushesRocksConstants = {
    urls: {
        rock:      "../img/boulder.png",
        rockOnDot: "../img/boulderondot.png",
        wall:      "../img/dirt.png",
        floor:     "../img/dirt2.png",
        dot:       "../img/dirtDot.png",
        sprite:    "../img/Sprite.gif"
    },
    cellWidth: 32
};

/* //move local storage to guest controller
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
                console.log("Your attempt to cast " + castToBool + " to a boolean failed." );
            }
        }

        this.isInitialized = castToBool( JSON.parse(localStorage.getItem("Initialized") ) );

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
            this.loadData();
        }
    };
}
*/


class Coord {
    constructor( tileType, tileURL ) {
        this.$div = $( '<div></div>' );
        this.$img = $( '<img></img>' );
        this.tile = tileType;
        this.$img.attr( 'src', tileURL );
        this.$div.append( this.$img );
        this.hasRock = false;
    }
    isADot() {
        if ( this.tile === "dot" ) return true;
        else return false;
    }
}

class Rock {
    constructor( xy ) {
        this.x = xy[0] * pushesRocksConstants.cellWidth;
        this.y = xy[1] * pushesRocksConstants.cellWidth;
        this.onDot = false;
        this.$rockImg = $('<img></img>').attr('src', pushesRocksConstants.urls.rock );
    }
} 

class Sprite {
    constructor( xy ) {
        this.x = xy[0] * pushesRocksConstants.cellWidth;
        this.y = xy[1] * pushesRocksConstants.cellWidth;
        this.$img = $('<img></img>').attr('src', pushesRocksConstants.urls.sprite );
        this.stepCount = 0;
    }

}

class GameBoard {
    constructor(levelData) {
        this.listenToKeystrokes = true;
        this.winCondition = false;
        this.coordinates = [];
        this.rocks = [];
        
        this.$canvasJQ = $('<canvas></canvas>');
        this.canvas = this.$canvasJQ[0];
        this.context = this.canvas.getContext("2d");
        
        this.$elementJQ = $('<section></section>').attr( 'id', "container" );
        this.$elementJQ.addClass('container-class');
        this.element = this.$elementJQ[0];
        this.element.style.position = "absolute";
        
        this.boardData = levelData;
        this.boardDimensionInPixels = this.boardData.dimension * pushesRocksConstants.cellWidth;
        this.canvas.width = this.boardDimensionInPixels;
        this.canvas.height = this.boardDimensionInPixels;
        this.canvas.style.position = "absolute";
        this.canvas.style.left = 0;
        this.canvas.style.top = 0;
        this.canvas.style.zIndex = "10";
        
        this.element.style.left = 0;
        this.element.style.top = 0;
        this.element.style.zIndex = "0";
        
        for ( let ii = 0; ii < this.boardData.dimension; ii++ ) {
            for ( let jj = 0; jj < this.boardData.dimension; jj++ ) {
                this.coordinates.push( [ ] );
                this.coordinates[jj].push( new Coord( "wall", pushesRocksConstants.urls.wall ) );
                this.$elementJQ.append( this.coordinates[jj][ii].$div );
            }
        }
        
        // update floor tiles
        this.boardData.floor.forEach( tile => this.updateCell( tile, "floor", pushesRocksConstants.urls.floor, false ) );

        // update dot tiles
        this.boardData.dots.forEach( tile => this.updateCell( tile, "dot", pushesRocksConstants.urls.dot, false ) );

        // make our rocks
        this.boardData.rocks.forEach( rock => {
            this.rocks.push( new Rock(rock) );
            //TODO: fix model so coords are numbers not strings.
            rock.onDot = this.coordinates[ Number(rock[0]) ][ Number(rock[1]) ].isADot();
            this.coordinates[ Number(rock[0]) ][ Number(rock[1]) ].hasRock = true;
            if( rock.onDot) rock.$rockImg.attr('src', pushesRocksConstants.urls.rockOnDot );
        });

        // make a sprite
        this.sprite = new Sprite( this.boardData.start );
        this.draw();
    }
    
    // Probably no need for this anymore
    clearTheBoard() {
        for ( let ii = 0; ii < this.coordinates.length; ii++ ) {
            //console.log("clearing board");
            delete this.coordinates[ii];
        }
        this.coordinates = [];
        for ( let ii = 0; ii < this.rocks.length; ii++ ) {
            delete this.rocks[ii];
        }
        this.rocks = [];
        delete this.sprite;
        this.$elementJQ.empty();
        this.winCondition = false;
    }
    
    updateCell( xy, tileType, tileURL, rockStatus) {
        xy[0] = Number( xy[0] );  //TODO: this should be fixed in the model
        xy[1] = Number( xy[1] );        
        this.coordinates[ xy[0] ][ xy[1] ].tile = tileType;
        this.coordinates[ xy[0] ][ xy[1] ].$img.attr( 'src', tileURL );
        this.coordinates[ xy[0] ][ xy[1] ].hasRock = rockStatus;
    }
    
    findRock( xy ) {
        for ( let ii = 0; ii < this.rocks.length; ii++ ) {
            if ( xy[0] === this.rocks[ii].x && xy[1] === this.rocks[ii].y ) return ii;
        }
        console.log("Error: rock not found.");
    }
    
    checkWinCondition() {
        let onDotCounter = 0;
        for ( let ii = 0; ii < this.rocks.length; ii++ ) {
            if ( this.rocks[ii].onDot ) onDotCounter++;
        }
        
        if( onDotCounter === this.rocks.length ) return true;
        else return false;
    }
    
    updateRockStatus( rockIndex, oldPosition, newPosition ) {
        this.coordinates[ oldPosition[0] ][ oldPosition[1] ].hasRock = false;
        this.coordinates[ newPosition[0] ][ newPosition[1] ].hasRock = true;
        
        if( this.coordinates[ newPosition[0] ][ newPosition[1] ].isADot() ){
            this.rocks[rockIndex].onDot = true;
            this.rocks[rockIndex].$rockImg.attr('src', pushesRocksConstants.urls.rockOnDot );
        } else {
            this.rocks[rockIndex].onDot = false;
            this.rocks[rockIndex].$rockImg.attr('src', pushesRocksConstants.urls.rock );
        }
        
        this.winCondition = this.checkWinCondition();
    }
    
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height );
        for ( let ii = 0; ii < this.rocks.length; ii++ ) {
            this.context.drawImage( this.rocks[ii].$rockImg[0], this.rocks[ii].x, this.rocks[ii].y );
        }
        this.context.drawImage(this.sprite.$img[0], this.sprite.x, this.sprite.y );
    }
    
    tryToMove( xy, deltaXY ) {
        let x = xy[0];
        let y = xy[1];
        let dx = deltaXY[0];
        let dy = deltaXY[1];
        let nextLocation = this.coordinates[ x + dx ][ y + dy ];
        let twoAway = {};
        
        // Make sure two spaces away is on the board
        if( ( 0 <= x + 2*dx && x + 2*dx < this.boardData.dimension ) &&
            ( 0 <= y + 2*dy && y + 2*dy < this.boardData.dimension ) ) {
            twoAway = this.coordinates[ x + 2*dx ][ y + 2*dy ];
            twoAway.exists = true;
        } else {
            // Two spaces away would be off the board
            twoAway.exists = false;
        }
        
        if( nextLocation.tile === "wall" ) {
            return;
        } else if( nextLocation.hasRock ) {
            if( twoAway.exists && !twoAway.hasRock && twoAway.tile !== "wall" ) {
                // move with rock
                this.sprite.stepCount++;
                this.move(deltaXY, true);
            }
            return;
        } else if( ( nextLocation.tile === "floor" ) ||
                    ( nextLocation.tile === "dot") ) {
            this.sprite.stepCount++;
            this.move(deltaXY, false);
            return;
        } else {
            console.log("error");
        }
    }
    
    move( deltaXY, withRock ) {
        this.listenToKeystrokes = false;
        let x = this.sprite.x;
        let y = this.sprite.y;
        let self = this;
        let draw = this.draw.bind(this);
        let counter = 0;
        let frames = pushesRocksConstants.cellWidth;
        
        if( withRock ) {
            var rockIndex = self.findRock([ x + deltaXY[0]*pushesRocksConstants.cellWidth ,  y + deltaXY[1]*pushesRocksConstants.cellWidth ]);
            var xRock = self.rocks[rockIndex].x;
            var yRock = self.rocks[rockIndex].y;
        }
        
        function drawFrame(fraction) {
            // This looks weird, but we'll be sure that the sprite ends in
            // a valid location when setTimeout calls drawFrame(1)
            self.sprite.x = x + ( pushesRocksConstants.cellWidth * deltaXY[0] * fraction );
            self.sprite.y = y + ( pushesRocksConstants.cellWidth * deltaXY[1] * fraction );
            if( withRock ) {
                self.rocks[rockIndex].x = xRock + ( pushesRocksConstants.cellWidth * deltaXY[0] * fraction );
                self.rocks[rockIndex].y = yRock + ( pushesRocksConstants.cellWidth * deltaXY[1] * fraction );
            }
            requestAnimationFrame(draw);
        }
        
        let interval = setInterval( () => {
            counter++;
            drawFrame(counter/frames);
        }, 256 / pushesRocksConstants.cellWidth );
        
        setTimeout(() => {
            clearInterval(interval);
            drawFrame(1);
            if ( withRock ) {
                self.updateRockStatus( rockIndex, [ xRock/pushesRocksConstants.cellWidth, yRock/pushesRocksConstants.cellWidth ],
                                       [ xRock/pushesRocksConstants.cellWidth + deltaXY[0],  yRock/pushesRocksConstants.cellWidth + deltaXY[1] ] );
            }
            this.listenToKeystrokes = true;
        }, 256);
    }
}

class GameInstance {
    constructor(anchor, level) {
        this.$anchor = anchor;
        this.game = new GameBoard(level);
        this.$anchor.empty();
        this.$anchor.append( this.game.$elementJQ );
        this.$anchor.append( this.game.$canvasJQ );
        $('#game').css( { 'width': this.game.boardDimensionInPixels - 10,
                         'height': this.game.boardDimensionInPixels - 25 } );
        $('#container').css( 'width', this.game.boardDimensionInPixels );
        this.processInputHandler = this.processInput.bind(this);
        this.scaleGameBoardHandler = this.scaleGameBoard.bind(this);    
        this.scaleGameBoard();
        this.eventListeners();
    }
    
    processInput(key) {
        let keyvalue = key.keyCode;
        let xy = [ (this.game.sprite.x / pushesRocksConstants.cellWidth), (this.game.sprite.y / pushesRocksConstants.cellWidth) ];
        
        // Keep key input from scrolling
        key.preventDefault();
        
        if ( this.game.winCondition ) {
            this.onDone({"goo":"gob"});            //TODO: do something useful
            this.game.clearTheBoard();

        } else if ( this.game.listenToKeystrokes ) {
            let deltaXY = false;
            if      ( keyvalue === 37 ) deltaXY = [ -1,  0 ];
            else if ( keyvalue === 38 ) deltaXY = [  0, -1 ];
            else if ( keyvalue === 39 ) deltaXY = [  1,  0 ];
            else if ( keyvalue === 40 ) deltaXY = [  0,  1 ];
            
            if( deltaXY ) {
                this.game.tryToMove( xy, deltaXY );
                this.updateStepCount( this.game.sprite.stepCount );
            }
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
}
