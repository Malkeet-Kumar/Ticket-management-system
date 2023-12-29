var notificationSocket = io("/notification")
    console.log("userid->",userId);
    notificationSocket.emit('initiate-notification',userId)
    notificationSocket.on('newNotification',n=>{
        if(n){
            console.log(n);
            const notiItem = document.createElement("li")
            notiItem.className="notification-item"
            notiItem.id = n.id
            notiItem.innerText = "You have "+n.msgCount+" new msgs from a ticket.click to view\n"+n.lastmsg
            notificationList.appendChild(notiItem)
            notificationIndicator.style.display = "block"
            notificationIndicator.innerText = (n.msgCount<5)?"+"+n.msgCount:"+5"
        }
    })