function resolverTicket(parent, ticket){
    const ticketDetails = ["Title: ","Raised By: ","Created on: ","Expires on: ","Status: "];
    const ticketFields = ["title","username","startTime","endTime","status"];
    const div = document.createElement("div");
    div.id = ticket._id
    div.className="resolver-ticket"
    ticketFields.forEach((val,i)=>{
        const p = document.createElement("p")
        if(ticket[val]=="waiting"){
            ticket[val]=""
            ticketDetails[i] = "Click to open this ticket"
            p.id = "status"
        }
        if(ticket[val]=="cancelled" || ticket[val]=="opened" || ticket[val]=="closed"){
            p.id = "status"
        }
        p.innerText = ticketDetails[i]+ticket[val];
        div.appendChild(p);
    })
    div.addEventListener("click",()=>{
        fetch("/res/ticket/"+ticket._id)
        .then(res=>res.json())
        .then((ticket)=>{
            newTicketsBtn.style.display='none'
            openedTicketContainer.style.display="none"
            closedTicketContainer.style.display="none"
            newTicketContainer.style.display="none"
            chatWindow.style.display="flex"
            socket.connect()
            socket.emit('initiate-chat',ticket._id)
            startChat(ticket)
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    parent.appendChild(div)
}
