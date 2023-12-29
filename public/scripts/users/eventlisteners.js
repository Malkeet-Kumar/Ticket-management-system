homeBtn.addEventListener('click',(e)=>{
    console.log("Home clicked");
    document.getElementById("complaint-div").style.display="flex"
    document.getElementById("tickets-div").style.display="none"
    document.getElementById("notickets").style.display="none"
    document.getElementById("ticket-chat").style.display="none" 
})

complaintBtn.addEventListener('click',(e)=>{
    console.log("complaint clicked");
    if(document.getElementById("tickets-div").hasChildNodes()){
        document.getElementById("tickets-div").style.display="grid"
    } else{
        document.getElementById("notickets").style.display="flex"
    }
    document.getElementById("complaint-div").style.display="none"
    document.getElementById("ticket-chat").style.display="none" 
})

document.getElementById("notification-btn").addEventListener('click',(e)=>{
    document.getElementById("notification-window").style.display = "block"
})

document.getElementById("close-notification-btn").addEventListener('click',(e)=>{
    document.getElementById("notification-window").style.display = "none"
})

complaintForm.addEventListener('submit',(e)=>raiseTicket(e))

closeChatBtn.addEventListener('click',(e)=>closeChatWindow(e))
