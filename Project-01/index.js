const express = require("express")
const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose")
const fs = require("fs")
const { type } = require("os")


mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>{console.log("Mongo connected")})
.catch((err)=>{ console.log("Db not connected" , err)
})

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
})

const Users = mongoose.model('user',userSchema)

const app = express()
const port = 8000

//Middleware plugin
app.use(express.urlencoded({extended : false}));
//MIDDLEWARE
app.use((req,res,next) =>{
    console.log("hello from middleware 1");
    fs.appendFile("./Project-01/log.txt",`\n${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
})


//setting on headers in response
app.get("/api/users" , (req,res) => {
    res.setHeader("myName","Fasih")
    //printing headers that are coming as a req
    // got practice to use custom headers like this : X-headername
    //builtin header can be founnd in mdn docs
    console.log(req.headers)
    res.json(users)
})

app.get("/users" , (req,res) => {
    const html =`
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    <ul>
    `
    res.send(html);
})

app.route("/user/:id")
    .get((req,res) =>{
    const id = Number(req.params.id)
    const user = users.find((user) => user.id ===id);
    res.json(user);})
    .post((req,res) => {
        return req.json({status : 'pending'})
    })
    .patch((req,res) => {
        return req.json({status : 'pending'})
    })

app.post("/api/users" , (req,res) => {
    const body = req.body
    users.push({...body,id: users.length+1})
    fs.writeFile("./Project-01/MOCK_DATA.json" , JSON.stringify(users) ,(err,data)=> {
        return res.status(201).json({status : 'success' ,id: users.length})
    })
    //return res.json({status : 'pending'})
})

app.listen(port , ()=>{
    console.log("Server is started")
})