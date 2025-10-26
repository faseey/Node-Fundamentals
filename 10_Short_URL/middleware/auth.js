
const {getUser} = require("../service/auth")

//Fro authentication JWT
async function restrictedToLoginUser(req,res,next) {
    const userUid = req.cookies?.uid;
    if(!userUid){
        return res.redirect("/login");
    }
    const user = getUser(userUid);
    console.log(user);
    if(!user) {
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

async function checkAuth(req , res,next) {
    const userUid = req.cookies?.uid;
    console.log(userUid, "Cookie UID");
    
    const user = getUser(userUid);
    console.log(user);
    req.user = user;
    next();
    
}
//these two funtions have repition 

// for authorization
//simple clean code

//THESE two funtion can handle both authorization and authentication as well (Piyush)
function CheckForAuthentication(req,res,next){
    const authorizationvalueHeader = req.headers["authorization"];
    req.user = null;

    if(!authorizationvalueHeader || !authorizationvalueHeader.startsWith("Bearer")){
        return next();
    }

    const token = authorizationvalueHeader.split(("Bearer "),[1]);
    const user = getUser(token);
    req.user = user;
    return next();

}

//ADMIN, NORMAL,MANAGER
 function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user){
             return res.redirect("login");
        }
        if(!roles.include(req.user.role)){
            return res.end("UnAuthorized Person")
        }

        return next();
    }

 }


module.exports = {
    restrictedToLoginUser,
    checkAuth,
    restrictTo,
    CheckForAuthentication,
}