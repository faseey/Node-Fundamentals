const sessionIdToUserMap = new Map();

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
    console.log("user id is set", id);
}
function getUser(id){
    console.log("user id get func");
    return sessionIdToUserMap.get(id);
    
}

module.exports = {
    setUser,getUser,
}