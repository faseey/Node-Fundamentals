const express = require("express");
const {handleGetAllUsers,getUserById} = require("../controllers/user")
const route = express.Router; // will work as user



route.get("/",handleGetAllUsers(req,res))


//POST ROUTE
route.post("/" ,async(req,res) => {
    console.log("in post req")
    console.log("Body received:", req.body);
    const body = req.body
    if(!body.first_name || !body.last_name || !body.email || !body.gender ||!body.jobTittle){
        return res.status(400).json({ msg : "All fields are required"});
    }
    //return res.json({status : 'pending'})
    const result = await Users.create({
        first_name: body.first_name,
        last_name : body.last_name,
        gender: body.gender,
        email: body.email,
        jobTitle: body.jobTitle
    })
    console.log(body)
    return res.status(201).json({msg : "successful"})
})


route.route("/:id")
.get(getUserById(req,res))
.patch()
.delete(async(req,res)=>{
    await Users.findByIdAndDelete(req.params.id);
    return res.json({msg: "deleted"})
})

module.exports = route;
