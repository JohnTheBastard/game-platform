var express = require('express');
var router = express.Router();

module.exports = function multiplayer() {
  router.get('/', function(request,response) {
    response.redirect('multiplayer.html');
  })

  return router;
}
