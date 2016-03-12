/* * * * * * * * * * * * * *
 * PUSHES ROCKS GAME       *
 * Created by  John Hearn  *
 * CF401       March 2016  *
 * * * * * * * * * * * * * */

import $ from 'jquery';

export default class Coord {
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