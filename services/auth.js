function authAdmin(req,res,next){
    if(req.session.isLoggedIn && req.session.role=="admin"){
        next()
    }
    res.end("Unauthorized Acess")
}

function authRes(role){
    return (req,res,next)=>{
        if(req.session.isLoggedIn && req.session.role==role){
            next()
        } else{
            res.end("Access denied")
        }
    }
}

module.exports = {authAdmin,authRes}