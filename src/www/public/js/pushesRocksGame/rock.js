/* * * * * * * * * * * * * *
 * PUSHES ROCKS GAME       *
 * Created by  John Hearn  *
 * CF401       March 2016  *
 * * * * * * * * * * * * * */

import $ from 'jquery';
import pushesRocksConstants from './pushesRocksConstants';

export default class Rock {
    constructor( xy ) {
        this.x = xy[0] * pushesRocksConstants.cellWidth;
        this.y = xy[1] * pushesRocksConstants.cellWidth;
        this.onDot = false;
        this.$rockImg = $('<img></img>').attr('src', pushesRocksConstants.urls.rock );
    }
}