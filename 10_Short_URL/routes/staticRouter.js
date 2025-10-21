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

module.exports = router