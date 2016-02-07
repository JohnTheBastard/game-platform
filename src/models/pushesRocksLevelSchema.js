const mongoose = require('mongoose');
const PushesRocksLevel = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});

PushesRocksLevel.statics.getLevel = function(levelID, cb){
	PushesRocksLevel.findOne({identifier: levelID}).lean().select("data").exec(function (err, level) {
		if(err) return cb(err);
		cb( null, level );
	});	
};

module.exports = mongoose.model('PushesRocksLevel', PushesRocksLevel);