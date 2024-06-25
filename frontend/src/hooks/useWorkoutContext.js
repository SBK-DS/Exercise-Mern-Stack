import { WorkoutsContext } from "../context/Workout-Context";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if(!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutContextProvider')
    }

    return context
}