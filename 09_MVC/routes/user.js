const express = require("express");

const route = express.Router; // will work as user



route.get("/",async(req,res)=>{
    const allDbUsers = await Users.find({});
    res.send(allDbUsers);
})


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
.get(async(req,res)=>{
    const user = await Users.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"})
    else{
    return res.send(user);
    }
})
.patch(async(req,res)=>{
    await Users.findByIdAndUpdate(req.params.id,{last_name: "changed"});
    return res.json({msg : "updated!"})
})
.delete(async(req,res)=>{
    await Users.findByIdAndDelete(req.params.id);
    return res.json({msg: "deleted"})
})

module.exports = route;
