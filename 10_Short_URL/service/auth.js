// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
//     console.log("user id is set", id);
// }
// function getUser(id){
//     console.log("user id get func");
//     return sessionIdToUserMap.get(id);
    
// }



const jwt = require("jsonwebtoken");
const secret = "fasih$1234"

function setUser(user){
    return jwt.sign({
    _id : user._id,
    email : user.email,
    role : user.role,
    },secret)
}

function getUser(token){
    if(!token) return null;
    try{
    return jwt.verify(token , secret);
    }catch(error){
        return null;
    }
    
}
module.exports = {
    setUser,getUser,
}