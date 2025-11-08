const { JWT_SECRET } = require("../config")
const {Admin} = require("../db/db")
const jwt = require("jsonwebtoken")

// check user middleware for with async 
function adminMiddleware(req, res, next) {

    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]

    const decodedValue = jwt.verify(jwtToken,JWT_SECRET)

    if(decodedValue.username) {
        next()
    } else {
        res.status(403).json({
            msg  : "You are not authenticated"
        })
    }
    

    // const username = req.headers.username
    // const password = req.headers.password

    // console.log("Inside Admin Middleware");


    // Admin.findOne({
    //     username : username,
    //     password : password
    // }).then(function(value)  {
    //     if(value) {
    //         next()
    //     } else {
    //         res.status(401).json({msg : "User does not exist"})
    //     }
    // })
}

module.exports = adminMiddleware