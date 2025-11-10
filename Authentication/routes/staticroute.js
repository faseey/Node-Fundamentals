const express = require("express")
const router = express.Router();




router.get("/", (req,res)=> {
    res.send("home");
})
router.get("/login" , async(req,res) => {
    return res.render("login")
})
router.get("/signup" , async(req,res) => {
    return res.render("signup")
})
module.exports = router;