const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'group'}]
}, {versionKey: false})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;