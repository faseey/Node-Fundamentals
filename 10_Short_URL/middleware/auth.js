
const {getUser} = require("../service/auth")

// //Fro authentication JWT
// async function restrictedToLoginUser(req,res,next) {
//     const userUid = req.cookies?.uid;
//     if(!userUid){
//         return res.redirect("/login");
//     }
//     const user = getUser(userUid);
//     console.log(user);
//     if(!user) {
//         return res.redirect("/login");
//     }
//     req.user = user;
//     next();
// }

// async function checkAuth(req , res,next) {
//     const userUid = req.cookies?.uid;
//     console.log(userUid, "Cookie UID");
    
//     const user = getUser(userUid);
//     console.log(user);
//     req.user = user;
//     next();
    
// }
// //these two funtions have repition 

// // for authorization
// //simple clean code

// //THESE two funtion can handle both authorization and authentication as well (Piyush)
// function CheckForAuthentication(req,res,next){
//     const authorizationvalueHeader = req.headers["authorization"];
//     req.user = null;

//     if(!authorizationvalueHeader || !authorizationvalueHeader.startsWith("Bearer")){
//         return next();
//     }

//     const token = authorizationvalueHeader.split(("Bearer "),[1]);
//     const user = getUser(token);
//     req.user = user;
//     return next();

// }
//AUTHORIZATION
function CheckForAuthentication(req, res, next) {
    console.log("in iddleware");
  req.user = null;

  // 1️⃣ Check for Bearer token in header
  const authHeader = req.headers["authorization"];
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2️⃣ Fallback to cookie if header not found
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }
  console.log(token, "token")

  // 3️⃣ If still no token, move on (unauthenticated)
  if (!token) return next();

  // 4️⃣ Verify token (same for both)
  const user = getUser(token);
  req.user = user || null;
  console.log(user);
  next();
}


//AUTHENTICATION
//ADMIN, NORMAL,MANAGER
 function restrictTo(roles = []){
    return function(req,res,next){
       console.log("➡️ Route called:", req.path);
        if(!req.user){
             return res.redirect("login");
        }
        if(!roles.includes(req.user.role)){
            return res.end("UnAuthorized Person")
        }

        return next();
    }

 }


module.exports = {
    // restrictedToLoginUser,
    // checkAuth,
    restrictTo,
    CheckForAuthentication,
}