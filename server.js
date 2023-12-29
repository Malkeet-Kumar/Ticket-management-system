require("dotenv").config();
const express = require('express')
const session = require('express-session')
const app = express();
const db = require("./models/db.js")
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
require("./controllers/chatController.js")(io.of("/chats"))
require("./controllers/notificationController.js")(io.of("/notification"))
const {authAdmin,authRes}  = require('./services/auth.js')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.static(__dirname+"/public"))

const userRoutes = require('./routes/userRoutes.js');
// const adminRoutes = require('./routes/adminRoutes.js')
const resolverRoutes = require('./routes/resolverRoutes.js');

app.use("/",userRoutes)
app.use("/res",resolverRoutes)
// app.use("/admin",authAdmin,adminRoutes)

db.init()
.then(() => {
    server.listen(process.env.PORT,()=>{console.log("port : 8000")})
}).catch((err) => {
    console.log(err);
});
