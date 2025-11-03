const {Admin} = require("../db/db")

// check user middleware for with async 
function adminMiddleware(req, res, next) {

    const username = req.headers.username
    const password = req.headers.password

    Admin.findOne({
        username : username,
        password : password
    }).then(function(value)  {
        if(value) {
            next()
        } else {
            res.status(401).json({msg : "User does not exist"})
        }
    })
}

module.exports = adminMiddleware