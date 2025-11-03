const express = require("express")
const adminMiddleware = require("../middleware/admin")
const { Admin } = require("../db/db")
const router = express.Router()


router.post("/signup",adminMiddleware, async (req,res) => {

    const {username,password} = req.body

    await Admin.create({
        username : username,
        password : password
    })

    res.status(201).json({
        msg : "Admin created sucessfully"
    })
})

module.exports = router