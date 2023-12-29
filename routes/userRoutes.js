const express = require('express');
const user = require('../controllers/userController');
const userRoutes = express();

userRoutes.get("/",user.loadLogin)

userRoutes.get("/loadcategories",user.getComplaintCategories)

userRoutes.route("/login")
.get(user.loadLogin)
.post(user.loginUser)

userRoutes.get("/logout",user.logout)

userRoutes.get("/dashboard",user.getDashboard);

userRoutes.route("/tickets")
.get(user.getAllTickets)
.post(user.createTicket)

userRoutes.route("/tickets/:id")
.get(user.getTicket)
.patch(user.cancelTicket)

userRoutes.get("/profile");

module.exports = userRoutes
