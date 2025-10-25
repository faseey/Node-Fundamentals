
const {getUser} = require("../service/auth")
async function restrictedToLoginUser(req,res,next) {
    console.log("here in middleware");
    const userUid = req.cookies?.uid;
    console.log(userUid , "user id in middleware");
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

module.exports = {
    restrictedToLoginUser,
}