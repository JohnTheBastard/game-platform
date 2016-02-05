'use strict';
const token       = require('../models/token');
module.exports    = function authenticated (req, res, next) {
	let accessToken = req.headers.token || req.query.token;
	if (accessToken) {
		token.verify(accessToken).then(verified => {
		req.userId = verified.userId;
		next();
		}).catch(next);
	} else {
		res.redirect('/login');
	}
}
