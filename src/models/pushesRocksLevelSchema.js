const mongoose = require('mongoose');

const PushesRocksLevelSchema = new mongoose.Schema({  
	identifier: String,
	difficulty: String,
	data: Object,
});

module.exports = mongoose.model('PushesRocksLevel', PushesRocksLevelSchema);