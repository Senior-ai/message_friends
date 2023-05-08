const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: String,
    groupPic: String,
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'message'}]
})

const GroupModel = mongoose.model('group', groupSchema);
module.exports = GroupModel;