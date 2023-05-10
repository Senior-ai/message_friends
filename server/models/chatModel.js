const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'message'}],
})

const Message = mongoose.model('message', chatSchema);
module.exports = Message;