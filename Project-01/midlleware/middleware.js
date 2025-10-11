//it s a funtion that runs on every req and res 
//every req has to pass through this if middleware is enabled
//it can froward request  r revert as well
//there can be one or more than one midllewares
//it is a plugin\//the have access to req and res obj and the next middleware

const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express()
const port = 8000
app.use(express.urlencoded({extended : false}));

app.use((req,res,next) =>{
    console.log("hello from middleware 1");
    fs.appendFile("middleware/log.txt",`${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
})
app.get("/api/users" , (req,res) => {
    res.json(users)
})



app.listen(port , ()=>{
    console.log("Server is started")
})