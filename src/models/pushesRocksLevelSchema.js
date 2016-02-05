var mongoose = require('mongoose');

var pushesRocksLevelSchema = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});
pushesRocksLevel = mongoose.model('PushesRocksLevel', pushesRocksLevelSchema);
module.exports = pushesRocksLevel;