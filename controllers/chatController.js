const fs = require('fs')
const path = require('path')
const Message = require('../models/messages.js')

exports = module.exports = function(io){

    io.on('connection',(socket)=>{
        // console.log("some one connected");
        socket.on('disconnect', function () {
            console.log('disconnected');
        });
        socket.on('initiate-chat',room=>{
            socket.join(room);
        })

        socket.on('res-to-user-c',(msg)=>{
            Message.create(msg)
            .then((m)=>{
                socket.in(msg.ticketId).emit('res-to-user-s',m)
            })
            .catch(err=>{
                console.log(err);
            })
        })

        socket.on('user-to-res-c',(msg)=>{
            Message.create(msg)
            .then((m)=>{
                socket.in(msg.ticketId).emit('user-to-res-s',m)
            })
            .catch(err=>{
                console.log(err);
            })
        })
       
        socket.on('msg-seen',(msg)=>{
            console.log(msg);
            Message.updateOne({_id:msg._id},{seen:true})
            .then(r=>{
                console.log("object");
            })
            .catch(err=>{
                console.log("false")
            })
        })
    });
}

function saveMessageToFile(msgs){
    let messages = JSON.parse(fs.readFileSync(path.resolve("messages.json"),"utf-8"))
    messages.push(msgs)
    console.log(messages);
    fs.writeFileSync(path.resolve("messages.json"),JSON.stringify(messages,null,2));
}