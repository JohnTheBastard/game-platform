'use strict';

let sampleID = "easy01-level03";

let nextLevel_module = {
	nextLevel(levelID) {
		
		let pattern = /^(easy|hard)(\d{2})\Wlevel(\d{2})/;
		//let difficulty = "";
		//let levelNumber ="";
		
		let matches = pattern.exec(levelID);
		
		console.log(matches);
		
		//return newID;
	}
};

nextLevel_module.nextLevel(sampleID);

module.exports = nextLevel_module;