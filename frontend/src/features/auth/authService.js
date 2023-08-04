import axios from "axios"

const API_URL = "/api/users/"

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    //when we use axios it pust the data inside the varibale called data
    if (response.data) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
    }
    //the data that we get from res.json({...})
    return response.data
}

//login
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if (response.data) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

//logout

const logout = () => {
    window.localStorage.removeItem("user")
}


const authService = {
    register,
    logout,
    login
}


export default authService