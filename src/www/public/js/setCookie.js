// set cookie.js
var COOKIE_MODULE = (function() {
    var jwt = window.location.search.split('=')[1];
    //history.replaceState({}, document.title, "/play");
    console.log('cookie module ran');
    console.log(jwt);
    var my = {};
    my.username;
    my.difficulty;
    my.getInput = function() {
	my.username = $('#username').val();
  localStorage.setItem('Jwt', JSON.stringify(jwt));
	localStorage.setItem( "Name", JSON.stringify( my.username ) );
	localStorage.setItem( "Initialized", JSON.stringify( 'false' ) );
    }
    return my;
})();

/*
when user goes to /play
var jwt = JSON.parse(localStorage.getItem('token'))
set req.params.query = jwt;

*/
