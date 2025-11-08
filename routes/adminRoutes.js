const express = require("express")
const adminMiddleware = require("../middleware/adminMiddleware")
const { Admin, Course, User} = require("../db/db")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")


router.post("/signup", async (req,res) => {

    const {username,password} = req.body

    console.log("Isnide admin sign up route");
    
    await Admin.create({
        username : username,
        password : password
    })

    console.log("Printing logs for user naem password " , username, password);
    
    res.status(201).json({
        msg : "Admin created successfully"
    })
})

router.post("/signin", async(req,res) => {

    const username = req.body.username
    const password = req.body.password


    const user = await User.find({
        username,
        password
    })

    if(user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        
        res.json({
            token
        })
    } else {
        res.json(411).json({message : "incorrect username and password"})
    }
    
})

router.post("/courses", adminMiddleware, async (req,res) => {

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    //use zod

    const newCourse = await Course.create({
        title,
        description,
        price,
    })
    res.status(201).json({msg : "Course created succesfullly", courseId: newCourse._id})
})

module.exports = router