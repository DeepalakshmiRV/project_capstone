var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        fullName: String
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Account', AccountSchema);