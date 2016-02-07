var localStorage = (function() {

    //get the token from uri
    var jwt = window.location.search.split('=')[1];
    var my = {};
    //modify the uri remove the token query
    //do this once /play refresh gets sorted
    //history.replaceState({}, document.title, "/play");
    my.getInput = function() {
        my.username = $('#username').val();
        localStorage.setItem("Name", JSON.stringify(my.username))
    }
    localStorage.setItem('token', jwt);
})();
