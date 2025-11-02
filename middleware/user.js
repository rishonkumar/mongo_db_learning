const {User} = require("../db/index")

//check admin mide ware for without async
async function userMiddleware(req, res, next) {

    const username = req.headers.username
    const password = req.headers.password

    const user = await User.findOne({
        username : username,
        password : password
    })

    if(!user) {
        res.status(401).json({msg : "User does not exist"})
    } else {
        next()
    }
}