const {Schema,model} = require('mongoose')
const ticketSchema = new Schema({
    title:String,
    username:String,
    creatorId:Schema.Types.ObjectId,
    role:String,
    category:String,
    desc:String,
    startTime:Date,
    endTime:Date,
    resolverId:String,
    resolvedAt:Date,
    status:String
})
const Ticket = model("ticket", ticketSchema);
module.exports = Ticket;

