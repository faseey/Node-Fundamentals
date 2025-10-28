//BUISNESS LOGIC

const { timeStamp } = require("console");
const URL = require("../models/url.js")
const {nanoid}  = require("nanoid");


async function handleGenerateNewURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error : "URL is required"});
    //here body {url : 127sdh231} coming from ejs 
    const shortID = nanoid(8);
    const u = await URL.create({
        short_Id : shortID,
        redirectURL : body.url,
        visitHistory: [],
        createdBy : req.user._id,
    })
    console.log(u);
    return res.render("home", {
        id : shortID,
        urls : null,
    })
    // return res.status(201).json({id : shortID})
    
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
    const visiblity = await URL.findOne({
        short_Id:shortId
    })
    if(visiblity.Visiblity === false) return res.end("Ypu cant access this link, The visiblity of this link is off!");

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
async function handleVisiblity(req, res) {
  const { shortId } = req.body;

  await URL.updateOne(
    { short_Id: shortId },
    [{ $set: { Visiblity: { $not: "$Visiblity" } } }] // toggles Boolean
  );

  return res.redirect("/");
}

module.exports ={
     handleGenerateNewURL,
     handleAnalytics,
     handleRedirectURL,
     handleVisiblity,
    }
