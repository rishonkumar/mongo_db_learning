const express = require("express")
const adminMiddleware = require("../middleware/adminMiddleware")
const { Admin, Course} = require("../db/db")
const router = express.Router()

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