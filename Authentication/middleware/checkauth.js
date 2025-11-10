const express = require("express")
const {getUser}= require("../service/auth") 



function checkAuth(req,res,next){
    req.user = null;

    const token = req.cookies?.token;

    if(!token){
        return res.render("login")
    }

    const user = getUser(token);
    if(!user){
       return  res.redirect("/login");
    }
    req.user = user;
    next();
}

module.exports =  {checkAuth}