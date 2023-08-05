import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from "../features/goals/goalSlice"

function GoalForm() {
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({ text }))
        setText("")
    }
    return (
        <section className='form'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input
                        type="text"
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Type Goal'
                    />
                </div>

                <div className="form-group">
                    <button className='btn btn-block' type='submit' >Add Goal</button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm