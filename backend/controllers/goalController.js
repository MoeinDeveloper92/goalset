const assyncHandler = require("express-async-handler")


//desc display all the goals
//route GET /api/goals
//access private
exports.getGoals = assyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "Show all the goals"
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
    res.status(201).json({
        message: `${req.body.text} has been created`
    })
})
//desc Delete a goal with specified ID
//route DELETE /api/goals/:id
//access Private
exports.deleteGoal = assyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: `Delete goal ${req.params.id}`
    })
})

//Desc Update a goal
//route UPDATE /api/goals/:id
//acces Private
exports.updateGoal = assyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: `Update goal ${req.params.id}`
    })
})