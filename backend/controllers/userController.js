const assycHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../model/userModel")

//@desc register user to the app
//route POST /api/users
//access public
exports.registerUser = assycHandler(async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all the fields")
    }

    //check user Exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist")
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //create User in the DB
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }

})

//@desc login to your account
//route POST /api/users/login
//acceess Public
exports.loginUser = assycHandler(async (req, res, next) => {
    const { email, password } = req.body
    //check for user
    const user = await User.findOne({ email })
    //check for the match of the user and password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }

})

//@desc show user's infomation
//route GET /api/users/me
//access Private
exports.getMe = assycHandler(async (req, res, next) => {
    res.status(200).json(req.user)
})


//Generate JWT
//we put the id as the payload
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

