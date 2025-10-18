const URL = require("../models/url.js")
const {nanoid}  = require("nanoid");


async function handleGenerateNewURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error : "URL is required"});
    const shortID = nanoid(8);
    await URL.create({
        short_Id : shortID,
        redirectURL : body.url,
        visitHistory: []
    })

    return res.status(201).json({id : shortID})
    
}

module.exports ={
     handleGenerateNewURL,
    }
