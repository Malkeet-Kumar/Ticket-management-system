const Ticket = require("../models/tickets.js")
const User = require("../models/users.js")
const {cats,status} = require("../utils/constants.js")

function loadLogin(req,res){
    if(req.session.isLoggedIn){
        res.redirect("/dashboard")
    }
    res.render("user/login",{err:null})
}

function loginUser(req,res){
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username , password: password, role:"user"})
    .then((user) => {
        req.session.isLoggedIn = true
        req.session.username = user.username
        req.session.userId = user._id
        req.session.role = user.role
        console.log(user._id);
        res.status(301).redirect("/dashboard");
    }).catch((err) => {
        console.log(err);
        res.render("user/login",{err:"Invalid Username or Password !"})
    });
}

function logout(req,res){
    req.session.destroy()
    res.redirect("/");
}

function getDashboard(req,res){
    if(req.session.isLoggedIn){
        res.render("user/dashboard",{username:req.session.username,role:req.session.role,userId:req.session.userId});
    } else{
        res.redirect("/login")
    }
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

function cancelTicket(req,res){
    Ticket.updateOne({_id: req.params.id}, {status:status[3]})
    .then(response=>{
       res.status(200).end("success")
    })
    .catch(err=>{
        res.status(500).end("Internal error")
    })
}

function getAllTickets(req,res){
    Ticket.find({creatorId: req.session.userId}) 
    .then((tickets)=>{
        res.end(JSON.stringify(tickets))
    })        
    .catch(err=>{console.log(err)})
}

function getTicket(req,res){
    Ticket.findById(req.params.id)
    .then(t=>{res.end(JSON.stringify(t))})
    .catch(err=>{console.log(err)})
}

function getComplaintCategories(req,res){
    res.end(JSON.stringify(cats));
}

module.exports = {getDashboard, loadLogin, loginUser, getAllTickets,
    getComplaintCategories, getTicket, createTicket, cancelTicket, logout}
    