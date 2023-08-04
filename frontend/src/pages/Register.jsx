import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { reset, register } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate("/")
            console.log(user)

        }

        //after we check everything we reset the state
        dispatch(reset())

    }, [isError, isSuccess, user, message, dispatch, navigate])



    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match")
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please Create An Account</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            placeholder='Enter Name'

                        />
                    </div>
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
                    <div className='form-group'>
                        <input
                            type="password"
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={handleChange}
                            placeholder='Confirm Password'

                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register