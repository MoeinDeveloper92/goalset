const assyncHandler = require("express-async-handler")
const Goal = require("../model/goalModel")
const User = require("../model/userModel")

//desc display all the goals
//route GET /api/goals
//access private
exports.getGoals = assyncHandler(async (req, res, next) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json({
        goals
    })
})

//desc Create new Goal
//route POST /api/goals
//access Private
exports.setGoal = assyncHandler(async (req, res, next) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add text field")
    }
    const goal = await Goal.create({ text: req.body.text, user: req.user.id })
    res.status(201).json({
        goal,
    })
})
//desc Delete a goal with specified ID
//route DELETE /api/goals/:id
//access Private
exports.deleteGoal = assyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Gol not found")
    }
    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    // check for that we cannot update each other's goal
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    await Goal.findByIdAndRemove(req.params.id)
    res.status(200).json({
        id: req.params.id
    })
})

//Desc Update a goal
//route UPDATE /api/goals/:id
//acces Private
exports.updateGoal = assyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal Not Found")
    }

    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    // check for that we cannot update each other's goal
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
        updatedGoal
    })
})