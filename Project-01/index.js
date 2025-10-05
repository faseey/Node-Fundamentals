const express = require("express")
const users = require("./MOCK_DATA.json")

const app = express()
const port = 8000

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


app.get("/user/:id" ,(req,res) =>{
    const id = Number(req.params.id)
    const user = users.find((user) => user.id ===id);
    res.json(user);
})

app.listen(port , ()=>{
    console.log("Server is started")
})