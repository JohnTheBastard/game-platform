var localStorage = (function() {

    //get the token from uri
    var jwt = window.location.search.split('=')[1];

    //modify the uri remove the token query
    history.replaceState({}, document.title, "/play");
    localStorage.setItem('token', jwt);
})();
