var localStorage = (function() {
  var level = localStorage.getItem('Level');
  if(level){
    console.log('localStore level');
  } else {
    localStorage.setItem("Level", JSON.stringify('0'));
    localStorage.setItem("Name", JSON.stringify('Guest'));
    localStorage.setItem("Scores", JSON.stringify( {"easy":[0,0,0,0,0,0,0,0,0,0,0],"hard":[0,0,0,0,0,0,0,0,0,0]}) );
    localStorage.setItem("Difficulty", JSON.stringify('easy') );
    localStorage.setItem("Initialized", JSON.stringify( 'true' ) );
  }
})();
