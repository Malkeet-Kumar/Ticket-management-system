const mongoose = require('mongoose');
const Message = require('../models/messages.js')

exports = module.exports = function(io){
    io.on("connection",(socket)=>{
        console.log("notification started");
        socket.on('initiate-notification',(room)=>{
            console.log("joined room ",room);
            socket.join(room);
        })
        socket.on('disconnect',()=>{
            console.log("Someone disconnected");
        })
        socket.on('user-to-res-c',(ticket)=>{
            Message.find({ticketId: ticket._id, senderId: ticket.creatorId,seen:false})
            .then((msgs)=>{
                console.log("res room",ticket.resolverId);
                if(msgs.length>0){
                    const notification = {
                        id: msgs[0].ticketId,
                        msgCount: msgs.length,
                        lastmsg: msgs[msgs.length-1].msg
                    }
                    console.log("Rsolver have ",msgs.length," uread msgs from ticket ",ticket._id);
                    socket.in(ticket.resolverId).emit('newNotification',notification)
                } else {
                    console.log("no");
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
        socket.on('res-to-user-c',(ticket)=>{
            Message.find({ticketId: ticket._id, senderId: ticket.resolverId,seen:false})
            .then((msgs)=>{
                console.log("user room",ticket.creatorId);
                if(msgs.length>0){
                    const notification = {
                        id: msgs[0].ticketId,
                        msgCount: msgs.length,
                        lastmsg: msgs[msgs.length-1].msg
                    }
                    console.log(notification);
                    socket.in(ticket.creatorId).emit('newNotification',notification)
                } else {
                    console.log("no");
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
}