const { timeStamp } = require("console");
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
    return res.render("home", {
        id : shortID,
    })
    return res.status(201).json({id : shortID})
    
}
async function handleAnalytics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({
        short_Id: shortId
    })
    return res.json({Total_count : result.visitHistory.length});
    
}
async function handleRedirectURL(req,res) {
    const shortId = req.params.shortId;
    const Entry = await URL.findOneAndUpdate({
        short_Id: shortId,
    
    },
        {
            $push : {
            visitHistory : {
                timeStamp : Date.now(),}
        }})

        return res.redirect(Entry.redirectURL)

    
}

module.exports ={
     handleGenerateNewURL,
     handleAnalytics,
     handleRedirectURL,
    }
