'use strict';
const router        = new (require( 'express' ).Router )();
const path          = require('path');

let playPath  = path.join(__dirname, '../views/boxxle', 'play.html');
router.get('/', (req, res) => {
	res.sendFile(playPath);
});

module.exports = router;
