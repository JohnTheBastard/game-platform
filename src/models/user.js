const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    twitter : {
      screen_name: String,
      user_id: String,
    },
}, {
    collection: 'user'
});

user = mongoose.model('user', User);

module.exports = user;
