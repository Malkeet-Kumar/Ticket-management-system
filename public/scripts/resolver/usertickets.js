function userTicket(parent,ticket){
    if(ticket.status=="cancelled"){
        return
    }
    const ticketDetails = ["Title: ","Created on: ","Category: ","Status: "];
    const ticketFields = ["title","startTime","category","status"];
    const div = document.createElement("div");
    div.className="ticket"
    div.id = ticket._id
    ticketFields.forEach((val,i)=>{
        const p = document.createElement("p")
        if(ticket[val]=="closed"){
            p.id = "status"
            p.innerText = ticketDetails[i]+"Resolved";
        } else if(ticket[val]=="opened"){
            p.id = "status"
            p.innerText = ticketDetails[i]+"Under process";
        } else if(ticket[val]=="waiting"){
            p.id = "status"
            p.innerText = ticketDetails[i]+ticket[val]
        } else {
            p.innerText = ticketDetails[i]+ticket[val]
        }
        if(val=="startTime"){
            p.innerText = new Date(ticket[val]).toLocaleString()
        }
        div.appendChild(p);
    }) 
    div.addEventListener('click',(e)=>{
        if(ticket.status!="cancelled" || "waiting"){
            fetch("/tickets/"+ticket._id)
            .then(res=>res.json())
            .then((t)=>{
                openChat(ticket._id)     
            })
            .catch((Err)=>{console.log(Err);})
        }
    })
    parent.appendChild(div);
}
