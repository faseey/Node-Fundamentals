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
    jobTitle:{
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


//GET ALL Users
app.get("/users" ,async(req,res)=>{
    const allDbusers = await Users.find({});
    const html =`
    <ul>
    ${allDbusers.map((user)=> `<li> ${user.first_name} - ${user.email}</li>`).join("")}
    <ul>
    `
    return res.send(html);

})

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
        jobTitle: body.jobTitle
    })
    console.log(body)
    return res.status(201).json({msg : "successful"})
})

app.get("/api/users",async(req,res)=>{
    const allDbUsers = await Users.find({});
    res.send(allDbUsers);
})

app.route("/api/users/:id")
.get(async(req,res)=>{
    const user = await Users.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"})
    else{
    return res.send(user);
    }
})
.patch(async(req,res)=>{
    await Users.findByIdAndUpdate(req.params.id,{last_name: "changed"});
    return res.json({msg : "updated!"})
})
.delete(async(req,res)=>{
    await Users.findByIdAndDelete(req.params.id);
    return res.json({msg: "deleted"})
})



app.listen(port , ()=>{
    console.log("Server is started")
})