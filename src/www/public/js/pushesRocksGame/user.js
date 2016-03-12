/* * * * * * * * * * * * * *
 * PUSHES ROCKS GAME       *
 * Created by  John Hearn  *
 * CF401       March 2016  *
 * * * * * * * * * * * * * */

/* //move local storage to guest controller
function User() {
    this.currentLevel = 0;
    this.levelScores = { easy: [ ], hard: [ ] };
    this.difficulty = "easy";

    this.saveData = function() {
        // localStorage.setItem("Name", JSON.stringify( this.name ) );
        localStorage.setItem("Level", JSON.stringify( this.currentLevel ) );
        localStorage.setItem("Scores", JSON.stringify( this.levelScores ) );
        localStorage.setItem("Difficulty", JSON.stringify(this.difficulty ) );
        localStorage.setItem("Initialized", JSON.stringify( 'true' ) );
    };

    this.loadData = function() {
        this.name = JSON.parse( localStorage.getItem( "Name" ) );
        this.currentLevel = JSON.parse( localStorage.getItem( "Level" ) );
        this.levelScores = JSON.parse( localStorage.getItem( "Scores" ) );
        this.difficulty = JSON.parse( localStorage.getItem( "Difficulty" ) );
    };


    this.init = function() {
        // My attempt to use Boolean() to cast our localStorage string
        // was returning true regardless of the value so I wrote my own.
        function castToBool(stringToCast) {
            if( stringToCast === "true" ) {
                return true;
            } else if( stringToCast === "false" ) {
                return false;
            } else {
                console.log("Your attempt to cast " + castToBool + " to a boolean failed." );
            }
        }

        this.isInitialized = castToBool( JSON.parse(localStorage.getItem("Initialized") ) );

        if ( !this.isInitialized ) {
            console.log("false = " + this.isInitialized + " I'm not initialized.");
            for( let ii=0; ii < oldLevelData.easy.length; ii++ ) {
                this.levelScores.easy[ii] = 0;
            }
            for( let ii=0; ii < oldLevelData.hard.length; ii++ ) {
                this.levelScores.hard[ii] = 0;
            }
            this.saveData();
        } else {
            this.loadData();
        }
    };
}
*/
