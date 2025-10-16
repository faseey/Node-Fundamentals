const express = require("express")
const {connectMongoDb} = require("./connection")
const {logReqRes} = require("./middlewares")

const userRouter = require("./routes/user")


const app = express()
const port = 8000

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
//Middleware plugin
app.use(express.urlencoded({extended : false}));
app.use(logReqRes(log.txt));
app.use("/user" , userRouter);


app.listen(port , ()=>{
    console.log("Server is started")
})