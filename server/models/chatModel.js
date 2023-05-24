const mongoose = require('mongoose');
const MessageModel = require('./messageModel')

const chatSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: MessageModel}]
},{versionKey: false})

const ChatModel = mongoose.model('chat', chatSchema);
module.exports = ChatModel;