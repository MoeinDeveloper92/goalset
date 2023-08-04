import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { reset, login } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({

        email: "",
        password: "",

    })
    const { email, password } = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
            toast.success("You are logged in")
        }

        dispatch(reset())
    }, [user, isError, message, navigate, dispatch, isSuccess])



    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email, password
        }

        dispatch(login(userData))

    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Please Login To Your Account</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>

                    <div className='form-group'>
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter Eamil'

                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter Password'

                        />
                    </div>

                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login