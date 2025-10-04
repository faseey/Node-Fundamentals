const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req,res) => {
    if(req.url === "/favicon.ico"){
        return res.end();
    }
    const log = `${Date.now()} : ${req.url} New req received\n`
    const myurl = url.parse(req.url ,true)
    console.log(myurl); //this will chack pathname and allow further query and proper path to run
    fs.appendFile("./Server/log.txt",log,(err,data)=>{
        switch(myurl.pathname){
            case "/" :
                res.end("Hello from server");
                break;
            case "/about":
                const name = myurl.query.myname;
                res.end(`HI ${name}`)
                break;
            case "/home" :
                res.end("This is homepage")
                break;
            default:
                res.end("Pgae not found")
                break;
        } 
    })
    
})

myServer.listen(8000,()=> {console.log("Server Started")})