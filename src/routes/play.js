'use strict';
const router = new (require( 'express' ).Router )();
router.get('/', (req, res) => {
	res.render( 'boxxle/play' );
});
module.exports = router;
