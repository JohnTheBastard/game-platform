/* * * * * * * * * * * * * * * *
 * BOXER GAME                  *
 * Created by  John Hearn      *
 *             Max Jacobson    *
 *             Doug Popadince  *
 * CF201       Fall 2015       *
 * * * * * * * * * * * * * * * */

var mobile = false;
if (mobile) {
  var cellWidth = 16;
} else {
  var cellWidth = 32;
}

var listenToKeystrokes = true;

var wallURL = "../img/RedBrick.png";
var floorURL = "../img/FloorTile.png";
var crateURL = "../img/WoodenCrate.png";
var crateOnDotURL = "../img/WoodenCrateOnDot.png"
var dotsURL = "../img/DotTile.png";
var spriteURL = "../img/Sprite.gif";

var pad = function(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

var removeClass = function() {
  $('#hiddenlist').removeClass('hide');
  $('#gameboyIMG').removeClass('hide');
}


var welcomeBack = function() {
  var name = JSON.parse(localStorage.getItem("Name"));
  var welcome = ('<p class="welcome"> Welcome back, ' + name + '. To continue ' +
    'playing from your last game, click the Gameboy or the "Play" tab above. ' +
    'If you would like to start over, please clear your web data. </p>');
  $('.initialParagraphs').remove();
  $('#user').replaceWith(welcome);

}

function User() {
  this.currentLevel = 0;
  this.levelScores = {
    easy: [],
    hard: []
  };
  this.difficulty = "easy";

}

function Coord(tileType, tileURL) {
  this.$div = $('<div></div>');
  this.$img = $('<img></img>');
  this.tile = tileType;
  this.$img.attr('src', tileURL);
  this.$div.append(this.$img);
  this.hasCrate = false;

  this.isADot = function() {
    if (this.tile == "dot") {
      return true;
    } else {
      return false;
    }
  }
}

function Crate(xy) {
  this.x = xy[0] * cellWidth;
  this.y = xy[1] * cellWidth;
  this.onDot = false;
  this.$crateImg = $('<img></img>').attr('src', crateURL);
}

function Sprite(xy) {
  this.x = xy[0] * cellWidth;
  this.y = xy[1] * cellWidth;
  this.$img = $('<img></img>').attr('src', spriteURL);
  this.stepCount = 0;
}

function GameBoard(containerID) {
  this.winCondition = false;
  this.coordinates = [];
  this.crates = [];

  this.$canvasJQ = $('<canvas></canvas>');
  this.canvas = this.$canvasJQ[0];
  this.context = this.canvas.getContext("2d");

  this.$elementJQ = $('<section></section>').attr('id', containerID);
  this.$elementJQ.addClass('container-class');
  this.element = this.$elementJQ[0];
  this.element.style.position = "absolute";

  /* * * * * * * * * * * * * * * *
   * * * * Member Methods  * * * *
   * * * * * * * * * * * * * * * */
  this.clearTheBoard = function() {
    for (var ii = 0; ii < this.coordinates.length; ii++) {
      console.log("clearing board");
      delete this.coordinates[ii];
    }
    this.coordinates = [];
    for (var ii = 0; ii < this.crates.length; ii++) {
      delete this.crates[ii];
    }
    this.crates = [];
    delete this.sprite;
    this.$elementJQ.empty();
    this.winCondition = false;
  }


  // Chrome needs me to access parameter arrays this way.
  this.updateCell = function(xy, tileType, tileURL, crateStatus) {
    this.coordinates[xy[0]][xy[1]].tile = tileType;
    this.coordinates[xy[0]][xy[1]].$img.attr('src', tileURL);
    this.coordinates[xy[0]][xy[1]].hasCrate = crateStatus;

  }

  this.init = function(levelData) {
    this.boardData = levelData;
    this.boardDimensionInPixels = this.boardData.dimension * cellWidth;
    this.canvas.width = this.boardDimensionInPixels;
    this.canvas.height = this.boardDimensionInPixels;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = 0;
    this.canvas.style.top = 0;
    this.canvas.style.zIndex = "10";

    this.element.style.left = 0;
    this.element.style.top = 0;
    this.element.style.zIndex = "0";

    // This is where we will change CSS element width and height



    // Clear any existing data
    this.clearTheBoard();

    for (var ii = 0; ii < this.boardData.dimension; ii++) {
      for (var jj = 0; jj < this.boardData.dimension; jj++) {
        this.coordinates.push([]);
        this.coordinates[jj].push(new Coord("wall", wallURL));
        this.$elementJQ.append(this.coordinates[jj][ii].$div);
      }
    }

    // update floor tiles
    for (var ii = 0; ii < this.boardData.floor.length; ii++) {
      this.updateCell(this.boardData.floor[ii], "floor", floorURL, false);
    }
    // update dot tiles
    for (var ii = 0; ii < this.boardData.dots.length; ii++) {
      this.updateCell(this.boardData.dots[ii], "dot", dotsURL, false);
    }

    // make our crates
    for (var ii = 0; ii < this.boardData.crate.length; ii++) {
      this.crates.push(new Crate(this.boardData.crate[ii]));
      this.crates[ii].onDot =
        this.coordinates[this.boardData.crate[ii][0]][this.boardData.crate[ii][1]].isADot();
      this.coordinates[this.boardData.crate[ii][0]][this.boardData.crate[ii][1]].hasCrate = true;
      if (this.crates[ii].onDot) {
        this.crates[ii].$crateImg.attr('src', crateOnDotURL);
      }

    }

    // make a sprite
    this.sprite = new Sprite(this.boardData.start);

    this.draw();
  }

  this.findCrate = function(xy) {
    for (var ii = 0; ii < this.crates.length; ii++) {
      if (xy[0] == this.crates[ii].x && xy[1] == this.crates[ii].y) {
        return ii;
      }
    }
    console.log("Error: crate not found.");
  }

  this.checkWinCondition = function() {
    var onDotCounter = 0;
    for (var ii = 0; ii < this.crates.length; ii++) {
      if (this.crates[ii].onDot) {
        onDotCounter++;
      }
    }
    if (onDotCounter == this.crates.length) {
      return true;
    } else {
      return false;
    }
  }

  this.updateCrateStatus = function(crateIndex, oldPosition, newPosition) {

    this.coordinates[oldPosition[0]][oldPosition[1]].hasCrate = false;
    this.coordinates[newPosition[0]][newPosition[1]].hasCrate = true;

    if (this.coordinates[newPosition[0]][newPosition[1]].isADot()) {
      this.crates[crateIndex].onDot = true;
      this.crates[crateIndex].$crateImg.attr('src', crateOnDotURL);
    } else {
      this.crates[crateIndex].onDot = false;
      this.crates[crateIndex].$crateImg.attr('src', crateURL);
    }

    this.winCondition = this.checkWinCondition();


  }

  // draw our sprite and crates to the canvas
  this.draw = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var ii = 0; ii < this.crates.length; ii++) {
      this.context.drawImage(this.crates[ii].$crateImg[0], this.crates[ii].x, this.crates[ii].y);
    }
    this.context.drawImage(this.sprite.$img[0], this.sprite.x, this.sprite.y);
  }

  this.move = function(deltaXY, withCrate) {
    listenToKeystrokes = false;
    var x = this.sprite.x;
    var y = this.sprite.y;
    var self = this;
    var draw = this.draw.bind(this);
    var counter = 0;
    var frames = cellWidth;

    if (withCrate) {

      var crateIndex = self.findCrate([x + deltaXY[0] * cellWidth, y + deltaXY[1] * cellWidth]);
      var xCrate = self.crates[crateIndex].x;
      var yCrate = self.crates[crateIndex].y;
    }

    function drawFrame(fraction) {
      // This looks weird, but we'll be sure that the sprite ends in
      // a valid location when setTimeout calls drawFrame(1)
      self.sprite.x = x + (cellWidth * deltaXY[0] * fraction);
      self.sprite.y = y + (cellWidth * deltaXY[1] * fraction);
      if (withCrate) {
        self.crates[crateIndex].x = xCrate + (cellWidth * deltaXY[0] * fraction);
        self.crates[crateIndex].y = yCrate + (cellWidth * deltaXY[1] * fraction);
      }
      requestAnimationFrame(draw);
    }

    var interval = setInterval(function() {
      counter++;
      drawFrame(counter / frames);
    }, 256 / cellWidth);

    setTimeout(function() {
      clearInterval(interval);
      drawFrame(1);
      if (withCrate) {
        self.updateCrateStatus(crateIndex, [xCrate / cellWidth, yCrate / cellWidth], [xCrate / cellWidth + deltaXY[0], yCrate / cellWidth + deltaXY[1]]);
      }
      self.sprite.stepCount++;
      listenToKeystrokes = true;
    }, 256);
  }

  this.tryToMove = function(xy, deltaXY) {
    var x = xy[0];
    var y = xy[1];
    var dx = deltaXY[0];
    var dy = deltaXY[1];

    var nextLocation = this.coordinates[x + dx][y + dy];

    // Make sure two spaces away is on the board
    if ((0 <= x + 2 * dx && x + 2 * dx < this.boardData.dimension) &&
      (0 <= y + 2 * dy && y + 2 * dy < this.boardData.dimension)) {
      var twoAway = this.coordinates[x + 2 * dx][y + 2 * dy];
      twoAway.exists = true;
    } else {
      // Two spaces away would be off the board
      var twoAway = {};
      twoAway.exists = false;
    }

    if (nextLocation.tile == "wall") {
      return;
    } else if (nextLocation.hasCrate) {
      if (twoAway.exists && !twoAway.hasCrate && twoAway.tile != "wall") {
        // move with crate
        this.move(deltaXY, true);
      }
      return;
    } else if ((nextLocation.tile == "floor") ||
      (nextLocation.tile == "dot")) {
      this.move(deltaXY, false);
      return;
    } else {
      console.log("error");
    }
  }

}

var BOXER_GAME_MODULE = (function() {
  var my = {};
  my.$firstPlayerAnchor = $("#firstPlayerGameBoard");
  my.firstPlayer = new User();
  my.firstPlayerGame = new GameBoard('container');
  my.$secondPlayerAnchor = $("#secondPlayerGameBoard");
  my.secondPlayer = new User();
  my.secondPlayerGame = new GameBoard('container2');

  my.initializeGameBoard = function(anchor,user,game, gameID, containerID) {
    anchor.empty();
    game.init(levelData[user.difficulty][user.currentLevel]);
    anchor.append(game.$elementJQ);
    anchor.append(game.$canvasJQ);
    $(gameID).css({
      'width': game.boardDimensionInPixels - 10,
      'height': game.boardDimensionInPixels - 25
    });
    $(containerID).css('width', game.boardDimensionInPixels);
  }

  // I don't really understand window.onload behavior
  // so I'm probably doing this wrong.
  window.onload = function() {
    my.initializeGameBoard(my.$firstPlayerAnchor,my.firstPlayer,my.firstPlayerGame,'#firstPlayerGame','#container');
    my.initializeGameBoard(my.$secondPlayerAnchor,my.secondPlayer,my.secondPlayerGame,'#secondPlayerGame','#container2');
  }


  my.advanceTheUser = function(user,game) {
    var winMessage = '<p id ="winner"> Congrats!!!! You beat level ' + (user.currentLevel + 1) +
      ' in ' + game.sprite.stepCount + ' steps. Press any key to move on to the next level. </p>';
    $('#gameplay').empty();
    $('#gameplay').append(winMessage);

    console.log("break: advanceTheUser ");
    if (user.currentLevel < (levelData[user.difficulty].length - 1)) {
      user.currentLevel++;
    } else if (user.difficulty == "easy" && user.currentLevel == levelData[user.difficulty].length - 1) {
      user.difficulty = "hard";
      user.currentLevel = 0;
    } else if (user.difficulty == "hard" && user.currentLevel == levelData[user.difficulty].length - 1) {
      console.log("CONGRATULATIONS: You beat all the levels!");
    } else {
      console.log("Error: level index out of bounds");
    }
  }

  function addCurrentStatus(user,game,counterID) {
    $(counterID).empty();
    var status = '<p class="current"> Difficulty: ' + user.difficulty + '<p> Level: ' + (user.currentLevel + 1) + '<p> Steps: ' + game.sprite.stepCount + '</p>';
    $(counterID).append(status);
  }


  my.processInput = function(anchor,user,game, gameID, containerID,counterID) {
    var currentAnchor = anchor;
    var currentGameID = gameID;
    var currentContainer = containerID;
    var currentGame = game;
    var currentUser = user;
    var playerCounterId = counterID;

    return function(key) {
      var keyvalue = key.keyCode;
      var xy = [(currentGame.sprite.x / cellWidth), (currentGame.sprite.y / cellWidth)];

      // Keep key input from scrolling
      key.preventDefault();

      if (currentGame.winCondition) {
        my.advanceTheUser(currentUser,currentGame);
        my.initializeGameBoard(currentAnchor,currentUser,currentGame,currentGameID,currentContainer);
      } else if (listenToKeystrokes) {
        if (keyvalue == 37) {
          console.log("left");
          deltaXY = [-1, 0];
          currentGame.tryToMove(xy, deltaXY);
        } else if (keyvalue == 38) {
          console.log("up");
          deltaXY = [0, -1];
          currentGame.tryToMove(xy, deltaXY);
        } else if (keyvalue == 39) {
          console.log("right");
          deltaXY = [1, 0];
          currentGame.tryToMove(xy, deltaXY);
        } else if (keyvalue == 40) {
          console.log("down");
          deltaXY = [0, 1];
          currentGame.tryToMove(xy, deltaXY);
        }

        if (keyvalue == 13) {
          currentGame.draw();
        } else if (keyvalue == 32) {
          $('#gameplay').empty();
        }
        addCurrentStatus(currentUser,currentGame,playerCounterId);
      }
    }
  }

  my.secondPlayerInput = function(anchor,user,game, gameID, containerID,counterID) {
    var currentAnchor = anchor;
    var currentGameID = gameID;
    var currentContainer = containerID;
    var currentGame = game;
    var currentUser = user;
    var playerCounterId = counterID;

    return function(keyvalue) {
      var xy = [(currentGame.sprite.x / cellWidth), (currentGame.sprite.y / cellWidth)];
      if (currentGame.winCondition) {
        my.advanceTheUser(currentUser,currentGame);
        my.initializeGameBoard(currentAnchor,currentUser,currentGame,currentGameID,currentContainer);
      } else if (listenToKeystrokes) {
        if (keyvalue == 37) {
          deltaXY = [-1, 0]; // move left
          currentGame.tryToMove(xy, deltaXY);
        } else if (keyvalue == 38) {
          deltaXY = [0, -1]; // move up
          currentGame.tryToMove(xy, deltaXY);
        } else if (keyvalue == 39) {
          deltaXY = [1, 0]; // move right
          currentGame.tryToMove(xy, deltaXY);
        } else if (keyvalue == 40) {
          deltaXY = [0, 1]; // move down
          currentGame.tryToMove(xy, deltaXY);
        }

        if (keyvalue == 13) {
          currentGame.draw();
        } else if (keyvalue == 32) {
          $('#gameplay').empty();
        }
        addCurrentStatus(currentUser,currentGame,playerCounterId);
      }
    }
  }

  my.firstPlayerKeyDownEvent = my.processInput(my.$firstPlayerAnchor,my.firstPlayer,my.firstPlayerGame,'#firstPlayerGame','#container',"#firstPlayerCounter" );
  secondPlayerKeyDownEvent = my.secondPlayerInput(my.$secondPlayerAnchor,my.secondPlayer,my.secondPlayerGame,'#secondPlayerGame','#container2', "#secondPlayerCounter");

  my.scaleGameBoard = function(anchor,game) {
    var buffer = ($('header').height() + $('footer').height()) * 2;
    var frameHeight = $(window).height() - buffer;
    var frameWidth = $(window).width();
    var frameSize = Math.min(frameHeight, frameWidth);
    var scale;

    if (game.boardDimensionInPixels < frameSize) {
      scale = 1;
    } else {
      scale = (frameSize / game.boardDimensionInPixels).toFixed(2);
      anchor.parent().css('transform', 'scale( ' + scale + ', ' + scale + ')');
    }
  }

  my.scaleGameBoard(my.$firstPlayerAnchor,my.firstPlayerGame);
  my.scaleGameBoard(my.$secondPlayerAnchor,my.secondPlayerGame);

  my.eventListeners = function() {
    window.addEventListener("keydown", my.firstPlayerKeyDownEvent, false);
    window.addEventListener("resize", my.scaleGameBoard(my.$firstPlayerAnchor,my.firstPlayerGame), false);
  }
  // function start() {
  //   my.eventListeners();



  return my;
})();
