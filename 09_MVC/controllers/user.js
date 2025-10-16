const User = require("../models/user")


async function handleGetAllUsers(req,res) {
    const all_users = await User.find({});
    return res.json(all_users);  
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"})
        return res.status(200).json(user); 
    
}

async function handleupdateUserByID(req ,res) {
    await User.findByIdAndUpdate(req.params.id,{last_name: "changed"});
    return res.json({msg : "updated!"})
}


    
async function handleDeleteById(req ,res) {
    await User.findByIdAndUpdate(req.params.id);
    return res.status(201).json({msg : "user deleted successfuly"})
    
}


async function handleCreateUser(req , res) {
    const body = req.body
    if(!body.first_name || !body.last_name || !body.email || !body.gender ||!body.jobTittle){
        return res.status(400).json({ msg : "All fields are required"});
    }
    //return res.json({status : 'pending'})
    try{
    const result = await User.create({
        first_name: body.first_name,
        last_name : body.last_name,
        gender: body.gender,
        email: body.email,
        jobTitle: body.jobTitle
    })
    console.log(body)
    return res.status(201).json({msg : "user created"})
}catch(error){
    console.log(error);
}
    
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteById,
    handleupdateUserByID,
    handleCreateUser,
}