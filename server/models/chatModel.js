const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'message'}],
},{versionKey: false})

const ChatModel = mongoose.model('chat', chatSchema);
module.exports = ChatModel;