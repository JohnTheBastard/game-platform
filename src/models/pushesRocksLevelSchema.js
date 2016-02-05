var mongoose = require('mongoose');  
var pushesRocksLevelSchema = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});
pushesRocksLevel = mongoose.model('pushesRocksLevel', pushesRocksSchema);
module.exports = pushesRocksLevel;