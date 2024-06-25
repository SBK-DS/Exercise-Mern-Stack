import {useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
            console.log(json)
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkout()
    }, [dispatch])

    console.log(workouts)

    return (
        <div className="home">
            <div className='workouts'>
                {
                    workouts && workouts.map((workout) => {
                        return <WorkoutDetails key={workout._id} Workout={workout} />
                    })
                }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home