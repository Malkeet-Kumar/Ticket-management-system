function closeChatWindow(e){
    document.getElementById("complaint-div").style.display="none"
    document.getElementById("tickets-div").style.display="grid"
    document.getElementById("ticket-chat").style.display="none"
    
    socket.disconnect()
    notificationSocket.disconnect()
}


function startChat(ticket){
    console.log(ticket);
    console.log(chatList);
    document.getElementById("chat-msg").addEventListener('click',(e)=>{
        e.preventDefault()
        if(document.getElementById("message").value){
            const message = {
                ticketId: ticket._id,
                msg: document.getElementById("message").value,
                time:new Date(),
                senderId: ticket.creatorId,
                seen:false
            }
            socket.emit('user-to-res-c',message)
            setTimeout(() => {
                notificationSocket.emit('user-to-res-c',ticket)
            }, 5000);
            addMessage(chatList,message,ticket.creatorId)
        }    
    })
    socket.on('res-to-user-s',(message)=>{
        addMessage(chatList,message,ticket.resolverId)
        socket.emit('msg-seen',message)
        // notificationSocket.emit('user-to-res-c',ticket)
    })
}

function addMessage(parent, msg, sender){
    const msgdiv = document.createElement("div");
    msgdiv.className = "msg-item"
    if(msg.senderId==sender){
        msgdiv.style.backgroundColor="blue"
        msgdiv.style.alignSelf="flex-start"
    } else{
        msgdiv.style.backgroundColor="green"
        msgdiv.style.alignSelf="flex-end"
    }
    msgdiv.innerText = msg.msg
    parent.appendChild(msgdiv)
    parent.scrollTop = parent.scrollHeight
}


