const User = require("../models/user")


async function handleGetAllUsers(req,res) {
    const all_users = await User.find({});
    return res.json(all_users);  
}

async function getUserById(req,res) {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"})
        return res.status(200).json(user); 
    
}

async function updateUserByID(req ,res) {
    async(req,res)=>{
    await Users.findByIdAndUpdate(req.params.id,{last_name: "changed"});
    return res.json({msg : "updated!"})
}
    
}

module.exports = {
    handleGetAllUsers,
    getUserById,
}