const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var State = new Schema({
    twitter: {
        screen_name: String,
        user_id: String,
    },
    username: String,
    boxxle: {
        difficulty: String,
        stepsAt: Number,
        position: Array
    },
}, {
    collection: 'gameState'
});

state = mongoose.model('gameState', State);

module.exports = state;

/*
To-Do:

**when twitter user/username signs in, at the same point create them a game state object in db

(add later) update date on signin

actively update position and stepsAt as they play

update difficulty when changed


*/
