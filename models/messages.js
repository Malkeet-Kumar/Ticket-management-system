const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
    {
        ticketId: mongoose.Schema.Types.ObjectId,
        msg: String,
        senderId: mongoose.Schema.Types.ObjectId,
        time: Date,
        seen:Boolean
    }
)
const Message = mongoose.model("messages",messageSchema)

module.exports = Message