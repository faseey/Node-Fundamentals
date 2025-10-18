const express = require("express")
const {connectMongoDb} = require("./connections")
const URL_route = require("./routes/url")

connectMongoDb("mongodb://127.0.0.1:27017/URL_Shortner").then(
    ()=> {
        console.log("MOngo is connected");
    }
)
const app = express()
const port = 8001;

app.use(express.json());


app.use("/url", URL_route)



app.listen(port,()=> {console.log(`Server Started at port: ${port}`)})
