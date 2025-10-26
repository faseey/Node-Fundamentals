const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

router.get("/",restrictTo(["NORMAL"]), async(req,res) =>{
    const allURl = await URL.find({ createdBy : req.user._id});
    return res.render("home" ,{
        id : null,
        urls : allURl,
    });
});

router.get("/signup" , async(req,res)=>{
    return res.render("signup")
})
router.get("/login" , async(req,res)=>{
    return res.render("login")
})


module.exports = router
