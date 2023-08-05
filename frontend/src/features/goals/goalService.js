import axios from "axios"

const API_URL = "/api/goals/"


//Create goal service
const createGoal = async (goalData, token) => {

    //We put token here
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)
    return response.data
}


//get user goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    //we send config , since we need to token, to extract id of the user and get all it's goal
    const response = await axios.get(API_URL, config)
    return response.data
}



const goalService = {
    createGoal,
    getGoals
}


export default goalService