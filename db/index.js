import mongoose from "mongoose";


mongoose.connect("mongodb+srv://rishon:check1234@cluster0.k1g8c8i.mongodb.net/")

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

export {Admin, User, Course}