/* * * * * * * * * * * * * *
 * PUSHES ROCKS GAME       *
 * Created by  John Hearn  *
 * CF401       March 2016  *
 * * * * * * * * * * * * * */
 
'use strict';
class Sprite {
    constructor( xy ) {
        this.x = xy[0] * pushesRocksConstants.cellWidth;
        this.y = xy[1] * pushesRocksConstants.cellWidth;
        this.$img = $('<img></img>').attr('src', pushesRocksConstants.urls.sprite );
        this.stepCount = 0;
    }
}