const express = require("express")
const User = require("../model/user");
const {setUser} = require("../service/auth")


async function handleUserSignup(req,res){
    const {name,email,password}  = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.render("login");
    

}
async function handleUserLogin(req,res) {
    const{email,password} = req.body;
     const e_user = await User.findOne({email , password});
     if(!e_user) return res.render("login",{
        error :"Invalid username or password"
    
     })
    //const sessionId = uuidv4();
    const token = setUser(e_user)
    res.cookie("token", token);
    return res.redirect("/")
    
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}