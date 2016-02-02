const User         = require('../models/user');
const token        = require( '../models/token' );
const router       = new (require( 'express' ).Router )();
const path         = require('path');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const Authenticat  = require('authenticat');
const authenticat  = new Authenticat(mongoose.connection);
router.use('/', authenticat.router);

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public', 'login.html'));
});
mongoose.Promise = Promise;

router.get('/twitter', (req, res, next) => {
    User.findOne({
        twitter: {
            screen_name: req.query.raw.screen_name,
            user_id: req.query.raw.user_id,
        }
    })
    .then((user) => {
        if (user) return user;
        return new User({
            twitter: {
                screen_name: req.query.raw.screen_name,
                user_id: req.query.raw.user_id,
            }
        }).save();
    })
    .then((user) => {
        return token.sign(user);
    })
    .then((token, err) => {
        if (err) handleError(err);
        res.redirect(`/play?token=${token}`)
    }).catch(next);

});

function authenticated (req, res, next) {
    var accessToken = req.headers.token || req.query.token;
    if (accessToken) {
      token.verify(accessToken).then(verified => {
          req.userId = verified.userId;
          next();
        }).catch(next);
    } else {
      res.redirect('/login');
    }
  }

router.get('/play', authenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public', 'play.html'));
});

router.get('/guest', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/public', 'play.html'));
})
module.exports = router;
