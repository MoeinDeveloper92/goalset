import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
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