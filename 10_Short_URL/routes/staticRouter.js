const express = require("express");
const router = express.Router();
const URL = require("../models/url")

router.get("/", async(req,res) =>{
    const allURl = await URL.find({});
    return res.render("home" ,{
        id : null,
        urls : allURl,
    });
});

router.get("/signup" , async(req,res)=>{
    return res.render("signup")
})


module.exports = router