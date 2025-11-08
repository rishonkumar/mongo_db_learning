const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000

const adminRouter = require("./routes/adminRoutes")
// const userRouter = require("./routes/user")

app.use(bodyParser.json())
app.use("/admin",adminRouter)
// app.use("/user",userRouter)


app.listen(PORT, () => {
    console.log("App is started ", PORT);
})

