var express = require('express');
var router = express.Router();

module.exports = function rooms() {
  router.get('/', function(request,response) {
    response.redirect('rooms.html');
  })
  return router;
}
