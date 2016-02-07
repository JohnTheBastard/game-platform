// file leftover from node-playground. leaving it for now, might use it eventually.

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
