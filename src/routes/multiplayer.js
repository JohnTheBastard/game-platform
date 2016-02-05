var express = require('express');
var router = express.Router();


module.exports = function multiplayer() {
  router.get('/:roomName', function(request,response) {
    console.log(request.params.roomName);
    response.render('multiplayer', {room: request.params.roomName});
  });

  return router;
}
