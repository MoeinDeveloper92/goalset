const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require("../backend/middleware/errorMiddleware")
const PORT = process.env.PORT || 6000;
const connectDB = require("../backend/config/db")
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", require("../backend/routes/goalRoutes"))
app.use("/api/users", require("../backend/routes/userRoutes"))
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})