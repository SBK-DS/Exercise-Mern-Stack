import { useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const wo = {title, load, reps}
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(wo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const js = await response.json()

        if(!response.ok) {
            setError(js.error)
            console.log(js.error)
            setEmptyFields(js.emptyFields)
            console.log(js.emptyFields)
        }
        if(response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', js)
            dispatch({type: 'CREATE_WORKOUT', payload: js})
        }
    }
    
    return (
        <div>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add a new Workout</h3>

                <label>Excersize title: </label>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error':''}
                />

                <label>Load (in Kg): </label>
                <input 
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={emptyFields.includes('load') ? 'error':''}
                />

                <label>Reps: </label>
                <input 
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className={emptyFields.includes('reps') ? 'error':''}
                />

                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default WorkoutForm