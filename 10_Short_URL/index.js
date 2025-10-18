const express = require("express")
const {connectMongoDb} = require("./connections")
const URL_route = require("./routes/url")
const URL = require("./models/url")
const { timeStamp } = require("console")

connectMongoDb("mongodb://127.0.0.1:27017/URL_Shortner").then(
    ()=> {
        console.log("MOngo is connected");
    }
)
const app = express()
const port = 8001;

app.use(express.json());


app.use("/url", URL_route)
//app.use("/:shortId",URL_route);
// app.get("/:shortId",async(req,res)=>{
//     const short_Id = req.params.shortId
//     const Entry = await URL.findOneAndUpdate({
//         short_Id : short_Id
//     },{
//     $push: {
//         visitHistory : {timeStamp : Date.now()}
//     }})

//     res.redirect(Entry.redirectURL);
// })



app.listen(port,()=> {console.log(`Server Started at port: ${port}`)})
