const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    time: String,
    body: String,
    senderId: String,
    receiverId: String
})

const Message = mongoose.model('message', messageSchema);
module.exports = Message;