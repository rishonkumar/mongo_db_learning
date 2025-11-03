const e = require("express");
const mongoose = require("mongoose")
require("dotenv").config()

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conneted to DB");
    }
    catch(err) {
        console.log("Erro connecting to DB",err);
        process.exit(1)
    }
}
connectDb();

const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
})

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchaseCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
})

const CourseSchema = new mongoose.Schema({
    title : String,
    desription : String,
    price : Number,
})

const Admin = mongoose.model("Admin", AdminSchema)
const User = mongoose.model("User", UserSchema)
const Course = mongoose.model("Course", CourseSchema)

{Admin,User,Course}

module.exports = {Admin,User,Course}