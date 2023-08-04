const jwt = require("jsonwebtoken")
const assyncHandler = require("express-async-handler")
const User = require("../model/userModel")

const protect = assyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            //Get token from header
            token = req.headers.authorization.split(" ")[1]
            //Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get the user from token
            //you can see we can have access to the user from any route that is protected
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("No Token, Not Authorized")
    }

})


module.exports = { protect }