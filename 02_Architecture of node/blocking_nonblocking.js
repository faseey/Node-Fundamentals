const fs = require("fs")
const os = require("os")


console.log(os.cpus().length);

//synchronous call
// fs.writeFileSync("./File-Handling/text.txt","Hey World");

// //asynchronous
// // fs.writeFile("./File-Handling/text.txt","This is Async" ,(err) => {} )

// console.log(1);
// //blocking///   
// console.log(fs.readFileSync("./File-Handling/text.txt", "utf-8"))
// console.log(2);



console.log(1);
//blocking///   
fs.readFile("./File-Handling/text.txt", "utf-8",(err,result) => {
    if(err){
        console.log("Error",err);
    }
    else{
        console.log(result);
    }
})
console.log(2);