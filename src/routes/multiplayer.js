var express = require('express');
var router = express.Router();


module.exports = function multiplayer() {
  router.get('/:roomName/:roomDiff/:roomNumberOfLevelsToWin', function(request,response) {

    response.render('boxxle/multiplayer', {room: request.params.roomName,
      diff: request.params.roomDiff,
      levelsToWin: request.params.roomNumberOfLevelsToWin
    });
  });

  return router;
}
