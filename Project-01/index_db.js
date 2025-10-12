const express = require("express")
const mongoose = require("mongoose")
const { type } = require("os")
const { timeStamp } = require("console")



//DB connection
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>{console.log("Mongo connected")})
.catch((err)=>{ console.log("Db not connected" , err)
})


//Schema
const userSchema  = new mongoose.Schema({
    first_name : {
        type : String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type:  String,
        required: true,
        unique : true,
    },
    jobTittle:{
        type: String,
    },
    gender:{
        type : String,
    },
},{timestamps : true})

//Model Creation
const Users = mongoose.model('user',userSchema)

const app = express()
const port = 8000

//Middleware plugin
app.use(express.urlencoded({extended : false}));


//POST ROUTE
app.post("/api/users" ,async(req,res) => {
    console.log("in post req")
    console.log("Body received:", req.body);
    const body = req.body
    if(!body.first_name || !body.last_name || !body.email || !body.gender ||!body.jobTittle){
        return res.status(400).json({ msg : "All fields are required"});
    }
    //return res.json({status : 'pending'})
    const result = await Users.create({
        first_name: body.first_name,
        last_name : body.last_name,
        gender: body.gender,
        email: body.email,
        jobTittle: body.jobTittle
    })
    console.log(body)
    return res.status(201).json({msg : "successful"})
})



app.listen(port , ()=>{
    console.log("Server is started")
})