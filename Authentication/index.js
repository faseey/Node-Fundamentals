const express = require("express")
const path = require("path")
const {connectMongoDb} = require("./connections")
const {checkAuth} = require("./middleware/checkauth.js")



const staticroute = require("./routes/staticroute.js")
const userroute = require("./routes/user.js")
const { json } = require("stream/consumers")




connectMongoDb("mongodb://127.0.0.1:27017/auth").then(
    ()=> {
        console.log("Mongo is connected");
    }
)
const app = express();
const port = 8002;
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(checkAuth);


app.use("/" , staticroute);
app.use("/user" ,checkAuth, userroute);

app.listen(port,()=> {"server is connected"})