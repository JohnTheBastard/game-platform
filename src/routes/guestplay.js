'use strict';
const router        = new (require( 'express' ).Router )();
const path          = require('path');

let guestPath  = path.join(__dirname, '../views/play', 'guestplay.html');
router.get('/', (req, res) => {
	res.sendFile(guestPath);
});

module.exports = router;
