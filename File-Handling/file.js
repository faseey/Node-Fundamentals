const fs = require("fs")


//synchronous call
// fs.writeFileSync("./File-Handling/text.txt","Hey World");

// //asynchronous
// fs.writeFile("./File-Handling/text.txt","This is Async" ,(err) => {} )


//  fs.readFile("./File-Handling/contacts.txt" ,"utf-8",(err,result) => {
//     if(err){
//         console.log("error",err);
//     }
//     else{
//         console.log("result", result);
//     }
//  });


//for copy
fs.cpSync("./File-Handling/text.txt" ,"./File-Handling/copy.txt" )

//for dlt
fs.unlinkSync("./File-Handling/copy.txt")
//status
console.log(fs.statSync("./File-Handling/text.txt"))


