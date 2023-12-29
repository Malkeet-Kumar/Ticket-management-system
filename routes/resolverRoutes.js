const express = require('express');
const resController = require('../controllers/resolverController');
const { authRes } = require('../services/auth');
const resRoutes = express();

resRoutes.get("/",resController.loadLogin)

resRoutes.route("/login")
.get(resController.loadLogin)
.post(resController.loginUser)

resRoutes.get("/logout",resController.logout)

resRoutes.get("/dashboard",resController.getDashboard)

resRoutes.get("/tickets/:type",resController.getAllTickets)

resRoutes.route("/ticket/:id")
.get(resController.openTicket)
.patch(resController.resolveTicket)

resRoutes.post("/ticket", resController.createTicket)

module.exports = resRoutes