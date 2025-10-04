const http = require("http")
const fs = require("fs")
const url = require("url")


function myhandler(req,res){
    if(req.url === "/favicon.ico"){
        return res.end();
    }
    const log = `${Date.now()} : ${req.url} New req received\n`
    const myurl = url.parse(req.url ,true)
    //console.log(myurl); //this will chack pathname and allow further query and proper path to run
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
            case '/signup' :
                if(req.method === 'GET'){
                    res.end("Hello this is a get req");
                }
                else{
                    //db query

                    res.end("Successful")
                }
                break;
            default:
                res.end("Pgae not found")
                break;
        } 
    })
    
}
const myServer = http.createServer(myhandler)

myServer.listen(8000,()=> {console.log("Server Started")})