import React, { useState, useEffect } from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'

function Login() {
    const [formData, setFormData] = useState({

        email: "",
        password: "",

    })
    const { email, password } = formData

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();

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