complaintBtn.addEventListener('click',(e)=>{
    console.log("complaint clicked");
    document.getElementById("complaint-div").style.display="flex"
    document.getElementById("newTickets-div").style.display="none"
    document.getElementById("openedTickets-div").style.display="none"
    document.getElementById("closedTickets-div").style.display="none"
    document.getElementById("myTickets-div").style.display="none"
    document.getElementById("notickets").style.display="none"
    document.getElementById("ticket-chat").style.display="none" 

})

newTicketsBtn.addEventListener('click',(e)=>{
    console.log("new Tickets clicked");
    if(document.getElementById("newTickets-div").hasChildNodes()){
        document.getElementById("newTickets-div").style.display="grid"
        document.getElementById("notickets").style.display="none"
    } else{
        document.getElementById("newTickets-div").style.display="none"
        document.getElementById("notickets").style.display="flex"
    }
    document.getElementById("complaint-div").style.display="none"
    document.getElementById("ticket-chat").style.display="none" 
    document.getElementById("openedTickets-div").style.display="none" 
    document.getElementById("closedTickets-div").style.display="none" 
    document.getElementById("myTickets-div").style.display="none" 
})
openedTicketsBtn.addEventListener('click',(e)=>{
    console.log("opened Tickets clicked");
    if(document.getElementById("openedTickets-div").hasChildNodes()){
        document.getElementById("openedTickets-div").style.display="grid"
        document.getElementById("notickets").style.display="none"
    } else{
        document.getElementById("openedTickets-div").style.display="none"
        document.getElementById("notickets").style.display="flex"
    }
    document.getElementById("complaint-div").style.display="none"
    document.getElementById("ticket-chat").style.display="none" 
    document.getElementById("newTickets-div").style.display="none" 
    document.getElementById("closedTickets-div").style.display="none" 
    document.getElementById("myTickets-div").style.display="none" 
})
closedTicketsBtn.addEventListener('click',(e)=>{
    console.log("closed Tickets clicked");
    if(document.getElementById("closedTickets-div").hasChildNodes()){
        document.getElementById("closedTickets-div").style.display="grid"
        document.getElementById("notickets").style.display="none"
    } else{
        document.getElementById("notickets").style.display="flex"
        document.getElementById("closedTickets-div").style.display="none"
    }
    document.getElementById("complaint-div").style.display="none"
    document.getElementById("ticket-chat").style.display="none" 
    document.getElementById("openedTickets-div").style.display="none" 
    document.getElementById("newTickets-div").style.display="none" 
    document.getElementById("myTickets-div").style.display="none" 

})
myComplaintBtn.addEventListener('click',(e)=>{
    console.log("my Tickets clicked");
    if(document.getElementById("myTickets-div").hasChildNodes()){
        document.getElementById("myTickets-div").style.display="grid"
        document.getElementById("notickets").style.display="none"
    } else{
        document.getElementById("notickets").style.display="flex"
        document.getElementById("myTickets-div").style.display="none"
    }
    document.getElementById("complaint-div").style.display="none"
    document.getElementById("ticket-chat").style.display="none" 
    document.getElementById("openedTickets-div").style.display="none" 
    document.getElementById("closedTickets-div").style.display="none" 
    document.getElementById("newTickets-div").style.display="none" 

})

document.getElementById("notification-btn").addEventListener('click',(e)=>{
    document.getElementById("notification-window").style.display = "block"
})

document.getElementById("close-notification-btn").addEventListener('click',(e)=>{
    document.getElementById("notification-window").style.display = "none"
})

complaintForm.addEventListener('submit',(e)=>raiseTicket(e))

closeChatBtn.addEventListener('click',(e)=>closeChatWindow(e))
