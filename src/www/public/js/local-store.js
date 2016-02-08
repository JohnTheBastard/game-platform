var localStorage = (function() {
  var level = localStorage.getItem('Level');
  if(level){
    console.log('localStore level');
  } else {
    localStorage.setItem("Level", JSON.stringify('0'));
    // localStorage.setItem("Scores", JSON.stringify( this.levelScores ) );
    localStorage.setItem("Difficulty", JSON.stringify('easy') );
    localStorage.setItem("Initialized", JSON.stringify( 'true' ) );
  }
})();
