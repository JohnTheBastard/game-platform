/* * * * * * * * * * * * * *
 * PUSHES ROCKS GAME       *
 * Created by  John Hearn  *
 * CF401       March 2016  *
 * * * * * * * * * * * * * */
 
import $ from 'jquery';
import pushesRocksConstants from './pushesRocksConstants';
import GameBoard from './gameBoard';

export default class GameInstance {
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
        let xy = [ (this.game.sprite.x / pushesRocksConstants.cellWidth), 
                   (this.game.sprite.y / pushesRocksConstants.cellWidth) ];
        
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