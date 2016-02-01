// set cookie.js

var COOKIE_MODULE = (function() {
    var my = {};
    my.username;
    my.difficulty;
    my.getInput = function() {
	my.username = $('#username').val();
	localStorage.setItem( "Name", JSON.stringify( my.username ) );
	localStorage.setItem( "Initialized", JSON.stringify( 'false' ) );

	// we'll use this soon:
	// localStorage.setItem("Difficulty", JSON.stringify( my.difficulty ) );
    }

    return my;
})();
