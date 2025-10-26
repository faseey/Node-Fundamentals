const express = require("express")
const path = require("path")
const {connectMongoDb} = require("./connections")
const cookieParser = require("cookie-parser")
const {restrictedToLoginUser,checkAuth, restrictTo,CheckForAuthentication} = require("./middleware/auth")


const URL_route = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")


connectMongoDb("mongodb://127.0.0.1:27017/URL_Shortner").then(
    ()=> {
        console.log("MOngo is connected");
    }
)
const app = express()
const port = 8001;
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())
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
app.use("/url" ,restrictTo(["NORMAL"]),URL_route)
app.use("/",checkAuth, staticRoute)
app.use("/user" , userRoute)


app.listen(port,()=> {console.log(`Server Started at port: ${port}`)})
