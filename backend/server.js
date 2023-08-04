const express = require("express")
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 6000;


const app = express()
app.get("/api/goals", (req, res) => {
    res.status(200).json({
        message: "Hello Moein, you hit right endpoint"
    })
})
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})