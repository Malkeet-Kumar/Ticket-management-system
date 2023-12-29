fetch("/res/tickets/new")
.then(res=>res.json())
.then(tickets=>{
    if(tickets.length>0){ 
        tickets.forEach(ticket=>{
            resolverTicket(newTicketContainer,ticket)
        })
    } 
    newTicketContainer.style.display = "none"
    noTicketScreen.style.display = "flex"
})
.catch(err=>{console.log(err)})

fetch("/res/tickets/opened")
.then(res=>res.json())
.then(tickets=>{
    if(tickets.length>0){ 
        tickets.forEach(ticket=>{
            resolverTicket(openedTicketContainer,ticket)
        })
    } 
    openedTicketContainer.style.display = "none"
    noTicketScreen.style.display = "flex"
})
.catch(err=>{console.log(err)})

fetch("/res/tickets/closed")
.then(res=>res.json())
.then(tickets=>{
    if(tickets.length>0){ 
        tickets.forEach(ticket=>{
            resolverTicket(closedTicketContainer,ticket)
        })
    } 
    closedTicketContainer.style.display = "none"
    noTicketScreen.style.display = "flex"
})
.catch(err=>{console.log(err)})

fetch("/res/tickets/mytickets")
.then(res=>res.json())
.then(tickets=>{
    if(tickets.length>0){ 
        tickets.forEach(ticket=>{
            userTicket(myTicketContainer,ticket)
        })
    } 
    myTicketContainer.style.display = "none"
    noTicketScreen.style.display = "flex"
})
.catch(err=>{console.log(err)})

function openTicket(id){
    fetch("/res/ticket/"+id)
    .then(res=>{console.log(res.json());})
    .catch(err=>{console.log(err);})
}

function raiseTicket(e){
    e.preventDefault();
    const complaintType=document.getElementById('category').value
    const complaintTitle = document.getElementById('complaintTitle').value
    const complaintDescription = document.getElementById('complaintMsg').value
    const formData = {
        complaintType,
        complaintTitle,
        complaintDescription
    }
    
    console.log(formData);
    if(complaintType===''){
        alert('Select complaint type')
        return;
    }
    if(!complaintTitle.trim()||complaintTitle.trim().length<3){
        alert('Enter Proper Complaint Title');
        return;
    }
    if(!complaintDescription.trim()||complaintDescription.trim().length<10){
        alert('Complaint Description must be atleast 10 character long');
        return;
    }
    
    complaintType.value='';
    complaintTitle.value='';
    complaintDescription.value=''

    fetch('/res/ticket',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(res=>{
        if(res.status===200)
            return res.json();
    }).then(tkt=>{
        userTicket(ticketContainer,tkt)
    })
    .catch(err=>{
        alert(err);
    })
}