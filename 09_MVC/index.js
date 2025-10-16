const express = require("express")
const mongoose = require("mongoose")
const { type } = require("os")
const { timeStamp } = require("console")
const userRouter = require("./routes/user")




const app = express()
const port = 8000

//Middleware plugin
app.use(express.urlencoded({extended : false}));

app.use("/user" , userRouter);

app.listen(port , ()=>{
    console.log("Server is started")
})