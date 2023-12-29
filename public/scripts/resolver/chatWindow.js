function closeChatWindow(e){
    openedTicketContainer.style.display="grid"
    chatWindow.style.display="none"
    newTicketContainer.style.display="none"
    closedTicketContainer.style.display="none"
    myTicketContainer.style.display="none"

    socket.disconnect()
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
                senderId: ticket.resolverId,
                seen:false
            }
            socket.emit('res-to-user-c',message)
            setTimeout(() => {
                notificationSocket.emit('res-to-user-c',ticket)
            }, 5000);
            addMessage(chatList,message,ticket.resolverId)
        }    
    })
    socket.on('user-to-res-s',(message)=>{
        addMessage(chatList,message,ticket.creatorId)
        socket.emit('msg-seen',message)
        // notificationSocket.emit('res-to-user-c',ticket)
    })
}

function addMessage(parent, msg, sender){
    const msgdiv = document.createElement("div");
    msgdiv.className = "msg-item"
    if(msg.senderId==sender){
        msgdiv.style.backgroundColor="green"
        msgdiv.style.alignSelf="flex-end"
    } else{
        msgdiv.style.backgroundColor="blue"
        msgdiv.style.alignSelf="flex-start"
    }
    msgdiv.innerText = msg.msg
    parent.appendChild(msgdiv)
    parent.scrollTop = parent.scrollHeight
}


