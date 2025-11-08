const {User} = require("../db/index")

//check admin mide ware for without async
async function userMiddleware(req, res, next) {




    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]

    const decodedValue = jwt.verify(jwtToken,JWT_SECRET)

    if(decodedValue.username) {
        //passing data from one middle ware to other
        req.username = decodedValue.username;
        next()
    } else {
        res.status(403).json({
            msg  : "You are not authenticated"
        })
    }

    // const username = req.headers.username
    // const password = req.headers.password

    // console.log("Inside user Middleware");
    
    // const user = await User.findOne({
    //     username : username,
    //     password : password
    // })

    // if(!user) {
    //     res.status(401).json({msg : "User does not exist"})
    // } else {
    //     next()
    // }
}