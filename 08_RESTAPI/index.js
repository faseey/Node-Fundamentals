const express = require("express")
const users = require("../08_RESTAPI_MONGODB/MOCK_DATA.json")
const fs = require("fs")

const app = express()
const port = 8000

//Middleware plugin
app.use(express.urlencoded({extended : false}));
//MIDDLEWARE
app.use((req,res,next) =>{
    console.log("hello from middleware 1");
    fs.appendFile("./08_RESTAPI/log.txt",`\n${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
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


    //FOR FS
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