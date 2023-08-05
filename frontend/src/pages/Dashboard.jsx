import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'

function Dashboard() {
    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, isSucces, message } = useSelector((state) => state.goals)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let myGoals = []
    useEffect(() => {
        if (isError) {
            console.log(message)

        }
        if (!user) {
            navigate("/login")
        }
        dispatch(getGoals())



        //I want to reset the state in the unmount
        //When I leave the dashboard I should reset the state
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, message, dispatch, isError])


    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className='content'>

                {goals.length > 0 ? (<>
                    <div className="goals">
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                </>) : (<h3>You have not set any goals</h3>)}
            </section >
        </>
    )
}

export default Dashboard