const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express()
const port = 8000
app.use(express.urlencoded({extended : false}));

app.get("/api/users" , (req,res) => {
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
        return res.json({status : 'success' ,id: users.length})
    })
    //return res.json({status : 'pending'})
})

app.listen(port , ()=>{
    console.log("Server is started")
})