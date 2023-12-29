const Ticket = require("../models/tickets.js")
const User = require("../models/users.js")
const { status } = require("../utils/constants.js")
// const {status} = require("../utils/constants.js")

function loadLogin(req,res){
    if(req.session.isLoggedIn){
        res.redirect("/res/dashboard")
    }
    res.render("resolver/login",{err:null})
}

function loginUser(req,res){
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username , password: password, role:"resolver"})
    .then((user) => {
        req.session.isLoggedIn = true
        req.session.username = user.username
        req.session.userId = user._id
        req.session.role = user.role
        req.session.dept = user.dept
        res.status(301).redirect("/res/dashboard")
    }).catch((err) => {
        console.log(err);
        res.render("resolver/login",{err:"Invalid Username or Password !"})
    });
}

function logout(req,res){
    req.session.destroy()
    res.redirect("/res/")
}

function getDashboard(req,res){
    if(req.session.isLoggedIn){
        res.render("resolver/dashboard",{username:req.session.username,role:req.session.role,userId:req.session.userId});
    } else {
        res.redirect("/res/login")
    }
}

function getAllTickets(req,res){
    const ticketType = req.params.type
    if(ticketType!="new"){
        Ticket.find({category:req.session.dept, status:ticketType, resolverId: req.session.userId})
        .then(tickets=>{
            res.end(JSON.stringify(tickets))
        })
        .catch(err=>{
            console.log(err);
            res.end("[]")
        })

    } else if(ticketType=="mytickets"){
        Ticket.find({creatorId: req.session.userId})
        .then(tickets=>{
            res.end(JSON.stringify(tickets))
        })
        .catch(err=>{
            console.log(err);
            res.end("[]")
        })

    } else {
        Ticket.find({category:req.session.dept, status: status[0]})
        .then(tickets=>{
            res.end(JSON.stringify(tickets))
        })
        .catch(err=>{
            console.log(err);
            res.end("[]")
        })
    }
}

function openTicket(req,res){
    const ticketId = req.params.id
    Ticket.findOneAndUpdate({_id: ticketId},{resolverId: req.session.userId, status: status[1]},{new: true})
    .then(ticket=>{
        res.end(JSON.stringify(ticket))
    })
    .catch(err=>{
        console.log(err)
        res.end("[]")
    })
}

function resolveTicket(req,res){
    const ticketId = req.params.id
    Ticket.updateOne({_id:ticketId},{status:status[2]})
    .then(ticket=>{
        res.end("yes")
    })
    .catch(err=>{
        console.log(err)
        res.end("[]")
    })
}

function createTicket(req,res){
    console.log(req.body);
    const ticket = {
        title: req.body.complaintTitle,
        username:req.session.username,
        creatorId: req.session.userId,
        role:req.session.role,
        category:req.body.complaintType,
        desc:req.body.complaintDescription,
        startTime:new Date(),
        endTime:new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
        resolverId:"",
        resolvedAt:"",
        status:status[0]
    }
    Ticket.create(ticket)
    .then(()=>res.end(JSON.stringify(ticket)))
    .catch((err)=>{
        console.log(err);
        res.json('Failed')
    })
}

module.exports = {loadLogin, loginUser, logout, getDashboard, getAllTickets, openTicket, resolveTicket, createTicket}