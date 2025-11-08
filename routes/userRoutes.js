const express = require("express")
const userMiddleware = require("../middleware/userMiddleware")
const { Admin, Course, User} = require("../db/db")
const router = express.Router()

router.post("/courses/:courserId" , userMiddleware, async (req,res) => {

    const courseId = req.params.courseId
    const userName = req.headers.userName

    try {
        await User.updateOne({
            username : userName,
        },{
            purchasedCourse : {
                "$push" : {
                    purchaseCourses : courseId,
                }
            }
        })
    } catch (err) {
        console.log(err)
    }

    res.json({msg : "Course Updated successfully."})
})

router.get("/purchasedCourse", userMiddleware, async (req,res) => {

    const user = await User.findOne({
        username : req.headers.userName
    })
    const courses = await Course.find({
        _id : {
            "$in": user.purchaseCourses
        }
    })

    res.json({
        courses : courses
    })
})