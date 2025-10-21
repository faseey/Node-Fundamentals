const express = require("express")
const path = require("path")
const {connectMongoDb} = require("./connections")
const URL_route = require("./routes/url")
const staticRoute = require("./routes/staticRouter")


connectMongoDb("mongodb://127.0.0.1:27017/URL_Shortner").then(
    ()=> {
        console.log("MOngo is connected");
    }
)
const app = express()
const port = 8001;
app.set("view engine" , "ejs");
app.set("views",path.resolve(__dirname,"./views"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
// app.get("/test",async(req,res)=>{
//     const allURl = await URL.find({});
//     return res.end(`
//         <html>
//         <head></head>
//         <body>
//         <ol>
//         ${allURl.map((url) => `<li>${url.short_Id} - ${url.redirectURL} </li>` ).join('')}
//         </ol>
//         </body>
//         </html>`)
    
// });
app.use("/url", URL_route)
app.use("/", staticRoute)


app.listen(port,()=> {console.log(`Server Started at port: ${port}`)})
