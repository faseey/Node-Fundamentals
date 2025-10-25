
const {getUser} = require("../service/auth")
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

module.exports = {
    restrictedToLoginUser,
    checkAuth,
}